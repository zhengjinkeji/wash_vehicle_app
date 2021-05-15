// pages/center/center.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断用户是否登录
    userInfoStatus: 0, // 0 未读取 1 没有详细信息 2 有详细信息
    userAccounts:null
  },

  getUserProfile(e) {
  
    let that = this
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于完善会员资料',
      success: res => {
        console.log(res);
        var userInfo = res.userInfo;
        wx.setStorageSync('userInfo', userInfo)
        this.setData({
          userInfoStatus : 1,
          userInfo :userInfo
        })
        wx.setStorageSync('isAuth', 1)
        that.onShow();
      },
      fail: err => {
        console.log(err);
        // wx.showToast({
        //   title: err.errMsg,
        //   icon: 'none'
        // })
        wx.switchTab({
          url: '/pages/main/main',
        })
      }
    })
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
    return
    var isAuth = wx.getStorageSync('isAuth');
    let that = this
    console.log("app.globalData.isAuth="+isAuth);
    if(isAuth==1){
      console.log("已授权");
       //授权后查询用户是否注册过
       wx.request({
        url:app.globalData.url+"wash/queryCustomerDetails?userOpenId="+app.globalData.userOpenId,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if(res.data.code==0){
             //存在客户 赋值客户信息 
             console.log("res.data.object"+res.data.object)
             var userInfo = wx.getStorageSync("userInfo");
             wx.setStorageSync('userId', res.data.map.userId);
             that.setData({
              userInfoStatus : 1,
              userAccounts:res.data.map,
              userInfo :userInfo
            })
          }else{
            //跳转注册
            console.log("去注册吧!")
            wx.redirectTo({
              url: '/pages/register/register'
            })

          }
        }
      })
    }else{
     console.log("干")
     that.setData({
      userInfoStatus : 0,
      //未授权清除页面值
      userAccounts:null
    })
    }
   
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