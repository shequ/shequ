/**
 * Created by scl on 2015/12/17.
 */
function syl_txt_cd_mod_sng(
  str_syl_txt_cd,
  tbl_msg
)
{
  var str_msg = new Object();
  var req_sb = new StringBuilder();
  var rc = 0;
  var str_syl_txt_cd_json_str = "";

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
