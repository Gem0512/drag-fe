FROM node:16
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]