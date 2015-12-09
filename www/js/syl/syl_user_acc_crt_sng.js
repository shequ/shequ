function syl_user_acc_crt_sng(str_syl_user_acc, vald_flg, tbl_msg) {
  var rc = 0;
  var str_syl_user_acc_json_str = "";
  var str_msg = new Object();
  var sb = new StringBuilder();

  sb.append("{");
  sb.append("\"");
  sb.append("uuid");
  sb.append("\"");
  sb.append(":");
  sb.append("\"");
  sb.append(str_syl_user_acc.uuid);
  sb.append("\"");
  sb.append(",");
  sb.append("\"");
  sb.append("user_id");
  sb.append("\"");
  sb.append(":");
  sb.append("\"");
  sb.append(str_syl_user_acc.user_id);
  sb.append("\"");
  sb.append(",");
  sb.append("\"");
  sb.append("email");
  sb.append("\"");
  sb.append(":");
  sb.append("\"");
  sb.append(str_syl_user_acc.email);
  sb.append("\"");
  sb.append(",");
  sb.append("\"");
  sb.append("mobile");
  sb.append("\"");
  sb.append(":");
  sb.append("\"");
  sb.append(str_syl_user_acc.mobile);
  sb.append("\"");
  sb.append(",");
  sb.append("\"");
  sb.append("password");
  sb.append("\"");
  sb.append(":");
  sb.append("\"");
  sb.append(str_syl_user_acc.password);
  sb.append("\"");
  sb.append(",");
  sb.append("\"");
  sb.append("gender");
  sb.append("\"");
  sb.append(":");
  sb.append("\"");
  sb.append(str_syl_user_acc.gender);
  sb.append("\"");
  sb.append(",");
  sb.append("\"");
  sb.append("crt_date");
  sb.append("\"");
  sb.append(":");
  sb.append("\"");
  sb.append(str_syl_user_acc.crt_date);
  sb.append("\"");
  sb.append("}");

  str_syl_user_acc_json_str = sb.toString("");

  return str_syl_user_acc_json_str;
}



