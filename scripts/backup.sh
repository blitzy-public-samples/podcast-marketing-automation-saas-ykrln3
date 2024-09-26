#!/bin/bash

# Global variables
BACKUP_DIR="/tmp/podcast_marketing_backups"
DB_NAME="${DB_NAME:-podcast_marketing_db}"
DB_USER="${DB_USER:-postgres}"
S3_BUCKET="${S3_BUCKET:-podcast-marketing-backups}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Function to create backup directory
create_backup_directory() {
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
        chmod 700 "$BACKUP_DIR"
    fi
}

# Function to backup database
backup_database() {
    local dump_file="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql.gz"
    pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$dump_file"
    echo "$dump_file"
}

# Function to backup files
backup_files() {
    local archive_file="$BACKUP_DIR/files_${TIMESTAMP}.tar.gz"
    tar -czf "$archive_file" -C /path/to/app --exclude={*.log,*.tmp} .
    echo "$archive_file"
}

# Function to upload to S3
upload_to_s3() {
    local file_path="$1"
    aws s3 cp "$file_path" "s3://$S3_BUCKET/"
    return $?
}

# Function to cleanup old backups
cleanup_old_backups() {
    find "$BACKUP_DIR" -type f -mtime +7 -delete
}

# Main function
main() {
    echo "Starting backup process..."

    create_backup_directory

    local db_backup=$(backup_database)
    local file_backup=$(backup_files)

    upload_to_s3 "$db_backup"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to upload database backup to S3"
        exit 1
    fi

    upload_to_s3 "$file_backup"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to upload file backup to S3"
        exit 1
    fi

    cleanup_old_backups

    echo "Backup process completed successfully"
    return 0
}

# Run the main function
main