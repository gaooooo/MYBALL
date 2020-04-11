Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
  },
  methods: {
    toXiaoceDetail(e) {
      wx.navigateTo({
        url: `/pages/topicDetail/topicDetail?id=${e.currentTarget.dataset.id}`,
      })
    },
  },
})