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

  

  uploadimg(e) {
    var that = this;
    var id = e.currentTarget.id;
    this.Base.uploadImage("photo",(ret) => {
        that.Base.setMyData({
          photo: ret
        });
      }
      , undefined, 1);
  }

  confirm(e){
    if (this.Base.getMyData().photo == "") {
      this.Base.info("请上传取货单");
      return;
    }
    var quoteferryapi = new QuoteferryApi();
    quoteferryapi.pickupgoods({ id: this.Base.getMyData().id, pickupgoods_img: this.Base.getMyData().photo, pickupgoods_address: this.Base.getMyData().address }, (ret) => {
      console.log(ret)
      if (ret.result =='SUCCESS'){
        wx.redirectTo({
          url: '/pages/transportDetails/transportDetails?id=' + this.Base.getMyData().id,
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

Page(body)