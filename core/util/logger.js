var log4js = require('log4js');

/**
 * 初始化日志
 * @param objConfig
 */
exports.loggerInit = function(objConfig){
	var path   = require('path');
	// 检查配置文件所需的目录是否存在，不存在时创建
	if(objConfig.appenders){
		var baseDir = objConfig['customBaseDir'];
		var defaultAtt = objConfig['customDefaultAtt'];

		for(var i= 0, j=objConfig.appenders.length; i<j; i++){
			var item = objConfig.appenders[i];
			if(item['type'] == 'console')
				continue;

			if(defaultAtt != null){
				for(var att in defaultAtt){
					if(item[att] == null)
						item[att] = defaultAtt[att];
				}
			}
			if(baseDir != null){
				if(item['filename'] == null)
					item['filename'] = baseDir;
				else
					item['filename'] = baseDir + item['filename'];
			}
			var fileName = item['filename'];
			if(fileName == null)
				continue;
			var pattern = item['pattern'];
			if(pattern != null){
				fileName += pattern;
			}
			var category = item['category'];
			if(!isAbsoluteDir(fileName)){//path.isAbsolute(fileName))
				throw new Error('配置节' + category + '的路径不是绝对路径:' + fileName);
			}

			var dir = path.dirname(fileName);
			checkAndCreateDir(dir);
		}
	}

	// 目录创建完毕，才加载配置，不然会出异常
	log4js.configure(objConfig);
};


//引用日志
var consoleLog = log4js.getLogger('console');
exports.logger = consoleLog;

exports.trace = function(msg){
	var logTrace = log4js.getLogger('logTrace');
	if(msg == null)
		msg = '';
	logTrace.trace(msg);
	consoleLog.trace(msg);
};


exports.fatal = function(msg){
	var logFatal = log4js.getLogger('logFatal');
	if(msg == null)
		msg = '';
	logFatal.fatal(msg);
	consoleLog.fatal(msg);
};


exports.debug = function(msg){
	var logDebug = log4js.getLogger('logDebug');
	if(msg == null)
		msg = '';
	logDebug.debug(msg);
	consoleLog.debug(msg);
};

exports.info = function(msg){
	var logInfo  = log4js.getLogger('logInfo');
	if(msg == null)
		msg = '';
	logInfo.info(msg);
	consoleLog.info(msg);
};

exports.log = function(msg){
	var logInfo  = log4js.getLogger('logInfo');
	if(msg == null)
		msg = '';
	logInfo.info(msg);
	consoleLog.info(msg);
};
exports.warn = function(msg){
	var logWarn  = log4js.getLogger('logWarn');
	if(msg == null)
		msg = '';
	logWarn.warn(msg);
	consoleLog.warn(msg);
};

exports.error = function(msg, exp){
	var logErr   = log4js.getLogger('logErr');
	if(msg == null)
		msg = '';
	if(exp != null)
		msg += '\r\n' + exp;
	logErr.error(msg);
	consoleLog.error(msg);
};

// 配合express用的方法
exports.use = function(app) {
	var logInfo  = log4js.getLogger('logInfo');
	//页面请求日志, level用auto时,默认级别是WARN
	app.use(log4js.connectLogger(logInfo, {level:'debug', format:':method :url'}));
};

/**
 * 判断日志目录是否存在，不存在时创建日志目录
 * @param dir
 */
function checkAndCreateDir(dir){
	var fs = require('fs');
	if(!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
}

/**
 * 指定的字符串是否绝对路径
 * @param path
 * @returns {boolean}
 */
function isAbsoluteDir(path){
	if(path == null)
		return false;
	var len = path.length;

	var isWindows = process.platform === 'win32';
	if(isWindows){
		if(len <= 1)
			return false;
		return path[1] == ':';
	}else{
		if(len <= 0)
			return false;
		return path[0] == '/';
	}
}