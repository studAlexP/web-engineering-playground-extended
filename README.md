# Docker Setup Instruction

## Local development setup

1. Navigate to the project directory
2. Run the following command
```
docker compose --env-file .env.dev -f docker-compose.yml up --build  
```
3. This will:
    + Build the Docker images as specified in docker-compose.yml.
    + Use the environment variables from .env.dev.
    + Start the containers for your development environment.

4. Once the setup is complete, your application should be accessible at [http://localhost:5173](http:localhost:5173)

## Production Setup

1. Navigate to the project directory
2. Run the following command
```
docker compose --env-file .env.prod -f docker-compose.prod.yml up --build 
```

3. This will:
    + Build the Docker images as specified in docker-compose.yml.
    + Use the environment variables from .env.prod.
    + Start the containers for your development environment.

4. Once the setup is complete, your application should be accessible at [http://localhost](http:localhost)