// pages/login/login.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    this.Base.needauth = false;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }

  getPhone(e){
    console.log(e)
    this.Base.setMyData({ mobile: e.detail.value });
  }

  phonenoCallback(phoneno, e) {
    console.log(phoneno);
    this.Base.setMyData({ mobile: phoneno });
  }
  confirm(e) {
    var that = this;
    var data = e.detail.value;
    if (data.name == "") {
      this.Base.info("请输入您的姓名");
      return;
    }
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
    var flag = reg.test(data.mobile); //true
    
    if (data.mobile.length != 11 || !flag) {
      this.Base.info("手机号格式有误");
      return;
    }
    if (data.mobile == "") {
      this.Base.info("请点击绑定手机号");
      return;
    }

    var mobile = data.mobile;
    var name = data.name;
    AppBase.UserInfo.mobile = mobile;
    AppBase.UserInfo.name = name;
    var openid = AppBase.UserInfo.openid;
    var session_key = AppBase.UserInfo.session_key;
    var usertype='司机'
    var api = new MemberApi();
    api.register({ mobile, name, openid, session_key }, (ret) => {
      console.log(ret)
      if (ret.code == 0) {
        api.info({ mobile, name, usertype}, (res) => {
          AppBase.UserInfo.userinfo = res;
          if (res.driver == 1 && res.name == name) {
            wx.reLaunch({
              url: '/pages/home/home',
            })
          }else{
            this.Base.info("请联系管理员添加登录权限");
          }
        })
        
      } else {
        this.Base.info("用户信息不正确");
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.confirm = content.confirm;
body.getPhone = content.getPhone;
Page(body)