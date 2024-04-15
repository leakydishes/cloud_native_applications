# Base image Node.js
FROM node:16

# Working directory (in container)
WORKDIR /usr/src/app

# Copy package.json & package-lock.json to WORKDIR
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of app code to WORKDIR
COPY . .

# Expose port app runs on
EXPOSE 3040

# Run app
CMD ["node", "server_get.js"]
