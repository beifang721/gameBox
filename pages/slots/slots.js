// pages/slots/slots.js
import FruitMachine from '../../components/fruitMachine/fruitMachine.js';
const app = getApp();
const ysApi = require("../../Api/ysApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marqueeOn:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setPageData(this,function(){
      var prizeArr = this.data.LotteryConfig.prizeArr.splice(8, 0, "1");
      this.setData({
        LotteryConfig: this.data.LotteryConfig
      })
    }.bind(this));
    this.marqueeOn();//跑马灯效果
    this.fruitMachine = new FruitMachine(this, {
      // ret: ret, // 取值1～8
      speed: 100,
      callback: (data) => {
        console.log("xxx",data)
        wx.showModal({
          title: '提示',
          content: '恭喜您，' + this.data.LotteryConfig.prizeArr[data-1].prizeName+'',
          showCancel: false,
          success: res => {
            this.fruitMachine.reset()
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  marqueeOn:function(){
    var bool = true;
    setInterval(function () {
      bool = !bool;
      if (bool) {
        this.setData({
          marqueeOn: 2
        })
      } else {
        this.setData({
          marqueeOn: 1
        })
      }
    }.bind(this), 500)
  },
  getGoldTap:function(){

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