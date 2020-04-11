const utils = require('../../utils/util.js')
const config = getApp().globalData.config
Page({
  data: {
    userInfo: {},
    auth: {},
    thirduid: '',
  },
  onLoad(query) {
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    if (query && query.thirduid) {
      let thirduid = query.thirduid
      this.setData({
        thirduid,
      })
      this.getMultiUser(thirduid)
    } else {
      this.getUserInfo()
    }
  },
  navigatItem(e) {
    return utils.navigatItem(e)
  },
  showDataTrend () {
    wx.navigateTo({
      url: '/pages/articleData/articleData',
    })
  },
  // 获取个人信息
  getUserInfo() {
    const auth = this.data.auth
    wx.request({
      url: `${config.apiRequestUrl}/getUserInfo`,
      data: {
        src: 'web',
        device_id: auth.clientId || '1585495195360',
        uid: auth.uid || '59781083f265da6c3b280d3f',
        token: auth.token || 'eyJhY2Nlc3NfdG9rZW4iOiJsWWNuejBIZ2JONWJBZGppIiwicmVmcmVzaF90b2tlbiI6IktmNlRDQzV4ZXdvOVJhWlMiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
        current_uid: auth.uid || '59781083f265da6c3b280d3f',
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          this.setData({
            userInfo: data.d,
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
  // 获取其他用户信息
  getMultiUser(ids) {
    const auth = this.data.auth
    wx.request({
      url: `${config.lccroApiMsRequestUrl}/get_multi_user`,
      data: {
        uid: auth.uid,
        src: 'web',
        device_id: auth.clientId,
        token: auth.token,
        ids,
        cols: 'objectId|username|avatar_large|avatarLarge|role|company|jobTitle|self_description|selfDescription|blogAddress|isUnitedAuthor|isAuthor|authData|totalHotIndex|postedEntriesCount|postedPostsCount|collectedEntriesCount|likedPinCount|collectionSetCount|subscribedTagsCount|followeesCount|followersCount|pinCount',
      },
      success: (res) => {
        let data = res.data
        if (data.s === 1) {
          this.setData({
            userInfo: data.d && data.d[ids],
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