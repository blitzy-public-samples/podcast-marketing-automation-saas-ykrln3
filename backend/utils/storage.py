import boto3
import os
import uuid
import mimetypes
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import logging

logger = logging.getLogger(__name__)

S3_BUCKET_NAME = settings.AWS_STORAGE_BUCKET_NAME
s3_client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                         aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                         region_name=settings.AWS_S3_REGION_NAME)

def upload_file_to_s3(file, folder):
    """
    Uploads a file to Amazon S3 bucket
    
    :param file: File object or path
    :param folder: str, folder name in S3 bucket
    :return: str, URL of the uploaded file
    """
    try:
        # Generate a unique filename
        filename = f"{uuid.uuid4().hex}{os.path.splitext(file.name)[1]}"
        
        # Determine content type
        content_type, _ = mimetypes.guess_type(file.name)
        
        # Construct S3 key
        s3_key = f"{folder}/{filename}"
        
        # Upload file to S3
        s3_client.upload_fileobj(
            file,
            S3_BUCKET_NAME,
            s3_key,
            ExtraArgs={'ContentType': content_type}
        )
        
        # Generate and return public URL
        url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{s3_key}"
        return url
    except Exception as e:
        logger.error(f"Error uploading file to S3: {str(e)}")
        raise

def download_file_from_s3(file_key):
    """
    Downloads a file from Amazon S3 bucket
    
    :param file_key: str, S3 key of the file
    :return: bytes, File content
    """
    try:
        response = s3_client.get_object(Bucket=S3_BUCKET_NAME, Key=file_key)
        return response['Body'].read()
    except Exception as e:
        logger.error(f"Error downloading file from S3: {str(e)}")
        raise

def delete_file_from_s3(file_key):
    """
    Deletes a file from Amazon S3 bucket
    
    :param file_key: str, S3 key of the file
    :return: bool, True if deletion was successful, False otherwise
    """
    try:
        s3_client.delete_object(Bucket=S3_BUCKET_NAME, Key=file_key)
        return True
    except Exception as e:
        logger.error(f"Error deleting file from S3: {str(e)}")
        return False

def get_file_url(file_key, expiration=3600):
    """
    Generates a pre-signed URL for accessing a file in S3
    
    :param file_key: str, S3 key of the file
    :param expiration: int, URL expiration time in seconds
    :return: str, Pre-signed URL for the file
    """
    try:
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': S3_BUCKET_NAME, 'Key': file_key},
            ExpiresIn=expiration
        )
        return url
    except Exception as e:
        logger.error(f"Error generating pre-signed URL: {str(e)}")
        raise

def list_files_in_folder(folder):
    """
    Lists all files in a specific folder in S3
    
    :param folder: str, folder name in S3 bucket
    :return: list, List of file keys in the folder
    """
    try:
        response = s3_client.list_objects_v2(Bucket=S3_BUCKET_NAME, Prefix=folder)
        return [obj['Key'] for obj in response.get('Contents', [])]
    except Exception as e:
        logger.error(f"Error listing files in S3 folder: {str(e)}")
        raise

# Human tasks:
# TODO: Implement error handling and retries for S3 operations
# TODO: Add support for different storage backends (e.g., Google Cloud Storage, Azure Blob Storage)
# TODO: Implement file validation (e.g., size limits, allowed file types) before upload
# TODO: Add support for file versioning if required
# TODO: Implement a caching mechanism for frequently accessed files
# TODO: Add support for bulk file operations (upload, download, delete)
# TODO: Implement logging and monitoring for all storage operations