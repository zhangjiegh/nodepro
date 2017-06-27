/**
 * Created by dragon on 16-7-30.
 * 初始化环境函数
 */
exports.intiFunc = function(app,configData){

	//console.log(configData);

	//==================log4js==========================
	var log4js = require('./util/logger');
	log4js.loggerInit(configData.loggerOption);

	//======================waterline======================
	//var waterline = require('../waterline/init');
	//waterline.waterlineInit();

	//======================session======================
	var session = require('./util/session');
	session.sessionInit(app,configData);

	//======================filter======================
	var filter = require('./util/filter');
	filter.filterInit(app,configData);


	//===================路由配置=========================

	//路由配置
	var routesConf = configData.routesOption;
	if(undefined == routesConf||0 == routesConf.length){
		console.error('路由配置出错,HTTP服务器退出,请检查routes.json');
		process.exit();
	}
	for(var i=0;i<routesConf.length;i++){
		app.use(routesConf[i].path, require('../routes/'+routesConf[i].route));
	}


	//======================异常处理==========================
	//var errorHandler = require('./util/error');
	//errorHandler.errorInit(app,configData);


	//====================== redis ==========================
	var redisOption = configData.redisOption;
	if(redisOption.isStart){
		var redis = require('./util/redis');
		redis.redisConnect(configData);
	}
	
	//===================== redis-cluster====================
	var redisClusterOption = configData.redisClusterOption;
	if (redisClusterOption.isStart){
		var cluster = require('./util/redis-cluster');
		cluster.redisClusterConnect(configData);
	}

};

/**
 * 设置cookies
 * @param res
 * @param key
 * @param value
 * @param configData
 */
exports.setCookies = function(res,key,value,configData){
	var cookiesOption = configData;
	res.cookie(key, value, {
		httpOnly:cookiesOption.httpOnly,
		domain:cookiesOption.domain,
		path:cookiesOption.path,
		maxAge:cookiesOption.maxAge,
		secure:cookiesOption.secure
	});
};





