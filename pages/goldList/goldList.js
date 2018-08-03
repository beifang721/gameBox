// pages/goldList/goldList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    scrollHeight:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.globalData = app.globalData;
    
    that.setData({
      userInfo:that.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('#mjltest').boundingClientRect()
    query.exec(function (res) {
      wx.getSystemInfo({
        success: function (d) {
          
          var scrollHeight = d.windowHeight - 75 - res[0].height;
          console.log(res[0].height);
          console.log(scrollHeight)
          that.setData({
            scrollHeight: scrollHeight,
            hiddenLoading: true
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
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
  
  },
  swichTop:function(e){
    var that = this;
    var currentTab = e.currentTarget.dataset.current;
    that.setData({
      currentTab: currentTab
    })
  }
})