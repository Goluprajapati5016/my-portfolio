# Portfolio Customization Quick Guide 🎨

## 1. Update Hero Section Text

**File:** `index.html`  
**Lines:** 76-83

```html
<!-- BEFORE -->
<h1 class="hero-title">
    <span class="gradient-text">Data Analyst</span> &<br/>
    <span class="gradient-text-alt">ML Engineer</span>
</h1>
<p class="hero-subtitle">Transforming data into insightful decisions with Python, Machine Learning, and Data Visualization</p>

<!-- AFTER - Replace with your own -->
<h1 class="hero-title">
    <span class="gradient-text">Your Name</span> &<br/>
    <span class="gradient-text-alt">Your Title</span>
</h1>
<p class="hero-subtitle">Your tagline here</p>
```

## 2. Update About Section

**File:** `index.html`  
**Lines:** 155-165

Replace the placeholder text with your own professional summary and highlight your unique skills.

## 3. Customize Skills

**File:** `index.html`  
**Lines:** 191-280

Each skill card structure:
```html
<div class="skill-card">
    <div class="skill-icon">
        <i class="fas fa-icon-name"></i>  <!-- Change icon -->
    </div>
    <h3>Skill Name</h3>  <!-- Change skill name -->
    <div class="progress-bar">
        <div class="progress" style="width: 90%"></div>  <!-- Change width percentage -->
    </div>
    <p>90%</p>  <!-- Update percentage text -->
</div>
```

**Available Font Awesome Icons:**
- Python: `fab fa-python`
- Database: `fas fa-database`
- Chart: `fas fa-chart-bar`
- Brain: `fas fa-brain`
- More at: https://fontawesome.com/icons

## 4. Add Your Projects

**File:** `index.html`  
**Lines:** 298-540

Project card template:
```html
<div class="project-card">
    <div class="project-image">
        <div class="placeholder-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <i class="fas fa-project-icon"></i>
        </div>
    </div>
    <div class="project-content">
        <h3>Your Project Title</h3>
        <p>Brief description of your project...</p>
        <div class="project-tech">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Pandas</span>
            <span class="tech-tag">TensorFlow</span>
        </div>
        <div class="project-links">
            <a href="https://github.com/your-link" class="project-link">
                <i class="fab fa-github"></i> GitHub
            </a>
            <a href="https://your-demo-link.com" class="project-link">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    </div>
</div>
```

## 5. Update Experience/Certifications

**File:** `index.html`  
**Lines:** 671-733

Timeline item template:
```html
<div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
        <div class="timeline-header">
            <h3>Your Certification Name</h3>
            <span class="timeline-date">2024</span>
        </div>
        <p>Description of your certification or achievement...</p>
        <div class="achievement-badges">
            <span class="badge"><i class="fas fa-certificate"></i> Certified</span>
        </div>
    </div>
</div>
```

## 6. Update Contact Information

**File:** `index.html`  
**Lines:** 760-800

```html
<!-- Email -->
<p><a href="mailto:your.email@example.com">your.email@example.com</a></p>

<!-- GitHub -->
<p><a href="https://github.com/yourprofile" target="_blank">github.com/yourprofile</a></p>

<!-- LinkedIn -->
<p><a href="https://linkedin.com/in/yourprofile" target="_blank">linkedin.com/in/yourprofile</a></p>

<!-- Location -->
<p>Your City, Country</p>
```

## 7. Change Color Scheme

**File:** `styles.css`  
**Lines:** 1-15

```css
:root {
    --primary-color: #667eea;      /* Main color - buttons, text */
    --primary-dark: #5568d3;        /* Darker shade for hover states */
    --secondary-color: #764ba2;     /* Secondary accent color */
    --accent-color: #f5576c;        /* Accent for highlights */
    --accent-light: #f093fb;        /* Light accent color */
    --light-bg: #f8f9ff;            /* Light background */
    --dark-bg: #0f1027;             /* Dark background */
    --text-primary: #1a1a2e;        /* Primary text color */
    --text-secondary: #6c757d;      /* Secondary text color */
}
```

**Color Palette Ideas:**

Ocean Blue:
```css
--primary-color: #0066ff;
--secondary-color: #004db3;
--accent-color: #00d4ff;
```

