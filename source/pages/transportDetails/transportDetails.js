// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { QuoteferryApi } from "../../apis/quoteferry.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    console.log(options)
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ id: options.id });

  }

  onMyShow() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var that = this;
    var quoteferryapi = new QuoteferryApi();
    quoteferryapi.info({ id: this.Base.getMyData().id }, (ret) => {
      console.log(ret)
      this.Base.setMyData({ datas: ret });
    });

  }

  uploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        photo: ret
      });
    }
      , undefined, 1);
  }

  arriveRemark(e){
    
    this.Base.setMyData({ arriveRemark: e.detail.value})
    console.log(this.Base.getMyData().arriveRemark)
  }

  confirm(e) {
    if (this.Base.getMyData().photo == "") {
      this.Base.info("请上传收货单");
      return;
    }
    var quoteferryapi = new QuoteferryApi();
    quoteferryapi.uploadreceipt({ id: this.Base.getMyData().id, receipt_img: this.Base.getMyData().photo, arriveRemark: this.Base.getMyData().arriveRemark }, (ret) => {
      console.log(ret)
      if (ret.result == 'SUCCESS') {
        wx.redirectTo({
          url: '/pages/orderList/orderList',
        })
      }

    });
  }

}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.uploadimg = content.uploadimg;
body.confirm = content.confirm;
body.arriveRemark = content.arriveRemark;

Page(body)