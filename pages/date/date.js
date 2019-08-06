Page({
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    show7: false,
  },
  f_show_1: function () {
    this.setData({
      show1: !this.data.show1
    })
  },
  f_show_2: function () {
    this.setData({
      show2: !this.data.show2
    })
  },
  f_show_3: function () {
    this.setData({
      show3: !this.data.show3
    })
  },
  f_show_4: function () {
    this.setData({
      show4: !this.data.show4
    })
  },
  f_show_5: function () {
    this.setData({
      show5: !this.data.show5
    })
  },
  f_show_6: function () {
    this.setData({
      show6: !this.data.show6
    })
  },
  f_show_7: function () {
    this.setData({
      show7: !this.data.show7
    })
  },

  go_back: function () {
    var pages = getCurrentPages();
    var cur = pages[pages.length - 1];
    var prev = pages[pages.length - 2];
    var date_choose = "";
    var date_choose_arr = new Array();

    if (this.data.show1) {
      date_choose += "周一 ";
      date_choose_arr.push(0)
    }
    if (this.data.show2) {
      date_choose += "周二 ";
      date_choose_arr.push(1)
    }
    if (this.data.show3) {
      date_choose += "周三 ";
      date_choose_arr.push(2)
    }
    if (this.data.show4) {
      date_choose += "周四 ";
      date_choose_arr.push(3)
    }
    if (this.data.show5) {
      date_choose += "周五 ";
      date_choose_arr.push(4)
    }
    if (this.data.show6) {
      date_choose += "周六 ";
      date_choose_arr.push(5)
    }
    if (this.data.show7) {
      date_choose += "周日 ";
      date_choose_arr.push(6)
    }

    if (this.data.show1 && this.data.show2 && this.data.show3 && this.data.show4 && this.data.show5 && this.data.show6 && this.data.show7) {
      date_choose = "每日";
    }

    if (!this.data.show1 && !this.data.show2 && !this.data.show3 && !this.data.show4 && !this.data.show5 && !this.data.show6 && !this.data.show7) {
      date_choose = "永不";
    }

    prev.setData({
      date_choose: date_choose,
      date_choose_arr: date_choose_arr
    })

    wx.navigateBack();
  }
})