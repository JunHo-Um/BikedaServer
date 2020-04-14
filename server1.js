/**
 * Module dependencies.
 */

// 모듈 가져오기
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = 3000;		// 어플리케이션 포트
// 어플리케이션 설정
app.set('port', port);					// 웹 서버 포트
app.yse( express.static( path.join( __dirname, 'public') ) );

// app.configure('development', function(){	// 개발 버전
//   app.use(express.errorHandler());			// 에러 메세지
// });

// 라우팅
app.get('/', routes.index);
app.get('/branch', routes.branch);
app.get('/test', routes.test);
// app.get('/list', todo.list);
// app.post('/add', todo.add);
// app.post('/complete', todo.complete);
// app.post('/del', todo.del);
io.on( 'connection', function ( socket ) {
  console.log( "User connection" );
  socket.on( 'disconnect', function () {
    console.log( "User disconnection" );
  })
});
// 서버 실행
http.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
