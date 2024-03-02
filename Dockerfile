bashCopy code
FROM node:16.8.0
WORKDIR /app
COPY . /app
RUN npm install
ENV PORT 8080
EXPOSE 8080
CMD ["npm", "start"]