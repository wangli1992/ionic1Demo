angular.module('app.controllers')
  .controller('homeCtrl',function($scope,$ionicHistory,$state,$ionicActionSheet,$ionicPopup,$rootScope,CustomMethod) {


    $rootScope.$on('secondEvent',function (event,user) {
      $scope.user = user;
      console.log('用户名为：'+$scope.user.username);
    });

    $scope.$on('$ionicView.enter',function (event,username) {
      console.log('enter');
      $scope.isStr = CustomMethod.judgeIsString('1234')
      console.log('大于5吗：'+$scope.isStr );
      $scope.itemArr = ['语文: 89.5','数学: 80','马克思主义: 90','外语: 120','思想品德: 89.5','计算机科学与技术: 89.5'];

    });

    $scope.$on('$ionicView.leave',function (event,username) {
      console.log('leave');
    });


    $scope.$on('$ionicView.unloaded',function (event,username) {
      console.log('unloaded');
    });

    $scope.goToNextPage = function (userId) {
      console.log('next click' + userId);
      $state.go('secondPage', {userId: userId});
    }

    $scope.alertShow = function () {
      console.log('alert show');
      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="data.wifi">',
        title: 'Enter Wi-Fi Password',
        subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.wifi;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      // // Show the action sheet
      // $scope.hideSheet = $ionicActionSheet.show({
      //   buttons: [
      //     { text: '<b>Share</b> This' },
      //     { text: 'Move' }
      //   ],
      //   destructiveText: 'Delete',
      //   titleText: 'Modify your album',
      //   cancelText: 'Cancel',
      //   cancel: function() {
      //     // add cancel code..
      //   },
      //   buttonClicked: function(index) {
      //     console.log('click index:'+index);
      //     return true;
      //   },
      //
      //   destructiveButtonClicked:function () {
      //      console.log('click delete:');
      //     $scope.hideSheet()
      //    }
      //
      // });
      //
      // $timeout(function() {
      //   $scope.hideSheet()
      // }, 2000);
    };



  })
