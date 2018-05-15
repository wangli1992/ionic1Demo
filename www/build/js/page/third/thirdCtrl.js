/**
 * Created by hewz on 2018/4/11.
 */
angular.module('app.controllers')
.controller('thirdCtrl',['$scope', '$ionicHistory', '$state', function($scope,$ionicHistory,$state) {
  $scope.goBack = function () {
    console.log('third');
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $ionicHistory.goBack();
  }
}])
