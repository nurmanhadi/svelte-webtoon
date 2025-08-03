FROM node:21-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Optional: ganti config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001

CMD [ "nginx", "-g", "daemon off;" ]