# Output values for the Podcast Marketing Automation SaaS platform infrastructure

output "vpc_id" {
  value       = aws_vpc.main.id
  description = "The ID of the VPC"
}

output "public_subnet_ids" {
  value       = aws_subnet.public[*].id
  description = "The IDs of the public subnets"
}

output "private_subnet_ids" {
  value       = aws_subnet.private[*].id
  description = "The IDs of the private subnets"
}

output "ecs_cluster_name" {
  value       = aws_ecs_cluster.main.name
  description = "The name of the ECS cluster"
}

output "ecr_repository_url" {
  value       = aws_ecr_repository.app.repository_url
  description = "The URL of the ECR repository"
}

output "db_endpoint" {
  value       = aws_db_instance.postgres.endpoint
  description = "The connection endpoint for the RDS instance"
}

output "redis_endpoint" {
  value       = aws_elasticache_cluster.redis.cache_nodes[0].address
  description = "The DNS name of the Redis cache cluster"
}

output "s3_bucket_name" {
  value       = aws_s3_bucket.media.id
  description = "The name of the S3 bucket for media storage"
}

output "alb_dns_name" {
  value       = aws_lb.main.dns_name
  description = "The DNS name of the Application Load Balancer"
}

output "cloudfront_distribution_domain" {
  value       = aws_cloudfront_distribution.main.domain_name
  description = "The domain name of the CloudFront distribution"
}

# Pending human tasks:
# - Review the outputs to ensure all necessary information for application deployment is included
# - Consider adding outputs for any additional resources that might be useful for other team members or CI/CD processes
# - Ensure sensitive information is not exposed in the outputs (e.g., database passwords)
# - Add outputs for any custom domain names or SSL certificate ARNs if applicable
# - Consider grouping related outputs for better organization (e.g., networking, database, caching)
# - Add outputs for any IAM role ARNs that might be needed for application configuration
# - Ensure all output values correctly reference the resources defined in the main Terraform configuration