/**
 * Created by scl on 2016/1/14.
 */
angular.module('syl.controllersMenu', [])
  .controller('menuCtrl',function($rootScope,$scope,$ionicSideMenuDelegate,$location){
    $scope.userName=getLocalStorage('user_acc', 'username');
    $rootScope.toggledrag = true;
    $scope.loginOut=function(){
      localStorage.isLogin = 0;
      localStorage.removeItem('user_acc');
      localStorage.removeItem('session');
      $location.path('/home');
    }

    $scope.checkleft=function(){
      console.log($ionicSideMenuDelegate.isOpenLeft());
    }
  })

  .controller('tab-homeCtrl',function($rootScope,$scope,$state,$ionicModal){
    $scope.onSwipeLeft=function(){
      $state.go("event.tab.moment");
    };
    $rootScope.toggledrag = true;

    //相册
    $scope.allImages = [{
      'src' : 'img/pic1.jpg'
    }, {
      'src' : 'img/pic2.jpg'
    }, {
      'src' : 'img/pic3.jpg'
    }];

    $scope.clipSrc = 'img/coffee.MOV';

    $scope.showImages = function(index) {
      console.log(1);
      $scope.activeSlide = index;
      $scope.showModal('templates/tab/image-gallery.html');
    }


    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }

    // Close the modal
    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
    };
  })

.controller('tab-momentCtrl',function($rootScope,$ionicSideMenuDelegate,$scope,$state,$ionicModal){
    $scope.toggleLeftSideMenu=function(){
      console.log(123);
      $ionicSideMenuDelegate.toggleLeft();
      console.log($ionicSideMenuDelegate.isOpenLeft());
    }
    $scope.onSwipeLeft=function(){
      $state.go("event.tab.shop");
    };
    $scope.onSwipeRight=function(){
      $state.go("event.tab.home");
    };
    $rootScope.toggledrag = false;


    //相册
    $scope.allImages = [{
      'src' : 'img/pic1.jpg'
    }, {
      'src' : 'img/pic2.jpg'
    }, {
      'src' : 'img/pic3.jpg'
    }];

    $scope.clipSrc = 'img/coffee.MOV';

    $scope.showImages = function(index) {
      console.log(111);
      $scope.activeSlide = index;
      $scope.showModal('templates/tab/image-gallery.html');
    }

    $scope.slideChanged=function(index){
      console.log(index);
    }


    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }

    // Close the modal
    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove()
    };
  })

.controller('tab-shopCtrl',function($scope,$state){
    $scope.onSwipeLeft=function(){
      $state.go("event.tab.user");
    };
    $scope.onSwipeRight=function(){
      $state.go("event.tab.moment");
    }
  })

  .controller('tab-userCtrl',function($scope,$state){
    $scope.onSwipeRight=function(){
      $state.go("event.tab.shop");
    }
  })
