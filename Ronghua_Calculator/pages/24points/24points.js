// pages/24points/24points.js
var formular = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    outputFormular: "",
  },

  bindsubmit: function(e) {
    getFormular(e.detail.value);
    this.setData({ outputFormular: formular })
  },

  // 清空
  bindReset: function () {
    this.setData({ outputFormular: "" })
  },

  // 给用户四个随机数（1-10）用于计算24点
  inputRandomNum: function() {
    this.setData({
      inputValue1: getRandomNum(1, 10),
      inputValue2: getRandomNum(1, 10),
      inputValue3: getRandomNum(1, 10),
      inputValue4: getRandomNum(1, 10)
    })
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

//计算能得出24点的公式
function getFormular(value) {
  var array = new Array(value.value1, value.value2, value.value3, value.value4);
  calFormular(array);
}


//从min和max之间产生一个随机数
function getRandomNum(min, max) {
  var total = max - min + 1;
  return Math.floor(Math.random() * total) + min;
}

function calFormular(array) {
  for (var i = 0; i < 4; ++i) {
    for (var j = 0; j < 4 && i != j; ++j) {
      for (var k = 0; k == i || k == j; ++k);
      var l = 6 - i - j - k;
      var subArray = new Array(array[k], array[l]);
      var num = 0;

      formular = "(" + array[i] + " + " + array[j] + ")"; 
      num = Number(array[i]) + Number(array[j]);
      if (calFormular_sub(subArray, num)) return;
      
      formular = "(" + array[i] + " - " + array[j] + ")";
      num = array[i] - array[j];
      if (calFormular_sub(subArray, num)) return;
      
      formular = "(" + array[i] + " * " + array[j] + ")";
      num = array[i] * array[j];
      if (calFormular_sub(subArray, num)) return;
      
      formular = "(" + array[i] + " / " + array[j] + ")";
      num = array[i] / array[j];
      if (calFormular_sub(subArray, num)) return;
    }
  }
  formular = "无解";
}

function calFormular_sub(array, num3) {
  var numA, numB, num1, num2, formular2, fml = formular;

  for (var i = 0; i < 2; ++i) {
    num1 = array[1 - i];
    num2 = array[i];

    numA = num1;
    numB = Number(num2) + Number(num3);
    formular = "(" + fml + " + " + num2 + ")";
    if (canGetFormular(numA, numB, numA)) return true;

    numB = num2 * num3;
    formular = "(" + fml + " * " + num2 + ")";
    if (canGetFormular(numA, numB, numA)) return true;

    numB = num3 - num2;
    formular = "(" + fml + " - " + num2 + ")";
    if (canGetFormular(numA, numB, numA)) return true;

    numB = num2 - num3;
    formular = "(" + num2 + " - " + fml + ")";
    if (canGetFormular(numA, numB, numA)) return true;

    numB = num3 / num2;
    formular = "(" + fml + " / " + num2 + ")";
    if (canGetFormular(numA, numB, numA)) return true;

    numB = num2 / num3;
    formular = "(" + num2 + " / " + fml + ")";
    if (canGetFormular(numA, numB, numA)) return true;
  
  
    numB = num3;
    numA = Number(num1) + Number(num2);
    formular = fml;
    formular2 = "(" + num1 + " + " + num2 + ")";
    if (canGetFormular(numA, numB, formular2)) return true;

    numA = num1 - num2;
    formular2 = "(" + num1 + " - " + num2 + ")";
    if (canGetFormular(numA, numB, formular2)) return true;

    numA = num1 * num2;
    formular2 = "(" + num1 + " * " + num2 + ")";
    if (canGetFormular(numA, numB, formular2)) return true;

    numA = num1 / num2;
    formular2 = "(" + num1 + " / " + num2 + ")";
    if (canGetFormular(numA, numB, formular2)) return true;
  }
}

function canGetFormular(num1, num2, formular2) {
  var flag = true;
  if (Number(num1) + Number(num2) == 24) formular = formular2 + " + " + formular;
  else if (num1 - num2 == 24) formular = formular2 + " - " + formular;
  else if (num2 - num1 == 24) formular = formular + " - " + formular2;
  else if (num1 * num2 == 24) formular = formular2 + " * " + formular;
  else if (num1 / num2 == 24) formular = formular2 + " / " + formular;
  else if (num2 / num1 == 24) formular = formular + " / " + formular2;
  else flag = false;
  return flag;
}