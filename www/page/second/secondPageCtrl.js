angular.module('app.controllers')
.controller('secondPageCtrl',function($scope,$ionicHistory,$stateParams) {

  $scope.receiveNum = '';
  console.log($stateParams);
  this.receiveNum = $stateParams.userId;
   console.log($ionicHistory.goBack());
   $scope.goBack = function () {
   console.log('go back');
   $ionicHistory.goBack();
}
})
