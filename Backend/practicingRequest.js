const http = require('http');
const url = require('url');
const net = require('net');
const blockList = new net.BlockList();
blockList.addAddress('123.123.123.123');
blockList.addAddress('192.168.43.1');
blockList.addAddress("192.168.56.1");
blockList.addRange("192.168.10.10", "192.168.43.254");

blockList.addAddress('106.221.107.221');
blockList.addAddress('127.0.0.1');
blockList.addRange('10.0.0.1', '10.0.0.10');
blockList.addSubnet('8592:757c:efae:4e45::', 64, 'ipv6');

console.log(blockList.check('123.123.123.123'));  // Prints: true
console.log(blockList.check('10.0.0.3'));  // Prints: true
console.log(blockList.check('222.111.111.222'));  // Prints: false

// IPv6 notation for IPv4 addresses works:
console.log(blockList.check('::ffff:7b7b:7b7b', 'ipv6')); // Prints: true
console.log(blockList.check('::ffff:123.123.123.123', 'ipv6')); // Prints: true
const server = http.createServer((req, res) => { 
    

    const clientIP = req.socket.remoteAddress;
    console.log(clientIP); 
    // blockList.addAddress(clientIP);
    if (blockList.check(clientIP)) { 
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access denied'); 
        console.log(`Blocked request from ${clientIP}`); 
        return;
    }
    const urlData = url.parse(req.url, true);
    console.log('urlData :>> ', urlData);
    console.log("\n---------------*-----------------*-----------------*-----------------\n");

    console.log('Request Headers :>> ', req.headers);
    console.log("\n---------------*-----------------*-----------------*-----------------\n");
    console.log('Request Method :>> ', req.method);
    console.log('Request URL :>> ', req.url);
    res.end('Thank you Mario, but our princess is in another castle...');
 });

 server.listen(3500, () => {
    console.log('Server started on localhost:3500!');
});