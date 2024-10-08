# PICT.IO

FROM node:15.11.0

RUN npm install pm2 -g

WORKDIR /pictio

COPY . .

RUN npm install
RUN npm run production

EXPOSE 3000
CMD ["pm2", "start", "index.js", "--no-daemon"]
