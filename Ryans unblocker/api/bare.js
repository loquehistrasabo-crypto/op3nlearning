// Vercel serverless function for bare server functionality
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(200).end();
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  try {
    const { path } = req.query;
    
    // Basic bare server implementation
    // This is a simplified version - for full functionality, you'd need @tomphttp/bare-server-node
    
    if (req.url === '/bare/') {
      // Return bare server info
      return res.json({
        versions: ['v1', 'v2', 'v3'],
        language: 'NodeJS',
        memoryUsage: process.memoryUsage ? process.memoryUsage() : {},
        maintainer: {
          email: 'support@rpwner.com',
          website: 'https://rpwner.com'
        },
        project: {
          name: 'rpwner-bare',
          description: 'Bare server for rpwner proxy',
          version: '1.0.0'
        }
      });
    }

    // Handle bare requests (simplified)
    if (path) {
      // For now, redirect to the main proxy
      const encodedUrl = btoa(path);
      return res.redirect(302, `/api/proxy?url=${encodedUrl}`);
    }

    return res.status(400).json({ error: 'Invalid bare server request' });

  } catch (error) {
    console.error('Bare server error:', error);
    return res.status(500).json({ 
      error: 'Bare server error', 
      message: error.message 
    });
  }
}