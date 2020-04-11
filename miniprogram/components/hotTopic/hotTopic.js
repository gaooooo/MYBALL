
import config from '../../utils/config.js'
var topNav=config.getIndexNav;
Component({
    data: {
        topNav: topNav,
      },
    properties: {
    },
    methods: {
      //话题跳转
      onNavRedirect: function (e) {
        wx.navigateTo({
            url: `/pages/topicDetail/topicDetail?id=1`,
          })
        // var redicttype = e.currentTarget.dataset.redicttype;
        // var url = e.currentTarget.dataset.url == null ? '' : e.currentTarget.dataset.url;
        // var appid = e.currentTarget.dataset.appid == null ? '' : e.currentTarget.dataset.appid;
        // var extraData = e.currentTarget.dataset.extraData == null ? '' : e.currentTarget.dataset.extraData;
        // if (redicttype == 'apppage') { //跳转到小程序内部页面         
        //   wx.navigateTo({
        //     url: url
        //   })
        // } else if (redicttype == 'webpage') //跳转到web-view内嵌的页面
        // {
        //   url = '../webpage/webpage?url=' + url;
        //   wx.navigateTo({
        //     url: url
        //   })
        // } else if (redicttype == 'miniapp') //跳转到其他app
        // {
        //   wx.navigateToMiniProgram({
        //     appId: appid,
        //     envVersion: 'release',
        //     path: url,
        //     extraData: extraData,
        //     success(res) {
        //       // 打开成功
        //     },
        //     fail: function (res) {
        //       console.log(res);
        //     }
        //   })
        // }
    
      },
    },
  })