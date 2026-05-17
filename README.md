# Vira Travel Notary Website

A modern, professional website for a mobile notary business in Eastvale, CA.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Contact Form**: Easy-to-use contact form with validation
- **Call/Text Integration**: Direct links to call or text (951) 523-9466
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Loading**: Optimized CSS and JavaScript
- **Accessibility**: WCAG compliant with keyboard navigation support

## 📁 File Structure

```
ViraTravelNotary/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact page with form
├── styles.css          # All styles and responsive design
├── script.js           # Interactive features and form handling
└── README.md           # This file
```

## 🚀 Getting Started

### Option 1: Open Locally
1. Open `index.html` in any modern web browser
2. Navigate through the site using the menu

### Option 2: Deploy Online

#### Deploy to GitHub Pages (Free):
1. Create a GitHub account at https://github.com
2. Create a new repository
3. Upload all files to the repository
4. Go to Settings > Pages
5. Select "main" branch and save
6. Your site will be live at `https://yourusername.github.io/repository-name`

#### Deploy to Netlify (Free):
1. Go to https://www.netlify.com
2. Sign up for a free account
3. Drag and drop your project folder
4. Your site will be live instantly with a custom URL

#### Deploy to Vercel (Free):
1. Go to https://vercel.com
2. Sign up for a free account
3. Import your project
4. Deploy with one click

## 📱 Contact Features

The website includes multiple ways for clients to reach you:

- **Phone**: (951) 523-9466 - Clickable links throughout the site
- **Text/SMS**: (951) 523-9466 - Direct SMS links
- **Contact Form**: Collects client information and preferences

## 🎨 Customization

### Change Colors
Edit the `:root` variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;  /* Main brand color */
    --secondary-color: #0891b2; /* Accent color */
    --accent-color: #f59e0b;   /* Highlight color */
}
```

### Update Business Information
1. Edit contact information in all HTML files
2. Update service areas in `about.html`
3. Modify service listings in `services.html`

### Add Your Logo
Replace the text logo in the navbar with an image:
```html
<div class="logo">
    <img src="your-logo.png" alt="Vira Travel Notary">
</div>
```

### Change Images
The website uses free stock images from Unsplash. To replace:
1. Find the image URLs in `styles.css` (search for "unsplash")
2. Replace with your own images or different Unsplash photos

## 🔧 Form Handling

The contact form currently works client-side. To receive actual submissions:

### Option 1: Use Formspree (Free)
1. Sign up at https://formspree.io
2. Replace the form action in `contact.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Use Netlify Forms
1. Add `netlify` attribute to form:
```html
<form name="contact" netlify>
```

### Option 3: Use Google Forms
1. Create a Google Form
2. Link to it from your contact page

## 🔍 SEO Tips

1. **Google My Business**: Claim your business listing
2. **Meta Tags**: Already included in all HTML files
3. **Site Map**: Generate using online tools and submit to Google
4. **Analytics**: Add Google Analytics code before `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
```

## 📞 Phone Number Format

The phone number (951) 523-9466 is formatted for:
- Direct calls: `tel:9515239466`
- Text messages: `sms:9515239466`

These work automatically on mobile devices.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This website is created for Vira Travel Notary. Feel free to customize for your business needs.

## 🆘 Support

For questions or issues:
1. Check browser console for errors (F12)
2. Validate HTML at https://validator.w3.org
3. Test responsiveness using browser dev tools (F12 > Toggle device toolbar)

## ✅ Next Steps

1. ✅ All pages created and styled
2. ✅ Contact form with validation
3. ✅ Mobile responsive design
4. 🔲 Add your business logo
5. 🔲 Add real photos/images
6. 🔲 Set up form submission service
7. 🔲 Deploy to hosting platform
8. 🔲 Set up Google Analytics
9. 🔲 Submit to search engines
10. 🔲 Test on mobile devices

## 🎯 Website Highlights

- **Professional Design**: Modern, trustworthy appearance
- **Easy Navigation**: Clear menu structure
- **Mobile-First**: Optimized for smartphone users
- **Contact Integration**: Multiple ways to reach you
- **Service Details**: Comprehensive service listings
- **SEO Ready**: Proper structure for search engines
- **Fast Loading**: Optimized performance

---

**Ready to go live!** Just deploy to your hosting platform and start receiving clients. 🚀

For questions about the website, call or text (951) 523-9466.
