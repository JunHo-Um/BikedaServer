// 모듈 가져오기
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var routes = require('./routes');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var rfs = require('rotating-file-stream');

// create a write stream (in append mode)
var accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

require('dotenv').config();
// 어플리케이션 설정
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');			// 템플릿 엔진
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));				// 파비콘
app.use(morgan('combined', { stream: accessLogStream }));			// 로그 기록
// app.use(express.bodyParser());			// 요청 본문 파싱
// app.use(express.methodOverride());		// 구식 브라우저 메소드 지원
// app.use(app.router);						// 라우팅

// 정적 리소스 처리
// app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_modules')));
app.use(express.static(path.join(__dirname, 'app_object')));


// 라우팅
app.get('/', routes.index);
app.get('/branch', routes.branch);
app.get('/test', routes.test);


io.on( 'connection', function ( socket ) {
  console.log( "User connection" );
  socket.on( 'disconnect', function () {
    console.log( "User disconnection" );
  })
  socket.on( 'login', function ( obj ) {
    console.log( obj );
    data = obj;
    io.emit('login', data );
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
