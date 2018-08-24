//分享至哪里
function onShareAppMessage( shareIndex,path, shareUserId=0,call) {
  var shareData = [{
    title: "百万红包，等你来拆", imgUrl:"/resources/images/shareImag-1.png"},{
    title: "小姐姐约吗？大神带你飞", imgUrl: ""
  }];
  return {
    title: shareData[shareIndex].title,
    path: "" + path + "?shareUserId=" + shareUserId + "",
    imageUrl: shareData[shareIndex].img,
    success: function (res) {
      // if (Boolean(res.shareTickets)) {
      //   wx.getShareInfo({
      //     shareTicket: res.shareTickets,
      //     success: function (data) {
      //       return call({ shareFrom: 1, msg: "分享群" }); //分享群
      //     }
      //   })
      // } else {
      //   return call({ shareFrom: 0, msg: "分享个人" }); //分享个人
      // }
    }
  }
}

module.exports = {
  onShareAppMessage: onShareAppMessage
}