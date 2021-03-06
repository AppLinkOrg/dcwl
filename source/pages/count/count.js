// pages/login/login.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
import { VorderApi } from '../../apis/vorder.api';



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
    var memberApi = new MemberApi();
    var memberinfo = this.Base.getMyData().memberinfo;
   // memberApi.info({}, (res) => {

      var vorderApi = new VorderApi();
    vorderApi.list1({ mobile: memberinfo.mobile}, (res) => {
        console.log(res)
        that.Base.setMyData({ list: res });
      })

    // })
  }

  logistics(e) {
    console.log(e)
    wx.navigateTo({
      url: '../orderList/orderList?month=' + e.target.id,
    })
  }



}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.logistics = content.logistics;
Page(body)