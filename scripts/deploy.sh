#!/bin/bash

# Global variables
DOCKER_REGISTRY="${DOCKER_REGISTRY:-your-registry-url.com}"
IMAGE_NAME="podcast-marketing-app"
IMAGE_TAG="${IMAGE_TAG:-latest}"
K8S_NAMESPACE="${K8S_NAMESPACE:-default}"
K8S_DEPLOYMENT="podcast-marketing-deployment"

# Function to build and push Docker image
build_and_push_image() {
    echo "Building Docker image..."
    docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} .
    if [ $? -ne 0 ]; then
        echo "Error: Docker build failed"
        return 1
    fi

    echo "Pushing Docker image to registry..."
    docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
    return $?
}

# Function to update Kubernetes deployment
update_kubernetes_deployment() {
    echo "Updating Kubernetes deployment..."
    kubectl set image deployment/${K8S_DEPLOYMENT} ${K8S_DEPLOYMENT}=${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} -n ${K8S_NAMESPACE}
    if [ $? -ne 0 ]; then
        echo "Error: Failed to update deployment image"
        return 1
    fi

    echo "Waiting for rollout to complete..."
    kubectl rollout status deployment/${K8S_DEPLOYMENT} -n ${K8S_NAMESPACE}
    return $?
}

# Main function
main() {
    echo "Starting deployment process..."

    build_and_push_image
    if [ $? -ne 0 ]; then
        echo "Error: Failed to build and push image"
        exit 1
    fi

    update_kubernetes_deployment
    if [ $? -ne 0 ]; then
        echo "Error: Failed to update Kubernetes deployment"
        exit 1
    fi

    echo "Deployment completed successfully!"
    exit 0
}

# Execute main function
main

# Human tasks:
# TODO: Review and adjust the default values for DOCKER_REGISTRY and other environment variables
# TODO: Implement proper error handling and logging throughout the script
# TODO: Add a mechanism to retrieve and use proper credentials for Docker registry authentication
# TODO: Implement a rollback mechanism in case of deployment failure
# TODO: Add pre-deployment checks (e.g., running tests, checking resource availability)
# TODO: Implement environment-specific deployment logic (e.g., staging vs production)
# TODO: Add post-deployment health checks to ensure the application is running correctly
# TODO: Implement a notification system for successful/failed deployments (e.g., Slack integration)