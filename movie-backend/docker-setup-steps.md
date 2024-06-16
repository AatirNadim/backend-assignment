# Steps to setup the application as a docker container

## Step 1: Install Docker

- **Purpose**: Install Docker on your machine.

- **Process**:

  - Download and install Docker from the [official website](https://docs.docker.com/get-docker/).
  - Follow the installation instructions for your operating system.

- **Response**: Docker is installed on your machine.

## Step 2: Create docker network (recommended)

- **Purpose**: Create a docker network for the application.

- **Process**:

  - Run the following command to create a docker network:
    ```bash
    docker network create movie-api-network
    ```

- **Response**: The docker network is created successfully.

## Step 2: Build the Docker Image

- **Purpose**: Build the Docker image for the application.

- **Process**:

  - Open a terminal and navigate to the root directory of the project.
  - Run the following command to build the Docker image:
    ```bash
    docker build -t movie-api .
    ```

- **Response**: The Docker image is built successfully.

## Step 3: Run the Docker Container

- **Purpose**: Run the Docker container for the application.

- **Process**:

  - Run the following command to start the Docker container:
    ```bash
    docker run -it --name backend-instance --network movie-api-network -p 3003:3002 -e server_port=3002 movie_backend
    ```

  Note: The `-e server_port=3002` flag is used to set the server port for the application. You can change the port number as needed.

- **Response**: The application is now running in a Docker container.

## Step 4: Access the Application

- **Purpose**: Access the application in the Docker container.

- **Process**:

  - Open a web browser and go to `http://localhost:3000/api-docs` to view the Swagger API documentation.

- **Response**: You can now interact with the application through the Swagger API documentation.

## Step 5: Stop the Docker Container

- **Purpose**: Stop the Docker container for the application.

- **Process**:

  - Press `Ctrl + C` in the terminal where the Docker container is running.

- **Response**: The Docker container is stopped.

> It is recommended to use the database as a **_separate Docker container_** and link it to the application container, via the same network for better isolation and scalability.
