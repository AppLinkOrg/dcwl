// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { QuoteferryApi } from "../../apis/quoteferry.api.js";
import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      ctt: 1
    })

  }

  onMyShow() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var that = this;

    var memberApi = new MemberApi();
    memberApi.info({}, (ret) => {
      that.Base.setMyData({ mobile: ret.mobile });
    })

    var quoteferryapi = new QuoteferryApi();
    quoteferryapi.listdriver({ status: 4, mobile: that.Base.getMyData().mobile}, (ret) => {
      this.Base.setMyData({ list_4: ret });
    });
    quoteferryapi.listdriver({ status: 5, mobile: that.Base.getMyData().mobile }, (ret) => {
      this.Base.setMyData({ list_5: ret });
    });
    quoteferryapi.listdriver({ status: 6, mobile: that.Base.getMyData().mobile}, (ret) => {
      this.Base.setMyData({ list_6: ret });
    });

  }

  bindcompleted(e) {
    this.Base.setMyData({ ctt: 3 })
    this.onMyShow();
  }
  bindwaitcompleted(e) {
    this.Base.setMyData({ ctt: 2 })
    this.onMyShow();
  }
  bindcontact(e) {
    this.Base.setMyData({ ctt: 1 })
    this.onMyShow();
  }

  todetails(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/mytalkdetails/mytalkdetails?id=' + id + '&type=A',
    })
  }

  tocontent(e) {
    wx.navigateTo({
      url: '/pages/news/news',
    })
  }
}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindcompleted = content.bindcompleted;
body.bindwaitcompleted = content.bindwaitcompleted;
body.bindcontact = content.bindcontact;
body.todetails = content.todetails;
body.tocontent = content.tocontent;
Page(body)