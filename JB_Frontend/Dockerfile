FROM node:alpine

# Create the folder "app"
# for the further COPY, RUN and CMD instructions
WORKDIR /app

# Copy the package.json and package-lock.json files to the "app" folder
COPY package*.json ./


# Install the dependencies mentioned in package.json
RUN npm install --legacy-peer-deps


# Copy the local files to the "app" folder
COPY . .


RUN ls


# Expose port 3000 on the host machine to the container for listening to external connections
EXPOSE 3000

# Start the React applications
CMD ["npm", "start"]