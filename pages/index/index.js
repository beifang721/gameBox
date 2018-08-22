import Authorize from '../../template/dialog/dialog.js';
const app = getApp();
const wxApi = require("../../Api/wxApi.js");
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
    version:""
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
        // console.log(app);
        this.setData({
          mainGameData: app.globalData.mainGameData,
        })
      }
    }.bind(this), 200);
    this.setData({
      version: app.globalData.version
    })
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
  },
  onReady: function () {
    wx.getSystemInfo({
      success: function (res) {
        wx.createSelectorQuery().select('#navHeight').boundingClientRect(function (rect) {
          // console.log(rect)
          this.setData({
            windowHeight: res.windowHeight - rect.height
          })
        }.bind(this)).exec();
      }.bind(this)
    })
  },
  updateTaskTap:function(e){
    var id = e.currentTarget.dataset.id;
    app.ysApi.updateExperienceReward(id).then(function(res){
      console.log(id)
    }.bind(this)).catch(function(errmsg){
      console.log(errmsg)
    });
  },
  onShareAppMessage:function(){
    var shareuserId = app.globalData.userInfo.userId;
    return app.wxApi.onShareAppMessage("我是谁", "/pages/index/index", shareuserId,function (res) {
      console.log(res)
    });
  }

})
