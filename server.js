const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('web-application:server');
const http = require('http');
const cors = require('cors');

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
const netzwerklokalisierungRouter = require('./api/routes/netzwerk-lokalisierung');
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
app.use('/api/gps', batterieRouter);
app.use('/api/batterie', bluetoothRouter);
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
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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

// Event listener for HTTP server "error" event.
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
