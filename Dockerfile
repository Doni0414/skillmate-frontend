# Используем официальный Node.js образ
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта
COPY . .

# Экспонируем порт 3000 (по умолчанию Next.js dev сервер)
EXPOSE 3000

# Команда для запуска в режиме разработки
CMD ["npm", "run", "dev"]
