# websocket

JAVA后台通过websocket与微信小程序实现实时通讯


java端：
index.jsp中实现与socket连接，新增一个连接用户，并可以发送一对经纬度坐标；
WebSocketTest.java中可以通过连接用户所带的参数得知当前用户的标识，在获取数据后可以自行完成业务选择需要发送给哪个客户端，并完成消息发送。

wxapp端
index实现与socket服务连接测试；
findCar实现连接后等待其他用户推送的经纬度数据，并实时定位到地图上，多次获取数据后可以形成移动轨迹。

