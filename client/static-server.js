import { readFileSync } from 'fs';
import { createServer } from 'http';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Simple static file server
const server = createServer((req, res) => {
  let filePath;
  
  // Route all requests to index.html (for client-side routing)
  if (req.url === '/' || !req.url.includes('.')) {
    filePath = join(__dirname, 'dist', 'index.html');
  } else {
    // Serve static files from dist directory
    filePath = join(__dirname, 'dist', req.url);
  }
  
  try {
    const content = readFileSync(filePath);
    
    // Set content type based on file extension
    let contentType = 'text/html';
    if (filePath.endsWith('.js')) contentType = 'application/javascript';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.png')) contentType = 'image/png';
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
    if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    // Return index.html for client-side routing if file not found
    if (error.code === 'ENOENT') {
      try {
        const indexContent = readFileSync(join(__dirname, 'dist', 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexContent);
      } catch (err) {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(500);
      res.end('Server error');
    }
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
});