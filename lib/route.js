var host = 'nb.translink.ca';
var path = '/rideapi.ashx';
var uri_tpl = '?cp=gsr%2F';
var L = console.log;
var pp = function(o) { return JSON.stringify(o,null,'  ')};

var http  = require("http"), charset = ' charset=utf8';

function get(args, res, callback) {

	var client = http.createClient(80, host);
	var request = client.request('GET', path+uri_tpl+args.route);

	var JSON_data = '';

	request.on('response', function(response) {
		response.on('data', function(chunk) {
			JSON_data += chunk;
		});

		response.on('end', function () {
			callback(JSON_data, res);
		});
	});

	request.write('');
	request.end();
}

exports.get = get;

function handler(args, res) {

	if (Object.keys(args).length > 0) {

		get(args, res, function(raw, res) {
			var output = '';
			if (args.callback) {
				output = args.callback+"('"+raw+"');";
				content_type = 'application/javascript;';
			}
			else {
				output = raw;
				content_type = 'application/json;';	
			}

			res.writeHead('200', {
				'Content-Type': content_type+charset,
				'Content-Length': output.length
			});

			res.write(output);
		});
	}
}

exports.handler = handler;

function not_found(res) {

	var output = 'Not found';
	res.writeHead('404', {
			'Content-Type': 'text/plain;'+charset,
			'Content-Length': output.length
	});
	res.write(output);
}

exports.not_found = not_found;
