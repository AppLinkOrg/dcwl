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
    // console.log(encodeURIComponent('你好'))

  }

  onMyShow() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var that = this;
    
    var memberinfo=this.Base.getMyData().memberinfo;

    if (memberinfo.mobile == "" || memberinfo.mobile == undefined){
      wx.showModal({
        title: '提示',
        content: '您暂未获取手机号无法查看运输单,请前往个人中心获取',
        showCancel: false,
        cancelText: '取消',
        cancelColor: '#EE2222',
        confirmText: '确定',
        confirmColor: '#e73339',
        success: function (res) {
          if (res.confirm) {
           
          }
        }
      });
    }


      
      var quoteferryapi = new QuoteferryApi();
    quoteferryapi.listdriver({ status: 4, mobile: memberinfo.mobile }, (ret) => {
        this.Base.setMyData({ list_4: ret });
      });
    quoteferryapi.listdriver({ status: 5, mobile: memberinfo.mobile }, (ret) => {
        this.Base.setMyData({ list_5: ret });
      });
    quoteferryapi.listdriver({ status: 6, mobile: memberinfo.mobile }, (ret) => {
        this.Base.setMyData({ list_6: ret });
      });

    quoteferryapi.listdriver({ status: 7, mobile: memberinfo.mobile }, (ret) => {
        this.Base.setMyData({ list_7: ret });
      });

    

    

  }
  bindupload(e){
    this.Base.setMyData({ ctt: 4 })
    this.onMyShow();
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
body.bindupload = content.bindupload;
body.bindcontact = content.bindcontact;
body.todetails = content.todetails;
body.tocontent = content.tocontent;
Page(body)