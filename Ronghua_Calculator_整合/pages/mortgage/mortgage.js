// pages/mortgage/mortgage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loan: -1,
    r: -1,
    n: -1,
    paymentValue: 0,
    refundValue: 0,
    interestValue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindKeyLoanInput: function (e) {
    this.setData({
      loan: parseFloat(e.detail.value) //避免数值为string型
    })
  },

  bindKeyRateInput: function (e) {
    this.setData({
      r: parseFloat(e.detail.value) //避免数值为string型
    })
  },

  bindKeyNInput: function (e) {
    this.setData({
      n: parseFloat(e.detail.value) //避免数值为string型
    })
  },

  calBtn: function (e){
    var inputValue = [this.data.loan, this.data.r, this.data.n];
    let empty = 0; //记录未填写数值项目的数量，只能为1
    let i = 0; //index时待求项目的序号
    for (i = 0; i < 3; i++) {
      if (inputValue[i] < 0) {
        empty++;
      }
    }
    if (empty != 0) {
      this.setData({
        resultTitle: '请重新输入'
      })
      this.setData({
        paymentValue: 0
      })
      this.setData({
        refundValue: 0
      })
      this.setData({
        interestValue: 0
      })
      this.setData({
        loan: -1
      })
      this.setData({
        n: -1
      })
      this.setData({
        r: -1
      })
    }
    else{
      var c = 0, pv = this.data.loan, int = this.data.r, fv = 0, n = this.data.n;
      c = (pv * Math.pow(1 + int, n) * int - fv * int) / (Math.pow(1 + int, n) - 1)
      this.setData({
        paymentValue: c.toFixed(4)//保留四位小数
      })
      var total = this.data.paymentValue * n;
      var iTotal = total - this.data.loan;
      this.setData({
        refundValue: total.toFixed(4)
      })
      this.setData({
        interestValue: iTotal.toFixed(4)
      })
    }  
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