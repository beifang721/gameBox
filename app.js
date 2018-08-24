//app.js
const testData = require("./Api/testData.js");
const ysApi = require("./Api/ysApi.js");
const utils = require("./utils/util.js");
const wxApi = require("./Api/wxApi.js");
App({
  onShow: function () {
  },
  onLaunch: function (options) {
    var that = this;
    var skipAppId = options.query.skipAppId;
    this.stepStatus = 1;
    this.stepIndex = 0;
    this.loadIsFinished = false; //加载成功
    this.loginIsSuccess = false; //登录是否成功
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    ysApi.wxlogin().then(function(res){
      //小程序登录成功
      that.openSetting();
      console.log(res)
      return ysApi.getMainGameData();
    }).catch(function(errMsg){
      that.showModalFn(errMsg);
    })
    .then(function(res){
      //登录成功后  开始获取主页游戏库
      console.log("获取主游戏库111",res)
      var skipAppData = res[0].gamedate[skipAppId];
      that.globalData.mainGameData = res;
      //小程序自动跳转
      if (typeof skipAppId != "undefined" && skipAppId != "") {
        that.navigateToMiniProgramFn(skipAppData.appid, skipAppData.path, skipAppData.extraData, "release");
      } 
      return ysApi.getFindGameData();
    }).catch(function(errMsg){
      console.log("2",errMsg)
      that.showModalFn(errMsg)
    })
    .then(function (res) {
      that.loginIsSuccess = true;
      //主页游戏库成功  开始获取发现游戏库
      that.globalData.findGameData = res;
    }).catch(function (errMsg) {
      console.log("3", errMsg)
      that.showModalFn(errMsg)
    })
  },
  openSetting: function () {  //获取用户信息是否授权
    var that = this;
    wx.getSetting({
      success: function (res) {
        //console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          that.globalData.userScope = 1;
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang:"zh_CN",
            success: function (res) {
              // console.log(res.userInfo)
              wx.setStorageSync('userinfo', res);
              that.wxUserInfo = res.userInfo;
              that.getConfigStepStatus();
            }
          })
        } else {
          wx.hideLoading();
          that.globalData.userScope = 0;
          // console.log("未授权")
        }
      }
    })
  },
  getConfigStepStatus:function(){ //获取配置以及用户信息
    var that = this;
    if (this.stepStatus == 1){
      switch (this.stepIndex) {
        case 0: 
          //登陆成功 开始更新用户信息
          ysApi.updateUesrInfo(that.wxUserInfo).then(function (res) {
            that.stepIndex ++;
            that.getConfigStepStatus();
          }).catch(function (errMsg) {
            that.stepStatus = 2;
            that.showModalFn(errMsg)
          });
          break;
        case 1:
          //更新用户信息成功  开始获取用户信息
          ysApi.getUserInfo().then(function (res) {
            that.stepIndex++;
            that.globalData.userInfo = res;
            that.getConfigStepStatus();
          }).catch(function (errMsg) {
            that.stepStatus = 2;
            that.showModalFn(errMsg)
          });
          break;
        case 2:
          //获取用户信息成功  开始获取小程序配置
          ysApi.gameBoxConfig().then(function(res){
            //获取游戏盒子配置成功
            console.log("游戏盒子配置----------",res);
            that.globalData.gameBoxConfig = res;
            return ysApi.getAmountConfig()
          }).catch(function(errMsg){
            that.stepStatus = 2;
            that.showModalFn(errMsg)
          })
          .then(function (res) {
            //获取金额配置成功  开始获取奖品
            // console.log("金额配置----------",res);
            that.globalData.amountConfig = res;
            return ysApi.getPrizeConfig()
          }).catch(function (errMsg) {
            that.stepStatus = 2;
            that.showModalFn(errMsg)
          })
          .then(function (res) {
            //获取奖品配置成功  并进入游戏
            // console.log("奖品配置------------",res);
            that.globalData.LotteryConfig = res;
            that.stepIndex++;
            that.getConfigStepStatus();
          }).catch(function (errMsg) {
            that.stepStatus = 2;
            that.showModalFn(errMsg)
          })
          break;
        case 3:
          wx.hideLoading();
          //获取配置信息成功  
          let signDate = that.globalData.userInfo.loginDate;
          that.globalData.signAwardIndex = that.globalData.userInfo.loginAwardIndex;
          that.globalData.curTodySignIndex = that.globalData.userInfo.loginAwardIndex;
          that.globalData.isDialogClose = 1;//签到弹窗
          if (utils.getCurDate() == utils.timestampToTime(signDate)){
            that.globalData.isTodaySgin = 1;
          }else{
            that.globalData.isTodaySgin = 0;
          }
          that.loadIsFinished = true;
          break;
      }
    } else if (this.stepStatus == 2){

    }
  },
  setPageData:function(that_,call){  //初始化页面数据
    var mySetInterval_A = setInterval(function () {
      if (this.loadIsFinished) {
        clearInterval(mySetInterval_A);
        console.log("this.globalData", this.globalData);
        that_.setData({
          userInfo: this.globalData.userInfo,
          LotteryConfig: this.globalData.LotteryConfig,
          gameBoxConfig: this.globalData.gameBoxConfig,
          amountConfig: this.globalData.amountConfig,
          isTodaySgin: this.globalData.isTodaySgin,
          signAwardIndex: this.globalData.signAwardIndex,
          isDialogClose: this.globalData.isDialogClose,
          curTodySignIndex: this.globalData.curTodySignIndex
        })
        return typeof call == "function" && call();
      }
    }.bind(this), 200);
  },
  globalData: {
    //develop（开发版），trial（体验版），release（正式版） ，
    //仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版。默认值 release
    version:"release"
  },
  wxApi: wxApi,
  ysApi:ysApi,
  showModalFn: function (content){
    wx.hideLoading();
    wx.showModal({
      title: '提示',
      content: ''+content+'',
    })
  },
  navigateToMiniProgramFn: function (appid, path = "", extraData, envVersion){
    wx.navigateToMiniProgram({
      appId: appid,
      path: path,
      extraData: extraData,
      envVersion: envVersion,
      success(res) {
        console.log(res)
        // 打开成功
      }
    })
  }

})