var https = require('https');
var fs = require('fs');
var options = {
        key: fs.readFileSync('/keys/nl.key'),
        cert: fs.readFileSync('/keys/nl.crt')
};

// Defaults
config = {
	host: '0.0.0.0',
        port: 8060,
        imageData: "R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
}

// Handle commandline arguments
process.argv.forEach(function (val, index, array) {
        switch (val) {
                case '--port':
                        config.port = array[++index];
                        break;
        }
});

// Store imageData buffer
buffer = new Buffer(config.imageData, encoding='base64');

// Create/Start server
https.createServer(options, function (request, response) {
        response.writeHead(200, {'Content-Type': 'image/gif'});
        response.write(buffer.toString('binary'), 'binary');
        response.end();
}).listen(config.port, config.host);

console.log('pixelserv.js started on port: ' + config.port);

