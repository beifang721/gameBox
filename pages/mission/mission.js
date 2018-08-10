// pages/mission/mission.js
import Authorize from '../../template/dialog/dialog.js';
const testData = require("../../Api/testData.js");
const ysApi = require("../../Api/ysApi.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    new Authorize(this, app);
    app.setPageData(this);
    var mySetInterval = setInterval(function () {
      if (app.loginIsSuccess) {
        clearInterval(mySetInterval);
        ysApi.getMissionConfig().then(function (res) {
          this.setData({
            missionConfig: res
          })
        }.bind(this));
      }
    }.bind(this), 200);
  },
  receiveTap: function (e) { //领取任务奖励
    var missionid = e.currentTarget.dataset.missionid;
    ysApi.receiveMissionAward(missionid).then(function (res) {
      console.log(app.globalData.userInfo.gold, res)
      app.globalData.userInfo.gold = app.globalData.userInfo.gold + res;
      var gold = "userInfo.gold";
      this.setData({
        [gold]: this.data.userInfo.gold + res
      })
      //测试用
      testData.missionConfig[missionid - 1].isFinished = true;
      testData.missionConfig[missionid - 1].isReceive = true;
      return ysApi.getMissionConfig();
    }.bind(this)).catch(function (errMsg) {

    }).then(function (res) {
      this.setData({
        missionConfig: res
      })
    }.bind(this)).catch(function (errMsg) {

    });
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
  
  }
})