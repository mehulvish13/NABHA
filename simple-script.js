// ===== SIMPLE NABHA LEARNING PLATFORM =====

class NabhaApp {
  constructor() {
    this.currentPage = 'home';
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
    console.log('✅ Nabha Platform Ready');
  }

  setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
    
    // Mobile menu
    document.getElementById('menuToggle')?.addEventListener('click', () => this.toggleMobileMenu());
    
    // Navigation
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-page]')) {
        e.preventDefault();
        this.navigateToPage(e.target.dataset.page);
      }
    });

    // Search
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });
  }

  // ===== THEME =====
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    localStorage.setItem('theme', this.theme);
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
      icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }

  // ===== NAVIGATION =====
  navigateToPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId)?.classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.removeAttribute('aria-current');
      if (link.dataset.page === pageId) {
        link.setAttribute('aria-current', 'page');
      }
    });
    
    this.currentPage = pageId;
    this.closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    if (navMenu && menuToggle) {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    }
  }

  closeMobileMenu() {
    document.getElementById('navMenu')?.classList.remove('active');
  }

  // ===== SEARCH =====
  performSearch(query) {
    const cards = document.querySelectorAll('.video-card, .book-card');
    
    if (!query.trim()) {
      cards.forEach(card => card.style.display = 'block');
      return;
    }

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const matches = text.includes(query.toLowerCase());
      card.style.display = matches ? 'block' : 'none';
    });
  }

  // ===== VIDEO FILTERS =====
  filterVideos(category) {
    const videos = document.querySelectorAll('.video-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`)?.classList.add('active');
    
    // Filter videos
    videos.forEach(video => {
      const show = category === 'all' || video.dataset.category === category;
      video.style.display = show ? 'block' : 'none';
    });
  }

  // ===== DOWNLOADS =====
  downloadFile(filename) {
    this.showToast(`Download started: ${filename}`, 'info');
    console.log('Download:', filename);
  }

  // ===== FORM HANDLING =====
  handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const data = new FormData(form);
    
    // Simple validation
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    
    if (!name || !email || !message) {
      this.showToast('Please fill all required fields', 'error');
      return;
    }
    
    this.showToast('Message sent successfully!', 'success');
    form.reset();
  }

  // ===== NOTIFICATIONS =====
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">×</button>
    `;
    
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    
    container.appendChild(toast);
    
    // Auto remove
    setTimeout(() => toast.remove(), 4000);
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  window.nabhaApp = new NabhaApp();
  
  // Form handling
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    window.nabhaApp.handleContactForm(e);
  });
  
  // Filter buttons
  document.addEventListener('click', (e) => {
    if (e.target.matches('.filter-btn')) {
      const category = e.target.dataset.filter;
      window.nabhaApp.filterVideos(category);
    }
    
    if (e.target.matches('.download-btn')) {
      const filename = e.target.dataset.filename;
      window.nabhaApp.downloadFile(filename);
    }
  });
});

// ===== BACKWARD COMPATIBILITY =====
function showPage(pageId) {
  window.nabhaApp?.navigateToPage(pageId);
}

function filterVideos(category) {
  window.nabhaApp?.filterVideos(category);
}

function downloadFile(filename) {
  window.nabhaApp?.downloadFile(filename);
}

function toggleMenu() {
  window.nabhaApp?.toggleMobileMenu();
}