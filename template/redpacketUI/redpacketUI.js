
const ysApi = require("../../Api/ysApi.js");
class OpenRedUI{
  constructor(pageContext, app){
    this.page = pageContext;
    this.app = app;
    this.page.closeBtn = this.closeBtn.bind(this);
    this.page.openRedPacketTap = this.openRedPacketTap.bind(this);
    this.page.setData({
      redpacketColse:1
    })
    console.log(pageContext);
  }

  closeBtn(){
    this.page.setData({
      redpacketColse: 1
    })
  }

  openRedPacketTap(){
    ysApi.receiveRedpacket().then((res)=>{
      // console.log(res)
      this.app.globalData.userInfo.gold = res.gold;
      var redpacketAmount = "amountConfig.redpacketAmount";
      var curAmount = "amountConfig.curAmount";
      this.page.setData({
        redpacketColse: 0,
        [redpacketAmount]: res.redpacketAmount,
        [curAmount]:res.curAmount
      })

    }).catch((errMsg)=>{
      wx.showModal({
        title: '提示',
        content: errMsg,
      })
    })
    
  }

}


export default OpenRedUI;