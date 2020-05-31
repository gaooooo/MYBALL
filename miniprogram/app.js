//app.js
import { setBaseUrl, addDefaultInterceptor } from './utils/request';
import { removeToken } from './utils/util-token'
 // setBaseUrl('/');
import Touches from './utils/Touches.js';
var Bmob = require("utils/bmob.js");
var common = require("utils/common.js");
const __utils = require('utils/util');
Bmob.initialize("b18e36765926ac19f0ba75ef82afaa98", "f07b897d96b0d82eaebdfabeaeca2c5d");
App({
  version: 'v2.2.4', //版本号
  onLaunch: function () {
    addDefaultInterceptor.call(this);
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    //调用系统API获取设备的信息
    wx.getSystemInfo({
      success: function (res) {
        var kScreenW = res.windowWidth / 375
        var kScreenH = res.windowHeight / 603
        wx.setStorageSync('kScreenW', kScreenW)
        wx.setStorageSync('kScreenH', kScreenH)
      }
    })
    //调用API从本地缓存中获取数据
    // wx.checkSession 过期则清空用户缓存，没过期正常请求
    // try {
    //   var value = wx.getStorageSync('ball_token')
    //   if (value) {
    //   } else {
    //     console.log('执行login1')
    //     // wx.login({
    //     //   success: function (res) {
    //     //     if (res.code) {
    //     //       console.log('执行login2', res);
    //     //     }
    //     //   }
    //     // });
    //     // wx.login({
    //     //   success: function (res) {
    //     //     if (res.code) {
    //     //       Bmob.User.requestOpenId(res.code, {
    //     //         success: function (userData) {
    //     //           debugger  
    //     //           wx.getUserInfo({
    //     //             success: function (result) {
    //     //               debugger
    //     //               var userInfo = result.userInfo
    //     //               var nickName = userInfo.nickName
    //     //               var avatarUrl = userInfo.avatarUrl
    //     //               var sex = userInfo.gender
    //     //               Bmob.User.logIn(nickName, userData.openid, {
    //     //                 success: function (user) {
    //     //                   try {
    //     //                     wx.setStorageSync('user_openid', user.get('userData').openid)
    //     //                     wx.setStorageSync('user_id', user.id)
    //     //                     wx.setStorageSync('my_nick', user.get("nickname"))
    //     //                     wx.setStorageSync('my_username', user.get("username"))
    //     //                     wx.setStorageSync('my_sex', user.get("sex"))
    //     //                     wx.setStorageSync('my_avatar', user.get("userPic"))
    //     //                   } catch (e) {
    //     //                   }
    //     //                   console.log("登录成功");
    //     //                 },
    //     //                 error: function (user, error) {
    //     //                   if (error.code == '101') {
    //     //                     var user = new Bmob.User();//开始注册用户
    //     //                     user.set('username', nickName);
    //     //                     user.set('password', userData.openid);
    //     //                     user.set("nickname", nickName);
    //     //                     user.set("userPic", avatarUrl);
    //     //                     user.set("userData", userData);
    //     //                     user.set('sex', sex);
    //     //                     user.set('feednum',0);
    //     //                     user.signUp(null, {
    //     //                       success: function (result) {
    //     //                         console.log('注册成功');
    //     //                         try {//将返回的3rd_session存储到缓存中
    //     //                           wx.setStorageSync('user_openid', user.get('userData').openid)
    //     //                           wx.setStorageSync('user_id', user.id)
    //     //                           wx.setStorageSync('my_nick', user.get("nickname"))
    //     //                           wx.setStorageSync('my_username', user.get("username"))
    //     //                           wx.setStorageSync('my_sex', user.get("sex"))
    //     //                           wx.setStorageSync('my_avatar', user.get("userPic"))
    //     //                         } catch (e) {
    //     //                         }
    //     //                       },
    //     //                       error: function (userData, error) {
    //     //                         console.log("openid=" + userData);
    //     //                         console.log(error)
    //     //                       }
    //     //                     });

    //     //                   }
    //     //                 }
    //     //               });
    //     //             }
    //     //           })
    //     //         },
    //     //         error: function (error) {
    //     //           console.log("Error: " + error.code + " " + error.message);
    //     //         }
    //     //       });
    //     //     } else {
    //     //       console.log('获取用户登录态失败1！' + res.errMsg)
    //     //     }
    //     //   },
    //     //   complete: function (e) {
    //     //     console.log('获取用户登录态失败2！' + e)
    //     //   }
    //     // });
    //   }
    // } catch (e) {
    //   console.log("登陆失败")
    // }
    wx.checkSession({
      success: function () {
      },
      fail: function () {
        // 登录态过期，重新登录
        removeToken()
        // 清空本地与服务器状态
      }
    })
  },
  onShow: function () {

  },
  formate_data: function (date) {
    let month_add = date.getMonth() + 1;
    var formate_result = date.getFullYear() + '年'
      + month_add + '月'
      + date.getDate() + '日'
      + ' '
      + date.getHours() + '点'
      + date.getMinutes() + '分';
    return formate_result;
  },

  getUserInfo: function () {
    var that = this;
    return wx.getStorageSync('userInfo') || {}
  },
  globalData: {
    userInfo: null,
    systeminfo: {},
    imageServer: 'https://images.weserv.nl/',
    config: {
      loginRequestUrlByMobile: 'https://juejin.im/auth/type/phoneNumber',
      loginRequestUrlByEMail: 'https://juejin.im/auth/type/email',
      notifyRequestUrl: 'https://ufp-api-ms.juejin.im/v1',
      bannerRequestUrl: 'https://banner-storage-ms.juejin.im/v1',
      timelineRequestUrl: 'https://timeline-merger-ms.juejin.im/v1',
      xiaoceRequestUrl: 'https://xiaoce-timeline-api-ms.juejin.im/v1',
      xiaoceCacheApiMs: 'https://xiaoce-cache-api-ms.juejin.im/v1',
      postStorageApiMsRequestUrl: 'https://post-storage-api-ms.juejin.im/v1',
      userLikeWrapperMsRequestUrl: 'https://user-like-wrapper-ms.juejin.im/v1',
      // searchMergerMsRequestUrl: 'https://search-merger-ms.juejin.im/v1',
      collectionSetMsRequestUrl: 'https://collection-set-ms.juejin.im/v1',
      shortMsgMsRequestUrl: 'https://short-msg-ms.juejin.im/v1',
      ufpApiMsRequestUrl: 'https://ufp-api-ms.juejin.im/v1',
      lccroApiMsRequestUrl: 'https://lccro-api-ms.juejin.im/v1',
      entryViewStorageApiMsRequestUrl: 'https://entry-view-storage-api-ms.juejin.im/v1',
      goldTagMsRequestUrl: 'https://gold-tag-ms.juejin.im/v1',
      userNotificationApiMsRequestUrl: 'https://user-notification-api-ms.juejin.im/v1',
      apiRequestUrl: 'https://user-storage-api-ms.juejin.im/v1'
    }
  },
  onPullDownRefresh: function () {
    //wx.stopPullDownRefresh()
  },
  onError: function (msg) {
  },
  Touches: new Touches(),
  util: __utils,
})