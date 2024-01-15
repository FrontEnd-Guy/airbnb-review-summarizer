# Базовый образ Node.js для сборки приложения
FROM node:16-alpine as build

# Установка рабочей директории
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода приложения
COPY . ./

# Сборка приложения
RUN npm run build

# Использование Nginx для раздачи статических файлов
FROM nginx:alpine

# Копирование собранных файлов из /app/build в /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html

# Копируем файл конфигурации Nginx в контейнер
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
