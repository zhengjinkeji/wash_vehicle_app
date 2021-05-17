const app = getApp();


Page({
  data: {
    carlist:[]
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
    let that = this;
    var userId = wx.getStorageSync('userId')
    userId=3
    wx.request({ 
      url: app.globalData.url+"wash/queryCustomerBindLicense?userId="+userId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("res",res.data.list)
       if(res.data.code==0){
          that.setData({
            carlist:res.data.list
          })
       }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
       }
      }
    })
  }
})