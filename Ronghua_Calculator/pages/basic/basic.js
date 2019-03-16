// pages/basic/basic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formular: "",
  },

  bindTap_clear: function() {
    this.setData({
      formular: "",
      result: ""
    })
  },

  bindTap_delete: function () {
    var len = this.data.formular.length;
    this.setData({
      formular: this.data.formular.substring(0, len - 1)
    })
  },

  bindTap_percent: function () {
    this.setData({ formular: this.data.formular + "%" })
  },

  bindTap_divide: function () {
    this.setData({ formular: this.data.formular + "÷" })
  },

  bindTap_seven: function() {
    this.setData({ formular: this.data.formular + 7 })
  },

  bindTap_eight: function () {
    this.setData({ formular: this.data.formular + 8 })
  },

  bindTap_nine: function () {
    this.setData({ formular: this.data.formular + 9 })
  },

  bindTap_multiply: function () {
    this.setData({ formular: this.data.formular + "×" })
  },

  bindTap_four: function () {
    this.setData({ formular: this.data.formular + 4 })
  },

  bindTap_five: function () {
    this.setData({ formular: this.data.formular + 5 })
  },

  bindTap_six: function () {
    this.setData({ formular: this.data.formular + 6 })
  },

  bindTap_minus: function () {
    this.setData({ formular: this.data.formular + "-" })
  },

  bindTap_one: function () {
    this.setData({ formular: this.data.formular + 1 })
  },

  bindTap_two: function () {
    this.setData({ formular: this.data.formular + 2 })
  },

  bindTap_three: function () {
    this.setData({ formular: this.data.formular + 3 })
  },

  bindTap_add: function () {
    this.setData({ formular: this.data.formular + "+" })
  },

  bindTap_zero: function () {
    this.setData({ formular: this.data.formular + 0 })
  },

  bindTap_point: function () {
    this.setData({ formular: this.data.formular + "." })
  },

  bindTap_Ans: function () {
    this.setData({ formular: this.data.formular + "Ans" })
  },

  bindTap_equal: function () {
    this.setData({ result: calculate(this.data.formular) })
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

function calculate(formular) {
 
 

  return formular[0];
}
