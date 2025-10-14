# 🚀 Quick Start Guide - Nabha Learning Platform

## Open the Website (3 Ways)

### Method 1: Double Click (Easiest)
1. Find `index.html` in the folder
2. Double-click it
3. Website opens in your default browser ✅

### Method 2: Right Click
1. Right-click on `index.html`
2. Choose "Open with" → Your favorite browser
3. Done! ✅

### Method 3: Local Server (Recommended for Development)

#### Using Python (if installed):
```bash
# Navigate to folder
cd "c:\Users\Pcc\Desktop\PINKU CHOTI\NABHA"

# Start server
python -m http.server 8000

# Open browser to: http://localhost:8000
```

#### Using Node.js (if installed):
```bash
# Navigate to folder
cd "c:\Users\Pcc\Desktop\PINKU CHOTI\NABHA"

# Start server (one of these)
npx serve
# or
npx http-server

# Open browser to the URL shown
```

---

## 🎯 How to Use the Website

### Navigation
- Click menu items: **Home**, **About Us**, **Videos**, **Library**, **Contact**
- Use mobile menu icon (☰) on small screens

### Theme Toggle
- Click the **moon/sun icon** in the top-right corner
- Your preference is saved automatically

### Search
- Type in the search box on the home page
- Results appear instantly as you type

### Watch Videos
1. Go to **Videos** page
2. Use filter buttons to find subjects
3. Click the **play button** on any video
4. Video loads and plays

### Download Materials
1. Go to **Library** page
2. Browse available books/PDFs
3. Click **Download PDF** button
4. Watch the progress bar fill
5. File is ready!

### Save for Later
- Click the **bookmark icon** on video cards
- Saved items persist even after closing browser

---

## 📝 Common Edits

### Change Website Name
**File:** `index.html`  
**Find:** `Nabha Digital Learning`  
**Replace with:** Your School Name

### Change Main Color
**File:** `styles.css`  
**Find:** `--primary-color: #2563eb;`  
**Change to:** Any color code you like

### Add Your Own Video
**File:** `index.html`  
**Copy this template:**
```html
<article class="video-card card" data-category="math">
  <div class="video-thumbnail" data-src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID">
    <div class="video-placeholder">
      <i class="fas fa-play-circle"></i>
    </div>
    <div class="video-duration">10:25</div>
  </div>
  <div class="video-info card-content">
    <span class="video-category">Mathematics</span>
    <h3 class="video-title">Your Title Here</h3>
    <p class="video-description">Your description here</p>
  </div>
</article>
```

**How to get YouTube Video ID:**
- From URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID is: `dQw4w9WgXcQ`
- Use: `data-src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"`

---

## 🐛 Troubleshooting

### Videos not loading?
- Check your internet connection
- Make sure the YouTube video ID is correct
- Some videos may be region-blocked

### Dark mode not working?
- Clear browser cache (Ctrl+Shift+Delete)
- Try in another browser
- Check if JavaScript is enabled

### Download progress not showing?
- This is a simulation - real downloads need a backend
- To add real downloads, host PDFs and link to them

### Mobile menu stuck?
- Refresh the page (F5)
- Clear browser cache

---

## 📂 Files Explained (Simple)

| File | What It Does | Can I Edit? |
|------|-------------|------------|
| `index.html` | All the content (text, videos, books) | ✅ YES - Add your content here |
| `styles.css` | All the colors, fonts, layouts | ✅ YES - Change appearance here |
| `simple-script.js` | Interactive features (clicks, animations) | ⚠️ CAREFUL - Only if you know JavaScript |
| `toast.css` | Notification pop-ups styling | ⚠️ CAREFUL - Usually don't need to change |
| `README.md` | Documentation (this guide!) | ✅ YES - Update for your use |

---

## ✅ Checklist for Customization

Before publishing your customized version:

- [ ] Changed website name in all places
- [ ] Updated contact information
- [ ] Added your own videos
- [ ] Added your own study materials
- [ ] Tested on mobile phone
- [ ] Tested dark mode
- [ ] Tested all navigation links
- [ ] Spell-checked all content
- [ ] Removed placeholder content
- [ ] Updated social media links

---

## 🆘 Need Help?

### Check These First:
1. Open browser console (F12) - look for errors in red
2. Make sure all files are in the same folder
3. Check file names match exactly (case-sensitive!)
4. Ensure internet connection for external resources

### Still Stuck?
- Read the full `README.md` file
- Check `IMPROVEMENTS.md` for features explanation
- Search for your issue online
- Ask on programming forums (Stack Overflow)

---

## 🎓 Learning Resources

Want to customize further? Learn these:

### HTML (Content)
- [MDN HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- [W3Schools HTML](https://www.w3schools.com/html/)

### CSS (Styling)
- [MDN CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/CSS)
- [CSS Tricks](https://css-tricks.com/)

### JavaScript (Interactivity)
- [JavaScript.info](https://javascript.info/)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🌟 Tips for Best Results

1. **Test on Multiple Devices**
   - Desktop computer
   - Tablet
   - Mobile phone

2. **Keep Backups**
   - Copy the folder before making changes
   - Use version control (Git)

3. **Start Small**
   - Change one thing at a time
   - Test after each change

4. **Use Comments**
   ```html
   <!-- This is a comment in HTML -->
   ```
   ```css
   /* This is a comment in CSS */
   ```
   ```javascript
   // This is a comment in JavaScript
   ```

5. **Optimize Images**
   - Use compressed images
   - Keep file sizes small for faster loading

---

## 📊 Performance Tips

- Don't add too many videos on one page (max 20-30)
- Compress images before adding them
- Keep video descriptions short
- Test on slow internet to ensure it loads fast

---

<div align="center">

**You're all set! 🎉**

If you customized it successfully, consider starring the project on GitHub!

**Questions?** Open an issue on GitHub or check the full README.md

</div>
