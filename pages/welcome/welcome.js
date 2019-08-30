Page({
  onTap:function(){
    /*wx.navigateTo({                         //页面跳转，但会在跳转后把前一个页面隐藏掉
      url: '../posts/posts',               //即执行unhide函数，依然能返回前一个页面
    })*/
    /*wx.redirectTo({                       //也是页面跳转，但会在跳转后把前一个页面卸载掉
      url: '../posts/posts',                //即执行unload函数，不能返回前一个页面
    }) */
    wx.switchTab({                       
      url: '../posts/posts',             
    }) 
  },

  onWel:function(){
    wx.showToast({
      title: '乱点你马呢',
      duration:2000,
      icon:"none"
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    
  }
})