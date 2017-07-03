const session       = require('express-session');
const RedisStore    = require('connect-redis')(session);


// 配合express用的方法
module.exports = function(app,sessionOpt) {

    if (sessionOpt.select==sessionOpt.type.redis){//redis
        app.use(session({
            store:new RedisStore(sessionOpt.conf),//配置
            session_key: sessionOpt.session_key,
            secret: sessionOpt.opt.secret,
            resave: sessionOpt.opt.resave,
            saveUninitialized: sessionOpt.opt.saveUninitialized
        }));
    }else if (sessionOpt.select==sessionOpt.type.local){//本地session
        app.use(session({
            type:"local",
            session_key: sessionOpt.opt.session_key,
            secret:sessionOpt.opt.secret,
            resave:sessionOpt.opt.resave,
            saveUninitialized:sessionOpt.opt.saveUninitialized
        }));
    }else {//redis-cluster

    }

};
