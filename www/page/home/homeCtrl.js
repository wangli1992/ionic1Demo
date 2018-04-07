angular.module('app.controllers')
  .controller('homeCtrl',function($scope,$ionicHistory,$state) {

    $scope.goToNextPage = function (userId) {
      console.log('next click' + userId);
      $state.go('secondPage', {userId: userId});
    }
  })
