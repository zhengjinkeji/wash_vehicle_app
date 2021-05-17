// pages/goods-details/index.js
const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxlogin: true,
    buyNumber:1
  },
  buyNow:function(){
    console.log("----------",this.data.buyNumber)
    wx.showToast({
      title: '暂时缺货!',
      icon: 'none'
    })
  },
  stepChange(event) {
    this.setData({
      buyNumber: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    if(options.id==1){
      let goodsDetail = {basicInfo:{name:"1L超洁玻璃水",minPrice:9.9,recommendStatus:1,originalPrice:18.8,numberSells:195,pics:[{pic:"https://img0.baidu.com/it/u=3587305238,797449841&fm=26&fmt=auto&gp=0.jpg"}]}}
      this.setData({
        goodsDetail:goodsDetail
      })
    }
    if(options.id==2){
      let goodsDetail = {basicInfo:{name:"嘉实多极护",minPrice:69.9,recommendStatus:1,originalPrice:108.8,numberSells:195,pics:[{pic:"https://img2.baidu.com/it/u=1219106344,599099902&fm=224&fmt=auto&gp=0.jpg"}]}}
      this.setData({
        goodsDetail:goodsDetail
      })
    }
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