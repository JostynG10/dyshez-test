# Create an image using alpine as SO and node 18
FROM node:slim

# Assign the working directory to execute the commands
WORKDIR /app

# Install PM2 globally
RUN npm install --global pm2

# Copy the package file.json to the working directory
COPY package.json /app

# Installs all the necessary dependencies for the application
RUN npm install

# Copy the source code to working directory
COPY . /app

# Build the application
RUN npm run build

# Exposes the port
EXPOSE 3000

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]