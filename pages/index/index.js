//  获取全局属性及方法和模拟数据
const app = getApp();
const server = require('../../application/server.js');
const utli = require('../../utils/util.js');
Page({
  data: {
    inputshow: false,
    searchcount: 20
  },
  //  初始化加载静态模拟数据 
  onLoad() {
    let list = server.musiclist;
    this.setData({
      list: list
    })
  },
  //  点击获取发送请求 
  onchangji(event) {
    let eventid = event.target.dataset.id;
    wx.navigateTo({
      url: '/pages/top/top?url=' + encodeURIComponent(eventid),
    })
    wx.showLoading({
      title: '加载中',
    })
  },
  // 搜索页面按下确定按钮触发事件
  onsearch(event) {
    let that = this;
    let inpvalue = event.detail;
    let url = app.httpurl + "search/pc?offset=0&limit=" + this.data.searchcount + "&type=1&s=" + inpvalue;
    if (inpvalue) {
      this.setData({
        event:event,
        inputshow: true
      })
      utli.https(url, this.searchback)
    } else {
      this.setData({
        inputshow: false
      })
    }
  },
  // 搜索页面返回的回调函数
  searchback(e) {
    wx.hideLoading();
    let result = e.result.songs;
    utli.substring(result, this.subback);
  },
  // 将回调函数添加到Data里
  subback(e) {
    this.setData({
      searchmusic: e
    })
  },
  // 携参跳转到正在播放页面 
  onplay(e) {
    let play = e.currentTarget.dataset.play;
    let jsplay = JSON.stringify(play);
    let endplay = encodeURIComponent(jsplay);
    app.play = endplay;
    wx.switchTab({
      url: '/pages/logs/logs',
    })
  },
  onShow() {
    wx.hideLoading();
  },
  // 数据上拉刷新
  onReachBottom(){
    let inpvalue = this.data.event;
    let searchcount=this.data.searchcount+10
       console.log(searchcount);
    this.setData({
      searchcount: searchcount
    })
    wx.showLoading({
      title: '加载中',
    })
     this.onsearch(inpvalue);
  }
})
