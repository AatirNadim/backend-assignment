# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ARG port=3002

ENV server_port=${port}

# Expose the port that the Nest.js app will be running on
EXPOSE ${server_port}

# Start the Nest.js app
CMD ["npm", "run", "start"]