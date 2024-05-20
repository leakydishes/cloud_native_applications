# Node.js image
FROM node:14

# Create and cd to app directory
WORKDIR /usr/src/app

# Copy app dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy to a container image
COPY . .

# Run web service on container startup
CMD [ "node", "app.js" ]

# Tell Docker about the port to run on
EXPOSE 3000