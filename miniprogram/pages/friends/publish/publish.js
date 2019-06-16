// pages/pulish/pulish.js
var app = getApp()
const db = wx.cloud.database()
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    count: 0,

    textareaTxt:null,
    imgArr:null,
    location:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCount()
    
  },
  saveEditOrNot(){
    wx.showModal({
        title: '将此次编辑保留',
        content: '',
        cancelText: '不保留',
        confirmText: '保留',
        success(res) {
            if (res.confirm) {
                console.log('用户点击确定')
            } else if (res.cancel) {
                wx.navigateBack({
                    delta:1
                })
            }
        }
    })
  },
  getInputValue(e){
    this.setData({
        textareaTxt: e.detail.value    
    })
  },
  // 上传图片
  chooseImage: function () {
    // 选择图片
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        // const filePath = res.tempFilePaths[0]
        // 上传图片
        // const cloudPath = that.data.count + filePath.match(/\.[^.]+?$/)[0]
        //改写: 数组 多图片
        const filePath = res.tempFilePaths;
         // tempFilePath可以作为img标签的src属性显示图片
         that.setData({
          imgArr: filePath
         })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  chooseLocation(){
    let self = this
    wx.chooseLocation({
        success(res) {
            self.setData({
                location: res.name
            })

         }
    })
  },
  // postData(){
  //   wx.navigateBack({
  //       delta:1
  //   })
  //   wx.request({
  //       url: app.globalData.baseUrl+"api",
  //       method: "POST",
  //       data: {
  //           avatarUrl: app.globalData.userInfo.avatarUrl,
  //           nickName: app.globalData.userInfo.nickName,
  //           textareaTxt:this.data.textareaTxt,
  //           imgArr: this.data.imgArr,
  //           location: this.data.location
  //       },
  //        header: {
  //           'content-type':'application/x-www-form-urlencoded'
  //       }
  //   })
  // },
  onShow: function(){
    let userOpenId = wx.getStorageSync('openId')
    if (!userOpenId) {
      wx.showToast({
        title: '您还未登录,请先登录~',
        icon: 'none'
      })

      setTimeout(() => {
        wx.switchTab({
          url: '../../my/my',
        })
      }, 1500)
    } else {
      console.log(userOpenId)
    }
  },
  getCount: function(){
    var that = this
    db.collection('funnys').count({
      success: res => {
        that.setData({
          count: Number(res.total) + 1
        })
      }
    })

  },
  textInput: function(e){
    this.setData({
      text: e.detail.value
    })
  },
  pulish: function(){
    let self = this
    if (!self.data.text) {
      wx.showToast({
        title: '请填写文字',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '文件上传中',
    })
    if (!self.data.imgArr || self.data.imgArr.lengt === 0) {
      self.handleSave();
      wx.hideLoading();
      return
    }
    const filePath = self.data.imgArr;
    let cloudPath = '', uploadCompletedCount = 0, imgArr = [];
    filePath.forEach((item, i)=>{
      cloudPath = i + item.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath: item,
        success: res => {
          uploadCompletedCount++;
          imgArr.push(res.fileID + '')
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
          wx.hideLoading();
        },
        complete: () => {
          if (uploadCompletedCount === filePath.length) {
            self.handleSave();
            wx.hideLoading();
          }
        }
      })
    })
  },
  handleSave() {
    const self = this;
    var data = {
      image: self.data.imgArr,
      content: self.data.text,
      location: self.data.location || '',
      comment: [],
      userId: wx.getStorageSync('userId'),
      username: wx.getStorageSync('username'),
      userImg: wx.getStorageSync('avatar'),
      id: Number(self.data.count) +1,
      shareNum: 0,
      commentNum: 0,
      validStatus: 0,
      validTime: 0,
      createdAt: +new Date(),
    }
    //validStatus: 审核状态, 通过时候 +1, 反对时候-1
    //validTime: 审核次数, 最多5次,如果反对的人大于等于3,则不通过

     db.collection('funnys').add({
      data: data,
      success:() => {
        wx.hideLoading();
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '../index/index',
          })
        }, 1000)
      },
      fail: e=>{
        wx.showToast({
          title: '发布错误',
        })
        console.log(e)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})