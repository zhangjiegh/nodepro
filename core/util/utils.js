var http = require('http');

/**
 * [getClientIp 获取远程请求IP]
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
exports.getClientIp= function (req) {
	var ipAddress;
	var forwardedIpsStr = req.header('x-forwarded-for'); 
	if (forwardedIpsStr) {
		var forwardedIps = forwardedIpsStr.split(',');
		ipAddress = forwardedIps[0];
	}
	if (!ipAddress) {
		ipAddress = req.connection.remoteAddress;
	}
	console.log('ipAddress ='+ipAddress);
	return ipAddress;
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

/**
 * [get30day 获取30天前的日期]
 * @return {[type]} [description]
 */
exports.get30day = function () {

	//获取当前日期
	var myDate = new Date();
	var nowY = myDate.getFullYear();
	var nowM = myDate.getMonth()+1;
	var nowD = myDate.getDate();
	var endDate = nowY+'-'+(nowM<10 ? '0' + nowM : nowM)+'-'+(nowD<10 ? '0'+ nowD : nowD);

	//获取三十天前日期
	var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30);
	var lastY = lw.getFullYear();
	var lastM = lw.getMonth()+1;
	var lastD = lw.getDate();
	var startDate=lastY+'-'+(lastM<10 ? '0' + lastM : lastM)+'-'+(lastD<10 ? '0'+ lastD : lastD);//三十天之前日期

	var date = {
		startDate:startDate,
		endDate:endDate
	};
	return date;
};

/**
 * 根据 ip 获取获取地址信息
 */

exports.getIpInfo = function(ip, cb) {
	var sina_server = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=';
	var url = sina_server + ip;
	http.get(url, function(res) {
		var code = res.statusCode;
		if (code == 200) {
			res.on('data', function(data) {
				try {
					cb(null, JSON.parse(data));
				} catch (err) {
					cb(err);
				}
			});
		} else {
			cb({ code: code });
		}
	}).on('error', function(e) { cb(e); });
};