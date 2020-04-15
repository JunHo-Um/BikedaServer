angular.module('bikeda',[]).controller('dlvrmngmtCtrl', [
  'divrService','$scope' , function( $scope ) {
  var socket = io.connect();
  $scope.logins = [];
  $scope.login = function () {
    console.log( $scope );
    $scope.logins.push( { id: $scope.id, pwd : $scope.pwd } );
    $scope.id = '';
    $scope.pwd = '';
  }
}]);
