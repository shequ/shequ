/**
 * Created by scl on 2015/12/1.
 */
angular.module('syl.controllers', [])
  .controller('landing', ['$scope', '$timeout', '$location', function ($scope, $timeout, $location) {
    var counter = 3;
    $scope.countdown = function () {
      if (counter == 0) {
        if (localStorage.isLogin == 1 && localStorage.user_acc != '') {
          $location.path('/first-page');
        } else {
          localStorage.isLogin = 0;
          $location.path('/home');
        }
      } else {
        stopped = $timeout(function () {
          counter--;
          console.log(counter);
          $scope.counter = counter + 's';
          $scope.countdown();
        }, 1000);
      }
      ;
    }
    $scope.countdown();
    $scope.jumpTo = function () {
      if (localStorage.isLogin == 1 && localStorage.user_acc != '') {
        $location.path('/first-page');
      } else {
        localStorage.isLogin = 0;
        $location.path('/home');
      }
    }
  }])

  .controller('firstPage', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.userid = getLocalStorage('user_acc', 'username');
    $scope.mobile = getLocalStorage('user_acc', 'mobile');
    $scope.gender = getLocalStorage('user_acc', 'gender');
    if (localStorage.isLogin == 0) {
      $location.path('/home');
    }

    $scope.loginOut = function () {
      localStorage.isLogin = 0;
      resetLocalStorage('user_acc');
      $location.path('/home');
    }
  }])
  .controller('loginPage', ['$scope', '$http', '$location', '$ionicLoading', function ($scope, $http, $location, $ionicLoading) {
    $scope.userLoginName = '';
    $scope.pwd = ''
    $scope.loginApp = function () {
      if ($scope.userLoginName == '') {
        console.log(111);
        $ionicLoading.show({template: '用户名不能为空', noBackdrop: true, duration: 1500});
        return false
      } else if ($scope.pwd == '') {
        console.log(11222);
        $ionicLoading.show({template: '密码不能为空', noBackdrop: true, duration: 1500});
        return false
      } else {
        console.log($scope.userLoginName)
        var rc = 0;
        var str_msg = new Object();
        var str_syl_user_acc = new Object();
        var sb = new StringBuilder();

        $http.post("http://115.159.102.63/Syl/syl_user_acc_read_sng_svlt", {
          "select": "*",
          "where": 'username="' + $scope.userLoginName + '" or mobile="' + $scope.userLoginName + '"'
        }).success(function (data, status, headers, config) {
          rc = data.rc;
          if (rc == 0) {
            if (data.str_syl_user_acc.password == $scope.pwd) {
              console.log('登录成功');
              localStorage.isLogin = 1;
              $location.path('/first-page');
            } else {
              console.log('密码不正确');
              $ionicLoading.show({template: '密码不正确', noBackdrop: true, duration: 1500});
            }
          } else {
            console.log('您输入的账号有误');
            $ionicLoading.show({template: '您输入的账号有误', noBackdrop: true, duration: 1500});
          }
        }).error(function (data, status, headers, config) {
          console.log("error...");
          alert('请检查网络')
          return false
        });
      }
    }
  }])
  .controller('getMobile', ['$scope', '$http', '$location', '$ionicLoading',
    function ($scope, $http, $location, $ionicLoading) {
      $scope.userInfo = {};
      $scope.isClick = false;
      var china = {
        "name": "China",
        "dial_code": "+86",
        "code": "CN"
      };
      if (getLocalStorage('user_acc', 'country') == null) {
        console.log('zhongguo');
        $scope.cod = '+86';
        setLocalStorage('temp','country',china);
        setLocalStorage('user_acc', 'country','CN');
        return false;
      } else {
        if (getLocalStorage('temp', 'country').code == 'CN' || getLocalStorage('temp', 'country') == '') {
          console.log('中国');
          $scope.cod = '+86';
        } else {
          console.log('外国');
          $scope.cod = getLocalStorage('temp', 'country').dial_code;
        }
      }

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
          var sMobile = RegExp(/^1\d{10}$/);
          var rc = 0;
          var str_msg = new Object();
          var str_syl_user_acc = new Object();
          var sb = new StringBuilder();
          var user_mobile = $scope.userInfo.mobile;
          setLocalStorage('user_acc', 'mobile', user_mobile);
          if (getLocalStorage('temp', 'country').code !== 'CN') {
            $ionicLoading.show({template: '暂时只支持中国大陆地区手机号码', noBackdrop: true, duration: 1500});
            return false
          } else {
            if (sMobile.test($scope.userInfo.mobile)) {
              $http.post("http://115.159.102.63/Syl/syl_user_acc_read_sng_svlt", {
                "select": "*",
                "where": 'mobile=' + getLocalStorage('temp', 'country').dial_code + $scope.userInfo.mobile,
                "vald_flg": "X"
              }).success(function (data, status, headers, config) {
                rc = data.rc;
                if (rc == 0) {
                  $ionicLoading.show({template: '手机号码已注册', noBackdrop: true, duration: 1500});
                  return false
                } else {
                  setLocalStorage('user_acc', 'mobile', user_mobile);
                  var tbl_msg = {};
                  var str_syl_txt_cd = new Object();
                  str_syl_txt_cd.mobile = getLocalStorage('user_acc', 'mobile');
                  str_syl_txt_cd.country = getLocalStorage('user_acc', 'country');
                  $http.post("http://115.159.102.63/Syl/syl_txt_cd_mod_sng_svlt", {
                    "str_syl_txt_cd": syl_txt_cd_mod_sng(str_syl_txt_cd, 'X', tbl_msg),
                    "vald_flg": "X"
                  }).success(function (data, status, headers, config) {
                    var rc = data.rc;
                    if (rc == 0) {
                      $location.path('/captcha');
                    }
                    console.log("success...");
                  }).error(function (data, status, headers, config) {
                    console.log("error...");

                    alert('请检查网络')
                  })
                }
                $scope.users = data;
              }).error(function (data, status, headers, config) {
                console.log("error...");
                alert('请检查网络')
                return false
              });
            } else {
              $ionicLoading.show({template: '手机号不合法', noBackdrop: true, duration: 1500});
              return false
            }
          }
        }
      }
    }])
  .controller('getPWD', ['$scope', '$timeout', '$location', '$ionicLoading', '$http', function ($scope, $timeout, $location, $ionicLoading, $http) {
    $scope.userInfo = {};
    $scope.userInfo.pwd = '';
    $scope.userInfo.code = '';
    var rc;
    var str_syl_txt_cd = {};
    var counter = 300;
    $scope.isClick = 0;
    $scope.counter = counter + 's';
    var stopped;

    /*验证是否填写验证码与密码*/
    $scope.changeInput = function () {
      if ($scope.userInfo.code != '' && $scope.userInfo.pwd != '') {
        $scope.isClick = true;
      } else {
        $scope.isClick = false;
      }
    }


    /*验证码倒计时*/
    $scope.countdown = function () {
      if (counter == 0) {
        $scope.counter = '获取验证码'
      } else {
        stopped = $timeout(function () {
          counter--;
          $scope.counter = counter + 's';
          $scope.countdown();
        }, 1000);
      }
    }
    $scope.countdown();
    // $scope.cuntdown=countdown+'s';

    /*设置密码点击*/
    $scope.setPWD = function (e) {
      if (e == 0) {
        return false
      } else {
        if ($scope.userInfo.pwd.length < 6 || $scope.userInfo.pwd.length > 12) {
          $ionicLoading.show({template: '密码的长度必须为6为至12位之间', noBackdrop: true, duration: 1500});
          return false
        } else {
          $http.post("http://115.159.102.63/Syl/syl_txt_cd_read_sng_svlt", {
            "select": "*",
            "where": 'mobile="' + getLocalStorage('temp', 'country').dial_code + getLocalStorage('user_acc', 'mobile') + '" and code="' + $scope.userInfo.code + '"',
            "vald_flg": ''
          }).success(function (data, status, headers, config) {
            rc = data.rc;
            if (rc == 0) {
              console.log('通过啦');
              setLocalStorage('user_acc', 'password', $scope.userInfo.pwd)
              $scope.createUser();
            } else {
              $ionicLoading.show({template: '验证码错误', noBackdrop: true, duration: 1500});
              return false
            }
          }).error(function (data, status, headers, config) {

          })
          // $location.path('/user-name');
        }
      }
    }

    $scope.createUser = function () {
      var tbl_msg = new Array();
      var str_syl_user_acc = new Object();

      str_syl_user_acc.mobile = getLocalStorage('user_acc', 'mobile');
      str_syl_user_acc.password = getLocalStorage('user_acc', 'password');
      str_syl_user_acc.country = getLocalStorage('user_acc', 'country');
      console.log(syl_user_acc_crt_sng(str_syl_user_acc, 'X', tbl_msg));

      $http.post("http://115.159.102.63/Syl/syl_user_acc_crt_sng_svlt", {
        "str_syl_user_acc": syl_user_acc_crt_sng(str_syl_user_acc, 'X', tbl_msg),
        "vald_flg": 'X'
      }).success(function (data, status, headers, config) {
        rc = data.rc;

        if (rc == 0) {
          $ionicLoading.show({template: '恭喜您注册成功', noBackdrop: true, duration: 1000});
          localStorage.isLogin = 1;
          $scope.getUserId();
        }
      }).error(function (data, status, headers, config) {
        console.log("error...");
        alert('请检查网络');
        return false
      });
    }

    $scope.getUserId = function () {
      var rc;
      var str_msg = new Object();
      var str_syl_user_acc = new Object();
      $http.post("http://115.159.102.63/Syl/syl_user_acc_read_sng_svlt", {
        "select": '*',
        "where": 'mobile =' + getLocalStorage('temp', 'country').dial_code + getLocalStorage('user_acc', 'mobile'),
        "vald_flg": ""
      }).success(function (data, status, headers, config) {
        rc = data.rc;
        if (rc == 0) {
          resetLocalStorage('user_acc');
          setJsonLocalStorage('user_acc', data.str_syl_user_acc);
          $location.path('/user-name')
        }
      }).error(function () {
        alert('请检查网络');
      })
    }
  }])

  .controller('getUserName', ['$scope', '$location', '$http', '$ionicLoading', '$location', function ($scope, $location, $http, $ionicLoading, $location) {
    $scope.isClick = 0;
    $scope.radio = '男';

    $scope.changeName = function () {
      if ($scope.userInfo.username != '') {
        $scope.isClick = true;
      } else {
        $scope.isClick = false;
      }
    }

    $scope.register = function () {
      if ($scope.isClick == false) {
        return false
      } else {
        setLocalStorage('user_acc', 'username', $scope.userInfo.username);
        setLocalStorage('user_acc', 'gender', $scope.radio);
        tbl_msg = new Array();
        str_syl_user_acc = new Object();

        console.log(syl_user_acc_upd_sng(str_syl_user_acc, 'X', tbl_msg));

        $http.post("http://115.159.102.63/Syl/syl_user_acc_upd_sng_svlt", {
          "str_syl_user_acc": localStorage.user_acc,
          "vald_flg": 'X'
        }).success(function (data, status, headers, config) {
          rc = data.rc;
          if (rc == 0) {
            $location.path('/first-page');
          }
        }).error(function (data, status, headers, config) {
          console.log("error...");
          alert('请检查网络')
          return false
        });
      }
    }
  }])
  .controller('ContactsCtrl', ['$scope', 'Contacts', '$location', function ($scope, Contacts, $location) {
    $scope.modelName = 'contacts';
    $scope[$scope.modelName] = Contacts.all();
    $scope.getQuhao = function (e) {
      setLocalStorage('temp', 'country', e);
      setLocalStorage('user_acc', 'country', e.code);
      $location.path('/mobile');
    }
  }])
