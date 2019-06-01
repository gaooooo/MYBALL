//logs.js

var util = require('../../utils/util.js');
var app = getApp()

var util = require('../../utils/util.js');
var my_nick = wx.getStorageSync('my_nick')
var my_sex = wx.getStorageSync('my_sex')
var my_avatar = wx.getStorageSync('my_avatar')

Page({
  data: {
    logs: [],
    defaultUrl: '../../images/tx.png',
    username: '点击头像登录',
    userTx: ''
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
  //进入项目简介
  click_projectBrief: function () {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/my/projectbrief/projectbrief',
      });
    }
  },

  //进入反馈建议
  click_Tick:function(){
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/my/issues/issues',
      });
    }
  },

  //进入更多信息
  click_more:function(){
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/my/more/more',
      });
    }
  },

  //进入关于我们
  click_aboutUs: function () {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/my/aboutus/aboutus',
      });
    }
  },

  click_myMessage: function() {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/my/message/message',
      });
    }
  },
  getUserInfoHandler: function(e){
    console.log(e)
    let d = e.detail.userInfo
    debugger
    this.setData({
      userTx: d.avatarUrl,
      username: d.nickName
    })
    // avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoLPB1plCstcPmaz5gTiaJMicYjJFYcw97ibvolyib8ziayzzFDEttNviaPePACh30naC3O1Qiczr0dVt7fw/132"
    // city: "Chaoyang"
    // country: "China"
    // gender: 2
    // language: "zh_CN"
    // nickName: "小七"
    // province: "Beijing"

    wx.setStorageSync('username', d.nickName)
    wx.setStorageSync('avatar', d.avatarUrl)

    wx.setStorageSync('my_nick', d.nickName)
    wx.setStorageSync('my_username', d.username)
    wx.setStorageSync('my_sex', d.gender)
    wx.setStorageSync('my_avatar', d.avatarUrl)

    const db = wx.cloud.database()
    const _ = db.command
    var userId = wx.getStorageSync('userId')
    if (!userId) {
      userId = this.getUserId()
    }

    db.collection('users').where({
      _openid: d.openid
    }).get({
      success: res=>{
        console.log('查询用户:',res)
        if (res.data && res.data.length > 0){
          console.log('已存在')
          wx.setStorageSync('openId', res.data[0]._openid)
          wx.setStorageSync('user_openid', res.data[0]._openid)
        } else {

          setTimeout(() => {
            db.collection('users').add({
              data: {
                userId: userId,
                iv: d.iv
              },
              success: function () {
                wx.showToast({
                  title: '用户登录成功',
                })
                console.log('用户id新增成功')
                db.collection('users').where({
                  userId: userId
                }).get({
                  success: res => {
                    wx.setStorageSync('openId', res.data[0]._openid)
                  },
                  fail: err=>{
                    console.log('用户_openid设置失败')
                  }
                })
              },
              fail: function (e) {
                console.log('用户id新增失败')
              }
            })
          }, 100)
        }
      },
      fail: err=>{

      }
    })

    
  },
  getUserId: function () {
    var w = "abcdefghijklmnopqrstuvwxyz0123456789",
      firstW = w[parseInt(Math.random() * (w.length))];

    var userId = firstW + (Date.now()) + (Math.random() * 100000).toFixed(0)
    console.log(userId)
    wx.setStorageSync("userId", userId)
    wx.setStorageSync('user_id', userId)

    return userId;
  },
  onLoad: function () {
    let username = wx.getStorageSync('username'),
      avatar = wx.getStorageSync('avatar');
    if (username){
      this.setData({
        username: username,
        defaultUrl: avatar
      })
    }
  }
})
