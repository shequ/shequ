function syl_user_acc_read_sng(tbl_syl_user_acc, select, where, tbl_msg) {
  var rc = 0;
  var str_msg = new Object();
  var str_syl_user_acc = new Object();
  var sb = new StringBuilder();
  $.ajax(
    {
      url: "http://115.159.102.63:8080/Syl/syl_user_acc_read_sng_svlt",
      data: {
        "select": select,
        "where":where
      },
      type: "post",
      cache: false,
      dataType: "json",
      async: false,
      success: function (data) {
        rc = data.rc;
        str_syl_user_acc.uuid = data.str_syl_user_acc.uuid;
        str_syl_user_acc.user_id = data.str_syl_user_acc.user_id;
        str_syl_user_acc.email = data.str_syl_user_acc.email;
        str_syl_user_acc.mobile = data.str_syl_user_acc.mobile;
        str_syl_user_acc.password = data.str_syl_user_acc.password;
        str_syl_user_acc.crt_date = data.str_syl_user_acc.crt_date;
        if(rc==0){
          if(tbl_syl_user_acc.password == str_syl_user_acc.password){
            alert("登陆成功");
            localStorage.login_in=1;
            window.location.href="index.html";
            return false
          }else {
            alert('密码不正确！')
          }
        }else {
          for (var i = 0; i < data.tbl_msg.length; i++) {
            str_msg.cls = data.tbl_msg[i].cls;
            str_msg.no = data.tbl_msg[i].no;
            str_msg.type = data.tbl_msg[i].type;
            str_msg.msg = data.tbl_msg[i].msg;
            str_msg.msg01 = data.tbl_msg[i].msg01;
            str_msg.msg02 = data.tbl_msg[i].msg02;
            tbl_msg.push(str_msg);
            str_msg = new Object();
            alert(tbl_msg[i].msg);
          }
        }
      },
      error: function () {
        alert("connenction error");
      }
    }
  );
  return rc;
}
