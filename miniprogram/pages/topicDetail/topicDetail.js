const config = getApp().globalData.config
const utils = require('../../utils/util.js')
Page({
  data: {
    COUNT: 30,
    swiperHeight: 'auto',
    recommendList: [],
    list: [],
    auth: {},
    scrollTop: 0,
    after: '',
  },
  onShow () {
    // 如果 scrollTop 为 0，也 reload
    if (utils.pageReload(this.data.auth, [this.data.list]) || !this.data.scrollTop) {
      wx.startPullDownRefresh({})
    }
  },
  onPullDownRefresh() {
    this.init()
  },
  init() {
    console.log('init')
    this.setData({
      auth: {},
    })
    let auth = utils.ifLogined()
    this.setData({
      auth,
    })
    this.queryDongtai(true)
  },
  illegalToken (s) {
    if (s === 3) {
      wx.removeStorage({
        key: 'auth',
        complete () {
          const timer = setTimeout(() => {
            wx.navigateTo({
              url: '/pages/login/login',
            })
            clearTimeout(timer)
          }, 1000)
        }
      })
    }
  },
  // 沸点列表
  queryDongtai(reload) {
    const auth = this.data.auth
    let list = this.data.list
    if (utils.isEmptyObject(list) || reload) {
      this.setData({
        list: [],
        after: '',
      })
    }
    let after = ''
    wx.request({
      url: `https://web-api.juejin.im/query`,
      header: {
        'X-Agent': 'Juejin/Web',
      },
      method: 'POST',
      data: {
        operationName: '',
        query: "",
        variables: {
          size: 20,
          after: this.data.after,
        },
        extensions: {
          query: {
            id: '964dab26a3f9997283d173b865509890'
          }
        }
      },
      success: (res) => {
        let data = res.data || {}
        data = data.data
        if (!utils.isEmptyObject(data)) {
          const items = data.recommendedActivityFeed.items
          this.setData({
            after: (items.pageInfo && items.pageInfo.endCursor) || ''
          })
          const edges = items.edges || []
          this.setData({
            list: this.data.list.concat(edges)
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '网路开小差，请稍后再试',
          icon: 'none',
        })
      },
      complete: () => {
        wx.stopPullDownRefresh()
      },
    })
  },
  toFeidianDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/friendDetail/friendDetail?msgId=${id}`,
    })
  },
  onReachBottom() {
    // const index = parseInt(this.data.currentSwiper)
    // console.log(555, index)
    // if (index === 0 || index === 1) {
      this.queryDongtai()
    //   return
    // }
    // if (!this.data.xiaoceList.length || !this.data.noResult) {
    //   this.getXiaoce()
    // }
  },
  onPageScroll (e) {
    console.log(6666)
    this.setData({
      scrollTop: e.scrollTop,
    })
  },
  onShareAppMessage(res) {
    let obj = {}
    let from = res.from
    if (from === 'button') {
      let item = res.target.dataset.item
      obj.title = `来自 ${item.user && item.user.username} 的沸点: ${item.content}`
      obj.path = `/pages/friendDetail/friendDetail?msgId=${item.objectId}`
      obj.imageUrl = (item.pictures && item.pictures[0]) || (item.user && item.user.avatarLarge)
    }
    return obj
  },
})