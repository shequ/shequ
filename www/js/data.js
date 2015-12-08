/**
 * Created by MyPC on 2015/12/4.
 */
var userInfo = {};
var str = JSON.stringify(userInfo);
localStorage.userInfo=str;
userInfo = localStorage.userInfo;
