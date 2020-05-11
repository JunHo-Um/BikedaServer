var express = require('express');
var router = express.Router();

// 관리자 로그인 화면
router.get('/', function( req, res, next ){
  res.render( 'admin/login' );
});

router.post('/main', function( req, res, next ){
  console.log( req.body.adminId );
  res.render( 'admin/main', req.body );
});

module.exports = router;
