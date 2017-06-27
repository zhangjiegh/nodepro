var Waterline = require('waterline');  
var mysqlAdapter = require('sails-mysql');  
//var mongoAdapter = require('sails-mongo');  
var beanArr = require('./bean');
var bcrypt = require('bcrypt');
//var uuid = require('uuid');
// 数据集合  
/*var User = Waterline.Collection.extend({
	connection: 'mysql', //使用的连接  
	tableName: 'user',
	schema: true, //强制模式  
	//属性(配置) ---"类似"于 Mongoose 中的 Schema  
	attributes: {  
		username: {  
			type: 'string',  
			// 校验器  
			required: true,  
			minLength: 6,  
			maxLength: 17  
		},  
		password: {  
			type: 'string',  
			//校验器  
			required: true,
			minLength: 6  
		},  
		birthday: {  
			type: 'date',  
			after: new Date('1990-01-01'),  
			before: function() {  
				return new Date();  
			}  
		},  
		address: {  
			type: 'string',  
		},  
		createTime: {  
			type: 'date',  
			//在某个时间点之前  
			before: '2020-01-01',  
			//在某个时间点之后  
			after: function(){  
				return new Date();  
			}  
		}  
	},  
	// 生命周期回调 --类似于Mongoose中间件  
	beforeCreate: function(value, cb) {        
		console.log('beforeCreate executed',value);  
		return cb();  
	}  
}); */

// 适配器  
var adapters = {  
	//mongo: mongoAdapter,  
	mysql: mysqlAdapter,  
	default: 'mysql'  
};  
	
// 连接
var connections = { 
	mysql: {  
		adapter: 'mysql',  
		host:'localhost',
		port:3306,
		user:'root',
		password:'root',
		database:'info'
	}
};  

var config = {  
	adapters: adapters,  
	connections: connections
};

var message = {  
	username: 'tianzi',  
	password: '654321',  
	birthday:'1995-02-03',  
};

module.exports.waterlineInit = function () {
	var orm = new Waterline();  

	// 加载数据集合
	for (var i = 0; i < beanArr.length; i++) {
		orm.loadCollection(Waterline.Collection.extend(beanArr[i]));
	}
	
	//初始化  
	orm.initialize(config, function(err, models) {  
		if(err) {  
			console.error('orm initialize failed.', err); 
			return;  
		}  
		console.log('数据库初始化成功',models);

		models.collections.user.findOrCreate(message, function(err, user1){  
			console.log('创建user', user1);

			models.collections.user.findOneByUsername(message.username,function (err,user2) {
				console.log('查找user', user2);

				bcrypt.compare(message.password,user2.password,function (err, res) {
					if (err) {
						console.log(err);
						return;
					}
					if (res) {
						message.password = '123456';
						message.birthday = '2000-02-03';
						models.collections.user.update(user2,message).exec(function (err, user3) {
							console.log('更新user',user3);
						});
					}       
				});
			});
		});
	});
};

this.waterlineInit();