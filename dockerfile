# PICT.IO

FROM node

RUN npm install pm2 -g

WORKDIR /pictio

# COPY package.json /pictio
COPY . /pictio

RUN npm install

# RUN npm run build-dev
# RUN npm run production

EXPOSE 8080
CMD ["pm2", "start", "index.js", "--no-daemon"]