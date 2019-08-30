// pages/posts/post-detail/post-detail.js
var postsData = require("../../../data/posts-data.js");
var app = getApp() ;    //获取全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData;
    var postId = options.id;
     //把postid传递到data里，使onCollectionTap函数能拿到该变量
    this.data.currentPostId = postId;          
    var postData = postsData.postList[postId];
    this.setData({
      post_key: postData
    });

    var postsCollected = wx.getStorageSync("posts_collected");   //读取所有被缓存的文章
      if(postsCollected){                                         //如果存在被缓存的文章
        var postCollected = postsCollected[postId];               //把被缓存的文章的赋值给postCollected
        this.setData({
          collected:postCollected                                 //绑定wx：if中的数据
        })
      }
      else{
        var postsCollected = {};
        postsCollected[postId] = false;
        wx.setStorageSync("posts_collected", postsCollected);
      }

      if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
       this.setData({
         isPlayingMusic : true
       })
      }
      
      this.setMusicMonitor();
  },

  setMusicMonitor:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    })

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })

    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];    //拿到文章是否被收藏的变量值
    postCollected = !postCollected;                                 //切换收藏状态                      
    postsCollected[this.data.currentPostId] = postCollected;        //更新缓存
    this.showToast(postsCollected, postCollected);
    
  },

 /* showModal: function (postsCollected, postCollected){
    var that = this;       //注意这里要在success函数外部先保存this 否则this无法传递到success的上下文环境
    wx.showModal({
      title: '收藏',
      content: postCollected?'确定要收藏该文章吗？':"确定取消收藏吗？",
      confirmText:"肯定啊",
      cancelText:"点错了",
      cancelColor:"#999",
      confirmColor:"#405f80",
      success:function(res){
         if(res.confirm){
           wx.setStorageSync("posts_collected", postsCollected);
           that.setData({
             collected: postCollected                    //更新数据绑定，实现图片切换
           })
         }
      }
    }) 
  }, */

  showToast: function (postsCollected, postCollected){
    wx.setStorageSync("posts_collected", postsCollected);
    this.setData({
      collected: postCollected                    //更新数据绑定，实现图片切换
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : "取消成功",
      duration: 1000
    })  
  },

  onShareTap:function(event){
    wx.showActionSheet({
      itemList:[
        "分享给微信好友",
        "分享到朋友圈",
        "分享给梓才",
        "分享给颜锋"
      ],
      itemColor:"#405f80",
      success(res) {               //res.tapIndex表示选择了哪一个选项 res.cancel表示用户点击了取消
        wx.showToast({
          title: '分享成功',
        })   
      }
    })

  },

  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic : false
      })
    }
    else{
      wx.playBackgroundAudio({
        dataUrl: postsData.postList[currentPostId].music.url,
        title: postsData.postList[currentPostId].music.title
      })
      this.setData({
        isPlayingMusic: true
      })
    }

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

  }
})