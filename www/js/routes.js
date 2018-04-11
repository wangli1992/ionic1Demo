angular.module('routes',['app.controllers','tabs.routes'])
  .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {


    //缓存信息配置
    //$ionicConfigProvider.views.cach

    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.views.maxCache(15);


    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.navBar.alignTitle("center");
    $ionicConfigProvider.backButton.text('back');
    $ionicConfigProvider.backButton.previousTitleText('返回');
    //$ionicConfigProvider.backButton.backButtonIcon('ios-arrow-back');

    $stateProvider


      // .state('tab', {
      //   url: '/tab11',
      //   abstract: true,
      //   templateUrl: 'common/tabs.html'
      // })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'page/home/homePage.html',
            controller: 'homeCtrl'
            // params:{userId:{}}

          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('tab.person',{
        url:'/person',
        views:{
          'tab-person':{
            templateUrl: 'page/person/tab-person.html',
            controller: 'personCtrl'
          }

        }

      })

      .state('secondPage',{
        url:'/secondPage',
        templateUrl: 'page/second/secondPage.html',
        controller: 'secondPageCtrl',
        params:{
          userId:null
        }

      })

      .state('guidance',{
        url:'/guidance',
        templateUrl:'common/guidance.html',
        controller:'guidanceCtrl'
      })

      .state('thirdPage',{
        url:'/thirdPage',
        templateUrl:'page/third/thirdPage.html',
        controller:'thirdCtrl'
      })


    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get("$state");
      $state.go('guidance');
    });




    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('guidance');

  });
