angular.module('app.controllers')
  .controller('homeCtrl',function($scope,$ionicHistory,$state,$ionicActionSheet,$ionicPopup) {

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
    }
  })
