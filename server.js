const express = require('express'); // load express
const app = express(); // setup express
const port = process.env.PORT || 5000;

const http = require('http');
const server = http.createServer(app);

server.listen(port, () => {
    console.log('listening');
})

app.use(express.static('public'));

app.use(express.json({ limit: '0.5mb' })); // set limit for data transfer