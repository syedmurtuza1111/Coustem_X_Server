// Importing required Node.js modules
const http = require('http'); // For creating the server
const fs = require('fs'); // For working with the file system
const path = require('path'); // For resolving file paths

// Define the port the server will listen on
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Build the file path: serve "index.html" if the request is "/"
    const filePath = path.join(__dirname, req.url === '/' ? "public/index.html" : public${req.url});
    console.log(Requested file: ${filePath});

    // Get the file extension to determine its MIME type
    const extName = String(path.extname(filePath)).toLowerCase();

    // Map of MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
    };

    // Default to 'application/octet-stream' if the MIME type is not found
    const contentType = mimeTypes[extName] || 'application/octet-stream';

    // Read the requested file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Handle file not found error (ENOENT)
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end("<h1>404: File not found</h1>");
            } else {
                // Handle other server errors
                res.writeHead(500);
                res.end(Server Error: ${err.code});
            }
        } else {
            // Serve the file with the correct content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(port, () => {
    console.log(SERVER IS LISTENING ON PORT ${port});
});