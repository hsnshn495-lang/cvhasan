# Website Portfolio & Galeri Perjalanan Karier - Hasan

Website personal & profesional modern, elegan, responsif, dan siap digunakan untuk **Hasan (Field Education di Ruangguru)**. Dibangun menggunakan teknologi web standar **HTML5**, **CSS3**, dan **JavaScript** murni tanpa ketergantungan framework yang rumit.

---

## 🌟 Fitur & Halaman Utama

### 1. Halaman Utama CV (`index.html`)
- **Profil Profesional**: Menampilkan identitas Hasan sebagai **Field Education di Ruangguru**.
- **Biodata Diri**: Rincian profil lengkap (Nama, Tanggal Lahir, Domisili, Kontak, Bahasa, dll.) serta ringkasan tentang diri.
- **Background Pendidikan**: Timeline vertikal interaktif yang merangkum pendidikan formal (S1, SMA/SMK) hingga sertifikasi keahlian.
- **Pengalaman Kerja & Organisasi**:
  - Rekam jejak karier utama sebagai **Field Education Specialist di Ruangguru (PT Ruang Raya Indonesia)**.
  - Pengalaman magang dan kepemimpinan organisasi kampus.
  - **Filter Tab Interaktif** (Semua, Pengalaman Kerja, Pengalaman Organisasi).
- **Keahlian (Skills)**: Hard skills teknis dan soft skills interpersonal (Public Speaking, Educational Consulting, School Partnership, Problem Solving, dll.).
- **Kontak & Interaksi**: Kartu kontak instan dengan fitur **Salin Otomatis ke Clipboard** (Email & WhatsApp).
- **Cetak CV ke PDF (`window.print`)**: Tombol cetak dengan format CSS print khusus agar rapi disimpan ke dokumen PDF.

### 2. Halaman Galeri Perjalanan Kegiatan Seharian (`galeri.html`)
Menyajikan dokumentasi visual perjalanan harian Hasan **sejak masa kuliah hingga saat ini bekerja sebagai Field Education di Ruangguru**:
- 🎓 **Fase Masa Kuliah**: Kuliah pagi, praktikum lab komputer, nugas kelompok di perpustakaan, hingga rapat organisasi mahasiswa.
- 🚀 **Fase Field Education Ruangguru**: Morning briefing harian, sosialisasi ke sekolah-sekolah mitra, konsultasi pendidikan siswa & orang tua, aktivasi akun belajar, dan evaluasi laporan lapangan.
- 📸 **Bebas Input Foto**: Anda dapat mengunggah foto apa saja dari komputer atau HP (bisa klik telusuri atau *drag-and-drop*).
- 🗂️ **Pilihan Fase**: Saat mengunggah foto, Anda dapat memilih apakah kegiatan tersebut masuk ke kategori **Field Education Ruangguru** atau **Masa Kuliah**.
- ⚡ **Kompresi Cerdas Otomatis**: Foto yang diunggah dikompresi otomatis via HTML5 Canvas agar ringan dan tidak membebani memori browser.
- 💾 **Tersimpan Otomatis**: Semua foto tersimpan di `localStorage` peramban Anda secara persisten.
- 🌅 **Filter Waktu & Fase**: 
  - Filter Fase: *Semua Fase*, *Masa Kuliah*, *Field Education Ruangguru*.
  - Filter Jam: *Semua Waktu*, *Pagi*, *Siang*, *Sore*, *Malam*.
- 🔍 **Pencarian Real-Time**: Cari kegiatan berdasarkan judul, lokasi sekolah/kampus, atau materi.
- 🔍 **Lightbox Penampil Foto**: Klik pada gambar untuk melihat foto resolusi penuh dengan badge fase perjalanan dan detail cerita.
- 🗑️ **Manajemen & Reset**: Anda bisa menghapus foto kegiatan sewaktu-waktu atau mengembalikan ke contoh bawaan dengan tombol "Reset Contoh".

---

## 📂 Struktur File

```text
Hasan/
├── index.html       # Halaman utama CV profesional (Field Education Ruangguru)
├── style.css        # Styling tema, tipografi, grid responsif, dan dark/light mode
├── script.js        # Logika interaktif CV (Theme, filter, print, copy clipboard)
├── galeri.html      # Galeri perjalanan kegiatan: Masa Kuliah s/d Field Education Ruangguru
├── galeri.css       # Styling galeri, era tags (Ruangguru cyan & Kuliah indigo), modal, lightbox
├── galeri.js        # Logika galeri (Upload foto bebas, filter era & waktu, kompresi canvas)
└── README.md        # Dokumentasi dan panduan penggunaan
```

---

## 🚀 Cara Menjalankan

1. **Buka Langsung di Browser**:
   - Klik ganda (double-click) [index.html](file:///c:/Users/User/WPSDrive/Hasan/index.html) untuk melihat CV.
   - Klik ganda [galeri.html](file:///c:/Users/User/WPSDrive/Hasan/galeri.html) untuk melihat Galeri Perjalanan Kegiatan Seharian.
   - Berpindah antar-halaman secara instan melalui menu navigasi di bagian atas.

---

## 📸 Cara Menambahkan Foto Baru di Galeri

1. Buka halaman [galeri.html](file:///c:/Users/User/WPSDrive/Hasan/galeri.html).
2. Klik tombol **"+ Tambah Foto"** di pojok kanan atas atau tombol **"Tambah Foto Kegiatan"** di banner.
3. Pilih Fase Perjalanan: **Field Education Ruangguru** atau **Masa Perkuliahan**.
4. Pilih foto dari perangkat atau seret foto ke dalam area kotak unggah.
5. Tentukan jam kegiatan, kategori waktu (Pagi/Siang/Sore/Malam), judul kegiatan, lokasi (sekolah/kantor/kampus), serta deskripsi.
6. Klik **"Simpan Dokumentasi"**. Foto akan langsung muncul di galeri dan tersimpan di browser Anda!
