// pages/apply/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxlogin: true,
    washlogs:[
      {typeStr:"豫V63183",dateAdd:"2021-05-13 22:38:39",amount:12,time:23},
      {typeStr:"豫V63183",dateAdd:"2021-05-13 22:38:39",amount:13,time:16},
      {typeStr:"豫V63183",dateAdd:"2021-05-13 22:38:39",amount:12,time:21},
      {typeStr:"豫V63183",dateAdd:"2021-05-13 22:38:39",amount:10,time:18},
      {typeStr:"豫V63183",dateAdd:"2021-05-13 22:38:39",amount:13,time:41},
      {typeStr:"豫V63183",dateAdd:"2021-05-13 22:38:39",amount:31,time:32},
      {typeStr:"豫V63183",dateAdd:"2021-05-13 22:38:39",amount:32,time:34},
      {typeStr:"豫V63183",dateAdd:"2021-05-13 22:38:39",amount:12,time:12}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let that = this;
    var userId = wx.getStorageSync('userId')
    wx.request({ 
      url: app.globalData.url+"wash/queryCustomerWashListApp?userId="+userId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("res",res.data.list)
       if(res.data.code==0){
          that.setData({
            washlogs:res.data.list,
            totalCost:res.data.map.total_cost,
            totalTime:res.data.map.total_time
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