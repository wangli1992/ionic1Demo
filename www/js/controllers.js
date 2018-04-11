angular.module('app.controllers', [])

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    isOpen: true
  }

  $scope.changeClick = function () {

    console.log('toggle is open :'+$scope.settings.isOpen);
  }

})

// .controller('PersonCtrl',function ($scope) {
//    console.log('person');
// });
