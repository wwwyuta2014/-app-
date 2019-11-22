// pages/xiangqing/xiangqing.js
import { addCartList, appCart} from "../../api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
     listArr:[],
     arr:0,
     isShow:false,
     animationData:null,
     idarr:0,
     money:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    this.setData({
      idarr: options.id
    })
    addCartList(id).then((res)=>{
      console.log(res.data.info);
     this.setData({
       listArr: res.data,
       money: res.data.info
     })
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

  },
  jianshao(){
     var s=this.data.arr;
     s--
     if(s<=0){
       return;
     }else{
       this.setData({
         arr: s
       })
     }
    
  },
  zengjia(){
    var s = this.data.arr;
    s++
    this.setData({
      arr: s
    })
  },
  isShowModul(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.bottom(0).step()
    this.setData({
      animationData: animation.export(),
      isShow:true
    })
  },
  isShowmc(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.bottom(-500).step()
    this.setData({
      animationData: animation.export(),
      isShow: false
    })
  },
  // 控制选择数量
  setValue(event){
    // 获取input值的方式 event.detail.value
    // console.log(event.detail.value);
    this.setData({
      arr: event.detail.value
    })
  },
  joinCart(){
    var s = this.data.arr
    var id = this.data.idarr
    if (this.data.isShow==false){
      this.isShowModul();
      return;
    }else{
      if (s == 0) {
        wx.showToast({
          title: '请增加商品数量',
        })
      } else {
        appCart(id, s).then((res) => {
          console.log(res);
          if (res.data.data == "success") {
            wx.showToast({
              title: '加入购物车成功',
            })
          }
        })
      }
    }
  }
})