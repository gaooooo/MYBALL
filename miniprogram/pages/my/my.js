//logs.js
var util = require('../../utils/util.js');
var tokenUtil = require('../../utils/util-token.js');
var app = getApp()
import MyService from '../../server/my.js';


const config = getApp().globalData.config
Page({
  data: {
    logs: [],
    defaultUrl: '',
    username: '点击头像登录',
    
    userInfo: {},
    userNotificationNum: 0,
    auth: {},
  },
   //进入我的发起
   click_myLaunch: function () {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/my/mylaunch/mylaunch',
      });
    }
  },
  //进入我的加入
  click_myJoin: function () {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/my/myjoin/myjoin',
      });
    }
  },
  //进入我的收藏
  click_myCollection: function () {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/my/mycollection/mycollection',
      });
    }
  },
  loginClick: function(e) {
    console.log('loginClick')
  },
  async fetchUser() {
    try {
      let user = await MyService.getUserInfo();
      app.setUserInfo(user)
      this.setData({
        userInfo: user
      })
    } catch(ex) {
      let auth = util.ifLogined()
      this.setData({
        auth,
      })
      wx.showToast({
        title: '用户会话已结束，请重新登录',
        icon: 'none',
      })
    }
  },
  getUserInfoHandler: function(e){
    var vm = this;
    wx.login({
          success: async function (res) {
            var userInfo = e.detail.userInfo;
            await MyService.postLogin(Object.assign({code: res.code}, userInfo));
            await vm.fetchUser();
          },
          complete: function (e) {
            console.log('获取用户登录完成！' + e)
          }
        });
  },
  onLoad: function () {
  },
  async onShow () {
    let auth = util.ifLogined()
    console.log('auth', auth)
    this.setData({
      auth,
    })
    let user = app.getUserInfo();
    if (auth && user.id) {
      this.setData({
        userInfo: user
      })
      // this.userNotificationNum()
    } else {
      this.fetchUser();
    }
  },
  navigatItem (e) {
    return util.navigatItem(e)
  },
  // 消息中心消息条数
  userNotificationNum() {
    const auth = this.data.auth
    wx.request({
      url: `${config.notifyRequestUrl}/getUserNotificationNum`,
      data: {
        src: 'web',
        uid: auth.uid,
        token: auth.token,
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          this.setData({
            userNotificationNum: data.d && data.d.notification_num,
          })
        } else {
          wx.showToast({
            title: data.m.toString(),
            icon: 'none',
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '网路开小差，请稍后再试',
          icon: 'none',
        })
      },
    })
  },
})
