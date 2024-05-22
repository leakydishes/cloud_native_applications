# image alphine version which is small and fast 
FROM node:alpine

# Cd to app directory
# Copy app dependency manifests to the container image
WORKDIR /usr/src/app
COPY package*.json ./ 

# Install dependencies
# Copy to a container image
RUN npm install
COPY . .

# Docker run port
# Run Web service on container startup
EXPOSE 8080
CMD [ "npm", "index" ]
