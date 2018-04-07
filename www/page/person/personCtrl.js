angular.module('app.controllers')
  .controller('personCtrl',function($scope,$ionicHistory) {

    $scope.$on("$ionicView.enter()",function () {
      console.log('person page --');
    })
  })
