const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    washRoomList:[],
    mobilePhone:'',
    id:'',
    disabled:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.url+"wash/queryWashRoomList?tenantId="+app.globalData.tenantId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("res:",res.data.list)
        that.setData({
          washRoomList:(res.data.list)
        })
      }
    })
  },
  handleOpen: function (e) {
    // var roomId = e.currentTarget.dataset.roomId;
     var mobilePhone = e.currentTarget.dataset.mobilePhone;

    console.log("roomId"+this.data.id)
    console.log("mobilePhone"+mobilePhone)
    if ("" == this.data.mobilePhone) {
        wx.showToast({
          title: '请输入来电人电话',
          icon: 'none'
        })
        return;
    }
    var userId = wx.getStorageSync('userId');
    let that = this;
    wx.request({
      url: app.globalData.url+"wash/manageHandleOpen?tenantId="+app.globalData.tenantId+"&userId="+userId+"&roomId="+this.data.id+"&mobilePhone="+mobilePhone,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if(res.data.code==0){
          wx.showToast({
            title: '协助开门成功',
            icon: 'none'
          })
          that.setData({
            disabled:true
          })
        }else{
            wx.showToast({
              title: '协助开门失败!',
              icon: 'none'
            })
          }
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})