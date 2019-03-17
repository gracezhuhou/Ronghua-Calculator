// pages/statistic/statistic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: new Array(100),
    result: [
      { name: "平均值", num: "" }, 
      { name: "中位数", num: "" },
      { name: "众数", num: "" },
      { name: "方差", num: "" },
      { name: "标准差", num: "" }]
  },

  bindsubmit: function (e) {
    var array = new Array();
    for (var i = 0, j = 0; i < 100; ++i) {
      var value = e.detail.value[i];
      if (value != "") {
        array[j] = value;
        ++j;
      }
    }
    var sum = 0, length = array.length;
    for (var i = 0; i < length; ++i) {
      sum = Number(sum) + Number(array[i]);
    }
    
    var newResult = this.data.result;
    var average = sum / array.length;
    newResult[0].num = average;

    this.setData({ result: newResult })
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