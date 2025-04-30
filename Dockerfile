# Temel imaj
FROM node:18

# Çalışma dizini
WORKDIR /app

# Paketleri yükle
COPY package*.json ./
RUN npm install

# Kaynak dosyaları kopyala
COPY . .

# Prisma generate
RUN npx prisma generate

# Uygulama başlat
CMD ["npm", "run", "start"]
