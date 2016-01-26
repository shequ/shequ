/**
 * Created by scl on 2015/12/1.
 */
angular.module('syl.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("event", {
        url: '/event',
        abstract: true,
        templateUrl: 'templates/left-menu.html',
        controller:"menuCtrl"
      })
      .state("event.tab", {
        url: '/tab',
        cache: 'false',
        views: {
          'event': {
            templateUrl: 'templates/tabs.html'
          }
        }
      })
      .state("event.tab.home", {
        url: '/tab-home',
        cache: 'false',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab/home.html',
            controller:"tab-homeCtrl"
          }
        }
      })
      .state("event.tab.moment", {
        url: '/tab-moment',
        cache: 'false',
        views: {
          'tab-moment': {
            templateUrl: 'templates/tab/moment.html',
            controller:"tab-momentCtrl"
          }
        }
      })
      .state("event.tab.shop", {
        url: '/tab-shop',
        cache: 'false',
        views: {
          'tab-shop': {
            templateUrl: 'templates/tab/shop.html',
            controller:"tab-shopCtrl"
          }
        }
      })
      .state("event.tab.user", {
        url: '/tab-user',
        cache: 'false',
        views: {
          'tab-user': {
            templateUrl: 'templates/tab/user.html',
            controller:"tab-userCtrl"
          }
        }
      })
      .state("home", {
        cache: 'false',
        url: '/home',
        templateUrl: 'templates/login/home.html'
      })
      .state("login", {
        cache: 'false',
        url: '/login',
        templateUrl: 'templates/login/login.html'
      })
      .state("mobile", {
        cache: 'false',
        url: '/mobile',
        templateUrl: 'templates/login/mobile.html'
      })
      .state("captcha", {
        cache: 'false',
        url: '/captcha',
        templateUrl: 'templates/login/captcha.html'
      })
      .state("user-name", {
        cache: 'false',
        url: '/user-name',
        templateUrl: 'templates/login/user-name.html'
      })
      .state("first-page", {
        cache: 'false',
        url: '/first-page',
        templateUrl: 'templates/first.html'
      })
      .state("landing", {
        cache: 'false',
        url: '/landing',
        templateUrl: 'templates/landing.html'
      })
      .state("quhao", {
        url: '/quhao',
        templateUrl: 'templates/quhao.html',
        controller: 'ContactsCtrl'
      })
    $urlRouterProvider.otherwise("/landing");
  })
