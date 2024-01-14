# Базовый образ Node.js
FROM node:16-alpine

# Установка рабочей директории в контейнере
WORKDIR /app

# Копирование файлов package.json и package-lock.json из папки server
COPY server/package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода проекта в контейнер
COPY server/ ./

# Копирование файла .env в контейнер
COPY server/.env ./

# Переменная окружения для порта
ENV PORT=3001

# Открываем порт 3001
EXPOSE $PORT

# Команда для запуска приложения
CMD ["npm", "start"]
