/*
*Authorize : 授权
*
*/
class Authorize {

  constructor(pageContext, app,callBack) {
    this.page = pageContext;
    this.app = app;
    this.page.userInfoHandler = this.userInfoHandler.bind(this);
    this.callBack = callBack;
    this.getUserScope();
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
  

}

export default Authorize