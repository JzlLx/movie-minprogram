// pages/posts/posts.js
var postsData = require("../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      post_key: postsData.postList
    })  
    
    //setData方法里面传递的必须是js对象，而不是数组 
    //es6中对象的简写 相当于posts_content：posts_content
  },

  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
     wx.navigateTo({
       url: 'post-detail/post-detail?id='+ postId,
     })
  },

  /*onSwiperTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },*/

  onSwiper: function (event){
    //target指当前点击的组件  currentTarget是事件捕获的组件
    //即target指 的是image，而currentTarget是swiper组件
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})