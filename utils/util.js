const innerAudioContext = wx.createInnerAudioContext();
// 公共的https请求方法
const https=function(url,getback){
  wx.request({
    url: url,
    data: {},
    method: "GET",
    header: {
      'Content-Type': 'application/json' // 默认值
    },
    success: function (res) {
      getback(res.data)
      }
  })
}
// 公共的播放请求方法
const play=function(playid,getback){
  innerAudioContext.autoplay =true
  innerAudioContext.loop=true
  innerAudioContext.src = "https://music.163.com/song/media/outer/url?id=" + playid + ".mp3";
  if(getback) {
    innerAudioContext.pause()
  } else {
    innerAudioContext.play()
  }
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
}
// 公共的字节长度处理方法
const substring = function (forvalue, cellback, topbgimg){
  const more = [];
  for (var idx in forvalue) {
    const index = forvalue[idx];
    var name = index.name;
    var artistsname = index.artistsname||index.artists[0].name;
    if (name.length >= 5 || artistsname.length >= 5) {
      name = name.substring(0, 5) + "...";
      artistsname = artistsname.substring(0, 5) + "...";
    };
    var temp = {
      title: name,
      name: artistsname,
      bgimg:index.bgimg||index.album.blurPicUrl,
      id: index.id
    }
    more.push(temp);
  }
  return cellback(more, topbgimg);
}
module.exports = {
  https:https,
  play:play,
  substring: substring
}
