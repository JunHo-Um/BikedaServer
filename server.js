// 모듈 가져오기
var express = require('express');
var path = require('path')
var favicon = require('serve-favicon');
var app = express();
var debug = require('debug')('bikedaserver:server');
var http = require('http')
var bodyParser = require('body-parser');

require('dotenv').config();
// 어플리케이션 설정
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');			// 템플릿 엔진
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET, POST');
 res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
 next();
});

// 라우팅
var index = require('./routes/index');
var admin = require('./routes/admin');

app.use('/', index );
app.use('/admin', admin);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var io = require('socket.io')(server);
io.on( 'connection', function ( socket ) {
  console.log( "User connection" );
  socket.on( 'disconnect', function () {
    console.log( "User disconnection" );
  })
  socket.on( 'test', function ( msg ) {
    console.log( msg );
    io.emit('test', msg);
  })
});
function normalizePort(val) {
  var port = parseInt(val, 10);

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

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
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

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
