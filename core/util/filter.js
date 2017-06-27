/**
 * 过滤器
 * @param app
 * @param config
 */

exports.filterInit = function(app,config) {

	//过滤器配置
	var filterConf = config.filtersOption;

	app.use(function (req, res, next) {

		if (filterConf.needBody) {
			console.log('请求地址  =',req.originalUrl,'method =',req.method);    
			console.log('请求body  =',req.body);
			console.log('请求query =',req.query);
		}

		next();
	});

	/**
	 * 重定向 ,后台会重定向
	 */
	app.use(function(req, res, next) {

		if(filterConf.select == filterConf.type.backend){//后台
			if ('/' == req.originalUrl) {
				res.redirect('/index');
			}else{
				next();
			}
		}else{//前台
			next();
		}

	});


	/**
	 *  过滤器，规则：
	 *  如果是前台则配置需要拦截的接口
	 *
	 */
	app.use(function(req, res, next) {

		if(filterConf.select == filterConf.type.backend){//后台

			//--系统过滤连
			if (checkNoFilter(req)) {	   
				next();
			} else {
				
				//--获取登陆 session
				var currentUser  = req.session.userInfo;

				//console.log('过滤器currentUser------------' + currentUser);

				if (currentUser != undefined && currentUser != null) {
					console.log('用户登陆状态-------------');
					next();
				} else {
					res.redirect(filterConf.loginUrl);
				}

			}

		}else if(filterConf.select == filterConf.type.fortend){//前台

			if (checkNoFilter(req)) {//拦截，并且登陆后重定向回拦截的页面

				//--获取登陆 session
				//var currentUser  = req.session.currentUser;

				console.log('过滤器currentUser------------' + currentUser);

				if (currentUser != undefined && currentUser != null) {
					console.log('用户登陆状态-------------');
					next();
				} else {

					//记录路径,重定向到login 路径
					var redirectUrl = req.originalUrl;

					var url = '';
					if(redirectUrl!=undefined && redirectUrl!=null && redirectUrl != ''){
						url = filterConf.loginUrl +'?redirectUrl=' +redirectUrl;
					}else{
						url = filterConf.loginUrl;
					}

					res.redirect(url);
				}

			} else {
				next();
			}

		}else{
			next();
		}
	});

	/**
	 * 系统过滤连
	 * @param req
	 * @returns {boolean}
	 */
	function checkNoFilter(req){
		var url = req.originalUrl;
		var urls = filterConf.urls;
		//console.log('系统过滤连-------------'+urls);
		for(var i=0;i<urls.length;i++){
			var noFilter = urls[i];
			//console.log(noFilter);

			if(url.indexOf(noFilter) == 0){
				return true;
			}
		}
		return false;
	}
};

