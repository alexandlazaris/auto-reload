// Include http module.
var http = require("http");

// Create the server. Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.
http.createServer(function (request, response) {
    //this supposedly fixes things
    request.on('readable', function () {
       request.read();
    });
	// Attach listener on end event.
	// This event is called when client sent all data and is waiting for response.
	request.on("end", function () {
		// Write headers to the response.
		// 200 is HTTP status code (this one means success)
		// Second parameter holds header fields in object
		// We are sending plain text, so Content-Type should be text/plain
		response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
			'Content-Type': 'text/plain'
		});
        console.log("Success! Connected to server.");
        for(var i = 0; i < 10; i++)
            response.write("Hello there\n");
        response.end('Hello HTTP!');
	});
// Listen on the 8080 port.
}).listen(8080);
console.log("waiting for connection ... ");