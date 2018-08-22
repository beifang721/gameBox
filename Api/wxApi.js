//分享至哪里
function onShareAppMessage(title, path, shareUserId=0,call) {
  console.log("title", title,path,shareUserId)
  return {
    title: title,
    path: "" + path + "?shareUserId=" + shareUserId + "",
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