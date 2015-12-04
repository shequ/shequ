/**
 * Created by MyPC on 2015/12/4.
 */
var userInfo = {
  name:'steven',
  age:'25',
  pwd:'123456'
}
var str = JSON.stringify(userInfo);
localStorage.userInfo=str;
userInfo = localStorage.userInfo;
