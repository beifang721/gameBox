var testOrformalData = 0; //0：本地数据   1：网络数据
var testDomain = "";
var formalDomain = "";
var testData = require("./testData.js");

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
      return typeof objData.callBack == "function" && objData.callBack(res.data);
    },
    fail: function(res) {
      return typeof objData.callBack == "function" && objData.callBack(res);
    }
  })
}
//登录
function wxlogin() {
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


//更新用户信息
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
          return reject(res.msg);
        }
      }
    })

  })
  return promise;
}
//获取用户信息
function getUserInfo() {
  var promise = new Promise(function (resolve, reject) {
    // console.log("testData",testData)
    if (testOrformalData == 0) {
      return resolve(testData.userInfo);
    }
    requestFn({
      urlName: 'PublicNumber/UserInfor',
      data: { rd_session: globalData.rd_session},
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res.userInfo);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

//获取游戏库
function getMainGameData() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.mainGameData);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res.mainGameData);
          } else {
            return reject(res.msg);
          }
        }
      }
    })

  })
  return promise;
}
//获取发现数据
function getFindGameData() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.findGameData);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res.findGameData);
          } else {
            return reject(res.msg);
          }
        }
      }
    })

  })
  return promise;
}
//获取任务配置
function getMissionConfig() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.missionConfig);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res.missionConfig);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}
// 获取奖品配置
function getPrizeConfig() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.prizeData);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}
//获取游戏盒子配置
function gameBoxConfig() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.gameBoxConfig);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session},
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

//更新用户金币
function updataGold() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(0, "");
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

// 更新领取签到奖励记录
function upDataLoginAwardRecord() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(0, "");
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

// 金币明细
function getGoldDetail() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.goldDetaiList);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

// 获取抽奖结果
function getLotteryResult() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.lotteryResult);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

// 上传FormId
function upLoadFormId() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(0, "");
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { userId: globalData.userId, rd_session: globalData.rd_session, formId: formId },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

// 领取红包
function receiveRedpacket() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.redpacketNum);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { userId: globalData.userId, rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

// 领取任务奖励
function receiveMissionAward(missionId) {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(1500);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { userId: globalData.userId, rd_session: globalData.rd_session, missionId: missionId },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}

// 金额信息配置
function getAmountConfig() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.amountConfig);
    }
    requestFn({
      urlName: 'PublicNumber/mainGameData',
      data: { userId: globalData.userId, rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (0 == res.retCode) {
          if (res.retCode == 0) {
            return resolve(res);
          } else {
            return reject(res.msg);
          }
        }
      }
    })
  })
  return promise;
}


module.exports={
  wxlogin: wxlogin,                     //登录
  updateUesrInfo: updateUesrInfo,       //更新用户信息
  getUserInfo: getUserInfo,              //获取用户信息
  getMainGameData: getMainGameData, //获取主游戏库数据
  getFindGameData: getFindGameData, //获取发现游戏库数据
  getMissionConfig: getMissionConfig, //获取任务配置
  getPrizeConfig: getPrizeConfig, //获取奖品配置
  gameBoxConfig: gameBoxConfig, //获取游戏盒子配置
  updataGold: updataGold, //更新金币
  upDataLoginAwardRecord: upDataLoginAwardRecord, //更新领取签到奖励记录
  getGoldDetail: getGoldDetail,  //获取金币明细
  getLotteryResult: getLotteryResult, //获取抽奖结果
  upLoadFormId: upLoadFormId, //上传FormId
  receiveRedpacket: receiveRedpacket, //领取红包
  getAmountConfig: getAmountConfig,  //获取金额配置
  receiveMissionAward: receiveMissionAward //领取任务奖励
}