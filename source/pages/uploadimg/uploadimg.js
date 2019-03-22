// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  QuoteferryApi
} from "../../apis/quoteferry.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({
      images1: [],
      images2: [],
      images3: [],
      id: options.id
    })


  }

  onMyShow() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var that = this;
  }

  uploadimg1() {
    var that = this;
    this.Base.uploadImage("quoteferry", (ret) => {
      console.log(ret)
      var images1 = that.Base.getMyData().images1;
      images1.push(ret);
      that.Base.setMyData({
        images1
      });
    });
  }

  bindlongpressimg1(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var images1 = that.Base.getMyData().images1;
    var imgs = [];
    for (var i = 0; i < images1.length; i++) {
      if (seq != i) {
        imgs.push(images1[i]);
      }
    }
    that.Base.setMyData({
      images1: imgs
    });
  }

  uploadimg2() {
    var that = this;
    this.Base.uploadImage("quoteferry", (ret) => {
      console.log(ret)
      var images2 = that.Base.getMyData().images2;
      images2.push(ret);
      that.Base.setMyData({
        images2
      });
    });
  }

  bindlongpressimg2(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var images2 = that.Base.getMyData().images2;
    var imgs = [];
    for (var i = 0; i < images2.length; i++) {
      if (seq != i) {
        imgs.push(images2[i]);
      }
    }
    that.Base.setMyData({
      images2: imgs
    });
  }

  uploadimg3() {
    var that = this;
    this.Base.uploadImage("quoteferry", (ret) => {
      console.log(ret)
      var images3 = that.Base.getMyData().images3;
      images3.push(ret);
      that.Base.setMyData({
        images3
      });
    });
  }

  bindlongpressimg3(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var images3 = that.Base.getMyData().images3;
    var imgs = [];
    for (var i = 0; i < images3.length; i++) {
      if (seq != i) {
        imgs.push(images3[i]);
      }
    }
    that.Base.setMyData({
      images3: imgs
    });
  }


  confirm(e){
    var that = this;
    if (this.Base.getMyData().images1.length == 0) {
      this.Base.info("请至少上传一张取货单图片");
      return;
    }

    if (this.Base.getMyData().images2.length == 0) {
      this.Base.info("请至少上传一张过磅单图片");
      return;
    }

    if (this.Base.getMyData().images3.length == 0) {
      this.Base.info("请至少上传一张货物图片");
      return;
    }

    var images1 = that.Base.getMyData().images1;
    var pickupgoods_img1 = images1[0];
    var pickupgoods_img2 = images1[1];
    var pickupgoods_img3 = images1[2];
    var pickupgoods_img4 = images1[3];
    var pickupgoods_img5 = images1[4];
    var pickupgoods_img6 = images1[5];
    
    var images2 = that.Base.getMyData().images2;
    var receipt_img1 = images2[0];
    var receipt_img2 = images2[1];
    var receipt_img3 = images2[2];
    var receipt_img4 = images2[3];
    var receipt_img5 = images2[4];
    var receipt_img6 = images2[5];

    var images3 = that.Base.getMyData().images3;
    var goods_img1 = images3[0];
    var goods_img2 = images3[1];
    var goods_img3 = images3[2];
    var goods_img4 = images3[3];
    var goods_img5 = images3[4];
    var goods_img6 = images3[5];

    var data={
      id: that.Base.getMyData().id,
      pickupgoods_img1: pickupgoods_img1,
      pickupgoods_img2: pickupgoods_img2,
      pickupgoods_img3: pickupgoods_img3,
      pickupgoods_img4: pickupgoods_img4,
      pickupgoods_img5: pickupgoods_img5,
      pickupgoods_img6: pickupgoods_img6,
      receipt_img1: receipt_img1,
      receipt_img2: receipt_img2,
      receipt_img3: receipt_img3,
      receipt_img4: receipt_img4,
      receipt_img5: receipt_img5,
      receipt_img6: receipt_img6,
      goods_img1: goods_img1,
      goods_img2: goods_img2,
      goods_img3: goods_img3,
      goods_img4: goods_img4,
      goods_img5: goods_img5,
      goods_img6: goods_img6
    }

    var quoteferryapi = new QuoteferryApi();
    quoteferryapi.uploadimg(data,(res)=>{
      console.log(res)

      wx.redirectTo({
        url: '/pages/orderList/orderList',
      })

      wx.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1000
      })
    })
    


  }





}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.uploadimg1 = content.uploadimg1;
body.bindlongpressimg1 = content.bindlongpressimg1;
body.uploadimg2 = content.uploadimg2;
body.bindlongpressimg2 = content.bindlongpressimg2;
body.uploadimg3 = content.uploadimg3;
body.bindlongpressimg3 = content.bindlongpressimg3;

body.confirm = content.confirm;
Page(body)