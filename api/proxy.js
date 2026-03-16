// Vercel serverless function for proxying requests
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(200).end();
  }

  try {
    const { url: encodedUrl } = req.query;
    
    if (!encodedUrl) {
      return res.status(400).json({ error: 'Missing URL parameter' });
    }

    console.log('Encoded URL:', encodedUrl);

    // Decode base64 URL
    let decodedUrl;
    try {
      decodedUrl = atob(encodedUrl);
    } catch (error) {
      console.error('Base64 decode error:', error);
      return res.status(400).json({ error: 'Invalid base64 encoding' });
    }

    console.log('Decoded URL:', decodedUrl);

    // Validate URL
    let targetUrl;
    try {
      targetUrl = new URL(decodedUrl);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Prepare headers for the proxied request
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'DNT': '1',
      'Upgrade-Insecure-Requests': '1'
    };

    // Copy relevant headers from original request
    Object.keys(req.headers).forEach(key => {
      if (!['host', 'connection', 'user-agent', 'accept-encoding', 'x-forwarded-for', 'x-real-ip'].includes(key.toLowerCase())) {
        headers[key] = req.headers[key];
      }
    });

    // Prepare fetch options
    const fetchOptions = {
      method: req.method,
      headers: headers,
      redirect: 'follow'
    };

    // Add body for POST/PUT requests
    if (req.method === 'POST' || req.method === 'PUT') {
      fetchOptions.body = JSON.stringify(req.body);
      headers['Content-Type'] = 'application/json';
    }

    console.log(`Making ${req.method} request to:`, decodedUrl);

    // Make the proxied request
    const response = await fetch(decodedUrl, fetchOptions);
    
    console.log('Response status:', response.status);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Expose-Headers', '*');

    // Copy response headers (excluding problematic ones)
    response.headers.forEach((value, key) => {
      if (!['connection', 'transfer-encoding', 'content-encoding', 'access-control-allow-origin'].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    // Set status code
    res.status(response.status);

    // Handle different content types
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return res.json(data);
    } else if (contentType.includes('text/')) {
      const text = await response.text();
      return res.send(text);
    } else {
      // Handle binary content
      const arrayBuffer = await response.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      res.setHeader('Content-Type', contentType);
      return res.end(buffer);
    }

  } catch (error) {
    console.error('Proxy error:', error);
    
    // Set CORS headers even for errors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    return res.status(500).json({ 
      error: 'Proxy request failed', 
      message: error.message 
    });
  }
}