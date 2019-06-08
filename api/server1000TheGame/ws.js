module.exports = function (server) {

    const WebSocket = require('ws');
    //var db = require('../models/database');
    var url = require('url');
    //const wss = new WebSocket.Server({ server: sshserver, path: "/ws/lokalapp/accelerometer" });

    const wss1000TheGame = new WebSocket.Server({ noServer: true });
   

    wss1000TheGame.on('connection', function connection(ws, req) {
        ws.on('message', function incoming(message) {
            ws.send(message);     
        });
        const ip = req.connection.remoteAddress;        
        ws.send('Connection 1000TheGame establised, your ip is:'+ip+' and your name is:'+ req.params);
    });

    server.on('upgrade', function upgrade(request, socket, head) {
        const pathname = url.parse(request.url).pathname;

        if (pathname === '/ws/1000TheGame') {
            wss1000TheGame.handleUpgrade(request, socket, head, function done(ws) {
                wss1000TheGame.emit('connection', ws, request);
            });        
        } else {
            socket.destroy();
        }
    });

    /*wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            var d = Date.now();
            ws.send("test failed -" + (d - Date.now()) + "ms");
            db.pool.getConnection(function (err, con) {

                if (err) return ws.send("Database Error: " + err);
                else
                    con.query("Select * from " + message + ";", function (err, result, fields) {
                        if (err) ws.send(err);
                        var rows = JSON.stringify(result);
                        ws.send(rows);
                        ws.send("mysql query succes in " + (d - Date.now()) + "ms");
                        con.release();
                    });
            });

        });

        ws.send('something');
    });
    */


}