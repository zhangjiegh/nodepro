/**
 * Created by apple on 16/8/15.
 */
//redis-cluster
var RedisCluster= require('ioredis');

var cluster;//redis 客户端

/**
 * 建立链接
 * @returns {*}
 */
exports.redisClusterConnect=function(config){
	var redisClusterOption = config.redisClusterOption;
	if (cluster == undefined ){
		cluster = new RedisCluster.Cluster(redisClusterOption.address);
	}
	return cluster;
};



/**
 * 保存
 * @param key
 * @param value
 * @param timeout 秒
 * @param func
 */
exports.setValue=function(key,value,timeout){

	if(undefined == cluster)
		return;
	cluster.set(key,value);
	if (timeout!=undefined && timeout>0){
		cluster.expire(key,timeout);
	}
};

/**
 * 取值
 * @param key
 * @param value
 * @param timeout
 * @param func
 */
exports.getValue=function(key,func){

	if(undefined == cluster)
		return;
	cluster.get(key,function(err,res){
		func(err,res);
	});
};