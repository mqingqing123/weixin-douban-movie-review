'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    loading: true,
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    var _this = this;

    app.douban.findOne(params.id).then(function(d) {
      _this.setData({ title: d.title, movie: d, loading: false });
      wx.setNavigationBarTitle({ title: d.title });
    }).catch(function(e) {
      _this.setData({ title: '获取数据异常', movie: {}, loading: false });
      console.error(e);
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    wx.setNavigationBarTitle({ title: this.data.title });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  },
  onShareAppMessage: function onShareAppMessage() {
    return {
      title: this.data.title,
      desc: '豆瓣影评小程序',
      path: '/pages/item?id=' + this.data.id
    };
  },
  /*查看图片*/
  viewPostImg: function(e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
});