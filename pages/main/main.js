// pages/main/main.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lb1:'',
    lb2:'',
    lb3:''
  },
  //用户充值
  addBill:function(e){
    wx.redirectTo({
      url: '/pages/addbill/addbill'
    })
    return;
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
    let that = this
    console.log("app",app.globalData.url);
     //获取轮播图参数id 1000
     wx.request({
      url: app.globalData.url+"sysAbout/querySysLBPara?tenantId="+app.globalData.tenantId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        for(var i=0;i<res.data.length;i++){
           if(i==0){
            that.setData({
              lb1:res.data[i].defaultValue
             })
           }
           if(i==1){
            that.setData({
              lb2:res.data[i].defaultValue
             })
           }
           if(i==2){
            that.setData({
              lb3:res.data[i].defaultValue
             })
           }
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