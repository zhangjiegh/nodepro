/**
 * Created by Administrator on 2017/6/2.
 *
 */
const app = require('../app');
const http = require('http');
// 获取CPU 的数量
const cluster = require('cluster');
const os =require('os');
const numCPUs = os.cpus().length;

const onError = error => {
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
};

const onListening =() => {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log("["+' 启动成功,端口号' + bind+"]");
};

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

