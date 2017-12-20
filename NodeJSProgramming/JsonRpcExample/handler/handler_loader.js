let handler_loader = {};

let handler_info = require('./handler_info');
let utils = require('jayson/lib/utils');

handler_loader.init = function(jayson, app, api_path) {
    console.log('handler_loader.init 호출.');
    return initHandlers(jayson, app, api_path);
}

function initHandlers(jayson, app, api_path) {
    let handlers = {};

    let infoLen = handler_info.length;
    console.log('설정에 정의된 핸들러의 수: %d', infoLen);

    for(let i=0; i<infoLen; i++) {
        let curItem = handler_info[i];

        let curHandler = require(curItem.file);
        console.log('%s 파일에서 모듈 정보를 읽어옴', curItem.file);

        handlers[curItem.method] = new jayson.Method({
            handler: curHandler,
            collect: true,
            params: Array
        });

        console.log('메소드 [%s]이(가) 핸들러로 추가.', curItem.method);
    }

    let jaysonServer = jayson.server(handlers);

    console.log('패스 [' + api_path + ']에서 RPC 호출을 라우팅하도록 설정.');

    app.post(api_path, function(req, eres, next) {
        console.log('패스 [' + api_path + ']에서 JSON-RPC 호출.');

        let options = {};

        let contentType = req.headers['content-type'] || '';
        if(!RegExp('application/json', 'i').test(contentType)) {
            console.log('application/json 타입이 아님.');
            return error(415);
        }

        if(!req.body || typeof(req.body) !== 'object') {
            console.log('요청 body가 비정상.');
            return error(400, 'Request body must be parsed');
        }

        console.log('RPC 함수를 호출.');
        jaysonServer.call(req.body, function(error, success) {
            let response = error || success;

            console.log(response);

            utils.JSON.stringify(response, options, function(err, body) {
                if(err) return err;

                if(body) {
                    let headers = {
                        'Content-Length': Buffer.byteLength(body, 'utf-8'),
                        'Content-Type': 'application/json'
                    };

                    res.writeHead(200, headers);
                    res.write(body);
                } else {
                    res.writeHead(204);
                }
                res.end();
            });
        });

        function error(code, headers) {
            res.writeHead(code, headers || {});
            res.end();
        }
    });
    return handlers;
}
module.exports = handler_loader;