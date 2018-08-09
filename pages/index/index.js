import Authorize from '../../template/dialog/dialog.js';
const app = getApp();
Page({
  data: {
    userInfo: {
    },
    imgUrls: [
      '/resources/images/homeUI/banner-1.png',
      '/resources/images/homeUI/banner-2.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    var mySetInterval_B = setInterval(function () {
      if (app.loginIsSuccess) {
        clearInterval(mySetInterval_B);
        console.log(app);
        this.setData({
          mainGameData: app.globalData.mainGameData,
        })
      }
    }.bind(this), 200);
  },
  onShow:function(){
    new Authorize(this,app,function(res){
      console.log("resres", res)
    });
    app.setPageData(this);
    
    /*
    var scopeInterval = setInterval(function () {
      if (typeof app.globalData.userScope != "undefined") {
        clearInterval(scopeInterval);
        this.setData({
          userScope: app.globalData.userScope
        })
      }
    }.bind(this), 300);
    */
  },
  userInfoHandler: function (e) {
    // if (e.detail.errMsg == "getUserInfo:ok") {
    //   this.setData({
    //     userScope: 1
    //   })
    //   app.openSetting();
    // }
  }

})
