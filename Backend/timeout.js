const http = require('http');

const server = http.createServer((req, res) => {
  // Handle the request

  
  res.end('Hello, world!');
});

server.maxRequestsPerSocket = 2;

// Set a timeout of 5 seconds
server.setTimeout(15000, () => {
  console.log('Request timed out');
  
});
server.on('timeout', (socket) => {
    console.log('timeout');
    socket.destroy();
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});