//app.js
var testData = require("./Api/testData.js");
var ysApi = require("./Api/ysApi.js");
App({
  onLaunch: function () {
    var that = this;
    that.globalData = testData;
    that.openSetting();

    this.stepStatus = 0;

    ysApi.wxlogin().then(function(res){
      console.log(res);
      return ysApi.updateUesrInfo(res);
    }).catch(function(errMsg){
      wx.showModal({
        title: '出错',
        content: errMsg,
      })
    })
    .then(function(resa){
        console.log(resa)
      }).catch(function(errMsg){

      })


  },
  onShow:function(){
  },
  openSetting: function () {  //获取用户信息是否授权
    var that = this;
    wx.getSetting({
      success: function (res) {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          that.globalData.userScope = 1;
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang:"zh_CN",
            success: function (res) {
              console.log(res.userInfo)
              wx.setStorageSync('userinfo', res);
              //that.toUpdateUesrInfo(res)//更新用户信息
            }
          })
        } else {
          that.globalData.userScope = 0;
          // console.log("未授权")
        }
      }
    })
  },
  getConfigStepStatus:function(){ //获取配置以及用户信息
    
  },
  globalData: {
    
  }
})