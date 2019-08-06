Page({
  data: {
    ifShow: false,
    infos: [
    ]
  },

  onLoad: function(option) {
    getApp().globalData.time_page = this;
    this.setData({
      ifShow: getApp().globalData.show
    })
  },

  cshow: function (res) {
    this.setData({
      ifShow: res
    })
  },

  deleteItem: function (e) {
    getApp().globalData.websocket.send("8#" + e.target.id)
  },

  go_time: function () {
    wx.navigateTo({
      url: '../timer/timer',
    })
  },

  updateItem: function (res) {
    this.setData({
      infos: res
    })
  }
})