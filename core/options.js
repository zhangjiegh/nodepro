/**
 * Created by jie on 2017/6/30.
 *
 */
module.exports ={
    base:{
        port:'3000',
        name: 'MyDemo'
    },

    //session配置
    sessionOption:{
        type:{
            local:"local",//使用本地
            redis:"redis"//使用redis
        },
        select:"local",//如果选择 local则使用本地,否则使用redis
        opt:{
            session_key: "sid",
            secret:"node",
            resave:true,
            saveUninitialized:true
        },
        conf:{
            host:"yk.emomo.cc",
            port:6378,
            ttl:2592000,
            prefix:"node_"
        }
    },
};