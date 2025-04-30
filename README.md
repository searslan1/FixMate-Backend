<<<<<<< HEAD
# 🚘 FixMate Backend

AI destekli mobil oto servis platformu:  
Araç sahiplerini sanayi ustaları ve mobil teknisyenlerle buluşturan, yapay zeka ile güçlendirilmiş modern bir oto servis ağı.

## 🎯 Temel Özellikler

- 🔐 JWT tabanlı kimlik doğrulama (CUSTOMER / MECHANIC)
- 🚘 Araç yönetimi (çoklu araç desteği)
- 🧰 Hizmet talebi oluşturma (ses/fotoğraf destekli, AI analizli)
- 💬 Gerçek zamanlı mesajlaşma (WebSocket)
- 🔔 Bildirim sistemi (veritabanı + canlı WS bildirimi)
- 📅 Randevu ve teklif yönetimi
- ⭐ Hizmet sonrası puanlama ve yorum
- 📊 Rol bazlı işlem akışı ve kontrol
- 🐳 Docker + PostgreSQL + Prisma tabanlı kurulum

---

## 🧱 Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Backend | Node.js, TypeScript, Express |
| DB | PostgreSQL + Prisma ORM |
| Auth | JWT |
| Realtime | WebSocket (ws) |
| Validation | Zod |
| Containerization | Docker + Docker Compose |
| API Docs | Swagger (OpenAPI) |
| DevOps | `.env`, `logger`, `upload`, `middlewares`, `utils` |

---


2. Docker ile Başlat
docker-compose up --build🔌 

API Endpoint Örnekleri
Auth
POST /api/auth/register

POST /api/auth/login

Araçlar
GET /api/vehicles

POST /api/vehicles

İş Talebi
POST /api/service-requests

GET /api/service-requests

Teklif
POST /api/offers

GET /api/offers/my

Randevu
POST /api/appointments

GET /api/appointments/me

Chat
GET /api/chats/:userId

WebSocket üzerinden canlı mesajlaşma

Bildirim
GET /api/notifications

PATCH /api/notifications/:id/read

🔧 Geliştirici Klasör Yapısı

src/
├── config          # DB, Redis, env ayarları
├── modules         # Her özellik için modüler yapılar
├── middlewares     # Auth, error handler, validate
├── utils           # jwt, logger, upload yardımcıları
├── websocket       # Gerçek zamanlı socket sunucusu
├── prisma          # DB şeması ve migration dosyaları
├── docs            # Swagger API dökümanı
├── server.ts       # Express ve WebSocket entry point


🧪 Test ve Debug
Postman koleksiyonu önerilir

JWT token gerektiren tüm rotalarda Authorization: Bearer <token>

WebSocket testleri için Hoppscotch veya wscat CLI önerilir
İlk çalıştırmada veritabanı tabloları için:

docker exec -it <backend_container_name> sh
npx prisma migrate dev --name init
