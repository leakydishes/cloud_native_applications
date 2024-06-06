FROM node:lts-buster AS development

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . /usr/src/app

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
