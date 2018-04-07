angular.module('app.controllers')
.controller('secondPageCtrl',function($scope,$ionicHistory,$stateParams) {
  $scope.receiveNum = '';

  console.log($stateParams);
  this.receiveNum = $stateParams.userId;
  console.log('userId is:'+this.receiveNum );
// $scope.goBack = function () {
//   console.log('go back');
//
//   $ionicHistory.goBack();
// }
})
