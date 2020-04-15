
// angular.module('bikeda',[]).controller('loginCtrl', ['LoginService','LoginObj',  '$scope' , function( LoginService, LoginObj, $scope ) {
angular.module('bikeda',[]).controller('loginCtrl', [ '$scope' , function( $scope ) {
  // $scope.loginObj = LoginObj;
var socket = io.connect();
  socket.on('login' , function (err, loginObj ) {
    LoginService.login(err, loginObj );
  })
}]);


angular.module('bikeda').factory( 'LoginService', [ 'LoginObj', function ( LoginObj ) {
  console.log( this );

  var LoginService = {};

  LoginService.login = function (err, loginObj ) {
    LoginObj.of( loginObj );
  }

  return LoginService;
}]);
angular.module('bikeda').service( 'LoginObj',  function ( ) {
  console.log( this );
      var LoginObj = this;
      var instance = {};

      LoginObj.init = function () {
        return angular.copy( instance, LoginObj );
      };

      LoginObj.of = function ( loginObj ) {
        angular.extend( LoginObj, loginObj );
      };

      angular.copy( this, instance );
});

// $( function() {
//   var socket = io();
//
//   $('form').submit( function () {
//     socket.emit('test', 'aaaa');
//     return false;
//   });
//   socket.on( 'test',  function ( msg ) {
//     $('#ttt').append($('<li>').text( msg ));
//   });
//
// });
