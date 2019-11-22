// pages/gouwu/gouwu.js
import {
  getCartlist,
  deleteCartOne
} from "../../api/api.js"
var startX = 0;
var endX = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    quanxuan: 0,
    zongmoney: 0,
    ax: false,

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
    var that = this
    getCartlist().then((data) => {
      // console.log(data.data.data);
      var arr = data.data.data;
      arr.forEach((item) => {
        // console.log(item)
        item.isShow = false;
        item.animationData = null
      })
      that.setData({
        cartList: arr
      })
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

  },
  calcData() {
    var sum = this.data.cartList.reduce((total, item) => {
      if (item.isShow) {
        total += 1;
        return total;
      } else {
        return total;
      }
    }, 0)
    // 计算总价
    var tatle = this.data.cartList.reduce((total, item) => {
      console.log(item)
      if (item.isShow) {
        total += item.retail_price * item.number;
        return total;
      } else {
        return total;
      }
    }, 0)
    this.setData({
      quanxuan: sum,
      zongmoney: tatle
    })
  },
  select(event) {
    var index = event.currentTarget.dataset.index;
    console.log(index);
    var arr = this.data.cartList;
    arr[index].isShow = !arr[index].isShow
    // 计算是否被全选
    var allSelect = arr.every((item) => {
      return item.isShow == true;
    })

    this.setData({
      cartList: arr,
      ax: allSelect
    })
    this.calcData();
  },
  quanxuan() {
    var arr = this.data.cartList;
    arr.forEach((item) => {
      console.log(item);
      item.isShow = !this.data.ax;
    })

    this.setData({
      cartList: arr,
      ax: !this.data.ax
    })
    this.calcData();
  },
  // 手指放上去的时候
  mystart(event) {
    console.log(event.touches[0].clientX);
    startX = event.touches[0].clientX
  },
  // 手指滑动
  mymove(event) {
    endX = event.touches[0].clientX
  },
  // 手指离开
  myend(event) {
    // console.log(event);
    var index = event.currentTarget.dataset.index
    // console.log(index);
    var offsetX = startX - endX
    if (offsetX > 20) {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      animation.translateX(-80).step()

      // 对数组进行赋值
      this.backSrc();
      var arr = this.data.cartList
      arr[index].animationData = animation.export()
      this.setData({
        cartList: arr
      })
    } else if (offsetX < -20) {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      animation.translateX(0).step()

      // 对数组进行赋值
      this.backSrc();
      var arr = this.data.cartList
      console.log(arr);
      arr[index].animationData = animation.export()
      this.setData({
        cartList: arr
      })
    }

  },
  // 回退
  backSrc: function () {
    var arr = this.data.cartList
    for (var i = 0; i < arr.length; i++) {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      animation.translateX(0).step()
      arr[i].animationData = animation.export()
    }
    this.setData({
      cartList: arr
    })
  },
  // 删除内容

  deleteProduct(event) {
    var index = event.currentTarget.dataset.index
    wx.showModal({
      title: '删除',
      content: '确定要删除吗',
      success:(res)=>{
        // console.log(this)
        if (res.confirm) {
          var id = event.currentTarget.dataset.id
          deleteCartOne(id).then((res) => {
            var arr = this.data.cartList
            arr.splice(index,1)
            this.setData({
              cartList:arr
            })
          })
        } 
      }
    })
    var id = event.currentTarget.dataset.id
    console.log(id);
    deleteCartOne(id).then((res) => {
      console.log(res)
    })
  }
})