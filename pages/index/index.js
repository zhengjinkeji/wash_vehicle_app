// pages/index/index.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[
      //{picUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhao.kujiameng.com%2Fupload%2Farticle%2F20151008%2F60108124171444299117.jpg&refer=http%3A%2F%2Fhao.kujiameng.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623665389&t=6e961e0330a24944e17a2c3e084a592b"},{picUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhao.kujiameng.com%2Fupload%2Farticle%2F20151008%2F60108124171444299117.jpg&refer=http%3A%2F%2Fhao.kujiameng.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623665389&t=6e961e0330a24944e17a2c3e084a592b"}
    ],
    goodsDynamic:[{nick:"小庆子",goodsName:"100分钟洗车时长",avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK0CKv6XWeF1FdfMEjibYZrz0ibxQ527cyPkCZdO1GPJtFtDfmROYhuzUpOLySV8YdWx7zf7baian78A/132"},{nick:"小妮子",goodsName:"20元洗车券",avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK0CKv6XWeF1FdfMEjibYZrz0ibxQ527cyPkCZdO1GPJtFtDfmROYhuzUpOLySV8YdWx7zf7baian78A/132"}],
    categories:[
      // {icon	:	"https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png",name:"商务合作",link:"/pages/about/lxwm"},
      // {icon	:	"https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png",name:"紧急联系",link:"/pages/about/lxwm"},
      // {icon	:	"https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png",name:"洗车指南",link:"/pages/about/lxwm"},
      // {icon	:	"https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png",name:"在线充值",link:"/pages/addbill/addbill"},
     
    ],
    noticeList:[
      //{title:"DD新开张，优惠多多。"},{title:"DD新开张，1500分钟500元"}
    ],
    guanggao:{
      //val:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic129.huitu.com%2Fpic%2F20190919%2F434161_20190919082516334060_0.jpg&refer=http%3A%2F%2Fpic129.huitu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623665840&t=7e61471ff3491ceaddda9bc893c73dc7"
    },
    miaoshaGoods:[
      {pic:"https://img2.baidu.com/it/u=3139811219,3984973546&fm=26&fmt=auto&gp=0.jpg",name:"1500分钟500元",
      dateStartInt:-2938,dateEndInt:23929384,minPrice:500,originalPrice:200,stores:2}],
      goodsRecommend:[{pic:"https://img2.baidu.com/it/u=3139811219,3984973546&fm=26&fmt=auto&gp=0.jpg",name:"200分钟100元",minPrice:100,originalPrice:200},
      {pic:"https://img2.baidu.com/it/u=3139811219,3984973546&fm=26&fmt=auto&gp=0.jpg",name:"500分钟200元",minPrice:200,originalPrice:250},
      {pic:"https://img2.baidu.com/it/u=3139811219,3984973546&fm=26&fmt=auto&gp=0.jpg",name:"450分钟200元",minPrice:200,originalPrice:250}],
      goods:[{pic:"https://img0.baidu.com/it/u=3587305238,797449841&fm=26&fmt=auto&gp=0.jpg",name:"1L超洁玻璃水",minPrice:9.9,originalPrice:18.8,id:1},
      {pic:"https://img2.baidu.com/it/u=1219106344,599099902&fm=224&fmt=auto&gp=0.jpg",name:"嘉实多极护",minPrice:69.9,originalPrice:108.8,id:2}]
    },
    toDetailsTap: function(e) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    },
  tabClick:function(e){
    console.log("----",e);
    console.log("----",e.currentTarget)
    wx.navigateTo({
      url: e.currentTarget.dataset.link,
    })
  },
  goYhq:function(){
    wx.navigateTo({
      url: "/pages/yhq/index"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      banners:[],
      categories:[],
      guanggao:[],
      noticeList:[]
    })
    wx.request({ 
      url: app.globalData.url+"sysAbout/querySysFile?tenantId="+app.globalData.tenantId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("res",res.data.list)
       if(res.data.code==0){
         var list = res.data.list
         if( list!= null){
            for(var i=0;i<list.length;i++){
              if(list[i].file_type==1000){
                that.setData({
                  categories:that.data.categories.concat(list[i])
                })
              }
              if(list[i].file_type==1001){
                that.setData({
                  banners:that.data.banners.concat(list[i])
                })
              }
              if(list[i].file_type==1002){
                that.setData({
                  guanggao:list[i]
                })
              }
              if(list[i].file_type==1003){
                that.setData({
                  noticeList:that.data.noticeList.concat(list[i])
                })
              }
            }
         }
         
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("App.globalData.navHeight", app.globalData.navHeight)
    console.log("App.globalData.navTop", app.globalData.navTop)
    console.log("App.globalData.windowHeight", app.globalData.windowHeight)
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
      menuButtonObject: app.globalData.menuButtonObject //小程序胶囊信息
    })
    let that = this;
    wx.request({ 
      url: app.globalData.url+"wash/queryCustomerWashListForBanner?tenantId="+app.globalData.tenantId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("goodsDynamic",res.data.list)
       if(res.data.code==0){
        that.setData({
          goodsDynamic:res.data.list
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