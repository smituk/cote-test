'use strict';

const cote = require('cote');
const request = require('request');

const service = new cote.Responder({ name: 'Binlist', key: 'binlist' });

service.on('GATE_binlist', (req, cb) => {
	console.log('GATE_binlist was receive a request with params: %j', req);
	request.get(`https://lookup.binlist.net/${req.number}`, {timeout: 10, headers: {"Accept-Version":"3"}}, (e, r, body) => {
		console.log('GATE_binlist was receive response from HTTP API with response: %j', body);
		cb(body);
	});
});
