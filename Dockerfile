FROM node:14.8.0-alpine
#RUN npm install -g npm@6.14.7
WORKDIR .
COPY . .
RUN npm install
EXPOSE 3000
CMD npm run start:prod