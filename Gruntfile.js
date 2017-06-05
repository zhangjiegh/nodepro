'use strict';

module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    //自定义json常量
    var config = {

        port:3000, //grunt server启动端口
        dist:'dist' //目标目录
    };
    grunt.initConfig({
        config: config,
        pkg: grunt.file.readJSON('package.json'),//引入package.json

        //清除目录 grunt clean --force
        clean: {
            dist: ['<%= config.dist %>/<%= pkg.name%>']
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

    //加载server
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.option('force',true);

    //后端node.js虚拟服务
    grunt.registerTask('server', ['concurrent']);
};