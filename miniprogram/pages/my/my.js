//logs.js
var Bmob = require("../../utils/bmob.js");
var util = require('../../utils/util.js');
var app = getApp()

var my_nick = wx.getStorageSync('my_nick')
var my_sex = wx.getStorageSync('my_sex')
var my_avatar = wx.getStorageSync('my_avatar')

Page({
  data: {
    logs: [],
    defaultUrl: '/static/images/newF1.png',
    username: '点击头像登录'
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
  click_myFriend: function() {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/friends/upload/upload',
      });
    }
  },
  click_myComment: function() {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      wx.navigateTo({
        url: '/pages/friends/comment/comment',
      });
    }
  },
  getUserInfoHandler: function(e){
    console.log(e)
    let d = e.detail.userInfo
    wx.setStorageSync('username', d.nickName)
    wx.setStorageSync('avatar', d.avatarUrl)

    this.setData({
      defaultUrl: d.avatarUrl,
      username: d.nickName
    })
    var that = this;
    var userInfo = e.detail.userInfo
    wx.login({
          success: function (res) {
            if (res.code) {
              Bmob.User.requestOpenId(res.code, {
                success: function (userData) {
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var sex = userInfo.gender
                  Bmob.User.logIn(nickName, userData.openid, {
                    success: function (user) {
                      try {
                        wx.setStorageSync('user_openid', user.get('userData').openid)
                        wx.setStorageSync('user_id', user.id)
                        wx.setStorageSync('my_nick', user.get("nickname"))
                        wx.setStorageSync('my_username', user.get("username"))
                        wx.setStorageSync('my_sex', user.get("sex"))
                        wx.setStorageSync('my_avatar', user.get("userPic"))
                      } catch (e) {
                      }
                      console.log("登录成功");
                    },
                    error: function (user, error) {
                      if (error.code == '101') {
                        var user = new Bmob.User();//开始注册用户
                        user.set('username', nickName);
                        user.set('password', userData.openid);
                        user.set("nickname", nickName);
                        user.set("userPic", avatarUrl);
                        user.set("userData", userData);
                        user.set('sex', sex);
                        user.set('feednum',0);
                        user.signUp(null, {
                          success: function (result) {
                            console.log('注册成功');
                            try {//将返回的3rd_session存储到缓存中
                              wx.setStorageSync('user_openid', user.get('userData').openid)
                              wx.setStorageSync('user_id', user.id)
                              wx.setStorageSync('my_nick', user.get("nickname"))
                              wx.setStorageSync('my_username', user.get("username"))
                              wx.setStorageSync('my_sex', user.get("sex"))
                              wx.setStorageSync('my_avatar', user.get("userPic"))
                            } catch (e) {
                            }
                          },
                          error: function (userData, error) {
                            console.log("openid=" + userData);
                            console.log(error)
                          }
                        });

                      }
                    }
                  })

                  that.saveCloudUser(userData.openid, userInfo);
                },
                error: function (error) {
                  console.log("Error: " + error.code + " " + error.message);
                }
              });
            } else {
              console.log('获取用户登录态失败1！' + res.errMsg)
            }
          },
          complete: function (e) {
            console.log('获取用户登录态失败2！' + e)
          }
        });


    // avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoLPB1plCstcPmaz5gTiaJMicYjJFYcw97ibvolyib8ziayzzFDEttNviaPePACh30naC3O1Qiczr0dVt7fw/132"
    // city: "Chaoyang"
    // country: "China"
    // gender: 2
    // language: "zh_CN"
    // nickName: "小七"
    // province: "Beijing"
    
  },
  saveCloudUser(openId, userInfo) {
    // 用户写入云数据库
    const db = wx.cloud.database()
    const _ = db.command
    var userId = wx.getStorageSync('userId')
    if (!userId) {
      userId = this.getUserId()
    }

    wx.setStorageSync('openId', openId)
    db.collection('users').where({
      _openid: openId
    }).get({
      success: res=>{
        console.log('查询用户:',res)
        if (res.data && res.data.length > 0){
          console.log('已存在')
        } else {
          setTimeout(() => {
            db.collection('users').add({
              data: {
                userId: userId,
                iv: userInfo
              },
              success: function () {
                wx.showToast({
                  title: '用户登录成功',
                })
                console.log('用户id新增成功')
                // db.collection('users').where({
                //   userId: userId
                // }).get({
                //   success: res => {
                //     wx.setStorageSync('openId', res.data[0]._openid)
                //   },
                //   fail: err=>{
                //     console.log('用户_openid设置失败')
                //   }
                // })
              },
              fail: function (e) {
                console.log('用户id新增失败')
              }
            })
          }, 100)
        }
      },
      fail: err=>{
        console.error(err)
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
