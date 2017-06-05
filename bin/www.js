/**
 * Created by Administrator on 2017/6/2.
 *
 */

const app = require('../app');
const http = require('http');
//const config = require('../core/config');


// 获取CPU 的数量
const cluster = require('cluster');
const os =require('os');
const numCPUs = os.cpus().length;

/*const workers ={};
if (cluster.isMaster){
    // 初始开启与CPU 数量相同的工作进程
    for (let i = 0; i < numCPUs; i++) {
        let worker = cluster.fork();
        workers[worker.pid] = worker;
    }
    return;
}
console.log('[worker] ' + "start worker ..." + cluster.worker.id);*/

const server = http.createServer(app);
server.listen(app.settings.port);
server.on('error', onError);
server.on('listening', onListening);

// 当一个工作进程结束时，重启工作进程
cluster.on('death',function (worker) {
    delete workers[worker.pid];
    worker = cluster.fork();
    workers[worker.pid] = worker;
});

// 当主进程被终止时，关闭所有工作进程
process.on('SIGTERM',function(){
    for (let pid in workers) {
        process.kill(pid);
    }
    process.exit(0);
});

//监听全局错误
process.on('uncaughtException', function (err) {
    console.log('错误: ' + err);
});

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + '无权限启动');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error("启动失败,"+ bind + ' 已经被使用...');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log("["+' 启动成功,端口号' + bind+"]");
}
