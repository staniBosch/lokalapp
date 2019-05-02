const express = require('express');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rfs = require('rotating-file-stream')
const debug = require('debug')('web-application:server');
const http = require('http');
const https = require('https');
const cors = require('cors');
const fs = require('fs');

const hostaddr = "http://sbcon.ddns.net:88/";
const privateKey = fs.readFileSync('/etc/letsencrypt/live/sbcon.ddns.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sbcon.ddns.net/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sbcon.ddns.net/chain.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate, ca: ca };

//const hostaddr = "http://localhost:3000/";


// APP-Instance
const app = express();



// Set up body enconding, logger and static folder
//logger.token('device', function (req, res) { return req.headers['user-agent'].split('(')[1].split(')')[0] })
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: '/home/pi/pi-share/log'
});

app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url" :status "[Device] :user-agent"', { stream: accessLogStream }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(xmlparser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());

//Add all Routes for Services
const lokalAppRoutes = require('./api/lokalappRest/paths')(app, hostaddr);

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '88');
const sshport = normalizePort(process.env.PORT || '3443');

//app.set('port', sshport);

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


router.get('/', function (req, res) {

  res.send('<h1><a href="' + hostaddr + 'api/lokalapp">LokalApp-API Version 1.0</a></h1></br>');

});

app.use('/', router);



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
