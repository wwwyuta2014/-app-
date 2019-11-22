//index.js
//获取应用实例
import {
  danxuan
} from "../../api/api.js"
const app = getApp()

Page({
  data: {
    imglist: [],
    cate: [],
    newGoods: [],
    allProducts: [],
    id: 0
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onShow: function() {
    var that = this;
    wx.request({
      url: 'http://118.25.222.68:5757/heyushuo/index/index',
      success: function(data) {
        console.log(data);
        that.setData({
          imglist: data.data.banner,
          // cate: data.data.channel,
          cate: data.data.newCategoryList,
          newGoods: data.data.newGoods,
          allProducts: data.data.newCategoryList
        })
      }
    });
  },
  onLoad: function() {},
  logBtn: function(e) {
    var arr=[]
    let oid = e.currentTarget.dataset.id;
    arr.push(oid);
    var that = this;
    wx.request({
      url: 'http://118.25.222.68:5757/heyushuo/index/index',
      success: ((data) => {
        that.setData({
          id: data.data.newCategoryList
        })
        let idd = this.data.id[oid].id;
        danxuan(idd).then((res) => {
          arr.push(idd);
          wx.navigateTo({
            url: 'two/two?id='+arr
          })
        })
      })
    });
  },
  tiaozhuan(event){
    var id = event.currentTarget.dataset.id
    
    console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/xiangqing/xiangqing?id='+id,
    })
  }
})