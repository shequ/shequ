/**
 * Created by scl on 2015/12/1.
 */
angular.module('syl.controllers', [])
  .controller('landing',['$scope','$timeout','$location',function($scope,$timeout,$location){
    var counter=5;
    $scope.countdown = function() {
      if(counter==0){
        if(localStorage.isLogin==1||localStorage.mobile!=''){
          $location.path('/first-page');
        }else{
          localStorage.isLogin=0;
          localStorage.mobile='';
          $location.path('/home');
        }
      }else {
        stopped = $timeout(function() {
          counter--;
          console.log(counter);
          $scope.counter=counter+'s';
          $scope.countdown();
        }, 1000);
      };
    }
    $scope.countdown();
  }])

  .controller('firstPage',['$scope','$http',function($scope,$http){
    $http.post('http://115.159.102.63:8080/Syl/syl_user_acc_read_sng_svlt',{
      "select": "*",
      "where": 'mobile=' + localStorage.mobile
    }).success(function (data, status, headers, config) {
      $scope.response = data;
      rc = $scope.response.rc;
      $scope.userInfo = $scope.response.str_syl_user_acc;
      console.log(headers);
      console.log($scope.userInfo);
    }).error(function (data, status, headers, config) {
      console.log("error...");
      alert('请检查网络')
      return false
    });
  }])

  .controller('getMobile', ['$scope', '$http', '$location','$ionicLoading',
    function ($scope, $http, $location,$ionicLoading) {
      $scope.userInfo = {};
      $scope.isClick = false;

      $scope.getFormMobile = function () {
        if ($scope.userInfo.mobile != "") {
          $scope.isClick = true;
        } else {
          $scope.isClick = false;
        }
      }
      $scope.nextCode = function (e) {
        if (e == 0) {
          return false
        } else if (e == 1) {
          var sMobile =RegExp(/^1\d{10}$/);
          var rc = 0;
          var str_msg = new Object();
          var str_syl_user_acc = new Object();
          var sb = new StringBuilder();
          localStorage.mobile=$scope.userInfo.mobile;
          if(sMobile.test($scope.userInfo.mobile)){
            $http.post("http://115.159.102.63:8080/Syl/syl_user_acc_read_sng_svlt", {
              "select": "*",
              "where": 'mobile=' + $scope.userInfo.mobile
            }).success(function (data, status, headers, config) {
              rc = data.rc;
              if (rc == 0) {
                $ionicLoading.show({ template: '手机号码已注册', noBackdrop: true, duration: 1500 });
                return false
              } else {
                localStorage.mobile = $scope.userInfo.mobile;
                $location.path('/captcha');
              }
              $scope.users = data;
            }).error(function (data, status, headers, config) {
              console.log("error...");
              alert('请检查网络')
              return false
            });
          }else {
            $ionicLoading.show({ template: '手机号不合法', noBackdrop: true, duration: 1500 });
            return false
          }
        }
      }
    }])
  .controller('getPWD', ['$scope','$timeout','$location','$ionicLoading', function ($scope,$timeout,$location,$ionicLoading) {
    //$scope.counter = 5;
    var counter = 60;
    $scope.isClick=0;
    $scope.counter = counter+'s';
    var stopped;

    $scope.changeInput = function(){
      if($scope.userInfo.pwd!=''){
        $scope.isClick=true;
      }else {
        $scope.isClick = false;
      }
    }
    $scope.countdown = function() {
      if(counter==0){
        $scope.counter = '获取验证码'
      }else {
      stopped = $timeout(function() {
        counter--;
        $scope.counter=counter+'s';
        $scope.countdown();
      }, 1000);
    };
    }
    $scope.countdown();
   // $scope.cuntdown=countdown+'s';
    $scope.setPWD=function(e){
      if(e==0){
        return false
      }else {
        if($scope.userInfo.pwd.length<6){
          $ionicLoading.show({ template: '密码不少于6位', noBackdrop: true, duration: 1500 });
          return false
        }else {
          localStorage.pwd=$scope.userInfo.pwd;
          $location.path('/user-name');
        }
      }
    }
  }])

.controller('getUserName',['$scope','$location','$http','$ionicLoading','$location',function($scope,$location,$http,$ionicLoading,$location){
  $scope.isClick = 0;
  $scope.radio = '男';

  $scope.changeName=function(){
    if($scope.userInfo.username!=''){
      $scope.isClick=true;
    }else {
      $scope.isClick=false;
    }
  }

  $scope.register=function(){
    if($scope.isClick==false){
      return false
    }else {
      $scope.today = new Date();
      localStorage.name=$scope.userInfo.username;
      localStorage.gender =$scope.radio;
      tbl_msg = new Array();
      str_syl_user_acc = new Object();

      str_syl_user_acc.user_id = localStorage.name;
      str_syl_user_acc.email = localStorage.name;
      str_syl_user_acc.mobile = localStorage.mobile;
      str_syl_user_acc.password = localStorage.pwd;
      str_syl_user_acc.gender = localStorage.gender;
      str_syl_user_acc.age = '';
      str_syl_user_acc.last_name = '';
      str_syl_user_acc.first_name = '';
      console.log(syl_user_acc_crt_sng(str_syl_user_acc, tbl_msg));


      $http.post("http://115.159.102.63:8080/Syl/syl_user_acc_crt_sng_svlt",{
        "str_syl_user_acc": syl_user_acc_crt_sng(str_syl_user_acc, tbl_msg)
      }).success(function (data, status, headers, config) {
        rc = data.rc;
        if(rc==0){
          $ionicLoading.show({ template: '恭喜您注册成功', noBackdrop: true, duration: 1000 });
          localStorage.isLogin = 1;
          $location.hash()
        }

      }).error(function (data, status, headers, config) {
        console.log("error...");
        alert('请检查网络')
        return false
      });
    }
  }
}])
