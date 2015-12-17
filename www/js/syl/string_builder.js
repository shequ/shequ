function StringBuilder() {
  this._stringArray = new Array();
}

StringBuilder.prototype.append = function (str) {
  this._stringArray.push(str);
}

StringBuilder.prototype.toString = function (joinGap) {
  return this._stringArray.join(joinGap);
}

//设置本地存储
function setLocalStorage(name,pro_name,value){
  var obj = {};
  var str;
  if(localStorage.getItem(name) !== null){
    str = localStorage.getItem(name);
    obj=JSON.parse(str);
  }
  obj[pro_name]=value;
  str = JSON.stringify(obj);
  localStorage.setItem(name,str);
}

//取出本地存储
function getLocalStorage(name,pro_name){
  var obj ={};
  var str;
  if(localStorage.getItem(name) !==null){
    str = localStorage.getItem(name);
    obj=JSON.parse(str);
    return obj[pro_name];
  }else {
    return null;
  }
}
