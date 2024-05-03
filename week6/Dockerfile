# Node.js image (base)
FROM node:16 

# Directory inside container
WORKDIR /usr/src/app

# Copy package.json & package-lock.json to directory
COPY package*.json ./

# Dependencies
RUN npm install

# Copy app code to directory
COPY . .

# Port
EXPOSE 3040

# Command to run the application
CMD ["node", "server_get.js"]
