const WXAPI = require('apifm-wxapi')
const wxpay = require('../../utils/pay.js')
const app = getApp();


Page({
  data: {
    
  },
  getInputMoney:function(e){
    this.setData({
      money:e.detail.value
    })
  },
  onLoad: function (options) {
    
  },
  addBill: function(){
    //后台获取同一订单系统id
    //var money =this.data.money;
    var money =0.01;
    if(money>0){
      //微信支付接口用分定义
      money = money*100;
    }
    wx.request({
      url: app.globalData.url+"wxPay/wxPay?money="+money+"&userOpenId="+app.globalData.userOpenId+"&appid="+app.globalData.tenantId,
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
  onShow () {
    
  }
})