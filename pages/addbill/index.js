const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recharge_amount_min:10,
    rechargeSendRules:[{confine:100,send:101},{confine:200,send:200},{confine:300,send:300},{confine:100,send:100},{confine:200,send:200},{confine:300,send:300}]
  },
  /**
   * 点击充值优惠的充值送
   */
  rechargeAmount: function (e) {
    var chargeAmount = e.currentTarget.dataset.charge_amount;
    var sendAmount = e.currentTarget.dataset.send_amount;
    var amount = chargeAmount+sendAmount;
    //微信单位是分
    this.setData({
      chargeAmount: chargeAmount*100,
      amount:amount,
      sendAmount:sendAmount*100
    });
   //
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.url+"wxPay/queryChargeLevel?tenantId="+app.globalData.tenantId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("res:",res.data.list)
        that.setData({
          rechargeSendRules:(res.data.list)
        })
      }
    })
  },
  bindSave: function (e) {
    const that = this;
    const amount = e.detail.value.amount;
    var isAuth = wx.getStorageSync('isAuth');
    if (isAuth == 0) {
      wx.showModal({
        title: '用户未授权登录!',
        content: '请切换主页右下角"我的"进行授权登录',
        showCancel: false
      })
      return
    }
    if (amount == "" || amount * 1 < 0) {
      wx.showModal({
        title: '错误',
        content: '请填写正确的充值金额',
        showCancel: false
      })
      return
    }
    if (amount * 1 < that.data.recharge_amount_min * 1) {
      wx.showModal({
        title: '错误',
        content: '单次充值金额至少' + that.data.recharge_amount_min + '元',
        showCancel: false
      })
      return
    }
   //充值 注意:微信的单位是分
   var money = amount*100;
   //money = 1
   wx.request({
    url: app.globalData.url+"wxPay/wxPay?money="+money+"&userOpenId="+app.globalData.userOpenId+"&appid="+app.globalData.tenantId+"&chargeAmount="+this.data.chargeAmount+"&sendAmount="+this.data.sendAmount,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res);
      console.log("res.data.appid"+res.data.appid);
      if(res.data.erroMsg==''){
          //统一下单接口成功拉起支付窗口
          wx.requestPayment({
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            paySign: res.data.paySign,
            timeStamp:  res.data.timeStamp,
            signType:'MD5',
            success (res) {
              console.log("充值成功!");
               wx.showModal({
                    title: '',
                    content: '支付成功',
                    showCancel: false
                  })
              //原本成功后后台存入充值记录
              //但是微信目前充值完前台要点完成才能触发回调函数,所以有bug,所以充值记录 在统一下单时即进行充值记录插入记录状态为预支付,
              //后台等待回信notify通知接口 主动调后台再进行后台更新预支付为充值成功
              // wx.request({
              //   url: app.globalData.url+"customerRecharge?userId="+userId+"&money="+money+"&billNo="+billNo,
              //   header: {
              //     'content-type': 'application/json' // 默认值
              //   },
              //   success (res) {
              //    if(res.data.code==0){
              //     wx.showModal({
              //       title: '',
              //       content: '支付成功',
              //       showCancel: false
              //     })
              //    }else{
              //     wx.showModal({
              //       title: '',
              //       content:res.data.message,
              //       showCancel: false
              //     })
              //    }
              //   }
              // })
            },
            fail (res) { 
              wx.showModal({
                title: '',
                content: '支付取消',
                showCancel: false
              })
            }
          })  
      }else{
        wx.showModal({
          title: '充值失败',
          content: res.data.erroMsg,
          showCancel: false
        })
      }
      return;
     
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