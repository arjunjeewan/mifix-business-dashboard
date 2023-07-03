 # stage1
FROM node:lts AS build
#COPY package.json ./
WORKDIR /app
#RUN npm cache clean --force
COPY . .
RUN npm install
#RUN npm audit --production
RUN npm run build

# stage2
FROM nginx:1.17 AS ngi
COPY --from=build /app/build/ /usr/share/nginx/html/
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
