# Deploying rpwner with Scramjet to Vercel

## Quick Deploy

Just deploy - Vercel handles everything automatically:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

That's it! Vercel will:
1. Install dependencies automatically
2. Run the build script to copy Scramjet files
3. Deploy your proxy with full Scramjet support

## Alternative: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)  
3. Import your repository
4. Auto-deploy on every push

## What You Get

✅ **Scramjet Features:**
- Advanced web proxy with better site compatibility
- Service worker-based interception  
- CAPTCHA support for many sites
- Support for Google, YouTube, Discord, Reddit, etc.
- Better performance than Ultraviolet

✅ **Vercel Integration:**
- Serverless architecture
- Global CDN
- Automatic HTTPS
- Zero-config deployment

## Testing Locally

```bash
vercel dev
```

## Troubleshooting

- Check Vercel function logs in dashboard
- Browser developer console for errors
- Ensure service worker registers properly at `/sw.js`