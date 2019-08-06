import * as echarts from '../../ec-canvas/echarts';

var chart = null;
var data = new Array();
var xAxix = new Array();
const temps = new Array();

for (let i = 0; i <= 99; ++i) {
  if (i < 10) temps.push('0' + i.toString())
  else temps.push(i.toString())
}

for (var i = 1; i <= 60; ++i) {
  xAxix.push(i.toString());
}

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  for (var i = 0; i < 60; ++i) {
    data.push(0);
  }

  var option = {
    title: {
      left: 'center',
      text: '过去1小时温度',
      textSytle: {
        fontSize: 16,
        fontWeight: 'normal'
      }
    },
    xAxis: {
      data: xAxix
    },
    yAxis: {},
    series: [{
      name: '温度',
      type: 'line',
      smooth: true,
      data: data
    }],
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    },
    cur: 0,
    temp: 50,
    value: [50],
    temps: temps,
    monitor_flag: false,
    ifShow: false
  },

  onLoad: function (option) {
    getApp().globalData.temp_page = this;
    this.setData({
      ifShow: getApp().globalData.show
    })
  },

  update: function (x) {
    chart.setOption({
      series: [{
        data: x
      }]
    });
    this.setData({
      cur: x[x.length - 1]
    })
  },

  monitor: function(e) {
    this.setData({
      monitor_flag: !this.data.monitor_flag
    })
    if (this.data.monitor_flag) {
      getApp().globalData.websocket.send('4#0')
    }
    if (!this.data.monitor_flag) {
      getApp().globalData.websocket.send('4#1')
    }
  },

  change: function(e) {
    const val = e.detail.value
    this.setData({
      temp: this.data.temps[val[0]]
    })
    getApp().globalData.websocket.send('3#' + parseInt(this.data.temp).toString())
  },
  cshow: function (res) {
    this.setData({
      ifShow: res
    })
  }
});