# Stage 1
# Use the official Node.js latest image as a base
FROM node:latest as node

# Set the working directory
WORKDIR /app

# Copy the entire application directory into the container
COPY . .

# Install dependencies
RUN npm install

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2
# Use the official Nginx Alpine image as a base
FROM nginx:alpine

# Copy the built Angular app from the previous stage into the nginx public directory
COPY --from=node /app/dist/shop /usr/share/nginx/html

# Overwrite the default nginx configuration with our custom configuration
COPY nginx.conf /etc/nginx/nginx.conf
