module.exports = function (wss) {

    var db = require('../models/database');


    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            ws.send("hey man");


             db.pool.getConnection(function (err, con) {
                if (err) return ws.send("Database Error: " + err);
                else
                    con.query("Show tables;", function (err, result, fields) {
                        if (err) throw err;
                        ws.send(result);                        
                    });
            });

        });

        ws.send('something');
    });


}