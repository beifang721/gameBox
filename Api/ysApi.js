var testOrformalData = 0; //0：本地数据   1：网络数据
var testDomain = "";
var formalDomain = "";

var globalData = {
  rd_session: null,
  userId: null,
  loginData: null
}

/*
 * @ objData.urlName  请求接口地址  string
 * @ objData.data     请求参数  对象 
 * @ objData.method   请求方式
 * @ objData.callBack 请求结果回调
 *
 */
function requestFn(objData) {
  // console.log(objData);
  wx.request({
    url: typeof testDomain == "undefined" ? "" + formalDomain + objData.urlName + "" : "" + testDomain + objData.urlName + "",
    data: objData.data,
    method: objData.method,
    header: {
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    success: function(res) {
      return typeof objData.callBack == "function" && objData.callBack(res.data)
    },
    fail: function(res) {
      return typeof objData.callBack == "function" && objData.callBack(res)
    }
  })
}

function wxlogin(logincallBack) {
  var promise = new Promise(function(resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(0, "");
    }
    if (CC_WECHATGAME) {
      var options = wx.getLaunchOptionsSync();
      var query = options.query;
      var shareUserId = 0;
      if (JSON.stringify(query) != "{}") {
        if (typeof(query.shareUserId) != "undefined") { //有分享者Id
          shareUserId = query.shareUserId;
        }
      }
    }
    if (globalData.rd_session == null) {
      wx.login({
        success: function(res) {
          requestFn({
            urlName: 'PublicNumber/Login',
            method: "GET",
            data: {
              code: res.code,
              shareUserId: shareUserId
            },
            callBack: function(data) {
              console.log("亿搜登录后台返回参数", data)
              if(data.retCode == 0){
                globalData.rd_session = data.rd_session;
                globalData.userId = data.userId;
                resolve(0, "");
              }else{
                reject(data.msg);
              }
            }
          })
        }
      })
    } else {
      resolve(0, "");
    }
  })
  return promise;
}

function test() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(0, "");
    }
  })
  return promise;
}

function updateUesrInfo(data){
  var promise = new Promise(function (resolve, reject){
    if (testOrformalData == 0) {
      return resolve(0, "");
    }
    
    requestFn({
      urlName: 'PublicNumber/UserUpdate',
      data: { rd_session: globalData.rd_session, userInfo: data},
      method: "GET",
      callBack: function (res) {
        if (res.retCode==0){
          return resolve(0, "");
        }else{
          return reject(data.msg);
        }
      }
    })

  })
  return promise;
}


module.exports={
  wxlogin: wxlogin,
  updateUesrInfo: updateUesrInfo
}