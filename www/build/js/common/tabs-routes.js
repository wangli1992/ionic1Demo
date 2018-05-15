angular.module('tabs.routes',['tabs.controllers'])
  .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

    $stateProvider

      .state('tab', {
        url: '/tab11',
        abstract: true,
        templateUrl: 'common/tabs.html',
        controller:"tabCtrl"
      })

  }]);
