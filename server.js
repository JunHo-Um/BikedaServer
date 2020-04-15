/**
 * Module dependencies.
 */

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

var port = 3000;		// 어플리케이션 포트
// 어플리케이션 설정
app.set('port', port);					// 웹 서버 포트
app.set('views', __dirname + '/views');	// 템플릿
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

// socket io

var data = [];

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
// 서버 실행
http.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
