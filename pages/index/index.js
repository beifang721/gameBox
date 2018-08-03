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
    console.log(testData)
  },
  loginBtn:function(){
    console.log("游戏盒子")

  }

})
