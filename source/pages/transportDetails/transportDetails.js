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
      

      var images = [ ret.pickupgoods_img,
        ret.vehicle_img,
        ret.goods_img1,
        ret.goods_img2,
        ret.goods_img3,
        ret.goods_img4]
        
      

      this.Base.setMyData({ datas: ret, images: images });

    });

    

    that.Base.getAddress((res) => {
      console.log(res)
      that.Base.setMyData({ address: res.address });
    })

  }

  photo() {
    console.log(this.Base.getMyData().images)
    this.Base.viewGallary('photo', this.Base.getMyData().images,'')
  }

  getmileage(e) {
    // console.log(e)
    this.Base.setMyData({ end_mileage: e.detail.value });
  }

  uploadimg1(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        photo: ret
      });
    }
      , undefined, 1);
  }

  uploadimg4(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        end_mileage_img: ret
      });
    }
      , undefined, 1);
  }

  

  uploadimg5(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        goods_img5: ret
      });
    }
      , undefined, 1);
  }

  uploadimg6(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        goods_img6: ret
      });
    }
      , undefined, 1);
  }

  uploadimg7(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        goods_img7: ret
      });
    }
      , undefined, 1);
  }

  arriveRemark(e){
    
    this.Base.setMyData({ arriveRemark: e.detail.value})
    console.log(this.Base.getMyData().arriveRemark)
  }

  confirm(e) {
    var that=this;
    // if (this.Base.getMyData().end_mileage == undefined) {
    //   this.Base.info("请输入车辆当前里程数");
    //   return;
    // }
    // console.log(that.Base.getMyData().end_mileage, this.Base.getMyData().datas.start_mileage)
    // if (that.Base.getMyData().end_mileage < parseInt(this.Base.getMyData().datas.start_mileage)) {
    //   this.Base.info("当前里程数不能小于取货时里程数");
    //   return;
    // }

    // if (this.Base.getMyData().photo == "") {
    //   this.Base.info("请上传收货单");
    //   return;
    // }


    // if (this.Base.getMyData().end_mileage_img == undefined) {
    //   this.Base.info("请上传车辆当前里程数图片");
    //   return;
    // }

    // if (this.Base.getMyData().goods_img5 == undefined && this.Base.getMyData().goods_img6 == undefined && this.Base.getMyData().goods_img7 == undefined) {
    //   this.Base.info("请至少上传一张货物图片");
    //   return;
    // }
    var quoteferryapi = new QuoteferryApi();
    var data={
      id: this.Base.getMyData().id, 
      receipt_img: this.Base.getMyData().photo, 
      arriveRemark: this.Base.getMyData().arriveRemark ,
      arrival_address: this.Base.getMyData().address,
      end_mileage: this.Base.getMyData().end_mileage,
      end_mileage_img: this.Base.getMyData().end_mileage_img,
      goods_img5: this.Base.getMyData().goods_img5,
      goods_img6: this.Base.getMyData().goods_img6,
      goods_img7: this.Base.getMyData().goods_img7
    }
    quoteferryapi.uploadreceipt( data, (ret) => {
      console.log(ret)
      if (ret.result == 'SUCCESS') {
        wx.redirectTo({
          url: '/pages/uploadimg/uploadimg',
        })

        wx.showToast({
          title: '货物成功送达',
          icon: 'success',
          duration: 1000
        })
      }

    });
  }

}


var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.uploadimg1 = content.uploadimg1;
body.uploadimg4 = content.uploadimg4;
body.uploadimg5 = content.uploadimg5;
body.uploadimg6 = content.uploadimg6;
body.uploadimg7 = content.uploadimg7;
body.confirm = content.confirm;
body.arriveRemark = content.arriveRemark;
body.getmileage = content.getmileage;
body.photo = content.photo;
Page(body)