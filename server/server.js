'use strict';

require('./env.js');   // load environment variables
var http = require('http');
var dir = process.cwd();

http.createServer(function(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    return res.end();
  }

  if (req.url === '/health') {
    if (req.method === 'POST') {
      res.writeHead(405, {'Content-Type': 'text/plain'}); // not allowed
      return res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    return res.end('ok');
  }

  if (req.method !== 'POST') {
    res.writeHead(405, {'Content-Type': 'text/plain'}); // not allowed
    return res.end();
  }

  if (req.url !== '/') {
    res.writeHead(404, {'Content-Type': 'text/plain'}); // not fonud
    return res.end();
  }

  var body = '';
  req.on('data', function(chunk) {
    body += chunk.toString();
  });

  req.on('end', function() {
    if (process.env.VERBOSE && process.env.VERBOSE === 'true') {
      console.log('request body', body);
    }

    var postBody = {};

    try {
      postBody = JSON.parse(body);
    } catch (e) {
      res.writeHead(400, {'Content-Type': 'text/plain'}); // bad request
      res.end(JSON.stringify({'message': 'Not a valid JSON.'}));
      return;
    }

    console.log('request coming', postBody);

    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    });

    return res.end();

    function error(err) {
      err.statusCode = err.statusCode || 500;
      res.writeHead(err.statusCode, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
      });

      if (err.statusCode === 409) {
        return res.end(JSON.stringify({'message': err.message}));
      }

      if (process.env.VERBOSE && process.env.VERBOSE === 'true') {
        console.error('error while attempting to create a PA', err);
      }

      console.error(err);
      return res.end();
    }
  });
}).listen(3000);
