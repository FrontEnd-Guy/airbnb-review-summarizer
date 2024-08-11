# Базовый образ Node.js
FROM node:18-alpine

# Установка рабочей директории в контейнере
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci --production && npm cache clean --force

# Копирование исходного кода проекта в контейнер
COPY . ./

# Добавляем неправа пользователя и группу
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Устанавливаем права на рабочую директорию
RUN chown -R appuser:appgroup /app

# Меняем пользователя
USER appuser

# Переменная окружения для порта
ENV PORT=3001

# Открываем порт 3001
EXPOSE $PORT

# Команда для запуска приложения
CMD ["npm", "start"]
