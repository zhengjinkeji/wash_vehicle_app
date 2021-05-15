const app = getApp();


Page({
  data: {
    carlist:[{val:"豫V63183",adddate:"2021-05-15 22:11:55"},{val:"豫V63183",adddate:"2021-05-15 22:11:55"}]
  },
  getInputLicense:function(e){
    this.setData({
      license:e.detail.value
    })
  },
  onLoad: function (options) {
    
  },
  bindSave: function(){
    console.log("加绑车牌:"+this.data.license)
    var userId = wx.getStorageSync('userId')
    wx.request({ 
      url: app.globalData.url+"addCarLicense?userId="+userId+"&license="+this.data.license,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
       if(res.data.code==0){
        wx.showToast({
          title: '车牌绑定成功',
          icon: 'none'
        })
       }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
       }
      }
    })
  },
  onShow () {
    
  }
})