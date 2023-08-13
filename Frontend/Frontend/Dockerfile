# Use the Node.js base image with a specific version
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json) to the working directory
COPY package.json package-lock.json ./

# Install app dependencies
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install v14.17
#RUN ~/.nvm/nvm.sh install v14.17
RUN npm install npm --global

#RUN yarn install --frozen-lockfile

# Copy the entire app directory to the working directory
COPY . .

# Expose the default port used by React Native
EXPOSE 19006

# Set the command to start the React Native app
CMD ["npm", "run", "web"]
