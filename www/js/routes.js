/**
 * Created by scl on 2015/12/1.
 */
angular.module('syl.routes', [])

  .config(function ($stateProvider,$urlRouterProvider) {
      $stateProvider
        .state("home",{
          cache:'false',
          url:'/home',
          templateUrl:'templates/login/home.html'
        })
        .state("login",{
          cache:'false',
          url:'/login',
          templateUrl:'templates/login/login.html'
        })
        .state("mobile",{
          cache:'false',
          url:'/mobile',
          templateUrl:'templates/login/mobile.html'
        })
        .state("captcha",{
          cache:'false',
          url:'/captcha',
          templateUrl:'templates/login/captcha.html'
        })
        .state("user-name",{
          cache:'false',
          url:'/user-name',
          templateUrl:'templates/login/user-name.html'
        })
        .state("first-page",{
          cache:'false',
          url:'/first-page',
          templateUrl:'templates/first.html'
        })
        .state("landing",{
          cache:'false',
          url:'/landing',
          templateUrl:'templates/landing.html'
        })
        .state("quhao",{
          url:'/quhao',
          templateUrl:'templates/quhao.html',
          controller: 'ContactsCtrl'
        })
    $urlRouterProvider.otherwise("/landing");
  })
