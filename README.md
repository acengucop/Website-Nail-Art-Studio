# Nail Art Booking & E-Commerce Platform

Aplikasi web **Nail Art** modern berbasis React (Frontend) dan Django (Backend), lengkap dengan fitur e-commerce, booking appointment, galeri, promo, dan autentikasi JWT.

---

## ✨ Fitur Utama

- **User Authentication**: Register & login dengan JWT.
- **Product Management**: List, promo, badge, stock, detail produk.
- **E-Commerce**: Keranjang, checkout, unggah bukti pembayaran, riwayat order.
- **Booking Appointment**: Pilih layanan, cek slot, booking, upload pembayaran, riwayat booking.
- **Gallery**: Koleksi hasil nail art per kategori.
- **Testimoni**: Review dari pelanggan.
- **Admin Panel**: CRUD produk, promo, galeri, testimoni, booking & verifikasi pembayaran.
- **Mobile Responsive** (via Tailwind CSS).

---

## 📖 Fitur & Endpoint API

### 👤 User
- `POST /api/register/` — Register user baru (pakai nomor HP)
- `POST /api/login/` — Login & dapatkan JWT token

### 🛍️ Produk & Promo
- `GET /api/products/` — Daftar produk
- `GET /api/promo/` — Daftar promo
- `POST /api/products/` — (admin) tambah produk

### 📅 Booking
- `GET /appointments/services/` — Daftar layanan booking
- `GET /appointments/booking/availability/` — Cek slot
- `POST /appointments/booking/create/` — Booking baru
- `GET /appointments/booking/my/` — Daftar booking saya
- `POST /appointments/booking/<id>/verify-payment/` — Verifikasi pembayaran (admin)

### 🌸 Lainnya
- `GET /api/gallery-images/` — Galeri nail art
- `GET /api/testimonials/` — Daftar testimoni

---

## 💻 Stack Teknologi

- **Frontend:** React, Vite, TailwindCSS, React Router
- **Backend:** Django, Django REST Framework, SimpleJWT
- **Database:** SQLite / PostgreSQL (bisa diubah di `settings.py`)
- **Image Handling:** Upload langsung ke backend (produk, galeri, bukti pembayaran)

---

## 🧑‍💻 Kontributor

- **Afyuadri Putra & Bebe Ducky** — Lead Developer

---

## 📄 Lisensi

Proyek ini berada di bawah lisensi [MIT License](LICENSE).

---


---

**Team Imphnen_27**




