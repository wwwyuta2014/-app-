// pages/fenlei/fenlei.js
import {
  getFenlei,
  getRight
} from "../../api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    activeIndex: 0,
    rigthList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    getFenlei().then((res) => {
      // console.log(res);
      console.log(res.data.categoryList[0])
      that.setData({
        list: res.data.categoryList
      })
      
    //  页面初次加载请求一次数据
      getRight(res.data.categoryList[0].id).then((data)=>{
        that.setData({
          rigthList: data.data.data.currentOne
        })
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

      //  console.log("aaa");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  
  seleceOne(event) {
    var id = event.currentTarget.dataset.id
    console.log(id)
    this.setData({
      activeIndex: event.currentTarget.dataset.index
    })
    // 请求相应的数据
    getRight(id).then((data) => {
      var that = this
      console.log(data);
      that.setData({
        rigthList: data.data.data.currentOne
      })
    })
  }
})