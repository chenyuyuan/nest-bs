
var http = require('http'); 
var qs = require('querystring'); 
var data = { 
    a: 123, 
    time: new Date().getTime()
};//这是需要提交的数据 

var content = qs.stringify(data); 
var options = { 
    hostname: '127.0.0.1', 
    port: 3000, 
    path: '/user/all', 
    method: 'GET' 
}; 
var req = http.request(options, function (res) { 
    console.log('STATUS: ' + res.statusCode); 
    console.log('HEADERS: ' + JSON.stringify(res.headers)); 
    res.setEncoding('utf8'); 
    res.on('data', function (chunk) { 
        console.log('BODY: ' + chunk); 
    }); 
}); 
req.on('error', function (e) { 
    console.log('problem with request: ' + e.message); 
}); 
req.end();








/* 模拟线程暂停 */
const sleep = function (time) {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
    return promise;
}
// async function asyncTest() {
//     let i = 0;
//     while (i < 5) {
//         var date = new Date();
//         console.log(`time: ${date} i=${i}`);
//         i++;
//         console.log("进程 " + process.argv[2] + " 执行。" );
//         await sleep(5000);   //暂停1秒
//     }
// }

// console.log('==开始执行异步函数==');
// asyncTest();
// console.log('==我是异步函数后面的内容==');


