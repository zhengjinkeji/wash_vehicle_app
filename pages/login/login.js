const app = getApp();
const WXAPI = require('apifm-wxapi')
// const AUTH = require('../../utils/auth')
Page({
 
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl:'',
    getSmsCode:'点击获取验证码',
    serviceSmsCode:'',
    inputCode:'',
    isDisable:false
  },
  goReg:function(){
    wx.redirectTo({
      url: '/pages/register/register',
    })
  },
  onShow:function(){
    wx.showModal({
      title: '是否已经注册账户',
      content: '已注册点击登录 , 未注册点击注册',
      cancelText:'登录',
      confirmText:"注册",
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/register/register',
          })  
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function () {
   
 
    var that = this;
    const userInfo = wx.getStorageSync('userInfo')
    console.log("userInfo",userInfo)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });

      that.setData({
        avatarUrl: userInfo.avatarUrl,
      })
   
  },
  getUserInfo: function(e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              wx.setStorageSync('userInfo', res.userInfo)
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
               
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          //that.showSettingToast("请授权") 暂时不用
        }
      }
    })
  },

  // 打开权限设置页提示框 暂时不用
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },
  test:function(e){
    this.setData({
      inputMobilePhone:e.detail.value
    })
   
  },
  
  getInputCode:function(e){
    this.setData({
      inputCode:e.detail.value
    })
    console.log(this.data.mobilePhone);
  },
  sendSmsCode :function (e){
    if ("" == this.data.inputMobilePhone) {
      wx.showToast({
        title: '电话号码未输入',
        icon: 'none'
      })
      return;
    }
    let that = this;
    wx.request({
      url: app.globalData.url+"sendSmsCode?mobilePhone="+this.data.inputMobilePhone,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
       if(res.data.code==0){
        that.setData({
          serviceSmsCode: res.data.map.smsCode
        })
       }else{
        wx.showToast({
          title: '验证码获取失败请联系我们!',
          icon: 'none'
        })
        return;
       }
      }
    })
    console.log("smsCode"+this.data.serviceSmsCode)
    var second = 60;
    var i = setInterval(() => {
      second -= 1;
      if (second > 0) {
        this.setData({
          getSmsCode: second+'秒后重新获取',
          isDisable:true 
        })
     } else {
      this.setData({
        getSmsCode: '重新获取',
        isDisable:false
      })
      clearInterval(i)
     }
    }, 1000) 
   
  },
  formSubmit: function (e) {
    console.log(this.data.serviceSmsCode);
    console.log(this.data.inputCode);
   //校验是否输入验证码
    if ("" == this.data.inputCode) {
      wx.showToast({
        title: '请输入验证码!',
        icon: 'none'
      })
      return;
    }
    //校验是否输入验证码
    if (this.data.serviceSmsCode !=  this.data.inputCode) {
      wx.showToast({
        title: '验证码错误!',
        icon: 'none'
      })
      return;
    }
    // 防止连续点击--开始
    if (this.data.payButtonClicked) {
      wx.showToast({
        title: '休息一下~',
        icon: 'none'
      })
      return
    }
    this.data.payButtonClicked = true
    setTimeout(() => {
      this.data.payButtonClicked = false
    }, 3000)  // 可自行修改时间间隔（目前是3秒内只能点击一次按钮）
    // 防止连续点击--结束
  
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用
    var mobilePhone = e.detail.value.mobilePhone;
    // var subPassword = e.detail.value.subPassword;
    if ("" == mobilePhone) {
      wx.showToast({
        title: '电话号码不能为空',
        icon: 'none'
      })
      return;
    }

    wx.request({
      url: app.globalData.url + 'customerLogin?mobilePhone='+mobilePhone,
      success: function (res) {
        console.log("res.data.code"+res.data.code)
        if (res.data.code == 0) {
          wx.setStorageSync("userId",res.data.map.userId)
          wx.showModal({
            title: '',
            content: '登录成功!',
            showCancel:false,
            success:function(){ 
              //app.globalData.account=account
              wx.switchTab({
                url: '/pages/center/center'
              })
            }
          })
        }else{
          wx.showModal({
            title: '用户未注册',
            content: '用户未注册',
            cancelText:'取消',
            confirmText:"去注册",
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/register/register',
                })  
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  }
})
