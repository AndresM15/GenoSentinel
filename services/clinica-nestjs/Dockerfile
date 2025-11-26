# Specify the image to build the container.
# This image is NodeJS based.
# More images at: https://hub.docker.com/_/node
# Change <version> with a nodejs valid version
# Use SemVer format: https://semver.org/
FROM node:20.18.2 AS build

# Set as main working directory
WORKDIR /app

# Install copyfiles globally
RUN npm install -g copyfiles

# Copy the package.json file to the container and
# Install the dependencies
COPY package.json ./
RUN npm install

# Copy the source code to the container
COPY . .

# Build the app
RUN npm run build

# Specify the image to build the second stage.
FROM node:20.18.2-alpine AS production

# Set as main working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist/* .

# Install the dependencies (Just production)
RUN npm install --omit=dev
RUN npm install -g pm2

# Expose the port that the app will use
# Change <port> with the port that the app will use
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]