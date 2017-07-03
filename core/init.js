const fs = require('fs');
const path      = require( 'path' ) ;
const BASE_PATH = path.join(__dirname , '/../' );
const config = require('./config');

let CONF_PATH;
if(fs.existsSync('/apps/project/node/conf/demo/options.js')){
    CONF_PATH = '/apps/project/node/conf/demo/';
}else{
    CONF_PATH = BASE_PATH + '/core/';
}

const options= require(CONF_PATH + "options");


module.exports.initCore = function (app) {
    const port = normalizePort(process.env.PORT || options.base.port);
    app.set('port',port);

    //======================session======================
    require('./session')(app,options.sessionOption);

    //===================过滤配置=========================
    require('./filter')(app,config);


    //===================路由配置=========================
    const routesOption = config.routesOption;

    if(undefined == routesOption||0 == routesOption.length){
        console.error("路由配置出错,HTTP服务器退出,请检查routes.json");
        process.exit();
    }
    for(let i=0;i<routesOption.length;i++){
        app.use(routesOption[i].path, require("../routes/"+routesOption[i].route));
    }
};


function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}