/**
 * 异常捕捉
 * @param app
 */
exports.errorInit = function(app,config) {

	var errorConf = config.errorOption;
   
	/**
	 * 404异常
	 */
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	app.use(function(err, req, res) {

		if(!errorConf.isWebApi){//网页
			/**
			 * 开发环境错误
			 * error 错误统一处理
			 */
			if (app.get('env') === 'dev') {
				res.status(err.status || 500);
				res.render(errorConf.devErragePage, {
					message: err.message,
					error: err
				});
			}else{

				/**
				 * 生产环境
				 * error 错误统一处理
				 */
				
				res.status(err.status || 500);
				res.render(errorConf.errorPage);//输出错误页面
			}
		}else{//web api 或者 AJAX提交
			/**
			 * 开发环境错误
			 * error 错误统一处理
			 */
			if (app.get('env') === 'dev') {
				res.status(err.status || 500);
				res.send({
					message: err.message,
					error: err
				});
			}else{

				/**
				 * 生产环境
				 * error 错误统一处理
				 */
				
				res.status(err.status || 500);
				res.send(errorConf.errJson);//输出错误页面
			}
		}
	});
};