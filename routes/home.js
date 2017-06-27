var express = require('express');
var router  = express.Router();
var console = require('../core/util/logger');

router.get('/', function(req, res) {
	console.log('------2------');
	res.render('home');
});
module.exports = router;
