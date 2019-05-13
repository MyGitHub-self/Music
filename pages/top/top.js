// 获取全局属性及方法
const utils = require('../../utils/util.js');
const app = new getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    conunt: 20
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //  初始化解析数据 
  onLoad: function (options) {
    const toptemp = decodeURIComponent(options.url);
    var url = app.httpurl + 'playlist/detail?updateTime=-1&id=' + toptemp;
    utils.https(url, this.setback);
  },
  setback(e) {
    // console.log(e.result.tracks);
    wx.hideLoading();
    var topurl = e.result.tracks
    var music = {};
    var more=[];
    topurl.map((item,idx)=>{
        var index=topurl[idx];
        let results = {
         artistsname: index.album.artists[0].name,
         name: index.name,
         id: index.id,
         bgimg: index.album.blurPicUrl
       }
      if (idx < this.data.conunt){
        more.push(results);
      }
    })
    this.setData({
      e:e
    })
    const topbgimg = e.result.coverImgUrl;
   utils.substring(more, this.suback, topbgimg)
  },
  suback: function (e, topbgimg) {
    var music = {};
    music["music"] = {
      list: e,
      topbgimg: topbgimg
    }
    this.setData(
      music
    )
  },
  //  携参跳转正在播放页面 
  onplay: function (e) {
    let play = e.currentTarget.dataset.play;
    let jsplay = JSON.stringify(play);
    let endplay = encodeURIComponent(jsplay);
    app.play = endplay;
    wx.switchTab({
      url: '/pages/logs/logs',
    })
    wx.showLoading({
      title: '页面正在跳转中',
    })
  },
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    wx.showLoading({
      title: '加载中',
    })
    var e=this.data.e
    var reach = this.data.conunt + 10
    this.setData({
      conunt: reach
    })
    this.setback(e);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})