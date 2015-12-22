function syl_user_acc_crt_sng(str_syl_user_acc,
                              vald_flg,
                              tbl_msg) {
  var str_msg = new Object();
  var str_syl_user_acc_json_str = "";
  var req_sb = new StringBuilder();
  var rc = 0;

  req_sb.append("{");
  req_sb.append("\"");
  req_sb.append("uuid");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.uuid);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("username");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.username);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("email");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.email);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("mobile");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.mobile);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("country");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.country);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("password");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.password);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("gender");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.gender);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("crt_date");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.crt_date);
  req_sb.append("\"");
  req_sb.append("}");

  str_syl_user_acc_json_str = req_sb.toString("");
  return str_syl_user_acc_json_str;
}

function syl_txt_cd_mod_sng(str_syl_txt_cd,
                            vald_flg,
                            tbl_msg) {
  var str_msg = new Object();
  var str_syl_txt_cd_json_str = "";
  var req_sb = new StringBuilder();
  var rc = 0;

  req_sb.append("{");
  req_sb.append("\"");
  req_sb.append("mobile");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_txt_cd.mobile);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("country");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_txt_cd.country);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("code");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_txt_cd.code);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("lang");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_txt_cd.lang);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("exp_datetime");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_txt_cd.exp_datetime);
  req_sb.append("\"");
  req_sb.append("}");

  str_syl_txt_cd_json_str = req_sb.toString("");
  return str_syl_txt_cd_json_str;
}

function syl_user_acc_upd_sng(str_syl_user_acc,
                              vald_flg,
                              tbl_msg) {
  var str_msg = new Object();
  var str_syl_user_acc_json_str = "";
  var req_sb = new StringBuilder();
  var rc = 0;

  req_sb.append("{");
  req_sb.append("\"");
  req_sb.append("uuid");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.uuid);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("user_id");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.user_id);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("email");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.email);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("mobile");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.mobile);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("country");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.country);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("password");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.password);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("gender");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.gender);
  req_sb.append("\"");
  req_sb.append(",");
  req_sb.append("\"");
  req_sb.append("crt_date");
  req_sb.append("\"");
  req_sb.append(":");
  req_sb.append("\"");
  req_sb.append(str_syl_user_acc.crt_date);
  req_sb.append("\"");
  req_sb.append("}");

  str_syl_user_acc_json_str = req_sb.toString("");
  return str_syl_user_acc_json_str
}
