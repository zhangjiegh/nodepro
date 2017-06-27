/*参考
http://yijiebuyi.com/blog/6f1ffb7a464f03e2fbbe3fb53c2184ca.html
 */
var bcrypt = require('bcrypt');

module.exports=[
	{
		connection: 'mysql', //使用的连接  
		tableName: 'user',
		//identity:'user',//模型名，默认对应表名，当没有 tableName 属性时,此模型名对应表名称.
		schema: true, //强制模式  
		//属性(配置) ---"类似"于 Mongoose 中的 Schema
		autoCreatedAt:true, //此字段为 true 时,数据表中会多一列用来记录数据插入时间
		autoUpdatedAt:true,  //此字段为 true 时,数据表中会多一列用来记录数据更新时间
		autoPK:true, //此字段为 true 时,数据表会自动生成 id 唯一标识字段
		attributes: {  
			username: {  
				type: 'string',  
				// 校验器 解释为必填项  
				required: true,  
				minLength: 6,  
				maxLength: 17,
				primaryKey:true
			},  
			password: {  
				type: 'string',

				//校验器  
				required: true,
				minLength: 6  
			},  
			birthday: {  
				type: 'date',  
				after: new Date('1900-01-01'),  
				before: function() {  
					return new Date();  
				}
			}
		},
		// 生命周期回调 --类似于Mongoose中间件  
		beforeCreate: function(value, cb) {  
			//针对模型中的pssword 字段进行 hash 算法加密,然后写入到数据库中.
			bcrypt.hash(value.password, 10, function(err, hash) {
				if(err) return cb(err);
				value.password = hash;
				cb();
			});
			//value.firstname  = value.username + value.password;
		},
		beforeUpdate:function(value, cb) {
			bcrypt.hash(value.password, 10, function(err, hash) {
				if(err) return cb(err);
				value.password = hash;
				cb();
			});
		} 
	}

];
