//index.js
const app = getApp()


Page({
  data: {

    defaultImg: '../../images/tx.png',
    datas: [],
    zanIcon : '../../images/zan.png',
    zanIcon1: '../../images/zan1.png',
    pageId: 0,
    imgHeight: 225,
    lazy_load: false,
    voteArr:[],
    qiuId: '',

    showZanAndPinglunNum: null,
    isShowOrHideComtent: false,
    allOrPart: "全文"
  },
  onLoad: function() {
    var that = this;
  
    var page = wx.getStorageSync('page')
    // 查询第一页
    that.search( that.data.pageId)

 
  },
  //朋友圈正文内容显示或收起,逻辑是通过style动态设置max-height样式
  ShowOrHideComtent(){
    if (this.data.allOrPart === "全文"){
        this.setData({
            isShowOrHideComtent: true,
            allOrPart: "收起"
        })
    } else if (this.data.allOrPart === "收起"){
        this.setData({
            isShowOrHideComtent: false,
            allOrPart: "全文"
        })
    }
  },
  //点击朋友圈图片,弹出框预览大图
  showImg(e){
    let outidx = e.currentTarget.dataset.outidx;
    let imgidx = e.target.dataset.imgidx;
    let imgArr = this.data.datas[outidx].image;
    wx.previewImage({
        current: imgArr[imgidx], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
    })
  },
  
  //点赞
  dianzan(e){
    this.setData({ showZanAndPinglunNum:null})
    let idx = e.currentTarget.dataset.idx;
    let nickName = app.globalData.userInfo.nickName;
    wx.request({
        url: app.globalData.baseUrl + "zan",
        method: "get",
        data: {
            idx,
            nickName
        }
    });
    getAllData(this);
  },
  setPage: function (page){
    console.log('setPage', page)
    wx.setStorageSync('page', page)
   
  },
  getPage: function(){
    console.log('getPage:', wx.getStorageSync('page'))
    return wx.getStorageSync('page')
  },
  zan: function(e){
    var arr = this.data.voteArr;
    var id = Number(e.currentTarget.dataset.index),
      D = this.data.datas;
    console.log(id, arr, D)
    if (arr.indexOf(D[id].id) != -1){
      D[id].vote -= 1;
      arr.splice(arr.indexOf(D[id].id), 1)
      this.setData({
        datas: D,
        voteArr: arr
      })
    }else{
      arr.push(D[id].id)
      this.setData({
        voteArr: arr
      })
      const vote = Number(D[id].vote || 0) + 1
      if (id || id == 0) {
        D[id].zanUrl = this.data.zanIcon1
        D[id].vote = vote
      }

      let data = {
        vote: vote,
        id: D[id].id,
        userId: wx.getStorageSync('userId'),
      }
      console.log(data)

      wx.cloud.callFunction({
        name: 'zan',
        data: {        
            vote: vote,
            id: D[id].id,          
        },
        success: res => {
          wx.showToast({
            title: '点赞成功',
          })
          this.setData({
            datas: D
          })

        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '点赞失败',
          })
          console.error('[云函数] [zan] 调用失败：', err)
        }
      })
    }
    
    
  },
  //page: 页数
  search: function(page){
    const db = wx.cloud.database()
    const _ = db.command;
    var that = this;
    console.log('search', page)
    var userId = wx.getStorageSync('userId')
    if (!page ){
      page = this.getPage()
    
    }         
    //设置页码
    this.setPage(page);
    db.collection('users').orderBy('id', 'desc').get({
      success: res => {
        console.log(6666, res)
      }
    });
    db.collection('funnys').orderBy('id', 'desc').get({
      success: res => {
        console.log('cccccc', res)
        wx.hideLoading()
        var D = res.data;
        D.forEach(function(item, i){
          D[i].zanUrl = that.data.zanIcon
        })
        console.log(D)
        this.setData({
          datas: D
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  refresh: function(){
    var page = this.getPage()
    // wx.startPullDownRefresh()
    this.search(Number(page)+1)
    wx.showLoading({
      title: '加载中...',
    })
  },
  onPullDownRefresh: function(){
    var page = this.getPage()
    // wx.startPullDownRefresh()
    this.search(Number(page)+1)
  },
  onShareAppMessage: function(res){
    console.log(res)
    if (res.from === "button") {
      wx.cloud.callFunction({
        name: 'shareHandler',
        data: {
          id: res.target.dataset.qiuid,
          shareNum: Number(res.target.dataset.sharenum) + 1
        },
        success: e => {
          wx.showToast({
            title: '分享成功',
          })
          this.search(this.data.pageId)
          console.log(e)
        },
        fail: e=>{
          console.log(e)
        }
      })
      return {
        title: "发现你身边的球局吧 --女篮吧",
        path: '/pages/itemDetail/itemDetail?id=' + res.target.dataset.qiuid + '&isShareTip=1',
        imageUrl: ''
      }

    }
  },
  onReachBottom: function(){
    setTimeout(()=>{
      this.refresh()
      
    },500)
  },
  nav2Detail: function(e){
    wx.navigateTo({
      url: '../itemDetail/itemDetail?id=' + e.currentTarget.dataset._id,
    })
  }


})
