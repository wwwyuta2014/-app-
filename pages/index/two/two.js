// a.js
import {
  fenleiid,
  danxuan
} from "../../../api/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    activeIndex: 0,
    listtitle: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id
    var arr = id.split(",")
    var isss=arr[1];
    var index=arr[0]
    // that.setData({
    //   activeIndex:index
    // })
    fenleiid().then((res) => {
      var salist = res.data.newCategoryList
      console.log(salist);

      // 判断相应得数据
      // console.log(res.data.newCategoryList[0].id)
      that.setData({
        list: res.data.newCategoryList,
        activeIndex: index
      })
      salist.forEach((item) => {
        if (isss == item.id) {
          danxuan(isss).then((data) => {
            that.setData({
              listtitle: data.data.currentNav,
              listsArr: data.data.data
            })
          })
        }
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
    var that = this;
    var id = event.currentTarget.dataset.id
    this.setData({
      activeIndex: event.currentTarget.dataset.index
    })
    // 点击展示出相应的内容
    danxuan(id).then((data) => {
      that.setData({
        listtitle: data.data.currentNav,
        listsArr: data.data.data
      })
    })
  }
})