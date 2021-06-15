
Page({
  data: {

  },
  onLoad: function (options) {
    this.setData({
      version: 1
    })
  },
  onShow: function () {
    //this.getUserApiInfo()
  },
  async getUserApiInfo() {
    const res = await WXAPI.userDetail(wx.getStorageSync('token'))
    if (res.code == 0) {
      let _data = {}
      _data.apiUserInfoMap = res.data
      if (res.data.base.mobile) {
        _data.userMobile = res.data.base.mobile
      }
      if (this.data.order_hx_uids && this.data.order_hx_uids.indexOf(res.data.base.id) != -1) {
        _data.canHX = true // 具有扫码核销的权限
      }
      const adminUserIds = wx.getStorageSync('adminUserIds')
      if (adminUserIds && adminUserIds.indexOf(res.data.base.id) != -1) {
        _data.isAdmin = true
      }
      if (res.data.peisongMember && res.data.peisongMember.status == 1) {
        _data.memberChecked = false
      } else {
        _data.memberChecked = true
      }
      this.setData(_data);
    }
  },
  clearStorage(){
    wx.showModal({
      title: '是否清除缓存',
      content: '清除缓存将使登录等信息失效,谨慎操作',
      success (res) {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.showToast({
            title: '已清除',
            icon: 'success'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  
  },
  goadmin() {
    wx.navigateToMiniProgram({
      appId: 'wx5e5b0066c8d3f33d',
      path: 'pages/login/auto?token=' + wx.getStorageSync('token'),
      envVersion: 'trial' // develop trial release
    })
  },
})