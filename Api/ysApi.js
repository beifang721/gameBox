var testOrformalData = 1; //0：本地数据   1：网络数据
var testDomain = "http://192.168.1.113:8089/";
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
    success: function (res) {
      return typeof objData.callBack == "function" && objData.callBack(res.data);
    },
    fail: function (res) {
      return typeof objData.callBack == "function" && objData.callBack(res);
    }
  })
}
//登录
function wxlogin() {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(0, "");
    }
    var options = wx.getLaunchOptionsSync();
    var query = options.query;
    var shareUserId = 0;
    if (JSON.stringify(query) != "{}") {
      if (typeof (query.shareUserId) != "undefined") { //有分享者Id
        shareUserId = query.shareUserId;
      }
    }

    if (globalData.rd_session == null) {
      wx.login({
        success: function (res) {
          requestFn({
            urlName: 'PublicNumber/Login',
            method: "GET",
            data: {
              code: res.code,
              shareuserId: shareUserId
            },
            callBack: function (data) {
              console.log("亿搜登录", data)
              if (data.retCode == 0) {
                globalData.rd_session = data.rd_session;
                globalData.userId = data.userId;
                resolve(0, "");
              } else {
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
function updateUesrInfo(data) {
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(0, "");
    }
    var nickName = data.nickName;
    var gender = data.gender;
    var city = data.city;
    var province = data.province;
    var country = data.country;
    var avatarUrl = data.avatarUrl;

    requestFn({
      urlName: 'PublicNumber/UserUpdate',
      data: { rd_session: globalData.rd_session, nickName: nickName, gender: gender, city: city, province: province, country: country, avatarUrl: avatarUrl },
      method: "GET",
      callBack: function (res) {
        if (res.retCode == 0) {
          return resolve(0, "");
        } else {
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
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获取用户信息", res);
        if (res.retCode == 0) {
          return resolve(res.userInfo);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/GetmainGameData',
      data: { rd_session: globalData.rd_session, userId: globalData.userId },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜主页游戏库", res);
        if (res.retCode == 0) {
          return resolve(res.mainGameData);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/GetfindData',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜发现数据库", res);
        if (res.retCode == 0) {
          return resolve(res.findGameData);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/GetTaskConfiguration',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜任务配置", res);
        if (res.retCode == 0) {
          return resolve(res.missionConfig);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/GetLotteryConfig',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜获奖品配置", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/GetGameBoxConfig',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜游戏盒子配置", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
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
        console.log("亿搜更新用户金币", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/LoginGold',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜领取签到奖励记录", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/GetGoldList',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜金币明细列表", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/Prize',
      data: { rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜抽奖结果", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          console.log(res.msg)
          return reject(res.msg);
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
      urlName: 'PublicNumber/formId',
      data: { userId: globalData.userId, rd_session: globalData.rd_session, formId: formId },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜上传formId", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/redPacket',
      data: { userId: globalData.userId, rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜领取红包", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/GetTaskReward',
      data: { userId: globalData.userId, rd_session: globalData.rd_session, missionId: missionId },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜领取任务奖励", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
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
      urlName: 'PublicNumber/GetAmountConfig',
      data: { userId: globalData.userId, rd_session: globalData.rd_session },
      method: "GET",
      callBack: function (res) {
        console.log("亿搜金额信息配置", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
        }
      }
    })
  })
  return promise;
}

function updateExperienceReward(data){
  var promise = new Promise(function (resolve, reject) {
    if (testOrformalData == 0) {
      return resolve(testData.amountConfig);
    }
    requestFn({
      urlName: 'PublicNumber/UpdateExperienceReward',
      data: { userId: globalData.userId, rd_session: globalData.rd_session, apId:data },
      method: "GET",
      callBack: function (res) {
        console.log("更新任务", res);
        if (res.retCode == 0) {
          return resolve(res);
        } else {
          return reject(res.msg);
        }
      }
    })
  })
  return promise;
}

module.exports = {
  //登录
  wxlogin: wxlogin,
  //更新用户信息
  updateUesrInfo: updateUesrInfo, 
  //获取用户信息
  getUserInfo: getUserInfo, 
  //获取主游戏库数据
  getMainGameData: getMainGameData, 
  //获取发现游戏库数据
  getFindGameData: getFindGameData, 
  //获取任务配置
  getMissionConfig: getMissionConfig, 
  //获取奖品配置
  getPrizeConfig: getPrizeConfig, 
  //获取游戏盒子配置
  gameBoxConfig: gameBoxConfig, 
  //更新金币
  updataGold: updataGold, 
  //更新领取签到奖励记录
  upDataLoginAwardRecord: upDataLoginAwardRecord, 
   //获取金币明细
  getGoldDetail: getGoldDetail, 
  //获取抽奖结果
  getLotteryResult: getLotteryResult, 
  //上传FormId
  upLoadFormId: upLoadFormId, 
  //领取红包
  receiveRedpacket: receiveRedpacket, 
  //获取金额配置
  getAmountConfig: getAmountConfig,  
  //领取任务奖励
  receiveMissionAward: receiveMissionAward, 
  //更新任务
  updateExperienceReward: updateExperienceReward 
}