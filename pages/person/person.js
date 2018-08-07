// pages/person/person.js
import Authorize from '../../template/dialog/dialog.js';
const testData = require("../../Api/testData.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/resources/images/person/banner-1.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    missionList: ["a","b",3,6,5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      gameData: testData.gameData,
      userInfo: testData.userInfo
    });
  },
  onShow: function () {
    new Authorize(this, app);
    // var scopeInterval = setInterval(function () {
    //   console.log(typeof app.globalData.userScope)
    //   if (typeof app.globalData.userScope != "undefined") {
    //     clearInterval(scopeInterval);
    //     this.setData({
    //       userScope: app.globalData.userScope
    //     })
    //   }
    // }.bind(this), 300);
  },
  // userInfoHandler: function (e) {
  //   if (e.detail.errMsg == "getUserInfo:ok") {
  //     this.setData({
  //       userScope: 1
  //     })
  //     app.openSetting();
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  goldListTap: function () {
    wx.navigateTo({
      url: '/pages/goldList/goldList',
    })
  },
  turntableTap:function(){
    wx.navigateTo({
      url: '/pages/slots/slots',
    })
  },
  moreMissionTap:function(){
    wx.navigateTo({
      url: '/pages/mission/mission',
    })
  },
  depositTap:function(){
    wx.navigateTo({
      url: '/pages/deposit/deposit',
    })
  },
  signBtn:function(){
    console.log("签到")
  },
  closeSign:function(){

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})