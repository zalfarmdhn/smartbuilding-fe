# Stage 1: Build frontend
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: NGINX serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 1313

CMD ["nginx", "-g", "daemon off;"]

