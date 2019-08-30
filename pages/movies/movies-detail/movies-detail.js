// pages/movies/movies-detail/movies-detail.js
var app = getApp();
var util = require("../../../utlis/utlis.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.http(url, this.processDoubanData);
  },

  //查看图片
  viewMoviePostImg:function(e){
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      current:src
    })
  },


  processDoubanData: function (data) {
    //判断获取数据为空值的情况
    if(!data){
      return ;
    }
    var director ={
      avatar:"",
      name:'',
      id:''
    }
    if(data.directors[0]!=null){
      if(data.directors[0].avatars!=null){
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;  
    }
    var movie = {
      movieImg: data.images?data.images.large:null,
      country:data.countries[0],
      stars: util.convertToStarsArray(data.rating.stars),
      title: data.title,
      originalTitle:data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year: data.year,
      genres: data.genres.join("、"),
      score:data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie:movie
    })
  }
})