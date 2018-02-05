var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    polyline: [{
      points: [],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    latitude: '',
    longitude: '',
    rgcData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.regeocodint('39.915, 116.404');
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  regeocodint: function (str){
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'lMGlfq9wQfYVCTxpwY2nt7v8Af2BVDma'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      // console.log(data.wxMarkerData);
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.regeocoding({
      location: str,
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.connectWebsocket();
  },
  connectWebsocket: function () {
    let that = this;
    wx.connectSocket({
      url: 'ws://localhost:8080/websocket/websocket/peter',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET"
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
      let str = res.data;
      let ss = str.split(",");
      let poi = {
        latitude:ss[0],
        longitude:ss[1],
      }
      let poly = that.data.polyline;
      poly[0].points.push(poi);
      that.setData({
        polyline: poly
      })
      that.regeocodint(res.data);
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.closeSocket({
      success:function(){
        console.log('关闭socket！');
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.closeSocket({
      success: function () {
        console.log('关闭socket！');
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      rgcData: {
        address: '地址：' + data[i].address + '\n',
        desc: '描述：' + data[i].desc + '\n',
        business: '商圈：' + data[i].business
      }
    });
  }
})