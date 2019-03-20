// pages/card/card.js
var cardNum = 4;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardArray: [
      { type: "A", num: cardNum },
      { type: "2", num: cardNum },
      { type: "3", num: cardNum },
      { type: "4", num: cardNum },
      { type: "5", num: cardNum },
      { type: "6", num: cardNum },
      { type: "7", num: cardNum },
      { type: "8", num: cardNum },
      { type: "9", num: cardNum },
      { type: "10", num: cardNum },
      { type: "J", num: cardNum },
      { type: "Q", num: cardNum },
      { type: "K", num: cardNum }],
    jkNum: cardNum
  },

  bindMore: function (e) {
    var newCardArray = this.data.cardArray;
    var id = e.target.id, index;
    if (id.length == 5) {
      index = id[4];
    }
    else {
      index = id[4] + id[5];
    }
    var num = newCardArray[index].num;
    if (num < cardNum) {
      newCardArray[index].num += 1;
      this.setData({ cardArray: newCardArray })
    }
  },

  bindLess: function (e) {
    var newCardArray = this.data.cardArray;
    var id = e.target.id, index;
    if (id.length == 5) {
      index = id[4];
    }
    else {
      index = id[4] + id[5];
    }
    var num = newCardArray[index].num;
    if (num > 0) {
      newCardArray[index].num -= 1;
      this.setData({ cardArray: newCardArray })
    }
  },

  bindMoreJk: function () {
    var num = this.data.jkNum;
    if (num < cardNum) {
      this.setData({ jkNum: Number(num) + 1 });
    }
  },

  bindLessJk: function () {
    var num = this.data.jkNum;
    if (num > 0) {
      this.setData({ jkNum: Number(num) - 1 });
    }
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