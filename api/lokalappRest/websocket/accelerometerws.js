module.exports = function (sshserver) {

    const WebSocket = require('ws');
    var db = require('../models/database');
    var url = require('url');
    //const wss = new WebSocket.Server({ server: sshserver, path: "/ws/lokalapp/accelerometer" });

    const wssaccelerometer = new WebSocket.Server({ noServer: true });
    const wssgyroskop = new WebSocket.Server({ noServer: true });



    wssaccelerometer.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            var d = Date.now();
            ws.send("test failed -" + (d - Date.now()) + "ms");
            var putData = new JSONObject(message);
            var sql = 'INSERT INTO accelerometer (id, timestamp, x, y, z, session_id) VALUES (NULL, \'' + putData.timestamp + '\', \'' + putData.x + '\', \'' + putData.y + '\', \'' + putData.z + '\', \'' + putData.session_id + '\')';
            db.pool.getConnection(function (err, con) {
                if (err) return ws.send("Database Error");
                else
                    con.query(sql, function (err, result) {
                        if (err) return ws.send(err);
                        ws.send("mysql query succes in " + (d - Date.now()) + "ms");
                        ws.send("Data put in Session " + putData.session_id);                       
                        con.release();
                    });
            });

        });

        ws.send('Connection Accelerometer establised');
    });

    wssgyroskop.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            var d = Date.now();
            ws.send("test failed -" + (d - Date.now()) + "ms");
            var putData = new JSONObject(message);
            var sql = 'INSERT INTO gyroskop (id, timestamp, x, y, z, session_id) VALUES (NULL, \'' + putData.timestamp + '\', \'' + putData.x + '\', \'' + putData.y + '\', \'' + putData.z + '\', \'' + putData.session_id + '\')';
            db.pool.getConnection(function (err, con) {
                if (err) return ws.send("Databse Error");
                else
                    con.query(sql, function (err, result) {
                        if (err) return ws.send(err);                        
                        ws.send("mysql query succes in " + (d - Date.now()) + "ms");
                        ws.send("Data put in Session " + putData.session_id);                 
                        con.release();
                    });
            });
        });
        ws.send('Connection Gyroskop establised');
    });



    sshserver.on('upgrade', function upgrade(request, socket, head) {
        const pathname = url.parse(request.url).pathname;

        if (pathname === '/ws/lokalapp/accelerometer') {
            wssaccelerometer.handleUpgrade(request, socket, head, function done(ws) {
                wssaccelerometer.emit('connection', ws, request);
            });
        } else if (pathname === '/ws/lokalapp/gyroskop') {
            wssgyroskop.handleUpgrade(request, socket, head, function done(ws) {
                wssgyroskop.emit('connection', ws, request);
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