// app.js
App({
  onLaunch() {
      // ---------------检测navbar高度
      let menuButtonObject = wx.getMenuButtonBoundingClientRect();
      console.log("小程序胶囊信息",menuButtonObject)
      wx.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight,
            navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
            navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;//导航高度
          this.globalData.navHeight = navHeight;
          this.globalData.navTop = navTop;
          this.globalData.windowHeight = res.windowHeight;
          this.globalData.menuButtonObject = menuButtonObject;
          console.log("navHeight",navHeight);
        },
        fail(err) {
          console.log(err);
        }
      })
    var appSecret = '';
    const s = wx.getAccountInfoSync();
    console.log(s.miniProgram.appId);
    this.globalData.tenantId=s.miniProgram.appId;
    console.log(this.globalData.tenantId);
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取appSecret
   let that = this
        wx.request({
          
          url: this.globalData.url+"sysAbout/querySysPara?paraId=1003&&tenantId="+this.globalData.tenantId,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log("res"+res.data.map)
            if(res.data.code==0){
            that.globalData.appSecret = res.data.map.defaultValue
              // 登录
            wx.login({
          
            success: res => {
            // 获取微信唯一code
            console.log(res.code);
            //发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: that.globalData.url+"getOpenId?wechatCode="+res.code+"&appId="+that.globalData.tenantId+"&appSecret="+that.globalData.appSecret,
              header: {
                'content-type': 'application/json' // 默认值
              },
              success (res) {
                if(res.data.code==0){
                  that.globalData.userOpenId=res.data.map.openid;
                  console.log(that.globalData.userOpenId);
                }else{
                  wx.showToast({
                    title: '获取openId失败',
                    icon: 'none'
                  })
                }
              
              }
            })
          }
        })

      }else{
        wx.showToast({
          //获取app秘钥失败
          title: '系统内部错误',
          icon: 'none'
        })

      }
      }
    })

  },
  globalData: {
    userOpenId:null,
    userInfo: null,
    url:"https://www.gaesh.com/guns/",
    //url:"http://localhost:9666/",
    appId:null,
    appSecret:'', 
    userOpenId:'',
    isAuth:0
  }
})
