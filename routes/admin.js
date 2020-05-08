var express = require('express');
var router = express.Router();

// 관리자 로그인 화면
router.get('/', function( req, res, next ){
  res.render( 'admin/login' );
});

router.post('/main', function( req, res, next ){
  res.render( 'admin/main' );
});

module.exports = router;
