module.exports = (function() {
  var webSocketUrl = "ws://127.0.0.1:8188/oper";
  var socketOpened = false;
  var socketMsgQueue = [];

  function connect() {
    wx.connectSocket({
      url: webSocketUrl
    });
  }

  function initEvent() {
    wx.onSocketOpen(function(res) {
      socketOpened = true;
      console.log("websocket opened");
      while (socketMsgQueue.length > 0) {
        var msg = socketMsgQueue.pop();
        send(msg);
      }
    });

    wx.onSocketMessage(function(res){
      if (res.data == "201") {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1500
        })
        return;
      }
      if (res.data == "503") {
        wx.showToast({
          title: '原始密码错误',
          icon: 'loading',
          duration: 1500
        })
        return;
      }
      if (res.data == "off" || res.data == "on") {
        if (getApp().globalData.control_page != null) {
          if (res.data == "off") getApp().globalData.control_page.update("关闭");
          if (res.data == "on") getApp().globalData.control_page.update("开启");
        }
        return;
      }
      if (res.data == "lock" || res.data == "unlock") {
        if (getApp().globalData.control_page != null) {
          if (res.data == "lock") getApp().globalData.control_page.change_lock("开启");
          if (res.data == "unlock") getApp().globalData.control_page.change_lock("关闭");
        }
        return;
      }
      if (res.data == "self_lock" || res.data == "self_unlock" || res.data == "self_fault") {
        if (getApp().globalData.control_page != null) {
          if (res.data == "self_lock") {
            wx.showToast({
              title: '锁定',
              icon: 'success',
              duration: 1500
            })
          } else if (res.data == "self_unlock") {
            wx.showToast({
              title: '解锁',
              icon: 'success',
              duration: 1500
            })
          } else if (res.data == "self_fault") {
            wx.showToast({
              title: '密码错误',
              icon: 'loading',
              duration: 1500
            })
          }
        }
        return;
      }
      var arr = res.data.split("#");
      if (arr[0] == "t") {
        var infos = [];
        if (arr[1] == "") {
          if (getApp().globalData.time_page != null) {
            getApp().globalData.time_page.updateItem(infos)
          }
          return;
        }
        for (var i = 1; i < arr.length; ++i) {
          console.log(arr[i])
          var id = arr[i];
          var d1 = arr[i].split('@');
          var last_hour;
          var last_min;
          if (d1[1].length == 1) {
            last_hour = "0" + d1[1];
          } else {
            last_hour = d1[1];
          }
          if (d1[2].length == 1) {
            last_min = "0" + d1[2];
          } else {
            last_min = d1[2];
          }
          var d2 = d1[0].split(" ")
          var hour;
          var min;
          var time = "上午";
          if (d2[1].length == 1) {
            min = "0" + d2[1];
          } else {
            min = d2[1]
          }
          if (d2[2].length == 1) {
            hour = "0" + d2[2];
          } else {
            hour = d2[2];
          }
          if (hour == "00") {
            time = "下午",
            hour = "12"
          } else if (parseInt(hour) - 12 > 0) {
            time = " 下午",
            hour = (parseInt(hour) - 12).toString();
            if (hour.length == 1) {
              hour = "0" + hour
            }
          }
          var cyc = "";
          var f = false;
          if (d2[5].indexOf("0") >= 0) {
            if (f) {
              cyc = cyc + " 周一";
            } else {
              cyc = cyc + "周一";
            }
            f = true;
          }
          if (d2[5].indexOf("1") >= 0) {
            if (f) {
              cyc = cyc + " 周二";
            } else {
              cyc = cyc + "周二";
            }
            f = true;
          }
          if (d2[5].indexOf("2") >= 0) {
            if (f) {
              cyc = cyc + " 周三";
            } else {
              cyc = cyc + "周三";
            }
            f = true;
          }
          if (d2[5].indexOf("3") >= 0) {
            if (f) {
              cyc = cyc + " 周四";
            } else {
              cyc = cyc + "周四";
            }
            f = true;
          }
          if (d2[5].indexOf("4") >= 0) {
            if (f) {
              cyc = cyc + " 周五";
            } else {
              cyc = cyc + "周五";
            }
            f = true;
          }
          if (d2[5].indexOf("5") >= 0) {
            if (f) {
              cyc = cyc + " 周六";
            } else {
              cyc = cyc + "周六";
            }
            f = true;
          }
          if (d2[5].indexOf("6") >= 0) {
            if (f) {
              cyc = cyc + " 周日";
            } else {
              cyc = cyc + "周日";
            }
            f = true;
          }
          if (cyc == "") {
            cyc = "不重复";
          }
          infos.push({
            times: time,
            hour: hour,
            min: min,
            cyc: cyc,
            last_hour: last_hour,
            last_min: last_min,
            label: "标签",
            id: id
          })
        }
        if (getApp().globalData.time_page != null) {
          getApp().globalData.time_page.updateItem(infos)
        }
      } else {
        var data = new Array();
        for (var i = 0; i < 60; ++i) {
          data.push(parseInt(arr[i]));
        }

        if (getApp().globalData.temp_page != null) {
          getApp().globalData.temp_page.update(data)
        } 
      }
    });

    wx.onSocketError(function(res) {
      console.log("websocket failed");
    });
  }

  function send(msg) {
    if (socketOpened) {
      wx.sendSocketMessage({
        data: msg
      });
    } else {
      socketMsgQueue.push(msg);
    }
  }

  function init() {
    initEvent();
  }

  init();
  return {
    connect: connect,
    send: send,
    socketOpened: socketOpened,
  };
})();