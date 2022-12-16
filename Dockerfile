FROM node:16
WORKDIR /app
ADD . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 3000