angular.module('app.controllers', [])

.controller('ChatsCtrl', ['$scope', 'Chats', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
}])

.controller('ChatDetailCtrl', ['$scope', '$stateParams', 'Chats', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}])

.controller('AccountCtrl', ['$scope', function($scope) {
  $scope.settings = {
    isOpen: true
  }

  $scope.convertMsgtoHtml = function (msg) {
    console.log('shuchule');
    return convertMsgtoHtml(msg);
};

  $scope.changeClick = function () {

    console.log('toggle is open :'+$scope.settings.isOpen);
  }

}])

// .controller('PersonCtrl',function ($scope) {
//    console.log('person');
// });
