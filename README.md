# FixMate-Backend
📚 FixMate Projesi Teknik Framing
🎯 Genel Amaç
Araç sahiplerinin sanayi ustalarına hızlı, güvenli, doğru bir şekilde ulaşmasını sağlamak.

Ustaların işlerini dijitalleştirerek, daha fazla müşteriye ulaşmalarını ve işlerini yönetmelerini kolaylaştırmak.

Yapay zeka destekli, ses-görüntü-chat analizli hasar tespit ve usta öneri sistemi kurmak.

📲 Mobil Uygulama - Genel Yapı
Kullanıcı (Araç Sahibi) Modülü
Üyelik/Kayıt & Giriş

Araç Tanımlama & Garaj Yönetimi

Sorun Bildirimi (Ses, Görsel, Metin)

Yapay Zeka Destekli Arıza Analizi

Usta Arama ve Randevu Sistemi

Teklif Al Sistemi

Randevu & Servis Geçmişi Takibi

Önerilen Kampanyalar

Bildirimler

Chatbot Asistanı

Yerinde Hizmet Çağırma (Mobil servis, akü, çekici vb.)

Kullanıcı Profili Yönetimi

Ödeme Sistemi (Planlı - Faz 2'de)

Değerlendirme ve Puanlama

Usta (Servis) Modülü
Üyelik/Kayıt & Onay Süreci

Profil Düzenleme (Alan, Hizmetler, Belgeler, Galeri)

Teklif Verme & Yönetme

Randevu Yönetimi (Onayla/Beklet/Tamamla/İptal)

Müşteri ile Mesajlaşma

Kampanya Oluşturma & Takip

İşlem Geçmişi Raporları

Dinamik Servis Takvimi

AI Destekli Teklif Öneri Modülü

Gelen Tekliflerden Otomatik Seçim (Planlı)

Push Bildirim Sistemi (Yeni iş, mesaj, güncelleme)

🧠 AI Modülleri
Kullanıcı Tarafı
Ses analizi → Arıza türü tahmini

Görüntü analizi → Fiziksel hasar tespiti

Chatbot üzerinden arıza tahmini ve çözüm önerisi

Akıllı usta öneri sistemi (lokasyon + yetenek + geçmiş başarıya göre)

Usta Tarafı
Gelen işlere otomatik teklif önerileri (fiyat, süre tahmini)

Gelen müşteri şikayetinden otomatik "muhtemel çözüm" önerisi

🔥 Backend (Sunucu) Yapısı

Modül	Açıklama
Kullanıcı Yönetimi	JWT Authentication, Şifre yenileme, Email doğrulama
Araç Yönetimi	Çoklu araç desteği, her araç için bakım/geçmiş kayıtları
Usta Yönetimi	Alanlar, belgeler, puanlar, çalıştığı markalar, özel yetenekler
İş Yönetimi	İstekler, teklifler, işlerin durumu, zaman çizelgeleri
Teklif Sistemi	Açık teklif toplama, usta seçimi, kabul-red yönetimi
Randevu Sistemi	Randevu planlama, değişiklik, hatırlatıcı entegrasyonu
Chat & Bildirim	WebSocket veya Firebase Notification altyapısı
Ödeme Yönetimi (Faz 2)	Stripe API, İyzico veya iyzico-light entegrasyonu
Kampanya Yönetimi	Kampanya oluştur, gösterim raporları, hedefleme algoritması
AI Sunucuları	Ses-Görüntü analizi API uç noktaları, arıza teşhis sunucusu
Admin Paneli	Usta onay yönetimi, kullanıcı şikayetleri, sistem raporları
📦 API & Veri Yapıları
Kullanıcı Kayıt
json
Kopyala
Düzenle
{
  "name": "string",
  "surname": "string",
  "email": "string",
  "phone": "string",
  "password": "string"
}
Araç Ekle
json
Kopyala
Düzenle
{
  "brand": "string",
  "model": "string",
  "year": "int",
  "plateNumber": "string"
}
İş Talebi (Teklif Al)
json
Kopyala
Düzenle
{
  "problem_description": "string",
  "photos": ["url1", "url2"],
  "audio": "url",
  "location": {
    "latitude": "float",
    "longitude": "float"
  },
  "budgetRange": "optional"
}
Teklif Cevabı (Usta)
json
Kopyala
Düzenle
{
  "job_id": "string",
  "price": "float",
  "estimated_time": "string",
  "message": "string"
}
📋 Mobil Ekran Listesi

Sayfa	İşlev
Splash Screen	İlk yüklenme animasyonu
Onboarding	Kayıt/giriş yönlendirmeleri
Kullanıcı Kayıt / Giriş	Form validasyonları, doğrulama kodu
Ana Sayfa Kullanıcı	Hızlı işlem kısayolları (Araç ekle, Teklif al, Randevu al)
Arıza Bildir	Ses kaydı, fotoğraf ekleme, chat destek
Usta Arama	Filtreleme (konum, uzmanlık, puan)
Randevu Yönetimi	Aktif ve geçmiş randevular listesi
Servis Geçmişi	Tamamlanan işler, puanlama ekranı
Tekliflerim	Açık ve geçmiş teklifler
Garajım	Araçlarım bölümü
Chatbot Destek	Chat girişi, ses/görsel destekli AI asist
Ayarlar	Kişisel bilgiler, şifre değiştir, destek
Bildirimler	Randevu hatırlatıcı, teklif, kampanya bildirimi
🛠 Önerilen Teknolojiler

Alan	Teknoloji
Backend	Node.js (NestJS tercihen) + PostgreSQL + Redis
Mobil	React Native + Expo veya Flutter
Gerçek Zamanlı İşlemler	WebSocket (Socket.IO) veya Firebase
AI Sunucuları	Python (FastAPI) + Tensorflow/Keras (ses & görsel analiz)
Bildirim Sistemi	Firebase Cloud Messaging
Ödeme Sistemi (Faz 2)	Stripe API / İyzico API
Harita & Konum	Google Maps API / Mapbox
📈 Süreç ve Test Planı
İlk Faz: Kullanıcı - Usta kayıt sistemi, araç ekleme, temel iş yönetimi

İkinci Faz: AI destekli teşhis modülü

Üçüncü Faz: Ödeme sistemleri ve mobil servis çağırma modülü

Dördüncü Faz: Performans optimizasyonları, beta testler, kullanıcı geribildirimleri toplama