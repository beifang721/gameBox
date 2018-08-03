// pages/slots/slots.js
import FruitMachine from '../../components/fruitMachine/fruitMachine.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeArr:[{
        prizeName:"现金红包",
        prizeImg: "resources/images/slots/redpacket.png"
      },
      {
        prizeName: "现金红包",
        prizeImg: "resources/images/slots/redpacket.png"
      },
      {
        prizeName: "现金红包",
        prizeImg: "resources/images/slots/redpacket.png"
      },
      {
        prizeName: "现金红包",
        prizeImg: "resources/images/slots/redpacket.png"
      },
      {
        prizeName: "现金红包",
        prizeImg: "resources/images/slots/redpacket.png"
      },
      {
        prizeName: "现金红包",
        prizeImg: "resources/images/slots/redpacket.png"
      },
      {
        prizeName: "现金红包",
        prizeImg: "resources/images/slots/redpacket.png"
      },
      {
        prizeName: "现金红包",
        prizeImg: "resources/images/slots/redpacket.png"
      }

      
    ],
    active:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var bool = true;
    setInterval(function(){
      bool = !bool;
      if(bool){
        this.setData({
          active: 2
        })
      }else{
        this.setData({
          active: 1
        })
      }
    }.bind(this),300)

    this.fruitMachine = new FruitMachine(this, {
      // ret: ret, // 取值1～8
      speed: 100,
      callback: (data) => {
        console.log("xxx",data)
        wx.showModal({
          title: '提示',
          content: '恭喜您，中奖了,' + data+'',
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