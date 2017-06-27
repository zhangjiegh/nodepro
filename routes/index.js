var express = require('express');
var router  = express.Router();

router.get('/index', function(req, res) {
	var data={};
	data.aside = {};
	res.render('index',data);
});
module.exports = router;
