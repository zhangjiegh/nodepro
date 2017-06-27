/*
 * Created by dragon on 16-7-19.
 * 通用配置
 */
//引入初始化函数
var func = require('./initCore');

/**
 * 基础配置
 * 
 */
exports.initBase = {

	base:{
		port:80,
		openCluster:false
	},
	//日志配置
	loggerOption:{
		'customBaseDir' :'D:/adminDemo/logs/',
		'customDefaultAtt' :{
			'type': 'dateFile',
			'absolute': true,
			'alwaysIncludePattern': true
		},
		'appenders': [
				{'type': 'console', 'category': 'console'},
				{'pattern': 'debug_yyyyMMddhh.logs', 'category': 'logDebug'},
				//{'pattern': 'warn_yyyyMMddhh.logs', 'category': 'logWarn'},
				//{'pattern': 'error_yyyyMMddhh.logs', 'category': 'logErr'},
				//{'pattern': 'trace_yyyyMMddhh.logs', 'category': 'logTrace'},
				//{'pattern': 'fatal_yyyyMMddhh.logs', 'category': 'logFatal'},
				{'pattern': 'info_yyyyMMddhh.logs', 'category': 'logInfo'}
		],
		'replaceConsole': true,
		'levels':{ 'logDebug': 'DEBUG', 'logInfo': 'INFO', 'logWarn': 'WARN', 'logErr': 'ERROR','logTrace':'TRACE','logFatal':'FATAL','console':'debug'}
	},

	//session配置
	sessionOption:{
		type:{
			local:'local',//使用本地
			redis:'redis'//使用redis
		},
		select:'local',//如果选择 local则使用本地,否则使用redis
		opt:{
			session_key: 'sid',
			secret:'node',
			resave:true,
			saveUninitialized:true
		},
		conf:{
			host:'', //redis host
			port:6378,
			ttl:2592000,
			prefix:'node_'
		}
	},

	//过滤器配置
	filtersOption:{
		needBody:true,//打印请求参数
		type:{
			backend:'backend',//后台,在urls填写则不拦截
			fortend:'fortend'//前台,在url填写则拦截
		},
		select:'backend',//声明前台还是后台
		loginUrl:'/index',//登录接口
		urls:[ //添加过滤连
			'/index',
			'/home',
			'/http/async',
			'/http/page',
			'/http/ajax',

		]
	},

	//路由配置
	routesOption:[
		{'route':'index','path':'/'},
		{'route':'home','path':'/home'},
		{'route':'http','path':'/http'},
	
	],

	//错误配置
	errorOption:{
		isWebApi:false,//是否web api
		errorPage:'error', //生产环境
		devErragePage:'error',  //开发环境
		errJson:{//错误信息
			code:'-1',
			message:'系统请求异常',
			data:undefined,
			version:'1.0'
		}
	},

	//cookies配置
	cookiesOption:{
		domain:'.emomo.cc',
		path:'/',
		maxAge:86400000,
		secure:false,
		httpOnly:true
	},

	//http https 默认选项
	httpOption:{
		host:'127.0.0.1',
		port:80,
		httpType:'http',
		postType:'json'
	},

	//redis 配置
	redisOption:{
		isStart:false,//是否启动
		host:'pay.emomo.cc',
		port:6379,
		expire:60,
		option:{}
	},

	//redis-cluster 配置
	redisClusterOption:{
		isStart:false,
		address:[
			{host:'192.168.0.133',port:6379},
			{host:'192.168.0.133',port:6380},
			{host:'192.168.0.133',port:6381},
			{host:'192.168.0.133',port:6382},
			{host:'192.168.0.133',port:6383},
			{host:'192.168.0.133',port:6384}
		]
	},
};

/**
 * 初始化环境函数
 */
exports.intiFunc = function(app){
	console.log('初始化环境...');
	//调用初始化函数
	func.intiFunc(app,this.initBase);
};


/**
 * 设置cookies
 * @param res
 * @param key
 * @param value
 */
exports.setCookies = function(res,key,value){
	func.setCookies(res,key,value,this.initBase.cookiesOption);
};



/**
 * 删除cookies
 * @param res
 * @param key
 * @param value
 */
exports.deleteCookies = function(res,key){
	var cookiesOption={
		domain:this.initBase.cookiesOption.domain,
		path:this.initBase.cookiesOption.path,
		maxAge:0,
		secure:false,
		httpOnly:true
	};
	func.setCookies(res,key,undefined,cookiesOption);
};