Forest Green:
```css
--primary-color: #00a86b;
--secondary-color: #228b22;
--accent-color: #90ee90;
```

## 8. Customize Animations

**File:** `styles.css`

### Change animation speed:
Default: `all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);`

Slower: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);`  
Faster: `all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);`

## 9. Add Project Images

**File:** `index.html`

Replace placeholder backgrounds with images:

```html
<!-- BEFORE -->
<div class="placeholder-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <i class="fas fa-icon"></i>
</div>

<!-- AFTER -->
<img src="path/to/your/image.jpg" alt="Project Name" class="project-thumbnail">
```

**CSS to add in `styles.css`:**
```css
.project-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.project-card:hover .project-thumbnail {
    transform: scale(1.05);
}
```

## 10. Setup Contact Form Email

The contact form currently logs to console. To enable real emails:

### Option A: Using FormSubmit.co (Easiest)

1. Update `<form>` tag in `index.html`:
```html
<form class="contact-form" action="https://formsubmit.co/your.email@example.com" method="POST">
```

2. Keep all existing form fields as-is

### Option B: Using EmailJS

1. Install EmailJS: Add to `<head>` in `index.html`:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
```

2. Initialize in `script.js`:
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

## 11. Deploy to the Web

### GitHub Pages (Free)
1. Create repository named `username.github.io`
2. Push all files to main branch
3. Your site goes live at `https://username.github.io`

### Netlify (Free + Extra Features)
1. Connect your GitHub repo
2. Deploy with one click
3. Gets automatic HTTPS and custom domain

### Traditional Hosting
1. Get FTP access to your hosting
2. Upload all files
3. Make sure files are directly in public_html (not in subfolder)

## 12. Quick Wins to Stand Out

✅ **Add GitHub contributions chart** - Shows coding activity  
✅ **Include project stats** - Star count, downloads, etc.  
✅ **Add blog/articles section** - Showcase thought leadership  
✅ **Include testimonials** - From colleagues, managers, or clients  
✅ **Add animations on page load** - Entrance animations  
✅ **Use high-quality avatars/images** - Professional headshots  
✅ **Include a brief video intro** - Adds personality  
✅ **Show tech stack icons** - Visual representation of skills  

## 13. SEO Optimization

Add to `<head>` in `index.html`:
```html
<meta name="description" content="Data Analyst & ML Engineer Portfolio - Python, Machine Learning, Data Analysis">
<meta name="keywords" content="data analyst, machine learning, portfolio, python, pandas">
<meta name="author" content="Your Name">
<meta property="og:title" content="Your Name - Data Analyst & ML Engineer">
<meta property="og:description" content="Portfolio showcase">
<meta property="og:image" content="path/to/preview-image.jpg">
```

## 14. Performance Tips

- **Compress images** - Use tools like TinyPNG or ImageOptim
- **Minify CSS & JS** - Use minifiers for production
- **Enable GZIP compression** - Ask hosting provider
- **Use CDN** - Font Awesome is already using CDN
- **Lazy load images** - JavaScript already prepared
- **Clear cache headers** - Configure on your hosting

## 15. Accessibility Improvements

The template already includes:
- ✅ Semantic HTML
- ✅ ARIA labels  
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Mobile responsive

Additional enhancements:
```html
<!-- Add alt text to all images -->
<img src="project.jpg" alt="Description of project">

<!-- Ensure good color contrast -->
<!-- Use heading hierarchy (h1, h2, h3) correctly -->
<!-- Use semantic elements (section, article, nav) -->
```

---

## Common Questions

**Q: How do I change the font?**  
A: Add to `<head>` in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```
Then in `styles.css`: `font-family: 'Your Font', sans-serif;`

**Q: How do I add a dark mode?**  
A: Use CSS variables with media query:
```css
@media (prefers-color-scheme: dark) {
    body { background: #0f1027; color: #ffffff; }
}
```

**Q: How do I make the site faster?**  
A: Optimize images, minify CSS/JS, use CDN for libraries

**Q: Can I use this for commercial projects?**  
A: Yes! For yourself or clients - it's yours to customize

---

**Need help?** Check the main README.md for more detailed information!
