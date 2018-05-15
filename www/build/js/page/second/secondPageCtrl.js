angular.module('app.controllers')
.controller('secondPageCtrl',['$scope', '$ionicHistory', '$stateParams', '$state', '$rootScope', 'toaster', function($scope,$ionicHistory,$stateParams,$state,$rootScope,toaster) {

  //$scope.receiveNum = '';

  console.log($stateParams);

   $scope.user = {
     username:'',
     userpsw:'',
     userId:''
   };

   $scope.personArray = [
     { userAvatar:'img/ben.png',
     name :'zhangsan'},
     { userAvatar:'img/adam.jpg',
       name :'lisi'},
     { userAvatar:'img/mike.png',
       name :'wangwu'},
     { userAvatar:'img/max.png',
       name :'zhaoliu'},
     { userAvatar:'img/perry.png',
       name :'naguang'},
   ];



      this.receiveNum = $stateParams.userId;
   // console.log($ionicHistory.goBack());

  $scope.loginClick = function () {
    $rootScope.$broadcast('secondEvent',$scope.user);

    console.log("username:"+$scope.user.username+"--userpsw:"+$scope.user.userpsw);

    $state.go('thirdPage');

 }

   $scope.goBack = function () {
   console.log('go back');
   $ionicHistory.nextViewOptions({
     disableBack: true
   });
          //$state.go('tab.home');
    $ionicHistory.goBack();
  }

  //保存
  $scope.save = function () {
    console.log('save succeed:'+toaster.warning.body);

   // toaster.warning({title: " alert title", body: "do you have eating we want to go to future holtal,are you together?"});
    toaster.success({title: " succeed title", body: "do you have eating we want to go to future holtal,are you together?"});
  }
}])

