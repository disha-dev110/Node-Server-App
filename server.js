const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toLocaleTimeString()}] Request received for: ${req.url}`);

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const query = parsedUrl.searchParams;

    if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<html><body style="text-align: center;"><h1>Welcome to My Node.js Server</h1><a href="/about">About</a></body></html>`);
    } else if (path === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Page</h1>');
    } else if (path === '/api/time') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ time: new Date().toLocaleString() }));
    } else if (path === '/hello') {
        const name = query.get('name') || 'Guest'; // Query updated
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<h1>Hello, ${name}!</h1>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1 style="color: red;">404 Not Found</h1>');
    }
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));