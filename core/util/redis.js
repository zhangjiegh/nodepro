/**
 * redis使用
 * @type {exports|module.exports}
 */
var redis   = require('redis');

var client;//redis 客户端

/**
 * 建立链接
 * @returns {*}
 */
exports.redisConnect=function(config){

	var redisOption = config.redisOption;

	var host    = redisOption.host;
	var port    = redisOption.port;
	var option  = redisOption.option;


	if(undefined == client){
		client  = redis.createClient(port,host,option);
		client.on('error', function (err) {
			console.log('redis 发生错误: ' + err);
		});
		console.log('[redis 启动链接成功,端口号:'+port+']');
	}

	return client;
};


/**
 * 断开链接
 */
exports.disConnect=function(){

	if(undefined == client)
		return;

	client.quit();
	console.log('redis 断开链接成功...');
	client = undefined;
};

/**
 * 保存
 * @param key
 * @param value
 * @param timeout 秒
 * @param func
 */
exports.setValue=function(key,value,timeout){

	if(undefined == client)
		return;

	client.set(key, value,redis.print);
	if(timeout>0){
		client.expire(key,timeout);
	}
};

/**
 * 取值
 * @param key
 * @param value
 * @param timeout
 * @param func
 */
exports.getValue=function(key,func){

	if(undefined == client)
		return;

	client.get(key,function(err, reply){
		func(err,reply);
	});
};

/**
 * map保存
 * @param key
 * @param hashKey
 * @param values
 * @param timeout
 */
exports.hSet=function(key,hashKey,values,timeout){

	if(undefined == client)
		return;

	client.hset(key,hashKey,values,redis.print);
	if(timeout>0){
		client.expire(key,timeout);
	}
};

/**
 * map取值
 * @param key
 * @param hashKey
 * @param func
 */
exports.hGet=function(key,hashKey,func){

	if(undefined == client)
		return;

	client.hget(key,hashKey,function(err, reply){
		func(err,reply);
	});
};

/**
 * 获取keys
 * @param key
 * @param func
 */
exports.hKeys=function(key,func){

	if(undefined == client)
		return;

	client.hkeys(key,function(err, replies){
		func(err, replies);
	});
};