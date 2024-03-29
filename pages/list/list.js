// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  // 页面的初始数据
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },

  // 生命周期函数--监听页面加载
  onLoad(params) {
    this.data.title = params.title || this.data.title

    // 类型： in_theaters  coming_soon  us_box
    this.data.type = params.type || this.data.type

    this.loadMore();
  },


  // 生命周期函数--监听页面初次渲染完成
  onReady() {
    wx.setNavigationBarTitle({ title: this.data.title })
  },


  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {
    this.setData({ movies: [], page: 1, hasMore: true })
    this.loadMore()
      .then(() => wx.stopPullDownRefresh())
  },

  onReachBottom: function onReachBottom() {
    if (this.data.type !== 'us_box') {
      this.loadMore();
    } else {
      this.setData({ hasMore: false, loading: false })
    }
  },

  loadMore: function loadMore() {
    if (!this.data.hasMore) return;

    // wx.showLoading()
    this.setData({ subtitle: '加载中...', loading: true })

    return app.douban.find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        if (d.subjects.length) {
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.subjects), loading: false })
        } else {
          this.setData({ subtitle: d.title, hasMore: false, loading: false })
        }
        // wx.hideLoading()
      }).catch(function (e) {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
        // wx.hideLoading()
      });
  }
});