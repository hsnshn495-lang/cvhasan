/**
 * CV Online - Hasan
 * JavaScript Interaktivitas:
 * 1. Dark & Light Theme Switcher (disimpan di LocalStorage)
 * 2. Mobile Responsive Navigation
 * 3. ScrollSpy (Active Navigation Link on Scroll)
 * 4. Filter Pengalaman (Semua / Kerja / Organisasi)
 * 5. Cetak CV (window.print)
 * 6. Copy to Clipboard dengan Toast Notification
 * 7. Tombol Scroll to Top
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
  =================================================================== */
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // Cek preferensi yang tersimpan atau sistem pengguna
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
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  // Tutup menu saat salah satu link diklik
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  });


  /* ===================================================================
     3. SCROLL SPY (ACTIVE NAV LINK & HEADER SHADOW)
  =================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header border / blur effect
    if (scrollY > 50) {
      header.style.boxShadow = 'var(--shadow-sm)';
    } else {
      header.style.boxShadow = 'none';
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
      }
    }

    // Active navigation indicator
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (targetNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initial check


  /* ===================================================================
     4. FILTER PENGALAMAN KERJA & ORGANISASI
  =================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const expCards = document.querySelectorAll('.experience-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      expCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ===================================================================
     5. CETAK / UNDUH CV (PRINT TO PDF)
  =================================================================== */
  const btnPrint = document.getElementById('btn-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }


  /* ===================================================================
     6. COPY TO CLIPBOARD & TOAST NOTIFICATION
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
    }, 2800);
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'hasan.email@example.com';
      copyToClipboard(email, 'Email berhasil disalin ke clipboard!');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = '+62 812-3456-7890';
      copyToClipboard(phone, 'Nomor kontak berhasil disalin ke clipboard!');
    });
  }

  function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMessage))
        .catch(() => fallbackCopy(text, successMessage));
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage);
    } catch (err) {
      showToast('Gagal menyalin teks');
    }
    document.body.removeChild(textArea);
  }

});

