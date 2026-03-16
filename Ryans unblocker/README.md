# rpwner - Scramjet Web Proxy

A fast, secure web proxy powered by Scramjet and deployed on Vercel.

## Features

- 🚀 **Scramjet-powered** - Advanced web proxy with excellent site compatibility
- 🌐 **Universal Access** - Bypass restrictions and access blocked content
- ⚡ **Serverless** - Deployed on Vercel for global performance
- 🔒 **Secure** - HTTPS encryption and privacy protection
- 📱 **Mobile-friendly** - Works on all devices

## Supported Sites

- Google, YouTube, Gmail
- Discord, Reddit, Twitter
- Instagram, TikTok, Spotify
- GeForce NOW and more
- CAPTCHA support included

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/rpwner-proxy)

Or manually:

```bash
git clone <your-repo>
cd rpwner-proxy
vercel --prod
```

## Local Development

```bash
npm install
vercel dev
```

Visit `http://localhost:3000`

## How It Works

1. **Scramjet Service Worker** - Intercepts and proxies web requests
2. **BareMux Transport** - Handles the actual HTTP requests
3. **Vercel Serverless** - Provides the backend proxy functionality
4. **CORS Headers** - Ensures compatibility with all sites

## Configuration

The proxy is pre-configured and ready to deploy. Key files:

- `sw.js` - Service worker with Scramjet
- `scram/scramjet.config.js` - Proxy configuration
- `vercel.json` - Deployment settings
- `api/proxy.js` - Serverless proxy function

## License

MIT License - see LICENSE file for details.

## Support

For issues or questions, check the [deployment guide](VERCEL-DEPLOY.md).