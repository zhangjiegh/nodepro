/**
 * Created by Administrator on 2017/6/2.
 *
 */
const express= require('express');
const app = express();
const path = require('path');
const bodyParser= require('body-parser');
const cookieParser=require('cookie-parser');
const morgan= require('morgan');

//路由打印
app.use(morgan('dev'));

//视图模板 html代替ejs后缀
app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

//基础配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//解析json和form
app.use(cookieParser()); //COOKIES
app.use(express.static(path.join(__dirname, 'public')));

const config = require('./core/config');
const init = require('./core/initCore').init;
console.log(config.port);
app.set('port', process.env.PORT ||config.port);

init(app,config);

module.exports = app;