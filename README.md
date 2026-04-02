# 🏐 Volleyball Portfolio Website

A professional, fully responsive volleyball player portfolio website built with pure HTML, CSS, and JavaScript.

## Features

### Core Sections
- **Hero Section** - Full-screen animated hero with player name and tagline
- **About Me** - Player introduction with animated statistics
- **Skills & Position** - Display positions and skills with animated progress bars
- **Achievements** - Timeline layout showcasing awards and recognitions
- **Gallery** - Professional volleyball photos with lightbox viewer
- **Highlights** - Expandable showcase of matches and performances
- **Contact** - Contact form with validation and social media links
- **Responsive Navigation** - Sticky navbar with smooth scrolling

### Interactive Features
✅ Smooth scrolling navigation with active link highlighting
✅ Image lightbox with keyboard navigation (arrow keys, ESC)
✅ "View All" button that expands/collapses content
✅ Contact form with email validation
✅ Animated progress bars for skills
✅ Animated statistics counter
✅ Scroll-triggered animations
✅ Dark/Light mode toggle
✅ Loading animation
✅ Mobile responsive design

## Design
- **Color Palette**: Professional volleyball-inspired colors
  - Primary: #1e3a8a (Deep Blue)
  - Secondary: #fbbf24 (Volleyball Yellow)
  - Accent: #3b82f6 (Light Blue)
- **Typography**: Modern, clean fonts
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design with breakpoints at 768px and 480px

## Project Structure
```
volleyball-portfolio/
├── index.html                 # Main HTML file
├── README.md                  # This file
├── assets/
│   ├── css/
│   │   └── styles.css        # All styling and animations
│   ├── js/
│   │   └── script.js         # Interactive features
│   └── images/
│       ├── match1.jpg        # Gallery images
│       ├── match2.jpg
│       ├── match3.jpg
│       ├── match4.jpg
│       ├── team.jpg
│       └── training.jpg
```

## Technology Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and gradients
- **Vanilla JavaScript** - No frameworks or external libraries
- **Responsive Design** - Mobile-friendly layout

## How to Use

### Local Development
1. Extract the zip file
2. Open `index.html` in your web browser
3. No server required - works as a static site

### Deployment
1. Upload all files to your web hosting
2. Ensure the folder structure is maintained
3. Access via your domain

## Customization

### Change Player Information
Edit `index.html`:
- Line 48: Player name
- Line 49: Tagline
- Update About section content
- Update achievements and skills

### Modify Colors
Edit `assets/css/styles.css`:
- CSS variables at the top (`:root` section)
- Primary color: `--primary-color`
- Secondary color: `--secondary-color`
- Accent color: `--accent-color`

### Add More Images
1. Place images in `assets/images/` folder
2. Update gallery items in `index.html`
3. Update image paths in gallery section

### Update Contact Information
Edit `index.html` contact section:
- Email address
- Phone number
- Location
- Social media links

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance
- Optimized animations with CSS transforms
- Lazy loading for images
- Debounced scroll events
- Minimal JavaScript footprint
- Fast loading times

## Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast colors
- Alt text for images

## License
This project is free to use and modify for personal or commercial purposes.

## Credits
- Volleyball images from professional sources
- Built with modern web standards
- Optimized for all devices

---

**Created**: April 2024
**Version**: 1.0
**Status**: Production Ready
