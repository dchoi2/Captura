var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/test', function(request, response) {
  response.sendFile(path.join(__dirname, '../public', '/test/testng.html'));
});

router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '../public', '/index.html'));
});

module.exports = router;
