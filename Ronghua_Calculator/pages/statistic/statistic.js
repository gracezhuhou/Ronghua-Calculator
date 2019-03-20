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
      { name: "方差", num: "" },
      { name: "标准差", num: "" }]
  },

  bindsubmit: function (e) {
    // 将输入的值赋给array
    var array = new Array();
    for (var i = 0, j = 0; i < 100; ++i) {
      var value = e.detail.value[i];
      if (value != "") {
        array[j] = value;
        ++j;
      }
    }
    // 求和
    var sum = 0, length = array.length;
    for (var i = 0; i < length; ++i) {
      sum = Number(sum) + Number(array[i]);
    }
    // 排序
    for (var j = 0; j < length - 1; ++j)
      for (var i = 0; i < length - j - 1; ++i) {
        if (array[i] > array[i + 1]) {
          var temp = array[i];
          array[i] = array[i + 1];
          array[i + 1] = temp;
        }
      }
    
    var newResult = this.data.result;
    // 平均值
    var average = sum / length;
    newResult[0].num = average;
    // 中位数
    var mid = length / 2, median;
    if (length % 2 == 0)
      median = (Number(array[mid - 1]) + Number(array[mid])) / 2;
    else
      median = array[mid - 0.5];
    newResult[1].num = median;
    // 方差
    var variance = 0;
    for (var i = 0; i< length; ++i) {
      variance = Number(variance) + (array[i] - average) * (array[i] - average)
    }
    variance = variance / length;
    var variance2 = variance.toFixed(4);
    newResult[2].num = variance2;
    // 标准差
    var stdDeviation = Math.sqrt(variance);
    var stdDeviation2 = stdDeviation.toFixed(4);
    newResult[3].num = stdDeviation2;

    this.setData({ result: newResult })
  },

  bindReset: function () {
    var newResult = this.data.result;
    for (var i = 0; i < newResult.length; ++i) {
      newResult[i].num = "";
    }
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