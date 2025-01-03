# Build Stage
FROM node:alpine3.18 AS build

# Declare build-time environment variables
ARG REACT_APP_NODE_ENV
ARG REACT_APP_SERVER_BASE_URL

# Set default values for environment variables
ENV REACT_APP_NODE_ENV=$REACT_APP_NODE_ENV 
ENV REACT_APP_SERVER_BASE_URL=$REACT_APP_SERVER_BASE_URL

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the app (for front-end apps like React, Angular, etc.)
RUN npm run build

# Production Stage (Nginx to serve the static files)
FROM nginx:1.23-alpine

# Set the working directory to the Nginx HTML folder
WORKDIR /usr/share/nginx/html

# Remove the default Nginx content
RUN rm -rf *

# Copy the build files from the build stage into the Nginx directory
COPY --from=build /app/build .

# Expose port 80 for the web server
EXPOSE 80

# Set the entrypoint to start Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
