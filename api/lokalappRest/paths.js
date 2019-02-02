module.exports = function (app, hostaddr) {
    var express = require('express');
    var router = express.Router();
    var db = require('./models/database');
    
    router.get('/', function (req, res) {
        var htmlcode = '<html><head> <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link> <link href="https://getbootstrap.com/docs/4.0/examples/offcanvas/offcanvas.css" rel="stylesheet"></head><body><div class="my-3 p-3 bg-white rounded box-shadow"><h6 class="border-bottom border-gray pb-2 mb-0">Data</h6><div class="media text-muted pt-3"><ul>';
        db.pool.getConnection(function (err, con) {
            if (err) return res.status(400).send("Database Error");
            else
                con.query("Show tables;", function (err, result, fields) {
                    if (err) throw err;
                    result.forEach(function (obj) {
                        var name = obj.Tables_in_lokalapp;
                        htmlcode = htmlcode + '<li><a href="' + hostaddr + 'api/lokalapp/' + name + '">' + name + '</a></li>';
                    });
                    res.send(htmlcode + '</ul></div><a href="' + hostaddr + 'api/lokalapp/download/">Download App</a></div></body></html>');
                    res.end();
                    con.release();
                });
        });
    });
    router.get('/download', function (req, res) {

        var file = __dirname + '/public/download/sensordatensammlerAppAndroid.apk';
        res.download(file); // Set disposition and send it.

    });
    app.use('/api/lokalapp', router);
    //app.use('/api/lokalapp/download', router);


    // Require REST-Routes
    const sessionRouter = require('./routes/session');
    const gpsRouter = require('./routes/gps');
    const accelerometerRouter = require('./routes/accelerometer');
    const batterieRouter = require('./routes/batterie');
    const bluetoothRouter = require('./routes/bluetooth');
    const gyroskopRouter = require('./routes/gyroskop');
    const serviceRouter = require('./routes/service');
    const kompassRouter = require('./routes/kompass');
    const lichtRouter = require('./routes/licht');
    const lokalisierungRouter = require('./routes/lokalisierung');
    const luftfeuchtigkeitRouter = require('./routes/luftfeuchtigkeit');
    const magnetometerRouter = require('./routes/magnetometer');
    const messwerterouteRouter = require('./routes/messwerteroute');
    const messwerteRouter = require('./routes/messwerte');
    const netzwerklokalisierungRouter = require('./routes/netzwerklokalisierung');
    const proximityRouter = require('./routes/proximity');
    const routeRouter = require('./routes/route');
    const schrittzaehlerRouter = require('./routes/schrittzaehler');
    const schwerkraftRouter = require('./routes/schwerkraft');
    const umgebungsluftdruckRouter = require('./routes/umgebungsluftdruck');
    const umgebungstemperaturRouter = require('./routes/umgebungstemperatur');
    const wifiRouter = require('./routes/wifi');
    const waypointRouter = require('./routes/waypoint');

    // Set REST-Routes
    app.use('/api/lokalapp/gps', gpsRouter);
    app.use('/api/lokalapp/session', sessionRouter);
    app.use('/api/lokalapp/accelerometer', accelerometerRouter);
    app.use('/api/lokalapp/batterie', batterieRouter);
    app.use('/api/lokalapp/bluetooth', bluetoothRouter);
    app.use('/api/lokalapp/gyroskop', gyroskopRouter);
    app.use('/api/lokalapp/service', serviceRouter);
    app.use('/api/lokalapp/kompass', kompassRouter);
    app.use('/api/lokalapp/licht', lichtRouter);
    app.use('/api/lokalapp/lokalisierung', lokalisierungRouter);
    app.use('/api/lokalapp/luftfeuchtigkeit', luftfeuchtigkeitRouter);
    app.use('/api/lokalapp/magnetometer', magnetometerRouter);
    app.use('/api/lokalapp/messwerteroute', messwerterouteRouter);
    app.use('/api/lokalapp/messwerte', messwerteRouter);
    app.use('/api/lokalapp/netzwerklokalisierung', netzwerklokalisierungRouter);
    app.use('/api/lokalapp/proximity', proximityRouter);
    app.use('/api/lokalapp/route', routeRouter);
    app.use('/api/lokalapp/schrittzaehler', schrittzaehlerRouter);
    app.use('/api/lokalapp/schwerkraft', schwerkraftRouter);
    app.use('/api/lokalapp/umgebungsluftdruck', umgebungsluftdruckRouter);
    app.use('/api/lokalapp/umgebungstemperatur', umgebungstemperaturRouter);
    app.use('/api/lokalapp/wifi', wifiRouter);
    app.use('/api/lokalapp/waypoint', waypointRouter);

}