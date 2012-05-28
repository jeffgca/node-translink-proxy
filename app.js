var PORT = 8001;
// HOST = '127.0.0.1';

var util = require('util'),
fs = require('fs'),
url = require('url'),
http = require('http')
route = require('./lib/route');

var L = console.log;
var pp = function(o) { return JSON.stringify(o,null,'  ')};



http.createServer(function(req, res) {
	var uri = url.parse(req.url);
    var args = {}, charset = 'charset=utf-8';

    if (uri.query) {
	    uri.query.split('&')
	        .map(function(s) {
	            var _tmp = s.split('=');
	            args[_tmp[0]] = _tmp[1];
	        });

		route.handler(args, res);
    }
	else {
		var output = 'Not found';
		res.writeHead('404', {
				'Content-Type': 'text/plain'+charset,
				'Content-Length': output.length
		});
		res.write(output);
	}

}).listen(PORT);

util.puts("Server at http://localhost:" + PORT.toString() + '/');

