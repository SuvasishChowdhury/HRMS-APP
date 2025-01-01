# Stage 1: Build Stage
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally and project dependencies
RUN npm install -g @angular/cli@17.3.10 && npm install

# Copy all files to the working directory
COPY . .

# Build the Angular project
RUN ng build --configuration production

# Stage 2: Serve Stage
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist/hrapp/browser /usr/share/nginx/html

# Copy a custom Nginx configuration file if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
