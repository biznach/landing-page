# Landing Page

A modern, responsive landing page built with HTML and CSS.

## Quick Deploy Options

### Option 1: DigitalOcean App Platform (Recommended)

#### Step 1: Push to GitHub
```bash
# If you haven't already, create a new repository on GitHub
# Then push your code:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to DigitalOcean
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Select "GitHub" as your source
4. Authorize DigitalOcean to access your repository
5. Select your repository and branch (main)
6. DigitalOcean will auto-detect it as a static site
7. Review and click "Next" → "Create Resources"
8. Your site will deploy in ~2-3 minutes

**Cost:** Free tier available (3 static sites free)

**Your site will be live at:** `https://your-app-name.ondigitalocean.app`

You can also add a custom domain in the app settings!

### Option 2: GitHub Pages (Free & Easy)

1. Create a new repository on GitHub
2. Push this folder to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Select "Deploy from a branch" and choose "main" branch
5. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO`

### Option 2: Netlify (Easiest - Drag & Drop)

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up for free
3. Drag and drop this entire folder onto Netlify
4. Your site goes live instantly with a free URL

### Option 3: Vercel (Great for Projects)

1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your site goes live with a free URL

### Option 4: Surge (Super Quick)

1. Install Surge: `npm install -g surge`
2. Run: `surge`
3. Follow the prompts
4. Your site goes live instantly

## Customization

Edit the following in `index.html`:
- Change "YourBrand" to your brand name
- Update the hero title and subtitle
- Modify feature cards
- Update the about section text

Edit `styles.css` to customize:
- Colors (search for `#667eea` and `#764ba2` for the purple gradient)
- Fonts
- Spacing
- Animations

## Local Testing

Simply open `index.html` in your web browser to see the site locally.

## Features

- Fully responsive design
- Modern gradient design
- Smooth animations
- Contact form ready
- Mobile-friendly navigation
- Fast loading
