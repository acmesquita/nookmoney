FROM node:16

WORKDIR /app

RUN apt install -y debian-openssl-1.1.1-dev

RUN npm install -g prisma
COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "db:migrate:dev"]
CMD ["npm", "run", "dev"]