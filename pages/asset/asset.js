const app = getApp()
// const WXAPI = require('apifm-wxapi')
// const AUTH = require('../../utils/auth')

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxlogin: true,
    rechargeOpen: false, // 是否开启充值[预存]功能,
    cashlogs:[
      {typeStr:"充值",dateAdd:"2021-05-13 22:38:39",amount:100},
      {typeStr:"购买洗车",dateAdd:"2021-05-13 22:38:39",amount:100},
      {typeStr:"充值",dateAdd:"2021-05-13 22:38:39",amount:100},
      {typeStr:"购买洗车",dateAdd:"2021-05-13 22:38:39",amount:100},
      {typeStr:"充值",dateAdd:"2021-05-13 22:38:39",amount:100},
      {typeStr:"购买洗车",dateAdd:"2021-05-13 22:38:39",amount:100},
      {typeStr:"充值",dateAdd:"2021-05-13 22:38:39",amount:100},
      {typeStr:"购买洗车",dateAdd:"2021-05-13 22:38:39",amount:100}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    return
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
    AUTH.checkHasLogined().then(isLogined => {
      this.setData({
        wxlogin: isLogined
      })
      if (isLogined) {
        this.doneShow();
      }
    })
  },
  doneShow: function () {
    const _this = this
    const token = wx.getStorageSync('token')
    if (!token) {
      this.setData({
        wxlogin: false
      })
      return
    }
    WXAPI.userAmount(token).then(function (res) {
      if (res.code == 700) {
        wx.showToast({
          title: '当前账户存在异常',
          icon: 'none'
        })
        return
      }
      if (res.code == 2000) {
        this.setData({
          wxlogin: false
        })
        return
      }
      if (res.code == 0) {
        _this.setData({
          balance: res.data.balance.toFixed(2),
          freeze: res.data.freeze.toFixed(2),
          totleConsumed: res.data.totleConsumed.toFixed(2),
          score: res.data.score
        });
      }
    })
    this.fetchTabData(this.data.activeIndex)
  },
  fetchTabData(activeIndex){
    if (activeIndex == 0) {
      this.cashLogs()
    }
    if (activeIndex == 1) {
      this.withDrawlogs()
    }
    if (activeIndex == 2) {
      this.depositlogs()
    }
  },
  cashLogs() {
    const _this = this
    WXAPI.cashLogsV2({
      token: wx.getStorageSync('token'),
      page:1,
      pageSize:50
    }).then(res => {
      if (res.code == 0) {
        _this.setData({
          cashlogs: res.data.result
        })
      }
    })
  },
  withDrawlogs() {
    const _this = this
    WXAPI.withDrawLogs({
      token: wx.getStorageSync('token'),
      page:1,
      pageSize:50
    }).then(res => {
      if (res.code == 0) {
        _this.setData({
          withDrawlogs: res.data
        })
      }
    })
  },
  depositlogs() {
    const _this = this
    WXAPI.depositList({
      token: wx.getStorageSync('token'),
      page:1,
      pageSize:50
    }).then(res => {
      if (res.code == 0) {
        _this.setData({
          depositlogs: res.data.result
        })
      }
    })
  },

  recharge: function (e) {
    wx.navigateTo({
      url: "/pages/recharge/index"
    })
  },
  withdraw: function (e) {
    wx.navigateTo({
      url: "/pages/withdraw/index"
    })
  },
  payDeposit: function (e) {
    wx.navigateTo({
      url: "/pages/deposit/pay"
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.fetchTabData(e.currentTarget.id)
  },
  cancelLogin(){
    wx.switchTab({
      url: '/pages/my/index'
    })
  },
})