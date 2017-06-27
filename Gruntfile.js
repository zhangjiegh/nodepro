
'use strict';
/**
 * [使用此模块需要先加载grunt 加载方法可看官网
 *  http://www.gruntjs.net/getting-started
 *
 *  具体配置需根据个人项目自行配置
 *   
 *  使用 grunt server 可以不用反复重启程序
 *  使用 grunt install 打包应用
 *  
 *  ]
 * @param  {[type]} grunt [description]
 * @return {[type]}       [description]
 */
module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);
	var port = require('./core/config').initBase.base.port;
	//自定义json常量
	var config = {

		port:port, //grunt server启动端口

		dist:'dist' //目标目录
	};


	grunt.initConfig({
		config:config,
		pkg: grunt.file.readJSON('package.json'),//引入package.json

		//清除目录 grunt clean --force
		clean:{
			dist:['<%= config.dist %>/<%= pkg.name%>']
		},

		//复制不需要压缩的文件
		copy:{
			main:{
				files:[
					{
						src:'core/config.js',
						dest:'<%= config.dist %>/<%= pkg.name%>/core/config.js'
					},
					{   src:'core/restUrl.js',
						dest:'<%= config.dist %>/<%= pkg.name%>/core/restUrl.js'
					},
					{
						src:'package.json',
						dest:'<%= config.dist %>/<%= pkg.name%>/package.json'
					},
					{
						src:'Gruntfile.js',
						dest:'<%= config.dist %>/<%= pkg.name%>/Gruntfile.js'
					},
					{
						src:'start.sh',
						dest:'<%= config.dist %>/<%= pkg.name%>/start.sh'
					},
					{
						expand:true,
						cwd:'node_modules',
						src:'*/**',
						dest:'<%= config.dist %>/<%= pkg.name%>/node_modules'
					},
					{
						expand:true,
						cwd:'public/layui',
						src:'*/**',
						dest:'<%= config.dist %>/<%= pkg.name%>/public/layui'
					}
				]
			}
		},


		//压缩JS
		uglify:{
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			buildsome:{
				options: {
					report: 'min'//输出压缩率，可选的值有 false(不输出信息)，gzip
				},
				files: [
					{
						'<%= config.dist %>/<%= pkg.name%>/core/initCore.js': ['core/initCore.js']
					},
					{
						'<%= config.dist %>/<%= pkg.name%>/app.js': ['app.js']
					},
					{
						'<%= config.dist %>/<%= pkg.name%>/bin/www': ['bin/www']
					}
				]
			},
			buildall:{
				files: [
					{
						expand:true,
						cwd:'core/util',//js目录下
						src:'**/*.js',//所有js文件
						dest: '<%= config.dist %>/<%= pkg.name%>/core/util'//输出到此目录下
					},
					{
						expand:true,
						cwd:'public/js',//js目录下
						src:'**/*.js',//所有js文件
						dest: '<%= config.dist %>/<%= pkg.name%>/public/js'//输出到此目录下
					},
					{
						expand:true,
						cwd:'routes',//js目录下
						src:'**/*.js',//所有js文件
						dest: '<%= config.dist %>/<%= pkg.name%>/routes'//输出到此目录下
					}
				]
			}
		},


		//压缩图片
		imagemin:{
			dynamic:{
				files:[
					{
						expand: true,
						cwd: 'public/image',
						src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'],
						dest: '<%= config.dist %>/<%= pkg.name%>/public/image'
					}
				]
			}
		},

		//压缩CSS
		cssmin:{
			dist: {
				options: {
					report: 'gzip'
				},
				files: [
					{
						expand: true,
						cwd: 'public/css',
						src: ['**/*.css'],
						dest: '<%= config.dist %>/<%= pkg.name%>/public/css'
					}
				]
			}
		},

		//压缩HTML
		htmlmin:{
			options: {
				removeComments: true,
				removeCommentsFromCDATA: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true
			},
			html: {
				files: [
					{
						expand: true,
						cwd: 'views',
						src: ['**/*.html'],
						dest: '<%= config.dist %>/<%= pkg.name%>/views'
					}
				]
			}
		},

		//shell 执行命令并启动
		shell:{
			options: {
				stderr: false
			},
			stop: {
				command: '<%=config.dist%>/<%= pkg.name%>/start.sh stop'
			},
			another: 'chmod 755 <%=config.dist%>/<%= pkg.name%>/start.sh && <%=config.dist%>/<%= pkg.name%>/sh/start.sh start' // shorthand
		},

		//grunt-concurrent
		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		},
		//后端node.js虚拟服务
		nodemon:{
			options:{},
			dev: {
				options: {
					file: './bin/www',
					args:[],
					ignoredFiles:['node_modules/**'],
					watcedFolders:['public','routes','views'],
					debug:true,
					delayTime:1,
					env:{
						PORT: '<%= config.port%>',
					},
					cwd:__dirname
				}
			}
		},

		//观测变化，自动重启 watch
		watch:{
			jade:{
				files:['views/**'],
				options: {
					livereload: true  //监听前面声明的端口
				},
			},
			js:{
				files:['routes/**','public/**'],
				options: {
					livereload: true  //监听前面声明的端口
				},
			}
		},


	});

	//加载 uglify
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//图片压缩
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	//压缩CSS
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//压缩HTML
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	//加载 copy
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-contrib-eslint');
	// 注册默认任务. 压缩顺序
	grunt.registerTask('install', ['copy','uglify','imagemin','cssmin','htmlmin']);

	//shell
	//grunt.loadNpmTasks('shelljs');


	//启动 || 停止
	grunt.registerTask('start', ['shell']);
	grunt.registerTask('stop', ['shell:stop']);

	//加载server
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.option('force',true);

	//后端node.js虚拟服务
	grunt.registerTask('server', ['concurrent']);

	//默认任务
	grunt.registerTask('default', ['concurrent']);

};
