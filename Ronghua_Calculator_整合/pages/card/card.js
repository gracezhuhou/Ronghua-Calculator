// pages/card/card.js
var cardNum = 4,
cardArray = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
  backArray = new Array(), backArrayIndex = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardArray1: [
      { type: "3", num: cardNum, value: 3 },
      { type: "4", num: cardNum, value: 4 },
      { type: "5", num: cardNum, value: 5 },
      { type: "6", num: cardNum, value: 6 },
      { type: "7", num: cardNum, value: 7 },
      { type: "8", num: cardNum, value: 8 },
      { type: "9", num: cardNum, value: 9 },],
    cardArray2: [
      { type: "10", num: cardNum, value: 10 },
      { type: "J", num: cardNum, value: 11 },
      { type: "Q", num: cardNum, value: 12 },
      { type: "K", num: cardNum, value: 13 },
      { type: "A", num: cardNum, value: 1 },
      { type: "2", num: cardNum, value: 2 }],
    jkNum: cardNum / 2,
    sum: 13 * cardNum + cardNum / 2,

    cardArray1_my: [
      { type: "3", num: 0, value: 3 },
      { type: "4", num: 0, value: 4 },
      { type: "5", num: 0, value: 5 },
      { type: "6", num: 0, value: 6 },
      { type: "7", num: 0, value: 7 },
      { type: "8", num: 0, value: 8 },
      { type: "9", num: 0, value: 9 },],
    cardArray2_my: [
      { type: "10", num: 0, value: 10 },
      { type: "J", num: 0, value: 11 },
      { type: "Q", num: 0, value: 12 },
      { type: "K", num: 0, value: 13 },
      { type: "A", num: 0, value: 1 },
      { type: "2", num: 0, value: 2 }],
    jkNum_my: 0,
    sum_my: 0
  },

  // 第一行
  bindLess1: function (e) {
    var newCardArray = this.data.cardArray1;
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
      this.setData({
        cardArray1: newCardArray,
        sum: this.data.sum - 1
      });
    }
    backArray[backArrayIndex] = "0" + String(index) + "0";
    ++backArrayIndex;
  },

  // 第二行
  bindLess2: function (e) {
    var newCardArray = this.data.cardArray2;
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
      this.setData({
        cardArray2: newCardArray,
        sum: this.data.sum - 1
      });
    }
    backArray[backArrayIndex] = "1" + String(index) + "0";
    ++backArrayIndex;
  },

  // 第二行 Joker
  bindLessJk: function () {
    var num = this.data.jkNum;
    if (num > 0) {
      this.setData({
        jkNum: Number(num) - 1,
        sum: this.data.sum - 1
      });
    }
    backArray[backArrayIndex] = "1" + "6" + "0";
    ++backArrayIndex;
  },

  // 第一行_自己的牌
  bindMore1_my: function (e) {
    var newCardArray_my = this.data.cardArray1_my,
      newCardArray = this.data.cardArray1;
    var id = e.target.id, index;
    if (id.length == 5) {
      index = id[4];
    }
    else {
      index = id[4] + id[5];
    }
    var num_my = newCardArray_my[index].num,
      num = newCardArray[index].num;
    if (num_my < cardNum && num > 0) {
      newCardArray_my[index].num += 1;
      newCardArray[index].num -= 1;
      this.setData({
        cardArray1: newCardArray,
        cardArray1_my: newCardArray_my,
        sum_my: this.data.sum_my + 1,
        sum: this.data.sum - 1
      });
    }
    backArray[backArrayIndex] = "2" + String(index) + "1";
    ++backArrayIndex;
  },

  // 第二行_自己的牌
  bindMore2_my: function (e) {
    var newCardArray_my = this.data.cardArray2_my,
      newCardArray = this.data.cardArray2;
    var id = e.target.id, index;
    if (id.length == 5) {
      index = id[4];
    }
    else {
      index = id[4] + id[5];
    }
    var num_my = newCardArray_my[index].num,
      num = newCardArray[index].num;
    if (num_my < cardNum && num > 0) {
      newCardArray_my[index].num += 1;
      newCardArray[index].num -= 1;
      this.setData({
        cardArray2: newCardArray,
        cardArray2_my: newCardArray_my,
        sum_my: this.data.sum_my + 1,
        sum: this.data.sum - 1
      });
    }
    backArray[backArrayIndex] = "3" + String(index) + "1";
    ++backArrayIndex;
  },

  // 第二行_自己的牌 Joker
  bindMoreJk_my: function () {
    var num_my = this.data.jkNum_my, num = this.data.jkNum;
    if (num_my < cardNum / 2 && num > 0) {
      this.setData({
        jkNum_my: num_my + 1,
        jkNum: num - 1,
        sum_my: this.data.sum_my + 1,
        sum: this.data.sum - 1
      });
    }
    backArray[backArrayIndex] = "3" + "6" + "1";
    ++backArrayIndex;
  },

  // 分析
  bindChance: function () {
    var array1 = this.data.cardArray1, array2 = this.data.cardArray2,
      array1_my = this.data.cardArray1_my, array2_my = this.data.cardArray2_my;
    
    this.setData({
      chance_double: getCard(array1, array2, 2),
      chance_double_my: getCard(array1_my, array2_my, 2),
      chance_triple: getCard(array1, array2, 3),
      chance_triple_my: getCard(array1_my, array2_my, 3),
      chance_bomb: getCard(array1, array2, 4),
      chance_bomb_my: getCard(array1_my, array2_my, 4),
      chance_straight: getStraight(array1, array2),
      chance_straight_my: getStraight(array1_my, array2_my),
    });
  },
  
  // 复原
  bindOrigin: function() {
    var array1 = this.data.cardArray1, array2 = this.data.cardArray2,
      array1_my = this.data.cardArray1_my, array2_my = this.data.cardArray2_my;
    for (var i = 0; i < 7; ++i) {
      array1[i].num = cardNum;
      array1_my[i].num = 0;
    }
    for (var i = 0; i < 6; ++i) {
      array2[i].num = cardNum;
      array2_my[i].num = 0;
    }
    this.setData({
      cardArray1: array1,
      cardArray2: array2,
      cardArray1_my: array1_my,
      cardArray2_my: array2_my,
      jkNum: cardNum / 2,
      jkNum_my: 0,
      chance_double: "",
      chance_double_my: "",
      chance_triple: "",
      chance_triple_my: "",
      chance_bomb: "",
      chance_bomb_my: "",
      chance_straight: "",
      chance_straight_my: "",
      sum: 13 * cardNum + cardNum / 2,
      sum_my: 0
    });
    backArray = new Array();
    backArrayIndex = 0;
  },

  // 撤销
  bindBack: function () {
    if (backArrayIndex == 0)  return;

    var str = backArray[backArrayIndex - 1];
    switch (str[0]) {
      case "0": {   // 第一排 加回去
        var newCardArray = this.data.cardArray1;
        newCardArray[str[1]].num += 1;
        this.setData({
          cardArray1: newCardArray,
          sum: this.data.sum + 1
        });
        --backArrayIndex;
        break;
      }
      case "1": {   // 第二排 加回去
        if (str[1] != "6") {
          var newCardArray = this.data.cardArray2;
          newCardArray[str[1]].num += 1;
          this.setData({
            cardArray2: newCardArray,
            sum: this.data.sum + 1
          });
          --backArrayIndex;
        }
        else {      // 第二排 Joker
          this.setData({
            jkNum: this.data.jkNum + 1,
            sum: this.data.sum + 1
          });
          --backArrayIndex;
        }
        break;
      }
      case "2": {   // 第三排
        if (str[2] == "1") {    // 减回去，相应第一排加回去
          var newCardArray_my = this.data.cardArray1_my,
            newCardArray = this.data.cardArray1;
          newCardArray_my[str[1]].num -= 1;
          newCardArray[str[1]].num += 1;
          this.setData({
            cardArray1: newCardArray,
            cardArray1_my: newCardArray_my,
            sum_my: this.data.sum_my - 1,
            sum: this.data.sum + 1
          })
        }
        else {                    // 加回去
          var newCardArray_my = this.data.cardArray1_my;
          newCardArray_my[str[1]].num += 1;
          this.setData({
            cardArray1_my: newCardArray_my,
            sum_my: this.data.sum_my + 1,
          })
        }
        --backArrayIndex;
        break;
      }
      case "3": {   // 第四排
        if (str[2] == "1") {    // 减回去，相应第二排加回去
          if (str[1] != "6") {
            var newCardArray_my = this.data.cardArray2_my,
              newCardArray = this.data.cardArray2;
            newCardArray_my[str[1]].num -= 1;
            newCardArray[str[1]].num += 1;
            this.setData({
              cardArray2: newCardArray,
              cardArray2_my: newCardArray_my,
              sum_my: this.data.sum_my - 1,
              sum: this.data.sum + 1
            })
          }
          else {                // Joker减回去，相应第二排加回去
            var num_my = this.data.jkNum_my, num = this.data.jkNum;
            this.setData({
              jkNum_my: num_my - 1,
              jkNum: num + 1,
              sum_my: this.data.sum_my - 1,
              sum: this.data.sum + 1
            });
          }
        }
        else {                    // 加回去
          if (str[1] != "6") {
            var newCardArray_my = this.data.cardArray2_my;
            newCardArray_my[str[1]].num += 1;
            this.setData({
              cardArray2_my: newCardArray_my,
              sum_my: this.data.sum_my + 1,
            })
          }
          else {
            var num_my = this.data.jkNum_my;
            this.setData({
              jkNum_my: num_my + 1,
              sum_my: this.data.sum_my + 1,
            });
          }
        }
        --backArrayIndex;
        break;
      }
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

// 可打的牌
function getCard(array1, array2, n) {
  var length1 = array1.length, length2 = array2.length, text = "";
  for (var i = 0; i < length1; ++i) {
    if (array1[i].num >= n) {
      text = text + String(array1[i].type) + " ";
    }
  }
  for (var i = 0; i < length2; ++i) {
    if (array2[i].num >= n) {
      text = text + String(array2[i].type) + " ";
    }
  }
  return text;
}

// 顺子
function getStraight(array1, array2) {
  var length1 = array1.length, length2 = array2.length, text = "", array = new Array();
  for (var i = 0; i < length1; ++i) {
    if (array1[i].num >= 1) array[array1[i].value] = 1;
    else array[array1[i].value] = 0;
  }
  for (var i = 0; i < length2; ++i) {
    if (array2[i].num >= 1) array[array2[i].value] = 1;
    else array[array2[i].value] = 0;
  }

  var n, k, i, j; // 计连续个数
  for (i = 1; i <= 10; i = j + 1) {
    n = 0;
    for (j = i; j <= 14; ++j) {
      if (j == 14) k = 1;
      else k = j;
      if (array[k] == 1) ++n;
      else break;
    }
    if (n >= 5) {
      if (i + n <= 14) 
        text = text + cardArray[i - 1] + "~" + cardArray[i + n - 2] + " ";
      else if (n == 14)
        text = text + cardArray[i] + "~" + cardArray[0] + " ";
      else if (i + n == 15)
        text = text + cardArray[i - 1] + "~" + cardArray[0] + " ";
      
    }
  }
  return text;
}