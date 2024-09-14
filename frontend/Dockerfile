# Use official Node.js image for building the frontend
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build
COPY . .
RUN npm run build

# Use Nginx for serving the frontend in production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that Nginx is running on
EXPOSE 80

# No need for CMD, as nginx automatically runs