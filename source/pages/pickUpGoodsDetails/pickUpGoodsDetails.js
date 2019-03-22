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

    that.Base.getAddress((res)=>{
      console.log(res)
      that.Base.setMyData({ address: res.address});
    })

  }

  getmileage(e){
    // console.log(e)
    this.Base.setMyData({ start_mileage: e.detail.value });
  }

  

  uploadimg1(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo",(ret) => {
        that.Base.setMyData({
          photo: ret
        });
      }
      , undefined, 1);
  }

  uploadimg2(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        start_mileage_img: ret
      });
    }
      , undefined, 1);
  }

  uploadimg3(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        vehicle_img: ret
      });
    }
      , undefined, 1);
  }

  uploadimg4(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        goods_img1: ret
      });
    }
      , undefined, 1);
  }

  uploadimg5(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        goods_img2: ret
      });
    }
      , undefined, 1);
  }

  uploadimg6(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        goods_img3: ret
      });
    }
      , undefined, 1);
  }

  uploadimg7(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo", (ret) => {
      that.Base.setMyData({
        goods_img4: ret
      });
    }
      , undefined, 1);
  }

  confirm(e){
    // console.log(this.Base.getMyData().photo)
    // return;
    // if (this.Base.getMyData().photo == undefined && this.Base.getMyData().photo == null) {
    //   this.Base.info("请上传取货单");
    //   return;
    // }

    // if (this.Base.getMyData().start_mileage == undefined || this.Base.getMyData().start_mileage == null ) {
    //   this.Base.info("请输入车辆当前里程数");
    //   return;
    // }

    // if ( this.Base.getMyData().start_mileage <1) {
    //   this.Base.info("里程数不能小于1");
    //   return;
    // }

  
    // if (this.Base.getMyData().start_mileage_img == undefined) {
    //   this.Base.info("请上传车辆当前里程数图片");
    //   return;
    // }

    // if (this.Base.getMyData().vehicle_img == undefined || this.Base.getMyData().vehicle_img==null) {
    //   this.Base.info("请上传车辆图片");
    //   return;
    // }

    // if (this.Base.getMyData().goods_img1 == undefined && this.Base.getMyData().goods_img2 == undefined && this.Base.getMyData().goods_img3 == undefined && this.Base.getMyData().goods_img4 == undefined ) {
    //   this.Base.info("请至少上传一张货物图片");
    //   return;
    // }

    var quoteferryapi = new QuoteferryApi();
    var data={
      id: this.Base.getMyData().id, 
      pickupgoods_img: this.Base.getMyData().photo, 
      pickupgoods_address: this.Base.getMyData().address ,
      start_mileage: this.Base.getMyData().start_mileage,
      start_mileage_img: this.Base.getMyData().start_mileage_img,
      vehicle_img: this.Base.getMyData().vehicle_img,
      goods_img1: this.Base.getMyData().goods_img1,
      goods_img2: this.Base.getMyData().goods_img2,
      goods_img3: this.Base.getMyData().goods_img3,
      goods_img4: this.Base.getMyData().goods_img4,

    }
    quoteferryapi.pickupgoods( data, (ret) => {
      console.log(ret)
      if (ret.result =='SUCCESS'){
        
        wx.redirectTo({
          url: '/pages/transportDetails/transportDetails?id=' + this.Base.getMyData().id,
        })

        wx.showToast({
          title: '取货成功',
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
body.confirm = content.confirm;
body.getmileage = content.getmileage;
body.uploadimg1 = content.uploadimg1;
body.uploadimg2 = content.uploadimg2;
body.uploadimg3 = content.uploadimg3;
body.uploadimg4 = content.uploadimg4;
body.uploadimg5 = content.uploadimg5;
body.uploadimg6 = content.uploadimg6;
body.uploadimg7 = content.uploadimg7;
Page(body)