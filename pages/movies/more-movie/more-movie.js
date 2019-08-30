// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require("../../../utlis/utlis.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle:"",
    movies:{},
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;  
    //通过中间变量在两个函数之间共享变量  
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category){
      case "正在热映":
        var dataUrl = app.globalData.doubanBase +"/v2/movie/in_theaters"
      break;
      case "即将上映":
        var dataUrl = app.globalData.doubanBase +"/v2/movie/coming_soon"
        break;
      case "豆瓣Top250":
        var dataUrl = app.globalData.doubanBase +"/v2/movie/top250"
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
    
  },
  
  //加载来自豆瓣的数据并处理
  processDoubanData: function (moviesDouban){
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."    //若电影名长于6，则截取
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var totalMovies = {};

    //若不是第一次加载数据，则把新加载的movies拼接到旧的movies上
    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }

    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  //下拉加载更多
  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading()
  },

  //下拉刷新
  onPullDownRefresh:function(event){
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
 
 //使 更多 电影页面点击也能跳转到电影详情
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movies-detail/movies-detail?id=' + movieId
    })
  },

  onReady: function (options){
    //动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  
  
})