var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    res.redirect('/login');
});

router.get('/login', function(req, res) {
    res.render('login');
});


router.post('/login', function(req, res) {

    if (req.body.name==undefined){
        res.send(500);
    }

    if (req.body.password ==undefined){
        res.send(500);
    }

    req.session.name = req.body.name;
    res.send(200);
    //res.redirect('/login');
});

router.get('/index', function(req, res) {
	res.render('index');
});

module.exports = router;
