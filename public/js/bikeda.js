//var app = angular.module('bikeda');

function loginCtrl( $scope ) {
  var socket = io.connect();
      console.log( $scope );
      $scope.login = function () {
        $scope.logins.push( { id:$scope.id, pwd:$scope.pwd })
        $scope.id = '';
        $scope.pwd = '';

        socket.emit( 'login' , $scope.logins );
      }
};
// angular.module('bikeda').controller( 'loginCtrl', function ( $scope ) {
//     var socket = io.connect();
//
//     $scope.login = function () {
//       $scope.logins.push( { id:$scope.id, pwd:$scope.pwd })
//       $scope.id = '';
//       $scope.pwd = '';
//
//       socket.emit( 'login' , $scope.logins );
//     }
// });

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
