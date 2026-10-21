/**
 * CV Online Hasan - Galeri Perjalanan Kegiatan Seharian
 * Masa Kuliah hingga Field Education di Ruangguru
 * Fitur:
 * 1. Filter Ganda: Fase Perjalanan (Semua / Masa Kuliah / Field Education Ruangguru) + Waktu (Pagi / Siang / Sore / Malam)
 * 2. Unggah Foto Bebas (File Picker & Drag-and-Drop)
 * 3. Kompresi Cerdas Otomatis via Canvas (hemat kuota LocalStorage)
 * 4. Pencarian Real-Time (Judul, Lokasi, Deskripsi)
 * 5. Lightbox Penampil Foto Penuh
 * 6. Sinkronisasi Tema Gelap/Terang
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
  =================================================================== */
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  const savedTheme = localStorage.getItem('hasan_cv_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-regular fa-sun';
      themeBtn.setAttribute('title', 'Beralih ke Mode Terang');
    } else {
      themeIcon.className = 'fa-regular fa-moon';
      themeBtn.setAttribute('title', 'Beralih ke Mode Gelap');
    }
    localStorage.setItem('hasan_cv_theme', theme);
  }

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (systemPrefersDark) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan`);
  });


  /* ===================================================================
     2. MOBILE MENU TOGGLE
  =================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navClose = document.getElementById('nav-close');

  if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
  }
  if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
  }


  /* ===================================================================
     3. DATA MODEL & CONTOH DATA (KULIAH & RUANGGURU)
  =================================================================== */
  const STORAGE_KEY = 'hasan_journey_gallery_v2';

  // Contoh data kegiatan seharian Hasan (Masa Kuliah & Field Education di Ruangguru)
  const defaultActivities = [
    // --- KEGIATAN RUANGGURU (FIELD EDUCATION) ---
    {
      id: 'rg-1',
      era: 'ruangguru',
      time: '08:00',
      category: 'pagi',
      title: 'Morning Huddle & Briefing Target Tim Field Education',
      location: 'Kantor Cabang Ruangguru',
      desc: 'Koordinasi pagi bersama Area Leader dan rekan Field Education Ruangguru untuk memetakan rute kunjungan sekolah mitra, kesiapan materi presentasi, dan target sosialisasi harian.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'rg-2',
      era: 'ruangguru',
      time: '10:30',
      category: 'pagi',
      title: 'Sosialisasi Platform Belajar Digital Ruangguru di Sekolah',
      location: 'SMA Negeri Unggulan / Sekolah Mitra',
      desc: 'Mempresentasikan inovasi belajar digital, tips sukses lolos SNBT/UTBK, dan fitur ruangbelajar kepada ratusan siswa di aula sekolah dengan antusiasme yang luar biasa.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'rg-3',
      era: 'ruangguru',
      time: '13:45',
      category: 'siang',
      title: 'Konsultasi Pendidikan Siswa & Solusi Belajar Efektif',
      location: 'Booth Edukasi Ruangguru di Sekolah',
      desc: 'Sesi one-on-one membantu siswa membedah kendala belajar, menganalisis gaya belajar yang cocok, serta merekomendasikan program bimbingan belajar terbaik di Ruangguru.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'rg-4',
      era: 'ruangguru',
      time: '16:15',
      category: 'sore',
      title: 'Diskusi & Edukasi Orang Tua Murid Terkait Pendampingan Belajar',
      location: 'Area Informasi / Komunikasi Lapangan',
      desc: 'Mendampingi wali murid dalam memahami fitur pemantauan belajar anak di aplikasi Ruangguru serta membantu proses administrasi aktivasi paket belajar.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'rg-5',
      era: 'ruangguru',
      time: '19:00',
      category: 'malam',
      title: 'Daily Review & Rekapitulasi Capaian Tim Field Education',
      location: 'Ruangguru Branch Office',
      desc: 'Menutup hari lapangan dengan menyusun laporan aktivitas harian, rekapitulasi data pendaftaran siswa baru, dan evaluasi strategi sosialisasi untuk esok hari.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
    },

    // --- KEGIATAN MASA KULIAH ---
    {
      id: 'kl-1',
      era: 'kuliah',
      time: '07:15',
      category: 'pagi',
      title: 'Kuliah Pagi & Diskusi Teori Komputasi',
      location: 'Gedung Kuliah Bersama Kampus',
      desc: 'Menghadiri sesi kuliah pagi, mencatat materi algoritma dan struktur data, serta berpartisipasi aktif dalam sesi tanya-jawab interaktif bersama dosen pengampu.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'kl-2',
      era: 'kuliah',
      time: '11:00',
      category: 'siang',
      title: 'Praktikum Laboratorium Komputer & Rekayasa Web',
      location: 'Laboratorium Komputer Kampus',
      desc: 'Sesi praktikum hands-on menguji kode frontend dan database, menyelesaikan studi kasus pemrograman bersama asisten lab.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'kl-3',
      era: 'kuliah',
      time: '14:30',
      category: 'siang',
      title: 'Kolaborasi Tugas Kelompok di Perpustakaan',
      location: 'Perpustakaan Pusat Universitas',
      desc: 'Berkumpul bersama tim studi untuk membedah jurnal ilmiah, menyusun laporan proyek kuliah, dan bertukar ide tentang implementasi teknologi.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'kl-4',
      era: 'kuliah',
      time: '16:45',
      category: 'sore',
      title: 'Rapat Koordinasi Divisi Organisasi Mahasiswa',
      location: 'Sekretariat Himpunan Mahasiswa',
      desc: 'Memimpin koordinasi persiapan seminar teknologi nasional, menyusun strategi promosi acara, dan melatih kemampuan kepemimpinan tim.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    }
  ];

  function getStoredActivities() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    // Jika belum ada, gunakan data default
    saveActivities(defaultActivities);
    return defaultActivities;
  }

  function saveActivities(activities) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch (e) {
      console.error('Error saving to localStorage', e);
      showToast('Penyimpanan lokal penuh. Coba hapus sebagian foto.');
    }
  }


  /* ===================================================================
     4. RENDER GALERI & STATISTIK
  =================================================================== */
  const galleryGrid = document.getElementById('gallery-grid');
  const emptyState = document.getElementById('empty-state');
  const emptyStateDesc = document.getElementById('empty-state-desc');
  const totalPhotosCount = document.getElementById('total-photos-count');
  const kuliahPhotosCount = document.getElementById('kuliah-photos-count');
  const ruangguruPhotosCount = document.getElementById('ruangguru-photos-count');

  let currentEraFilter = 'all';  // 'all', 'kuliah', 'ruangguru'
  let currentTimeFilter = 'all'; // 'all', 'pagi', 'siang', 'sore', 'malam'
  let searchQuery = '';

  function renderGallery() {
    const activities = getStoredActivities();

    // Update Statistik
    const totalCount = activities.length;
    const kuliahCount = activities.filter(a => a.era === 'kuliah').length;
    const ruangguruCount = activities.filter(a => a.era === 'ruangguru').length;

    if (totalPhotosCount) totalPhotosCount.textContent = totalCount;
    if (kuliahPhotosCount) kuliahPhotosCount.textContent = kuliahCount;
    if (ruangguruPhotosCount) ruangguruPhotosCount.textContent = ruangguruCount;

    // Filter berdasarkan Era Perjalanan
    let filtered = activities.filter(act => {
      if (currentEraFilter === 'all') return true;
      return act.era === currentEraFilter;
    });

    // Filter berdasarkan Kategori Jam/Waktu
    filtered = filtered.filter(act => {
      if (currentTimeFilter === 'all') return true;
      return act.category === currentTimeFilter;
    });

    // Filter berdasarkan Teks Pencarian
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(act => {
        return (
          act.title.toLowerCase().includes(q) ||
          (act.desc && act.desc.toLowerCase().includes(q)) ||
          (act.location && act.location.toLowerCase().includes(q)) ||
          act.time.includes(q)
        );
      });
    }

    galleryGrid.innerHTML = '';

    if (filtered.length === 0) {
      galleryGrid.style.display = 'none';
      emptyState.style.display = 'block';

      if (searchQuery.trim() !== '') {
        emptyStateDesc.textContent = `Tidak ditemukan kegiatan yang sesuai dengan pencarian "${searchQuery}".`;
      } else {
        emptyStateDesc.textContent = 'Belum ada foto kegiatan pada kombinasi filter ini. Klik tombol di bawah untuk menambah foto baru!';
      }
      return;
    }

    galleryGrid.style.display = 'grid';
    emptyState.style.display = 'none';

    filtered.forEach(act => {
      const card = createActivityCard(act);
      galleryGrid.appendChild(card);
    });
  }

  function getCategoryLabel(category) {
    switch(category) {
      case 'pagi': return { label: '🌅 Pagi', class: 'pagi' };
      case 'siang': return { label: '☀️ Siang', class: 'siang' };
      case 'sore': return { label: '🌇 Sore', class: 'sore' };
      case 'malam': return { label: '🌙 Malam', class: 'malam' };
      default: return { label: 'Kegiatan', class: 'pagi' };
    }
  }

  function getEraLabel(era) {
    if (era === 'ruangguru') {
      return { label: 'Field Education Ruangguru', icon: 'fa-chalkboard-user', class: 'ruangguru' };
    }
    return { label: 'Masa Kuliah', icon: 'fa-graduation-cap', class: 'kuliah' };
  }

  function createActivityCard(act) {
    const card = document.createElement('div');
    card.className = `card activity-card era-${act.era}`;
    card.setAttribute('data-id', act.id);

    const catInfo = getCategoryLabel(act.category);
    const eraInfo = getEraLabel(act.era);

    card.innerHTML = `
      <div class="activity-img-wrapper" title="Klik untuk memperbesar foto">
        <img src="${escapeHtml(act.image)}" alt="${escapeHtml(act.title)}" class="activity-img" loading="lazy">
        
        <span class="era-chip-top ${eraInfo.class}">
          <i class="fa-solid ${eraInfo.icon}"></i> ${eraInfo.label}
        </span>

        <span class="time-chip">
          <i class="fa-regular fa-clock"></i> ${escapeHtml(act.time)} WIB
        </span>

        <button class="btn-card-delete" title="Hapus foto kegiatan ini" aria-label="Hapus kegiatan">
          <i class="fa-solid fa-trash-can"></i>
        </button>

        <span class="view-full-badge">
          <i class="fa-solid fa-expand"></i> Perbesar
        </span>
      </div>
      
      <div class="activity-body">
        <div class="activity-meta">
          <span class="category-tag ${catInfo.class}">${catInfo.label}</span>
          ${act.location ? `<span class="activity-location" title="${escapeHtml(act.location)}"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(act.location)}</span>` : ''}
        </div>
        <h3 class="activity-title">${escapeHtml(act.title)}</h3>
        <p class="activity-desc">${escapeHtml(act.desc || 'Tidak ada deskripsi.')}</p>
        <div class="activity-footer">
          <button class="btn-view-detail" type="button">
            <span>Lihat Detail Lengkap</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    // Event listener buka lightbox saat gambar atau tombol detail diklik
    const imgWrapper = card.querySelector('.activity-img-wrapper');
    const btnDetail = card.querySelector('.btn-view-detail');
    const deleteBtn = card.querySelector('.btn-card-delete');

    const openDetails = () => openLightbox(act);
    imgWrapper.addEventListener('click', (e) => {
      if (e.target.closest('.btn-card-delete')) return;
      openDetails();
    });
    btnDetail.addEventListener('click', openDetails);

    // Event listener hapus
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteActivity(act.id, act.title);
    });

    return card;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }


  /* ===================================================================
     5. FILTERING & SEARCH CONTROLS
  =================================================================== */
  // Era Filters
  const eraBtns = document.querySelectorAll('.era-btn');
  eraBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eraBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentEraFilter = btn.getAttribute('data-era');
      renderGallery();
    });
  });

  // Time Pills
  const timeBtns = document.querySelectorAll('.time-btn');
  timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTimeFilter = btn.getAttribute('data-time');
      renderGallery();
    });
  });

  // Search input
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery.trim().length > 0) {
      clearSearchBtn.style.display = 'flex';
    } else {
      clearSearchBtn.style.display = 'none';
    }
    renderGallery();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    searchInput.focus();
    renderGallery();
  });


  /* ===================================================================
     6. UPLOAD MODAL & FILE HANDLING (DRAG & DROP + CANVAS COMPRESS)
  =================================================================== */
  const uploadModal = document.getElementById('upload-modal');
  const btnOpenModalNav = document.getElementById('btn-open-modal-nav');
  const btnOpenModalHero = document.getElementById('btn-open-modal-hero');
  const btnEmptyAdd = document.getElementById('btn-empty-add');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const btnCancelModal = document.getElementById('btn-cancel-modal');

  const activityForm = document.getElementById('activity-form');
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const btnBrowseFile = document.getElementById('btn-browse-file');
  const dropPrompt = document.getElementById('drop-prompt');
  const dropPreview = document.getElementById('drop-preview');
  const previewImg = document.getElementById('preview-img');
  const btnChangePhoto = document.getElementById('btn-change-photo');

  let currentImageDataUrl = '';

  function openUploadModal() {
    uploadModal.classList.add('active');
    uploadModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeUploadModal() {
    uploadModal.classList.remove('active');
    uploadModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    resetForm();
  }

  function resetForm() {
    activityForm.reset();
    currentImageDataUrl = '';
    dropPrompt.style.display = 'flex';
    dropPreview.style.display = 'none';
    previewImg.src = '';
  }

  if (btnOpenModalNav) btnOpenModalNav.addEventListener('click', openUploadModal);
  if (btnOpenModalHero) btnOpenModalHero.addEventListener('click', openUploadModal);
  if (btnEmptyAdd) btnEmptyAdd.addEventListener('click', openUploadModal);

  modalCloseBtn.addEventListener('click', closeUploadModal);
  btnCancelModal.addEventListener('click', closeUploadModal);

  uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) closeUploadModal();
  });

  // Browse file button trigger
  btnBrowseFile.addEventListener('click', () => fileInput.click());
  btnChangePhoto.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('click', (e) => {
    if (!currentImageDataUrl && !e.target.closest('button')) {
      fileInput.click();
    }
  });

  // Drag and drop events
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files.length > 0) {
      handleImageFile(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageFile(e.target.files[0]);
    }
  });

  // Membaca dan mengompres foto via Canvas agar ringan dan cepat dimuat
  function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
      showToast('Harap pilih berkas gambar yang valid (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        currentImageDataUrl = compressedDataUrl;

        previewImg.src = compressedDataUrl;
        dropPrompt.style.display = 'none';
        dropPreview.style.display = 'block';
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Submit form penambahan foto kegiatan baru
  activityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!currentImageDataUrl) {
      showToast('Silakan pilih foto kegiatan terlebih dahulu.');
      return;
    }

    const selectedEra = document.querySelector('input[name="form-era"]:checked').value || 'ruangguru';
    const time = document.getElementById('activity-time').value || '09:00';
    const category = document.getElementById('activity-category').value;
    const title = document.getElementById('activity-title').value.trim();
    const location = document.getElementById('activity-location').value.trim();
    const desc = document.getElementById('activity-desc').value.trim();

    const newActivity = {
      id: 'act-' + Date.now(),
      era: selectedEra,
      time: time,
      category: category,
      title: title,
      location: location,
      desc: desc,
      image: currentImageDataUrl,
      createdAt: new Date().toISOString()
    };

    const activities = getStoredActivities();
    activities.unshift(newActivity);
    saveActivities(activities);

    closeUploadModal();
    renderGallery();
    showToast('Foto kegiatan baru berhasil ditambahkan!');
  });


  /* ===================================================================
     7. HAPUS & RESET DATA
  =================================================================== */
  function deleteActivity(id, title) {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus dokumentasi "${title}"?`);
    if (!confirmDelete) return;

    let activities = getStoredActivities();
    activities = activities.filter(act => act.id !== id);
    saveActivities(activities);
    renderGallery();
    showToast('Dokumentasi berhasil dihapus.');
  }

  const btnResetData = document.getElementById('btn-reset-data');
  if (btnResetData) {
    btnResetData.addEventListener('click', () => {
      const confirmReset = window.confirm('Kembalikan galeri ke contoh bawaan (Masa Kuliah & Ruangguru)?');
      if (confirmReset) {
        saveActivities(defaultActivities);
        renderGallery();
        showToast('Galeri dikembalikan ke contoh bawaan.');
      }
    });
  }


  /* ===================================================================
     8. LIGHTBOX MODAL (TAMPILAN PENUH)
  =================================================================== */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxEra = document.getElementById('lightbox-era');
  const lightboxTime = document.getElementById('lightbox-time');
  const lightboxLocation = document.getElementById('lightbox-location');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(act) {
    const eraInfo = getEraLabel(act.era);

    lightboxImg.src = act.image;
    lightboxImg.alt = act.title;

    lightboxEra.className = `lightbox-era-badge ${eraInfo.class}`;
    lightboxEra.innerHTML = `<i class="fa-solid ${eraInfo.icon}"></i> ${eraInfo.label}`;

    lightboxTime.textContent = `${act.time} WIB (${act.category.toUpperCase()})`;
    
    if (act.location) {
      lightboxLocation.style.display = 'inline-flex';
      lightboxLocation.querySelector('span').textContent = act.location;
    } else {
      lightboxLocation.style.display = 'none';
    }

    lightboxTitle.textContent = act.title;
    lightboxDesc.textContent = act.desc || 'Tidak ada deskripsi.';

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal.classList.contains('active')) closeLightbox();
      if (uploadModal.classList.contains('active')) closeUploadModal();
    }
  });


  /* ===================================================================
     9. TOAST NOTIFICATION
  =================================================================== */
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Render awal
  renderGallery();

});
