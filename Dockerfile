FROM node:16-alpine 
WORKDIR /app
ADD . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3001