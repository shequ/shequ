/**
 * Created by scl on 2015/12/1.
 */
var china = {
  "name": "China",
  "dial_code": "+86",
  "code": "CN"
};
angular.module('syl.controllers', [])
  .controller('landing', ['$scope', '$timeout', '$location','$ionicHistory', function ($scope, $timeout, $location,$ionicHistory) {
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

  .controller('firstPage', ['$scope', '$http', '$location','$ionicHistory', function ($scope, $http, $location,$ionicHistory) {
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
  .controller('loginPage', ['$scope', '$http', '$location', '$ionicLoading','$ionicHistory', function ($scope, $http, $location, $ionicLoading,$ionicHistory) {
    $scope.userLoginName = '';
    $scope.pwd = '';
    var Regx_num = /^[0-9]*$/;
    var Regx_mail;

    $scope.loginApp = function () {
      if ($scope.userLoginName == '') {
        $ionicLoading.show({template: '用户名不能为空', noBackdrop: true, duration: 1500});
        return false
      } else if ($scope.pwd == '') {
        $ionicLoading.show({template: '密码不能为空', noBackdrop: true, duration: 1500});
        return false
      } else {
        var rc;
        var str_msg = new Object();
        var str_syl_user_acc = new Object();
        var str_syl_sess = {};

        var pwdUp = MD5($scope.pwd).toUpperCase();
        //如果输入的是全数字
        if (Regx_num.test($scope.userLoginName)) {
          console.log('您输入的是全数字');

          setLocalStorage('user_acc', 'mobile',$scope.userLoginName);
          str_syl_user_acc.mobile = "+86" + $scope.userLoginName;
          str_syl_user_acc.password = pwdUp;

          syl_logon(str_syl_user_acc, str_syl_sess, str_msg);

          $http.post("http://115.159.102.63:80/Syl/syl_logon_svlt", {
            "str_syl_user_acc": str_syl_user_acc_json_str,
            "str_syl_sess": str_syl_sess_json_str
          }).success(function (data, status, headers, config) {
            rc = data.rc;
            if (rc == 0) {
              localStorage.setItem('session',data.str_syl_sess.uuid);
              setLocalStorage('user_acc','uuid',data.str_syl_sess.uuid_user);
              localStorage.isLogin = 1;
              $scope.getUserId();
            } else {
              $ionicLoading.show({template: '您输入的账号或密码有误', noBackdrop: true, duration: 1500});
              return false
            }
          }).error(function (data, status, headers, config) {
            console.log('失败');
          })
        } else {
          console.log('您输入的非全数字');
          console.log(MD5($scope.userLoginName));
          $ionicLoading.show({template: '暂时只能手机号码登录', noBackdrop: true, duration: 1500});
        }
      }
    }
    $scope.getUserId = function () {
      var rc;
      var str_msg = new Object();
      var str_syl_sess = new Object();

      str_syl_sess.uuid=localStorage.getItem('session');
      str_syl_sess.user_uuid = getLocalStorage('user_acc','uuid');

      syl_user_acc_read_sng(str_syl_sess,str_msg);
      console.log(str_syl_sess_json_str);

      $http.post("http://115.159.102.63/Syl/syl_user_acc_read_sng_svlt", {
        "select": '*',
        "where": 'uuid ="' + getLocalStorage('user_acc','uuid')+'"',
        "str_syl_sess": str_syl_sess_json_str
      }).success(function (data, status, headers, config) {
        rc = data.rc;
        if (rc == 0) {
          resetLocalStorage('user_acc');
          setJsonLocalStorage('user_acc', data.str_syl_user_acc);
          $location.path('/first-page');
        }
      }).error(function () {
        alert('请检查网络');
      })
    }
  }])
  .controller('getMobile', ['$scope', '$http', '$location', '$ionicLoading','$ionicHistory',
    function ($scope, $http, $location, $ionicLoading, $ionicHistory) {
      $scope.userInfo = {};
      $scope.isClick = false;

      if (getLocalStorage('user_acc', 'country') == null) {
        console.log('zhongguo');
        $scope.cod = '+86';
        setLocalStorage('temp', 'country', china);
        setLocalStorage('user_acc', 'country', 'CN');
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
        if ($scope.userInfo.mobile == "") {
          $scope.isClick = false;
        } else {
          $scope.isClick = true;
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
          var user_mobile = getLocalStorage('temp', 'country').dial_code+ $scope.userInfo.mobile;
          str_syl_user_acc.mobile =user_mobile;
          syl_chk_acc_exst(str_syl_user_acc, str_msg);
          console.log(str_syl_user_acc_json_str);
          setLocalStorage('user_acc', 'mobile', user_mobile);
          if (getLocalStorage('temp', 'country').code !== 'CN') {
            $ionicLoading.show({template: '暂时只支持中国大陆地区手机号码', noBackdrop: true, duration: 1500});
            return false
          } else {
            if (sMobile.test($scope.userInfo.mobile)) {
              $http.post("http://115.159.102.63:80/Syl/syl_chk_acc_exst_svlt", {
                "str_syl_user_acc": str_syl_user_acc_json_str
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
                    "str_syl_txt_cd": syl_txt_cd_mod_sng(str_syl_txt_cd, tbl_msg)
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
  .controller('getPWD', ['$scope', '$timeout', '$location', '$ionicLoading', '$http','$ionicHistory', function ($scope, $timeout, $location, $ionicLoading, $http, $ionicHistory) {
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
          $scope.createUser();
        }
      }
    }

    $scope.createUser = function () {
      var rc;
      var tbl_msg = new Array();
      var str_syl_user_acc = new Object();
      var str_syl_txt_cd = {};

      str_syl_txt_cd.mobile =getLocalStorage("user_acc", "mobile");
      str_syl_txt_cd.code = $scope.userInfo.code;
      str_syl_txt_cd.country = getLocalStorage("temp", "country").code;
      str_syl_txt_cd.password = $scope.userInfo.pwd;

      str_syl_user_acc.mobile = getLocalStorage("user_acc", "mobile");
      str_syl_user_acc.country = getLocalStorage("temp", "country").code;
      str_syl_user_acc.password = $scope.userInfo.pwd;
      syl_reg(str_syl_txt_cd, str_syl_user_acc, tbl_msg);

      console.log(str_syl_txt_cd_json_str);
      console.log(str_syl_user_acc_json_str);

      $http.post("http://115.159.102.63:80/Syl/syl_reg_svlt", {
        "str_syl_txt_cd": str_syl_txt_cd_json_str,
        "str_syl_user_acc": str_syl_user_acc_json_str
      }).success(function (data, status, headers, config) {
        rc = data.rc;
        if (rc == 0) {
          $ionicLoading.show({template: '恭喜您注册成功', noBackdrop: true, duration: 1000});
          $scope.logon();
          localStorage.isLogin = 1;
        } else {
          $ionicLoading.show({template: '验证码错误', noBackdrop: true, duration: 1000});
          return false;
        }
        console.log('通过')
      }).error(function () {
        console.log("error...");
        alert('请检查网络');
        return false
      })
    };
    $scope.logon = function(){
      var rc;
      var str_msg = new Object();
      var str_syl_user_acc = new Object();
      var str_syl_sess = {};
      str_syl_user_acc.mobile = getLocalStorage("user_acc", "mobile");
      str_syl_user_acc.country = getLocalStorage("temp", "country").code;

      str_syl_user_acc.password = MD5($scope.userInfo.pwd).toUpperCase();
      console.log(str_syl_user_acc);
      syl_logon(str_syl_user_acc, str_syl_sess, str_msg);
      $http.post("http://115.159.102.63:80/Syl/syl_logon_svlt", {
        "str_syl_user_acc": str_syl_user_acc_json_str,
        "str_syl_sess": str_syl_sess_json_str
      }).success(function (data, status, headers, config) {
        rc = data.rc;
        if (rc == 0) {
          localStorage.setItem('session',data.str_syl_sess.uuid);
          setLocalStorage('user_acc','uuid',data.str_syl_sess.uuid_user);
          console.log()
          localStorage.isLogin = 1;
          $scope.getUserId();
        } else {
          $ionicLoading.show({template: '您输入的账号或密码有误', noBackdrop: true, duration: 1500});
          return false
        }
      }).error(function (data, status, headers, config) {
        console.log('失败');
      })
    }
    $scope.getUserId = function () {
      var rc;
      var str_msg = new Object();
      var str_syl_sess = new Object();

      str_syl_sess.uuid=localStorage.getItem('session');
      str_syl_sess.user_uuid = getLocalStorage('user_acc','uuid');

      syl_user_acc_read_sng(str_syl_sess,str_msg);
      console.log(str_syl_sess_json_str);

      $http.post("http://115.159.102.63/Syl/syl_user_acc_read_sng_svlt", {
        "select": '*',
        "where": 'uuid ="' + getLocalStorage('user_acc','uuid')+'"',
        "str_syl_sess": str_syl_sess_json_str
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

  .controller('getUserName', ['$scope', '$location', '$http', '$ionicLoading', '$location','$ionicHistory', function ($scope, $location, $http, $ionicLoading, $location,$ionicHistory) {
    $scope.isClick = 0;
    $scope.radio = '男';
    var Regx = /^[0-9]*$/;

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
        if (Regx.test($scope.userInfo.username)) {
          $ionicLoading.show({template: '用户名不能为全数字', noBackdrop: true, duration: 1000});
          return false;
        } else {
          setLocalStorage('user_acc', 'username', $scope.userInfo.username);
          setLocalStorage('user_acc', 'gender', $scope.radio);
          var tbl_msg ={};
          var str_syl_user_acc ={};
          var str_syl_sess ={};

          str_syl_sess.uuid=localStorage.getItem('session');
          str_syl_sess.uuid_user = getLocalStorage('user_acc','uuid');

          console.log(str_syl_sess);
          syl_user_acc_upd_sng(str_syl_user_acc,str_syl_sess,tbl_msg);

          console.log(str_syl_sess_json_str);

          $http.post("http://115.159.102.63/Syl/syl_user_acc_upd_sng_svlt", {
            "str_syl_user_acc": localStorage.user_acc,
            "str_syl_sess": str_syl_sess_json_str
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
    }
  }])
  .controller('ContactsCtrl', ['$scope', 'Contacts', '$location', '$ionicHistory', function ($scope, Contacts, $location, $ionicHistory) {
    $scope.modelName = 'contacts';
    $scope[$scope.modelName] = Contacts.all();
    $scope.getQuhao = function (e) {
      console.log(e);
      setLocalStorage('temp', 'country', e);
      setLocalStorage('user_acc', 'country', e.code);
      $ionicHistory.goBack();
    }
  }])
