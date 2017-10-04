'use strict';

const cote = require('cote');

const service = new cote.Responder({ name: 'Pinger' });
const client = new cote.Requester({name: 'Pinger client'});

service.on('API_ping', (req, cb) => {
	console.log('API_ping was receive a request with params: %j', req);
	client.send({type: 'GATE_binlist'}, (binlist) => {
		console.log('API_ping was receive a response from GATE_binlist with response: %j', binlist);
		cb({response: 'pong', params: req, binlist: binlist });
	});
});
