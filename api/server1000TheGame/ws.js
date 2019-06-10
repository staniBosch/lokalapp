module.exports = function (server) {

    const WebSocket = require('ws');
    //var db = require('../models/database');
    var url = require('url');
    //const wss = new WebSocket.Server({ server: sshserver, path: "/ws/lokalapp/accelerometer" });

    const wss1000TheGame = new WebSocket.Server({ noServer: true });

    function noop() { }

    function heartbeat() {
        this.isAlive = true;
    }

    wss1000TheGame.on('connection', function connection(ws, req) {
       
        ws.isAlive = true;
        ws.on('pong', heartbeat);

        ws.on('message', function incoming(message) {
            wss1000TheGame.clients.forEach(element => {
                if (element != ws)
                    element.send(message);
            });
        });
        ws.on('close', function close() {
            wss1000TheGame.clients.forEach(element => {
                element.send(ws.user+" disconnected!");
          });          
        });
        //const ip = req.connection.remoteAddress;
        //const parameters = url.parse(req.url, true);
        //ws.user = parameters.query.name;        
        //wss1000TheGame.clients.forEach(element => {
        //    if(element != ws) element.send(element.user);
        //});

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

    const interval = setInterval(function ping() {
        wss1000TheGame.clients.forEach(function each(ws) {
          if (ws.isAlive === false){ 
            wss1000TheGame.clients.forEach(element => {
                element.send(ws.user+" disconnected!");
            });  
            return ws.terminate();
          }
          ws.isAlive = false;
          ws.ping(noop);
        });
      }, 30000);


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