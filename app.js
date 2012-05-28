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
    var args = {}, charset = 'lcharset=utf-8';

    if (uri.query) {
	    uri.query.split('&')
	        .map(function(s) {
	            var _tmp = s.split('=');
	            args[_tmp[0]] = _tmp[1];
	        });

		route.handler(args, res);
    }
	else {
		route.not_found(res);
	}

}).listen(PORT);

util.puts("Server at http://localhost:" + PORT.toString() + '/');

