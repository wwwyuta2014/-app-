// pages/dome/dome.js
import {
  getToplist
} from "../../api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    topres: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    getToplist(this.data.page, function(res) {
      that.setData({
        topres: res.data.data
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
    var that = this;
    getToplist(this.data.page, function(res) {
      that.setData({
        topres: res.data.data
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    var page = ++this.data.page;
    getToplist(page, function(res) {
      if (res.data.data.length <= 0) {
        wx.showToast({
          title: '没有更多商品了',
        })
      } else {
        that.setData({
          topres: [...that.data.topres, ...res.data.data],
          page: page
        })
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})