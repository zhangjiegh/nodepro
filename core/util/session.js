var session       = require('express-session');
var RedisStore    = require('connect-redis')(session);


// 配合express用的方法
exports.sessionInit = function(app,config) {


	var sessionOpt = config.sessionOption;

	//redis
	if (sessionOpt.select==sessionOpt.type.redis){
		app.use(session({
			store:new RedisStore(sessionOpt.conf),//配置
			session_key: sessionOpt.session_key,
			secret: sessionOpt.opt.secret,
			resave: sessionOpt.opt.resave,
			saveUninitialized: sessionOpt.opt.saveUninitialized
		}));
	}else if (sessionOpt.select==sessionOpt.type.local){//本地session
		app.use(session({
			type:'local',
			session_key: sessionOpt.opt.session_key,
			secret:sessionOpt.opt.secret,
			resave:sessionOpt.opt.resave,
			saveUninitialized:sessionOpt.opt.saveUninitialized
		}));
	}else {//redis-cluster

	}
};
