/*
*Authorize : 授权
*
*/
var ysApi = require("../../Api/ysApi.js");
class Authorize {

  constructor(pageContext, app,callBack) {
    this.page = pageContext;
    this.app = app;
    this.callBack = callBack;
    this.getUserScope();
    this.page.userInfoHandler = this.userInfoHandler.bind(this);//获取用户信息点击
    this.page.closeSign = this.closeSign.bind(this);
    this.page.signBtn = this.signBtn.bind(this); //弹窗的签到按钮点击事件
    this.page.signBtnPage = this.signBtnPage.bind(this);//页面的点击事件
    this.page.formIdBtn = this.formIdBtn.bind(this)
    this.page.setData({
      signBtnOn:0  //是否点击签到按钮
    })
    // console.log(this.page);
  }
  
  userInfoHandler(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      this.page.setData({
        userScope: 1
      })
      this.app.openSetting();
      this.callBack && this.callBack(e.detail.userInfo)
    }
  }

  getUserScope(){
    var scopeInterval = setInterval(function () {
      if (typeof this.app.globalData.userScope != "undefined") {
        clearInterval(scopeInterval);
        this.page.setData({
          userScope: this.app.globalData.userScope
        })
      }
    }.bind(this), 300);
  }

  closeSign(){
    this.app.globalData.isDialogClose = 0;
    this.page.setData({
      isDialogClose: 0,
    });
    if (this.page.data.signBtnOn==1){
      this.page.setData({
        isTodaySgin: 1
      })
    }
  }
  
  signBtn(){
    this.app.globalData.signAwardIndex++;
    this.app.globalData.isTodaySgin = 1;
    this.page.setData({
      signAwardIndex: this.page.data.signAwardIndex + 1,
      signBtnOn:1
    })
    ysApi.upDataLoginAwardRecord().then(function(res){
      var gold = "userInfo.gold";
      this.app.globalData.userInfo.gold = res.gold;
      this.page.setData({
        [gold]: res.gold
      })
    }.bind(this)).catch(function(){});
  }

  signBtnPage(){
    ysApi.upDataLoginAwardRecord().then(function (res) {
      var loginAwardArr = this.page.data.gameBoxConfig.loginAward;
      var arrIndex = this.app.globalData.signAwardIndex;
      var gold = "userInfo.gold";
      wx.showToast({
        title: '获得'+loginAwardArr[arrIndex - 1].award +'金币',
      })
      this.app.globalData.userInfo.gold = res.gold;
      this.page.setData({
        [gold]: res.gold
      })
    }.bind(this)).catch(function () { });
    this.app.globalData.signAwardIndex++;
    this.app.globalData.isTodaySgin = 1;
    this.page.setData({
      isTodaySgin: 1,
      signAwardIndex: this.page.data.signAwardIndex + 1
    })
  }
  formIdBtn(e){
    console.log(e)
    ysApi.upLoadFormId(e.detail.formId).then(function(){

    }).catch(function(){})
  }

  

}

export default Authorize