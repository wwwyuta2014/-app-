var baseUrl = "http://118.25.222.68:5757/heyushuo/"
export function getToplist(page, fn) {
  wx.request({
    url: baseUrl + 'topic/listaction',
    data: {
      page: page
    },
    success: function(res) {
      fn(res);
    }
  })
}
// 分类左侧
export function getFenlei() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + 'category/indexaction',
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
// 分类右侧
export function getRight(id){
  return new Promise((resolve, reject)=>{
    wx.request({
      url: baseUrl+ 'category/currentaction',
      data:{
        id: id
      },
      success:function(res){
        resolve(res);
      },
      fail:function(err){
        reject(err);
      }
    })
  })
}
// 购物车数据 
export function getCartlist(){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseUrl+ 'cart/cartList',
      data:{
        openId:"oQmbb4sNZdxaUQZ0sfygvtOP2S7c"
      },
      success:function(res){
        resolve(res)
      },
      fail:function(error){
         reject(error)
      }
    })
  })
}
// 删除购物车
export function deleteCartOne(id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + 'cart/deleteAction',
      data: {
        id: id
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}

// 分类页面
export function fenleiid() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + 'index/index',
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
// 单选
export function danxuan(id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + 'goods/goodsList',
      data: {
        categoryId: id
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
// 详情
export function addCartList(id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + 'goods/detailaction',
      data: {
       id: id,
        openId: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c"
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
// 加入购物车
export function appCart(goodsId,number){
  return new Promise((resolve,reject)=>{
   wx.request({
     url: baseUrl +'cart/addCart',
     method:"post",
     data:{
       goodsId: goodsId,
       number: number,
       openId: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c"
     }, 
     success: function (res) {
       resolve(res)
     },
     fail: function (error) {
       reject(error)
     }
     
   })
 })
}