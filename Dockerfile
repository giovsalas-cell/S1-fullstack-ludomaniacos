# Etapa 1 - Node para instalar dependencias
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

# Etapa 2 - Construir la aplicación
COPY . .
RUN npm run build

# Etapa 3 - Nginx para servir la app
FROM nginx:alpine
COPY --from=build /app/dist/app.ludomaniacos/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80