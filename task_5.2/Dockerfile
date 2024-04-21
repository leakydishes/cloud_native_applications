# Use the official Node.js 14 image as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the application when the container launches
CMD ["node", "app.js"]