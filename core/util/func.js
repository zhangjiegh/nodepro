
/**
 * Created by dragon on 16-3-18.
 */

//错误信息
exports.error = {
	code:'-1',
	data:{},
	version:'1.0'
};

//成功
exports.success= {
	code:'0',
	data:{},
	version:'1.0'
};

/**
 * 获取远程请求IP
 * @param req
 * @returns {*}
 */
exports.getClientIp = function (req) {
	return req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
};


/**
 * aes加密
 * @param data
 * @param key
 * @param iv
 * @returns {*}
 */
exports.aes = function (data,key,iv){
	var algorithm = 'aes-128-cbc';
	var crypto      = require('crypto');
	var cipher = crypto.createCipheriv(algorithm, key, iv);
	var encrypted = cipher.update(data, 'binary', 'base64');
	encrypted += cipher.final('base64');

	return encrypted;
};


/**
 * MD5散列
 * @param data
 * @returns {*}
 */
exports.md5= function(data){
	var crypto      = require('crypto');
	var md5         = crypto.createHash('md5');
	md5.update(data);
	var sign        = md5.digest('hex');
	return sign;
};


var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

/**
 * 获取随机数
 * @param n 多少位随机数
 * @returns {string}
 */
exports.generateMixed = function(n) {
	var res = '';
	for(var i = 0; i < n ; i ++) {
		var id = Math.ceil(Math.random()*35);
		res += chars[id];
	}
	return res;
};

var numbers = ['0','1','2','3','4','5','6','7','8','9'];

/**
 * 10个数字
 * @param n
 * @returns {string}
 */

exports.generateNum = function(n) {
	var res = '';
	for(var i = 0; i < n ; i ++) {
		var id = Math.ceil(Math.random()*9);
		res += numbers[id];
	}
	return res;
};
