Page({
  data: {
    status: "关闭",
    lock: "关闭",
    hiddenmodalput: true,
    password: ""
  },
  
  onLoad: function (options) {
    getApp().globalData.control_page = this;
    getApp().globalData.websocket.send("0#user")
    getApp().globalData.websocket.connect();
  },
  change: function (options) {
    if (this.data.lock == "开启") {
      wx.showToast({
        title: '操作无效',
        icon: 'loading',
        duration: 1500
      })
      return;
    }
    if (this.data.status == "开启") {
      getApp().globalData.websocket.send("off#");
    }
    if (this.data.status == "关闭") {
      getApp().globalData.websocket.send("on#");
    }
  },
  update: function (status) {
    this.setData({
      status: status
    })
  },
  change_lock: function(data) {
    if (data == "开启") {
      getApp().globalData.show = true;
      if (getApp().globalData.pwd_page != null) {
        getApp().globalData.pwd_page.cshow(true)
      }
      if (getApp().globalData.time_page != null) {
        getApp().globalData.time_page.cshow(true)
      }
      if (getApp().globalData.temp_page != null) {
        getApp().globalData.temp_page.cshow(true)
      }
    }
    if (data == "关闭") {
      getApp().globalData.show = false;
      if (getApp().globalData.pwd_page != null) {
        getApp().globalData.pwd_page.cshow(false)
      }
      if (getApp().globalData.time_page != null) {
        getApp().globalData.time_page.cshow(false)
      }
      if (getApp().globalData.temp_page != null) {
        getApp().globalData.temp_page.cshow(false)
      }
    }
    this.setData({
      lock: data
    })
  },
  handle_lock: function() {
    this.setData ({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    if (this.data.lock == "关闭") {
      getApp().globalData.websocket.send("5#0#" + this.data.password)
    }
    if (this.data.lock == "开启") {
      getApp().globalData.websocket.send("5#1#" + this.data.password)
    }
  },
  listenerPasswordInput: function (e) {
    this.data.password = e.detail.value;
  }
});
