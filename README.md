# 🎓 Nabha Learning Platform

> A modern, accessible digital learning platform for rural school students in Nabha, Punjab

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Getting Started](#-getting-started)
- [File Structure](#-file-structure)
- [How It Works](#-how-it-works)
- [Customization](#-customization)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Nabha Learning Platform is a **free, open-source educational website** designed to help rural students access quality learning materials. The platform provides:

- 📹 Educational video lessons
- 📚 Downloadable study materials
- 🌙 Beautiful dark mode
- 📱 Mobile-friendly design
- ♿ Full accessibility support

**No backend required** - runs entirely in the browser!

---

## ✨ Features

### 🎨 User Interface
- ✅ **Light & Dark Mode** - Toggle between themes with one click
- ✅ **Responsive Design** - Works perfectly on phones, tablets, and desktops
- ✅ **Smooth Animations** - Professional transitions and effects
- ✅ **Clean Layout** - Easy navigation for all age groups

### 📚 Educational Content
- ✅ **Video Library** - Curated educational videos by subject
- ✅ **Digital Library** - Downloadable PDF study materials
- ✅ **Subject Filters** - Math, Science, English, General Knowledge
- ✅ **Search Function** - Find content quickly

### 🚀 Advanced Features
- ✅ **Save for Later** - Bookmark favorite videos and books
- ✅ **Download Progress** - Visual feedback for downloads
- ✅ **Lazy Loading** - Videos load only when needed
- ✅ **Scroll to Top** - Quick navigation button
- ✅ **Contact Form** - Get in touch easily

### ♿ Accessibility
- ✅ **Screen Reader Support** - ARIA labels throughout
- ✅ **Keyboard Navigation** - Use Tab, Enter, and arrow keys
- ✅ **High Contrast** - Readable in all lighting conditions
- ✅ **Focus Indicators** - Clear visual feedback

---

## 🎬 Demo

### Light Mode
![Light Mode Preview](docs/light-mode.png)

### Dark Mode
![Dark Mode Preview](docs/dark-mode.png)

---

## 🚀 Getting Started

### Prerequisites

You only need a modern web browser! No installation required.

### Quick Start

1. **Download the files**
   ```bash
   git clone https://github.com/mehulvish13/NABHA.git
   cd NABHA
   ```

2. **Open in browser**
   - Double-click `index.html`, or
   - Use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js (with npx)
   npx serve
   
   # PHP
   php -S localhost:8000
   ```

3. **Visit in browser**
   ```
   http://localhost:8000
   ```

That's it! 🎉

---

## 📁 File Structure

```
NABHA/
│
├── index.html              # Main HTML file (all pages in one)
├── styles.css              # All styling (design system + components)
├── simple-script.js        # JavaScript functionality
├── toast.css               # Toast notification styles
│
├── README.md               # This file
├── IMPROVEMENTS.md         # Changelog and enhancement details
│
└── docs/                   # Documentation images (optional)
    ├── light-mode.png
    └── dark-mode.png
```

### File Descriptions

| File | Purpose | Lines |
|------|---------|-------|
| `index.html` | Complete website structure | ~1400 |
| `styles.css` | Design system + all styling | ~1000 |
| `simple-script.js` | Interactive features | ~350 |
| `toast.css` | Notification system | ~150 |

---

## 🔧 How It Works

### Architecture

The platform uses a **Single Page Application (SPA)** design:

```
┌─────────────────────────────────────┐
│         index.html                  │
│  ┌─────────────────────────────┐   │
│  │  Navigation Bar             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Page 1: Home (active)      │   │
│  │  Page 2: About (hidden)     │   │
│  │  Page 3: Videos (hidden)    │   │
│  │  Page 4: Library (hidden)   │   │
│  │  Page 5: Contact (hidden)   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Footer                     │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Key Components

#### 1. Theme System
```javascript
// Stored in localStorage
theme: 'light' | 'dark'

// Applied via CSS custom properties
[data-theme="dark"] {
  --primary-color: #60a5fa;
  --bg-primary: #1e293b;
  // ... more variables
}
```

#### 2. Navigation System
```javascript
// Single-page navigation
navigateToPage(pageId) {
  // Hide all pages
  // Show selected page
  // Update URL hash
}
```

#### 3. Event Handling
```javascript
// Centralized event delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('.save-btn')) { ... }
  if (e.target.matches('.download-btn')) { ... }
  // ... more handlers
});
```

---

## 🎨 Customization

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --primary-color: #2563eb;      /* Main blue */
  --secondary-color: #10b981;    /* Green */
  --accent-color: #f59e0b;       /* Orange */
}
```

### Add New Video

In `index.html`, find the video section and add:

```html
<article class="video-card card" data-category="math">
  <div class="video-thumbnail" data-src="https://www.youtube-nocookie.com/embed/VIDEO_ID">
    <div class="video-placeholder">
      <i class="fas fa-play-circle"></i>
    </div>
    <div class="video-duration">12:30</div>
  </div>
  <div class="video-info card-content">
    <span class="video-category">Mathematics</span>
    <h3 class="video-title">Your Video Title</h3>
    <p class="video-description">Description here</p>
  </div>
</article>
```

### Add New Book/PDF

```html
<article class="book-card card">
  <div class="card-content">
    <div class="book-icon">
      <i class="fas fa-file-pdf"></i>
    </div>
    <h3 class="book-title">Your Book Title</h3>
    <div class="book-meta">
      <span class="book-tag">Subject</span>
      <span class="book-tag">Class X</span>
      <span class="book-tag">2.5 MB</span>
    </div>
    <p class="file-size">Estimated download time: 30 seconds on 3G</p>
    <button 
      class="download-btn btn-accent" 
      data-filename="your-file.pdf"
      type="button">
      <i class="fas fa-download"></i> Download PDF
    </button>
    <div class="download-progress">
      <div class="download-progress-bar"></div>
    </div>
  </div>
</article>
```

---

## 🌐 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Required Features
- CSS Custom Properties
- CSS Grid & Flexbox
- ES6 JavaScript
- LocalStorage API

---

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+
- 📦 **Total Size**: < 100 KB (without videos)
- 🚀 **Load Time**: < 2 seconds on 3G
- 📱 **Mobile Friendly**: 100%

---

## 🛠️ Development

### Testing Locally

1. **Check JavaScript syntax**
   ```bash
   node --check simple-script.js
   ```

2. **Validate HTML**
   - Use [W3C Validator](https://validator.w3.org/)
   - Or install: `npm install -g html-validator-cli`

3. **Test responsiveness**
   - Open DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Test different screen sizes

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS, double for HTML
- **Semicolons**: Always in JavaScript
- **Comments**: Descriptive section headers

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Ideas for Contributions

- 🌍 Add regional language support (Hindi, Punjabi)
- 📝 Create interactive quizzes
- 📊 Add progress tracking
- 🎮 Gamification elements
- 📱 Progressive Web App features

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Nabha Learning Team** - *Initial work*

---

## 🙏 Acknowledgments

- Font Awesome for icons
- YouTube for video hosting
- All educators creating free content
- Rural students of Nabha for inspiration

---

## 📞 Contact & Support

- 📧 Email: support@nabhalearn.org
- 🌐 Website: [nabhalearn.org](https://nabhalearn.org)
- 📱 Social Media: Follow @nabhalearn

---

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Basic video library
- [x] PDF downloads
- [x] Dark mode
- [x] Mobile responsive

### Phase 2 (Planned)
- [ ] User accounts
- [ ] Progress tracking
- [ ] Interactive quizzes
- [ ] Regional languages

### Phase 3 (Future)
- [ ] Offline mode (PWA)
- [ ] Live classes
- [ ] Discussion forum
- [ ] Mobile apps

---

## 💡 FAQ

**Q: Do I need a server to run this?**  
A: No! Just open `index.html` in any browser.

**Q: Can I customize the content?**  
A: Yes! Edit the HTML to add your own videos and PDFs.

**Q: Is this free to use?**  
A: Absolutely! It's open-source under MIT license.

**Q: Can I use this for my school?**  
A: Yes! Feel free to adapt it for your needs.

**Q: How do I add real PDF downloads?**  
A: Host PDFs on your server and update the `data-filename` attributes with actual URLs.

---

## 🎯 Quick Reference

### Common Tasks

| Task | File to Edit | Section |
|------|-------------|---------|
| Change site name | `index.html` | `<title>` and `.logo` |
| Add video | `index.html` | Videos section |
| Add book | `index.html` | Library section |
| Change colors | `styles.css` | `:root` variables |
| Modify behavior | `simple-script.js` | NabhaApp class |

---

<div align="center">

**Made with ❤️ for rural education in Nabha, Punjab**

⭐ Star us on GitHub if this helped you!

[Report Bug](https://github.com/mehulvish13/NABHA/issues) · [Request Feature](https://github.com/mehulvish13/NABHA/issues)

</div>
