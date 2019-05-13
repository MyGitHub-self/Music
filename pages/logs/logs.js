//获取全局熟悉及方法
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    iconplay: false,
    iconshow:false
  },
  onLoad: function (options) {
  },
  //监听页面显示的数据 
  onShow: function () {
    let iconplay = this.data.iconplay
    let play = app.play
    if(play){
    let onplay = decodeURIComponent(play);
    let jsplay = JSON.parse(onplay);
    this.setData({
      temp: jsplay,
      iconshow: true
    });
    util.play(jsplay.id, iconplay)
    }else{
        this.setData({
          iconshow: false
        }) 
    }
     wx.hideLoading()
  },
  // 点击获取播放器的状态
  onplay: function () {
    this.setData({
      iconplay: !this.data.iconplay
    })
    if (this.data.iconplay) {
      let iconplay = this.data.iconplay
      util.play(this.data.temp.id, iconplay)
    }
    else {
      let iconplay = this.data.iconplay
      util.play(this.data.temp.id, iconplay)
    }
  }, 
  setclleback(e){
  }

})
