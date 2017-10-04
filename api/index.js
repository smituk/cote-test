'use strict';

const express = require('express');
const cote = require('cote');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const client = new cote.Requester({name: 'API'});

app.all('/api/:method', (req, resp) => {
console.log(`${req.params.method} was requested with params: %j`, req.query);
	client.send({type: `API_${req.params.method}`, data: Object.assign({}, req.query, req.body)}, (res) => {
console.log(`API_${req.params.method} return result: %j`, res);
		resp.send(res);
	});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
