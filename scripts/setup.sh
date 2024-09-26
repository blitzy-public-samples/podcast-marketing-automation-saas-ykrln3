#!/bin/bash

# Global variables
PROJECT_ROOT=$(pwd)
PYTHON_VERSION="3.9"
NODE_VERSION="14"

# Function to check if required dependencies are installed
check_dependencies() {
    echo "Checking dependencies..."

    # Check Python version
    if ! command -v python3 &> /dev/null || [[ $(python3 --version | cut -d' ' -f2) != $PYTHON_VERSION* ]]; then
        echo "Error: Python $PYTHON_VERSION is required but not found."
        return 1
    fi

    # Check Node.js version
    if ! command -v node &> /dev/null || [[ $(node --version | cut -d'v' -f2) != $NODE_VERSION* ]]; then
        echo "Error: Node.js $NODE_VERSION is required but not found."
        return 1
    fi

    # Check Docker
    if ! command -v docker &> /dev/null; then
        echo "Error: Docker is required but not found."
        return 1
    fi

    # Check PostgreSQL client
    if ! command -v psql &> /dev/null; then
        echo "Error: PostgreSQL client is required but not found."
        return 1
    fi

    echo "All dependencies are satisfied."
    return 0
}

# Function to set up the backend environment
setup_backend() {
    echo "Setting up backend environment..."
    cd $PROJECT_ROOT/backend

    # Create and activate virtual environment
    python3 -m venv venv
    source venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt

    # Set up environment variables
    cp .env.example .env
    echo "Please fill in the values in the .env file."
    read -p "Press enter when you're done."

    # Run migrations
    python manage.py migrate

    # Create superuser
    python manage.py createsuperuser

    deactivate
    cd $PROJECT_ROOT
}

# Function to set up the frontend environment
setup_frontend() {
    echo "Setting up frontend environment..."
    cd $PROJECT_ROOT/frontend

    # Install dependencies
    npm install

    # Set up environment variables
    cp .env.example .env
    echo "Please fill in the values in the frontend .env file."
    read -p "Press enter when you're done."

    cd $PROJECT_ROOT
}

# Function to set up Docker environment
setup_docker() {
    echo "Setting up Docker environment..."
    cp docker-compose.yml.example docker-compose.yml
    echo "Please review and adjust settings in docker-compose.yml if necessary."
    read -p "Press enter when you're done."

    # Build Docker images
    docker-compose build
}

# Main function
main() {
    echo "Welcome to the Podcast Marketing Automation SaaS platform setup!"
    echo "This script will guide you through the setup process."

    if ! check_dependencies; then
        echo "Please install the required dependencies and run the script again."
        exit 1
    fi

    setup_backend
    setup_frontend
    setup_docker

    echo "Setup completed successfully!"
    echo "Next steps:"
    echo "1. Review all .env files and ensure all variables are correctly set."
    echo "2. Start the development servers using: docker-compose up"
    echo "3. Access the application at http://localhost:3000"

    return 0
}

# Run the main function
main