import Authorize from '../../template/dialog/dialog.js';
const testData = require("../../Api/testData.js");
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
    gameData:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    that.setData({
      gameData: testData.gameData,
      userInfo:testData.userInfo
    })
    console.log(testData);
    
  },
  onShow:function(){
    new Authorize(this,app,function(res){
      console.log("resres", res)
    });
    // var scopeInterval = setInterval(function () {
    //   if (typeof app.globalData.userScope != "undefined") {
    //     clearInterval(scopeInterval);
    //     this.setData({
    //       userScope: app.globalData.userScope
    //     })
    //   }
    // }.bind(this), 300);
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
