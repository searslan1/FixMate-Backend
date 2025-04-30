🔥 FixMate Projesi – Teknik Framing Seviye 2 (Genişletilmiş, Yaratıcı ve Dayanıklı)
🎯 Ana Amaç (Güncellenmiş)
Sadece araç tamiri değil, yerinde bakım, proaktif servis, güvenli ustalık ağı oluşturmak.

Türkiye'den başlayıp, Orta Doğu ve Avrupa pazarına açılacak modüler bir platform inşa etmek.

📦 Temel Modüller (Yeni + Gelişmiş)
1. Acil Müdahale (MVP)
Mobil usta → Hızlı müdahale

SLA süreleri → Kabul-ulaşım takibi

ETA + Navigasyon

İşlem tamamlama ve anında değerlendirme

2. Teklif Al Sistemi
Normal randevu iş akışı

Çoklu teklif al → karşılaştır → seç

Teklif süresi → otomatik kapanma

3. Şikayet ve İtiraz Sistemi (Yeni)
Kullanıcıdan şikayet oluştur

Ustanın savunma hakkı

Admin moderasyonu

Tekrarlayan şikayet → usta askıya alma

4. Sigorta / Garanti Modülü (Yeni)
“FixMate Koruma” opsiyonu

küçük ücret → iş başı teminat

AI destekli otomatik hasar raporu entegrasyonu

Sigorta API bağlantısı (örneğin HDI Sigorta gibi firmalarla anlaşma)

5. Dinamik Fiyatlama (Yeni)
Gece/acil gün saatleri için otomatik ek ücret

Yoğun saatlerde dinamik talep-pricing

Özel günlerde (% artırımlı) çalışma

6. Sadakat ve Ödül Sistemi (Yeni)
Arkadaş davet kodu sistemi

Sadakat puan biriktirme

İndirim kuponları ve cashback opsiyonları

7. Usta Belge Doğrulama ve Skorlama
Belgeleri yükleme + doğrulama API’si (örneğin Mernis, SRC belgeleri gibi entegrasyonlar)

Usta Başarı Skoru → işlere erişim önceliği sağlar

8. Yoğunluk Yönetimi & Bekleme Listesi (Yeni)
Konum bazlı yoğunluk analizi

Bekleme listesi sistemi

Bölgesel usta çağrısı ve yönlendirme

"Yoğunluk primleri" ile teşvik sistemi

9. API Servis Katmanı (B2B Gelecek Hazırlığı)
Oto kiralama, filo yönetimi, sigorta firmalarına özel API servisi

İş teklifleri, geçmiş işlemler, hızlı müdahale API erişimi

10. Admin Panel Gelişimi
Usta davranış izleme (iptaller, geç kalmalar, şikayet sayısı)

Bölgesel performans analizleri (örneğin: Ankara Çankaya bölgesinde 20% randevu iptali var → alarm)

Kampanya başarı raporları

Hızlı usta askıya alma ve reaktivasyon modülü

🚀 Faz Planı ve Gelişim Haritası (Yaratıcı + Gerçekçi)

Faz	İçerik
Faz 1	MVP: Acil Müdahale + Teklif Al
Faz 2	Ödeme Sistemi + Sadakat Modülü + Performans Skoru
Faz 3	Proaktif Bakım Önerileri + AI Skorlama + Garanti/Sigorta Eklentisi
Faz 4	B2B API Servisleri (filo, sigorta, kurumsal)
Faz 5	Ulusal Sertifikalı Usta Ağı + Bölge Temsilcilikleri
Faz 6	Yurt Dışı Açılımı: Almanya, Birleşik Arap Emirlikleri, Polonya ilk hedef ülkeler

📦 FixMate İçin Full Veritabanı Tabloları ve Yapısı
🧑 Kullanıcı Yönetimi

Tablo	Açıklama
users	Tüm kullanıcılar (araç sahibi + usta)
user_profiles	Kullanıcı detayları (adres, iletişim, doğum tarihi vs.)
user_devices	Kullanıcının mobil cihazları (push notification tokenları)
user_roles	Kullanıcı rolleri (customer, mechanic, admin)
🚗 Araç Yönetimi

Tablo	Açıklama
vehicles	Kullanıcının tanımlı araçları
vehicle_service_records	Araçların geçmiş servis ve bakım kayıtları
vehicle_maintenance_suggestions	AI tarafından üretilen bakım tavsiyeleri (faz 3)
🛠️ Usta (Servis Sağlayıcı) Yönetimi

Tablo	Açıklama
mechanic_profiles	Usta profilleri (uzmanlık alanı, çalışma lokasyonu vs.)
mechanic_certificates	Yüklenen belgeler ve sertifikalar
mechanic_equipment	Sahip olunan ekipman listesi
mechanic_performance	Performans skorları (hız, iptal oranı, müşteri memnuniyeti)
mechanic_campaigns	Ustanın oluşturduğu kampanyalar
mechanic_wallets	Ustanın ödeme bakiyesi ve geçmiş ödemeleri
📝 İş Talep ve Teklif Yönetimi

Tablo	Açıklama
service_requests	Kullanıcıdan gelen iş talepleri
service_request_media	Ses kaydı, fotoğraf gibi yüklenen medya
offers	Ustaların iş taleplerine verdiği teklifler
accepted_offers	Kullanıcının seçtiği teklif kaydı
appointments	Planlı randevu ve zamanlanmış işler
emergency_requests	Acil müdahale çağrıları
interventions	Acil müdahale sonrası iş kayıtları
💬 İletişim ve Bildirim

Tablo	Açıklama
chats	Müşteri ve usta canlı mesajlaşmaları
chat_media	Mesajlarda gönderilen medya dosyaları
notifications	Push/email sistem bildirimleri
notification_templates	Sistem bildirim şablonları (örn: teklif geldi bildirimi)
💳 Ödeme ve Finansal Yönetim

Tablo	Açıklama
payments	Ödeme işlemleri (Stripe/İyzico transaction kayıtları)
payment_methods	Kayıtlı kartlar ve ödeme bilgileri
commissions	Platform komisyon hesaplamaları
refunds	İade ve iptal ödemeleri
⭐ Değerlendirme ve Şikayet Yönetimi

Tablo	Açıklama
reviews	Hizmet sonrası puanlamalar ve yorumlar
review_criteria	Alt değerlendirme kriterleri (hız, iletişim, memnuniyet)
complaints	Yapılan şikayetler
complaint_responses	Usta veya admin cevabı
complaint_status_history	Şikayet süreci logu
🔒 Güvenlik ve Loglama

Tablo	Açıklama
audit_logs	Kullanıcı ve admin hareket logları
login_attempts	Başarılı/başarısız giriş denemeleri
password_reset_tokens	Şifre sıfırlama işlemleri için tokenlar
🧠 AI Modülleri Yönetimi (İleri Fazlar)

Tablo	Açıklama
ai_sound_analysis	Ses analizi sonuçları (arıza tahmini + güven skoru)
ai_image_analysis	Görüntü analizi sonuçları
ai_recommendations	AI tabanlı usta ve teklif önerileri
proactive_maintenance_alerts	AI ile üretilen bakım uyarıları