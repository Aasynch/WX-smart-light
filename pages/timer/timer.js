const date = new Date();
const times = ['上午', '下午'];
const hours = [];
const mins = [];
const last_hours = [];
const last_mins = [];
var time;
var hour;
var min = parseInt(date.getMinutes());

var cur_hour = date.getHours();
if (cur_hour == 0) {
  time = 1;
  hour = 11;
} else if (cur_hour <= 12) {
  time = 0;
  hour = cur_hour - 1;
} else {
  time = 1;
  hour = cur_hour - 13;
}

for (let i = 1; i <= 12; ++i) {
  hours.push(i.toString())
}
for (let i = 0; i <= 59; ++i) {
  if (i < 10) mins.push('0' + i.toString());
  else mins.push(i.toString());
}
for (let i = 0; i <= 23; ++i) {
  if (i < 10) last_hours.push('0' + i.toString());
  else last_hours.push(i.toString());
}
for (let i = 0; i <= 59; ++i) {
  if (i < 10) last_mins.push('0' + i.toString());
  else last_mins.push(i.toString());
}

Page({
  data: {
    times: times,
    time: times[time],
    hours: hours,
    hour: hours[hour],
    mins: mins,
    min: mins[min],
    value: [time, hour, min],
    date_choose: "永不",
    date_choose_arr: new Array(),
    last_hour: 0,
    last_min: 0,
    last_hours: last_hours,
    last_mins: last_mins,
    label: "标签",
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      time: this.data.times[val[0]],
      hour: this.data.hours[val[1]],
      min: this.data.mins[val[2]]
    })
  },
  onLoad: function (option) {
    cur_hour = date.getHours();
    if (cur_hour == 0) {
      time = 1;
      hour = 11;
    } else if (cur_hour <= 12) {
      time = 0;
      hour = cur_hour - 1;
    } else {
      time = 1;
      time = 0;
      hour = cur_hour - 13;
    }
  },
  go_date_choose: function (option) {
    wx.navigateTo({
      url: '../date/date',
    })
  },
  go_back: function () {
    wx.navigateBack();
  },

  pickerChange_hour: function (e) {
    this.setData({
      last_hour: e.detail.value
    })
  },
  pickerChange_min: function (e) {
    this.setData({
      last_min: e.detail.value
    })
  },
  get_label: function (e) {
    this.setData({
      label: e.detail.value
    })
    console.log(this.data.label);
  },
  go_back: function () {
    wx.navigateBack()
  },
  confirm_time: function () {
    var s = "0 ";
    s = s + this.data.min.toString() + " ";
    if (this.data.time == "上午") {
      s = s + this.data.hour.toString() + " ";
    } else if (this.data.time == "下午") {
      if (parseInt(this.data.hour) + 12 >= 24) {
        s = s + "23 "
      } else {
        s = s + (parseInt(this.data.hour) + 12).toString() + " ";
      }
    }
    
    if (this.data.date_choose_arr.length == 0) {
      var mon = date.getMonth() + 1
      var dat = date.getDate()
      s = s + dat.toString() + " " + mon.toString() + " *@";
    } else {
      s = s + "* * ";
      if (this.data.date_choose_arr.length == 1) {
        s = s + this.data.date_choose_arr[0] + " ";
      } else {
        for (var i = 0; i < this.data.date_choose_arr.length; ++i) {
          if (i == 0) {
            s = s + this.data.date_choose_arr[i];
          } else {
            s = s + "," + this.data.date_choose_arr[i];
          }
        }
        s = s + "@";
      }
    }
    
    s = s + this.data.last_hour + "@";
    s = s + this.data.last_min;
    getApp().globalData.websocket.send("7#" + s + "#" + this.data.label);
    wx.navigateBack()
  }
})