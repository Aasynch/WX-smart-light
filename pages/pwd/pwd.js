Page({

  data: {
    pwd_old: '',
    pwd_newA: '',
    pwd_newB: '',
    ifShow: false
  },

  onLoad: function (options) {
    getApp().globalData.pwd_page = this;
    this.setData({
      ifShow: getApp().globalData.show
    })
  },

  listenerPasswordInput: function (e) {
    this.data.pwd_old = e.detail.value;
  },
  listenerPasswordInputA: function (e) {
    this.data.pwd_newA = e.detail.value;
  },
  listenerPasswordInputB: function (e) {
    this.data.pwd_newB = e.detail.value;
  },
  listenerUpdate: function () {
    if (this.data.pwd_old.length == 0 || this.data.pwd_newA.length == 0 ||  this.data.pwd_newB.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else {
      if (this.data.pwd_newA != this.data.pwd_newB) {
        wx.showToast({
          title: '两次新密码不同',
          icon: 'loading',
          duration: 1500
        })
      } else {
        getApp().globalData.websocket.send('1#' + this.data.pwd_old + '#' + this.data.pwd_newA);
      }
    }
  },
  cshow: function(res) {
    this.setData({
      ifShow: res
    })
  }
})