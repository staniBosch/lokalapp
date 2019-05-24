module.exports = function (s) {

    var db = require('../models/database');

    s.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            var d = Date.now();
            ws.send("test failed -"+ (d-Date.now())+"ms");
             db.pool.getConnection(function (err, con) {
        
                if (err) return ws.send("Database Error: " + err);
                else
                    con.query("Select * from lokalisierung;", function (err, result, fields) {
                        if (err) ws.send(err);
                        var rows = JSON.parse(JSON.stringify(result[0]));
                        ws.send("mysql query succes in "+(d-Date.now())+"ms"); 
                        ws.send(rows.toString());                     
                    });
            });

        });

        ws.send('something');
    });


}