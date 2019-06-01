
var page = 1;  
  
var GetList = function (that) {  
    that.setData({  
        hidden: false  
    });  
    const db = wx.cloud.database()
    const _ = db.command;
    db.collection('funnys').orderBy('id', 'desc').where(
      {
        // id: _.lt((page + 1) * 20).and(_.gt(page * 20)),
        // validStatus: _.neq(0)
      }
    ).get({
      success: res => {
        wx.hideLoading()
        var l =  res.data;
            that.setData({  
                list: l  
            });  
            page++;  
            that.setData({  
                hidden: true  
            });  
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
}  
Page({  
    data: {  
        hidden: true,  
        list: [],  
        scrollTop: 0,  
        scrollHeight: 0  
    },  
    onLoad: function () {  
        var that = this;  
        wx.getSystemInfo({  
            success: function (res) {  
                console.info(res.windowHeight);  
                that.setData({  
                    scrollHeight: res.windowHeight  
                });  
            }  
        });  
    },  
    onShow: function () {  
        var that = this;  
        GetList(that);  
    },  
    bindDownLoad: function () {  
        var that = this;  
        GetList(that);  
    },  
    scroll: function (event) {  
        this.setData({  
            scrollTop: event.detail.scrollTop  
        });  
    },  
    refresh: function (event) {  
        page = 1;  
        this.setData({  
            list: [],  
            scrollTop: 0  
        });  
        GetList(this)  
    },  
    onPullDownRefresh: function () {  
        console.log("下拉")  
    },  
    onReachBottom: function () {  
        console.log("上拉");  
    }  
})  