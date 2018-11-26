const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('web-application:server');
const http = require('http');
const https = require('http');
const cors = require('cors');
const hostaddr = "http://sbcon.ddns.net:3000/";
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/sbcon.ddns.net/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/sbcon.ddns.net/fullchain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const 
//const hostaddr = "http://localhost:3000/";

// Require REST-Routes
const sessionRouter = require('./api/routes/session');
const gpsRouter = require('./api/routes/gps');
const accelerometerRouter = require('./api/routes/accelerometer');
const batterieRouter = require('./api/routes/batterie');
const bluetoothRouter = require('./api/routes/bluetooth');
const gyroskopRouter = require('./api/routes/gyroskop');
const kompassRouter = require('./api/routes/kompass');
const lichtRouter = require('./api/routes/licht');
const luftfeuchtigkeitRouter = require('./api/routes/luftfeuchtigkeit');
const magnetometerRouter = require('./api/routes/magnetometer');
const netzwerklokalisierungRouter = require('./api/routes/netzwerklokalisierung');
const proximityRouter = require('./api/routes/proximity');
const schrittzaehlerRouter = require('./api/routes/schrittzaehler');
const schwerkraftRouter = require('./api/routes/schwerkraft');
const umgebungsluftdruckRouter = require('./api/routes/umgebungsluftdruck');
const umgebungstemperaturRouter = require('./api/routes/umgebungstemperatur');
const wifiRouter = require('./api/routes/wifi');

// APP-Instance
const app = express();

// Set up body enconding, logger and static folder
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());

// Set REST-Routes
app.use('/api/gps', gpsRouter);
app.use('/api/session', sessionRouter);
app.use('/api/accelerometer', accelerometerRouter);
app.use('/api/batterie', batterieRouter);
app.use('/api/bluetooth', bluetoothRouter);
app.use('/api/gyroskop', gyroskopRouter);
app.use('/api/kompass', kompassRouter);
app.use('/api/licht', lichtRouter);
app.use('/api/luftfeuchtigkeit', luftfeuchtigkeitRouter);
app.use('/api/magnetometer', magnetometerRouter);
app.use('/api/netzwerklokalisierung', netzwerklokalisierungRouter);
app.use('/api/proximity', proximityRouter);
app.use('/api/schrittzaehler', schrittzaehlerRouter);
app.use('/api/schwerkraft', schwerkraftRouter);
app.use('/api/umgebungsluftdruck', umgebungsluftdruckRouter);
app.use('/api/umgebungstemperatur', umgebungstemperaturRouter);
app.use('/api/wifi', wifiRouter);


// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '3000');
const sshport = normalizePort(process.env.PORT || '3443');

app.set('port', sshport);

// Create HTTP and https server.
const server = http.createServer(app);
const sshserver = https.createServer(credentials, app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

sshserver.listen(sshport);
sshserver.on('error', onError);
sshserver.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//welcome page

var router = express.Router();
var db = require('./api/models/database');



router.get('/', function (req, res) {

  res.send('<h1><a href="' + hostaddr + 'api/">API Version 1.0</a></h1></br><a href="' + hostaddr + 'download/">Download App</a>');

});
router.get('/api', function (req, res) {

  var htmlcode = '<html><head> <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link> <link href="https://getbootstrap.com/docs/4.0/examples/offcanvas/offcanvas.css" rel="stylesheet"></head><body><div class="my-3 p-3 bg-white rounded box-shadow"><h6 class="border-bottom border-gray pb-2 mb-0">Data</h6><div class="media text-muted pt-3"><ul>';
  db.pool.getConnection(function (err, con) {
    if (err) return res.status(400).send("Database Error");
    else
      con.query("Show tables;", function (err, result, fields) {
        if (err) throw err;
        result.forEach(function (obj) {
          var name = obj.Tables_in_lokalapp;
          htmlcode = htmlcode + '<li><a href="' + hostaddr + 'api/' + name + '">' + name + '</a></li>';
        });
        res.send(htmlcode + "</ul></div></div></body></html>");
        res.end();
        con.release();
      });
  });
});

router.get('/download', function (req, res) {

  var file = __dirname + '/public/download/app-release.apk';
  res.download(file); // Set disposition and send it.

});


app.use('/', router);
app.use('/api', router);
app.use('/download', router);

// Event listener for HTTP server "error" event..
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
