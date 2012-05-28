#!/usr/bin/env node

var pp = function(o) { return JSON.stringify(o,null,'  ')};
var L = console.log;
var route = require('./lib/route');

function pad(n) {
	if (n.length == 1)
		n = '0'+n;
	if (n.length == 2)
		return '0'+n
	return n;
}

if (process.argv.length === 3) {
	var busRoute = process.argv.pop();
	if (busRoute.length < 1 || route.length > 3) {
		L("Invalid route number, needs to be 1 -> 999");
		process.exit(99);
	}

	busRoute = pad(busRoute);
	route.get(busRoute);
}
