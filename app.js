//app.js

// WeChat API 模块  用于将微信官方`API`封装为`Promise`方式
const wechat = require('./utils/wechat.js')

// Douban API 模块
const douban = require('./utils/douban.js')

// Baidu API 模块
const baidu = require('./utils/baidu.js')

App({
  // Global shared 
  globalData: {
    userInfo: null,
    name: 'Douban Movie Review',
    version: '0.1.0',
    currentCity: '成都'
  },

  // WeChat API
  wechat: wechat,

  // Douban API
  douban: douban,

  // Baidu API
  baidu: baidu,

  // 生命周期函数--监听小程序初始化
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    if(logs.length > 10) logs.length = 10;
    console.log(logs)
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('未授权', res, res.authSetting)
        }
      }
    }),

    // 获取位置信息
    wechat
      .getLocation('wgs84')
      .then(res => {
        const { latitude, longitude } = res
        return baidu.getCityName(latitude, longitude)
      })
      .then(name => {
        console.log(name)
        this.globalData.currentCity = name.replace('市', '')
        console.log(`currentCity : ${this.globalData.currentCity}`)
      })
      .catch(err => {
        this.globalData.currentCity = '成都'
        console.error(err)
      })
  }
})