FROM node:14 AS build

WORKDIR /Client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /Client/dist /usr/share/nginx/html 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
