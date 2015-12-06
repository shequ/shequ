/**
 * Created by scl on 2015/12/1.
 */
angular.module('syl.routes', [])

  .config(function ($stateProvider,$urlRouterProvider) {
      $stateProvider
        .state("home",{
          url:'/home',
          templateUrl:'templates/login/home.html'
        })
        .state("login",{
          url:'/login',
          templateUrl:'templates/login/login.html'
        })
        .state("mobile",{
          url:'/mobile',
          templateUrl:'templates/login/mobile.html'
        })
        .state("captcha",{
          url:'/captcha',
          templateUrl:'templates/login/captcha.html'
        })
        .state("user-name",{
          url:'/user-name',
          templateUrl:'templates/login/user-name.html'
        })
        .state("first-page",{
          url:'/first-page',
          templateUrl:'templates/first.html'
        })
        .state("landing",{
          url:'/landing',
          templateUrl:'templates/landing.html'
        })
    $urlRouterProvider.otherwise("/landing");
  })
