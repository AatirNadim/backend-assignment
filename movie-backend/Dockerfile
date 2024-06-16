# Base image
FROM node:20

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install -f

# Bundle app source
COPY . .

# Copy the .env and .env.development files
# COPY .env .env.development ./

# # Creates a "dist" folder with the production build
# RUN npm run 

ENV server_port=3002

# Expose the port on which the app will run
EXPOSE ${server_port}

# Start the server using the production build
CMD ["npm", "run", "start"]