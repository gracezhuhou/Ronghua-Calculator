// pages/random/random.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    randomNum: ""
  },

  bindsubmit: function (e) {
    var min = Number(e.detail.value.minValue), 
      max = Number(e.detail.value.maxValue);
    if (max <= min) {
      this.setData({ randomNum: "最大值应大于最小值，\n请重新输入" });
    }
    else {
      this.setData({ randomNum: getRandomNum(min, max) });
    }
  },

  bintReset: function() {
    this.setData({ randomNum: "" });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

//从min和max之间产生一个随机数
function getRandomNum(min, max) {
  var total = max - min + 1;
  return Math.floor(Math.random() * total) + min;
}