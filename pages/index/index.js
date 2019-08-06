var websocket = require('../../websocket/connect.js');
const app = getApp();

Page({

  data: {
    userInfo: {},
    deviceId: '',
    pwd: '',
  },

  listenerDeviceInput: function (e) {
    this.data.deviceId = e.detail.value;
  },
  
  listenerPasswordInput: function (e) {
    this.data.pwd = e.detail.value;
  },
 
  listenerLogin: function () {
    if (this.data.deviceId.length== 0) {
      wx.showToast({
        title: '设备号不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else if (this.data.pwd.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 1500
      })
    } else {
      console.log("dfs")
      wx.navigateTo({
        url: '../control/control',
      })
      // getApp().globalData.websocket.send('0#' + this.data.deviceId + '#' + this.data.pwd);
    }
  },

  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
    getApp().globalData.websocket.connect();
    getApp().globalData.index_page = this;
  }
})
