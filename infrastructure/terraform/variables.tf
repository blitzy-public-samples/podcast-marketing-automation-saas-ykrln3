# AWS Region
variable "aws_region" {
  type        = string
  description = "The AWS region where resources will be created"
  default     = "us-west-2"
}

# Project Name
variable "project_name" {
  type        = string
  description = "The name of the project, used for naming resources"
  default     = "podcast-marketing-automation"
}

# Environment
variable "environment" {
  type        = string
  description = "The deployment environment (e.g., dev, staging, prod)"
  default     = "dev"
}

# VPC CIDR
variable "vpc_cidr" {
  type        = string
  description = "The CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

# Public Subnet CIDRs
variable "public_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for public subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

# Private Subnet CIDRs
variable "private_subnet_cidrs" {
  type        = list(string)
  description = "List of CIDR blocks for private subnets"
  default     = ["10.0.10.0/24", "10.0.11.0/24"]
}

# Database Username
variable "db_username" {
  type        = string
  description = "Username for the RDS PostgreSQL instance"
  sensitive   = true
}

# Database Password
variable "db_password" {
  type        = string
  description = "Password for the RDS PostgreSQL instance"
  sensitive   = true
}

# ECS Task CPU
variable "ecs_task_cpu" {
  type        = number
  description = "The number of CPU units to reserve for the ECS task"
  default     = 256
}

# ECS Task Memory
variable "ecs_task_memory" {
  type        = number
  description = "The amount of memory (in MiB) to reserve for the ECS task"
  default     = 512
}

# Application Port
variable "app_port" {
  type        = number
  description = "The port on which the application listens"
  default     = 8000
}

# Health Check Path
variable "health_check_path" {
  type        = string
  description = "The path for the health check endpoint"
  default     = "/health"
}