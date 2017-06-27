var express  = require('express');
var app      = express();

//var favicon      = require('serve-favicon');
var path         = require('path');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

//路由打印
var morgan = require('morgan');
app.use(morgan('dev'));

//视图模板 html代替ejs后缀
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

//基础配置
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));//favicon.ico 在 public下
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); //COOKIES
app.use(express.static(path.join(__dirname, 'public')));
//引入配置
var config = require('./core/config');
//初始化函数
config.intiFunc(app);
module.exports = app; 
