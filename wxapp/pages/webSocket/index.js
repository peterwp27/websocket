Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  connectWebsocket: function () {
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
      console.log('收到服务器内容：' + res.data)
    })
  }
})