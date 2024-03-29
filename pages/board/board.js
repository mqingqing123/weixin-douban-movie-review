// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
 // 页面的初始数据
  data: {
    boards: [
    { key: 'in_theaters' },
    { key: 'coming_soon' },
    { key: 'top250' },
    { key: 'us_box', }
    ],
    loading: true
  },

  // 生命周期函数--监听页面加载
  onLoad() {
    wx.showLoading({title: '加载中'})

    const tasks = this.data.boards.map(board => {
      return app.douban.find(board.key, 1, 8)
        .then(d => {
          board.title = d.title
          board.movies = d.subjects
          return board
        })
    })

    Promise.all(tasks).then(boards => {
      this.setData({ boards: boards, loading: false })
      wx.hideLoading()
    })
  },


  // 生命周期函数--监听页面初次渲染完成
  onReady() {
    // TODO: onReady
  },

  // 生命周期函数--监听页面显示
  onShow() {
    // TODO: onShow
  },

  // 生命周期函数--监听页面隐藏
  onHide() {
    // TODO: onHide
  },

  // 生命周期函数--监听页面卸载
  onUnload() {
    // TODO: onUnload
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});