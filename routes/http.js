var express = require('express');
var router  = express.Router();
var console = require('../core/util/logger');
var http = require('../core/util/http');
//var getClientIp = require('../core/util/utils').getClientIp;
var url = require('../core/restUrl').urls;
var async = require('async');

//分页 前端GET请求过来 然后使用Get方法请求后台数据
router.get('/page', function(req, res) {

	var body ={
		rows:10,
		page:1
	};

	if (req.query.rows) {
		body.rows = req.query.rows;
	}
	if (req.query.page) {
		body.page = req.query.page;
	}

	var restFulPotion = {
		host: url.tngou.host,
		port: url.tngou.port,
		path: url.tngou.loreList+'?page='+body.page+'&rows='+body.rows
	};

	var data={};
	data.aside = {
		menu:'M1',
		subMenu:'M1-S2'
	};
	data.page = body.page;
	data.rows = body.rows;

	http.doGet(restFulPotion,function(status,d){
		if (status == 200 && d.status ==true) {
			data.data =d.tngou;
			data.total =Math.ceil(d.total/body.rows);
			console.log(data.data);
			//console.log(d);
			res.render('http/page',data);
		}else {
			data.mes = d.mes;
			data.backUrl = '/index';
			res.render('mes',data);
		}
	});

});

//异步请求
router.get('/async', function(req, res) {

	var data={};
	data.aside = {
		menu:'M1',
		subMenu:'M1-S1'
	};

	var tasklist = [];

	var body ={
		rows:10,
		page:1
	};
	var restFulPotion = {
		host: url.tngou.host,
		port: url.tngou.port,
		path: url.tngou.loreList+'?page='+body.page+'&rows='+body.rows
	};

	tasklist.push(function (callback) {
		http.doGet(restFulPotion,function(status,d){
			if (status == 200 && d.status ==true) {
				data.data =d.tngou;			
				callback(null, data);	
			}else {
				data.mes = d.mes;
				callback('err', data);
			}	
		});
	});

	var city = encodeURI('广州');
	var restFulPotion1 = {
		host: url.heweather.host,
		port: url.heweather.port,
		httpType:'https',
		path: url.heweather.byCity+'?city='+city+'&key='+url.heweather.key,
	};

	tasklist.push(function (n,callback) {	
		http.doGet(restFulPotion1,function(status,d){		
			
			if (status == 200 && d.HeWeather5[0].status =='ok') {
				data.weather = d.HeWeather5[0].now;
				console.log(data.weather);
				callback(null, data);
			}else {
				data.mes ='天气错误';
				callback('err', data);
			}
				
		});
	});

	async.waterfall(tasklist, function (err, result) {
		if(err){
			data.backUrl = '/index';
			res.render('mes',data);
		}else{
			res.render('http/async',data);
		}
	});	
});

router.get('/ajax', function(req, res) {
	var body ={
		rows:10,
		page:1
	};

	if (req.query.rows) {
		body.rows = req.query.rows;
	}
	if (req.query.page) {
		body.page = req.query.page;
	}

	var restFulPotion = {
		host: url.tngou.host,
		port: url.tngou.port,
		path: url.tngou.loreList+'?page='+body.page+'&rows='+body.rows
	};

	console.log('restFulPotion =',restFulPotion);

	var data={};
	data.aside = {
		menu:'M1',
		subMenu:'M1-S3'
	};
	data.page = body.page;
	data.rows = body.rows;

	http.doGet(restFulPotion,function(status,d){
		if (status == 200 && d.status ==true) {
			data.data =d.tngou;
			data.total =Math.ceil(d.total/body.rows);
			console.log(data.data);
			//console.log(d);
			res.render('http/ajax',data);
		}else {
			data.mes = d.mes;
			data.backUrl = '/index';
			res.render('mes',data);
		}
	});
});

//分页 前端Post请求过来 然后使用GET方法请求后台数据
router.post('/ajax', function(req, res) {
	var body ={
		rows:10,
		page:1
	};

	if (req.body.rows) {
		body.rows = req.body.rows;
	}
	if (req.body.page) {
		body.page = req.body.page;
	}

	/*
	post 使用的方法
	var restFulPotion = {
		host: url.tngou.host,
		port: url.tngou.port,
		path: url.tngou.loreList,
		body: JSON.stringify(body)
	};
	*/
	var restFulPotion = {
		host: url.tngou.host,
		port: url.tngou.port,
		path: url.tngou.loreList+'?page='+body.page+'&rows='+body.rows
	};

	console.log('----------ajax--------');
	console.log(restFulPotion);
	var data={};
	data.aside = {
		menu:'M1',
		subMenu:'M1-S2'
	};
	data.page = body.page;
	data.rows = body.rows;

	http.doPost(restFulPotion,function(status,d){
		if (status == 200 && d.status ==true) {
			data.data =d.tngou;
			data.total =Math.ceil(d.total/body.rows);
			data.code = 200;
		}else {
			data.mes = d.mes;
			data.backUrl = '/index';
			data.code = 404;
		}
		res.send(data);
	});
});


module.exports = router;
