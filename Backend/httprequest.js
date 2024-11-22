const http = require('http');
const https = require('https');
const fs = require('fs');
const fsPromises = require('fs/promises');

// Define options for the request
const options = {
    hostname: 'www.archive.org',
    port: 80,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

// Create the request
const req = http.request(options, (res) => {
    // Extract the Content-Type header from the response 
    const contentType = res.headers['content-type'];
    console.log(contentType);
    let data = '';

    // Listen for data chunks
    res.on('data', (chunk) => {
        data += chunk;
    });

    // When the entire response has been received
    res.on('end', () => {
        console.log('Response:', data);
        fsPromises.appendFile('new.html',data);
    });
});

// Handle any errors with the request
req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

// End the request (for GET requests, no need to write data)
req.end();
