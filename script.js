// NABHA Learning Platform - Clean & Simple

class NabhaApp {
  constructor() {
    this.currentPage = 'home';
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Navigation links
    document.addEventListener('click', (e) => {
      const pageLink = e.target.closest('[data-page]');
      if (pageLink) {
        e.preventDefault();
        this.navigateToPage(pageLink.dataset.page);
      }
    });

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.performSearch(e.target.value);
      });
    }

    // Video placeholders (lazy load)
    document.addEventListener('click', (e) => {
      const videoPlaceholder = e.target.closest('.video-placeholder');
      if (videoPlaceholder) this.loadVideo(videoPlaceholder);
    });

    // Download buttons
    document.addEventListener('click', (e) => {
      const downloadBtn = e.target.closest('.download-btn');
      if (downloadBtn) this.handleDownload(downloadBtn);
    });

    // Filter buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.filter-btn')) {
        this.filterVideos(e.target.dataset.filter);
      }
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
    }
    // (save buttons removed from UI)
  }

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
    const cards = document.querySelectorAll('.video-card, .book-card, .link-card');
    const resultsCount = document.getElementById('searchResultsCount');
    
    if (!query.trim()) {
      cards.forEach(card => card.style.display = 'block');
      if (resultsCount) {
        resultsCount.classList.remove('visible');
      }
      return;
    }

    let matchCount = 0;
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const matches = text.includes(query.toLowerCase());
      card.style.display = matches ? 'block' : 'none';
      if (matches) matchCount++;
    });

    // Show results count
    if (resultsCount) {
      resultsCount.textContent = `Found ${matchCount} result${matchCount !== 1 ? 's' : ''}`;
      resultsCount.classList.add('visible');
    }

    // Navigate to appropriate page if searching from home
    if (this.currentPage === 'home' && query.trim()) {
      const firstMatch = document.querySelector('.video-card:not([style*="display: none"])');
      if (firstMatch) {
        setTimeout(() => this.navigateToPage('videos'), 300);
      }
    }
  }

  // Basic filtering function
  filterVideos(category) {
    const videos = document.querySelectorAll('.video-card');
    videos.forEach(video => {
      const show = category === 'all' || video.dataset.category === category;
      video.style.display = show ? 'block' : 'none';
    });
  }

  // Simple download handler
  handleDownload(btn) {
    const filename = btn.dataset.filename || 'file.pdf';
    this.showToast(`Download started: ${filename}`);
  }

  // Load video when placeholder is clicked
  loadVideo(placeholder) {
    const container = placeholder.parentElement;
    const videoUrl = container.dataset.src;
    
    if (!videoUrl) return;

    // Create and configure iframe
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none';
    
    // Replace placeholder with iframe
    container.appendChild(iframe);
    placeholder.style.display = 'none';
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
    
    const span = document.createElement('span');
    span.textContent = message; // Safe - no HTML injection
    
    const btn = document.createElement('button');
    btn.textContent = '×';
    btn.addEventListener('click', () => toast.remove()); // Safe event listener
    
    toast.appendChild(span);
    toast.appendChild(btn);
    
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

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
  window.nabhaApp = new NabhaApp();
});