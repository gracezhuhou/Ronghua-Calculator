// pages/statistic/statistic.js
var doRegress = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result_x: [
      { name: "个数", num: "" },
      { name: "平均值", num: "" },
      { name: "中位数", num: "" },
      { name: "方差", num: "" },
      { name: "标准差", num: "" }],
    result_y: [
      { name: "个数", num: "" },
      { name: "平均值", num: "" },
      { name: "中位数", num: "" },
      { name: "方差", num: "" },
      { name: "标准差", num: "" }],
    formular: "y = ax + b",
    regression: [
      { variable: "a", num: "" },
      { variable: "b", num: "" },
      { variable: "r", num: "" }],
    alert: "输入时请用“,”分隔数字"
  },

  bindsubmit: function (e) {
    this.setData({ alert: "输入时请用“,”分隔数字" });
    var newResult_x = this.data.result_x, length_x = newResult_x.length,
      newResult_y = this.data.result_y, length_y = newResult_y.length,
      newRegresion = this.data.regression, length_r = newRegresion.length;

    for (var i = 0; i < length_x; ++i) {
      newResult_x[i].num = "";
    }
    for (var i = 0; i < length_y; ++i) {
      newResult_y[i].num = "";
    }
    for (var i = 0; i < length_r; ++i) {
      newRegresion[i].num = "";
    }
    this.setData({
      result_x: newResult_x,
      result_y: newResult_y,
      regression: newRegresion
    });

    // 将输入的值赋给array
    var array_x = new Array(), array_y = new Array();
    array_x = getValue(e.detail.value.input_x);
    array_y = getValue(e.detail.value.input_y);
    if (array_x == null) {
      this.setData({ alert: "输入含非法字符" });
      ;
      return;
    }
    if (array_y == null) {
      this.setData({ alert: "输入含非法字符" });
      return;
    }

    var length_x = array_x.length, length_y = array_y.length;

    // 求和
    var sum_x = getSum(array_x), sum_y = getSum(array_y);

    // 排序
    array_x = getSorted(array_x);
    array_y = getSorted(array_y);

    var newResult_x = this.data.result_x;
    var newResult_y = this.data.result_y;
    // 个数
    newResult_x[0].num = length_x;
    newResult_y[0].num = length_y;
    // 平均值
    var average_x = sum_x / length_x, average_y = sum_y / length_y;
    newResult_x[1].num = average_x;
    newResult_y[1].num = average_y;
    // 中位数
    var mid_x = length_x / 2, mid_y = length_y / 2, median_x, median_y;
    if (length_x % 2 == 0)
      median_x = (Number(array_x[mid_x - 1]) + Number(array_x[mid_x])) / 2;
    else
      median_x = array_x[mid_x - 0.5];
    newResult_x[2].num = median_x;
    if (length_y % 2 == 0)
      median_y = (Number(array_y[mid_y - 1]) + Number(array_y[mid_y])) / 2;
    else
      median_y = array_y[mid_y - 0.5];
    newResult_y[2].num = median_y;
    // 方差
    var variance_x = getVariance(array_x, average_x),
      variance_y = getVariance(array_y, average_y);
    newResult_x[3].num = variance_x;
    newResult_y[3].num = variance_y;
    // 标准差
    var stdDeviation_x = Math.sqrt(variance_x),
      stdDeviation_y = Math.sqrt(variance_y);
    newResult_x[4].num = stdDeviation_x;
    newResult_y[4].num = stdDeviation_y;

    // 小数点后位数
    for (var i = 0; i < newResult_x.length; ++i) {
      if ((Number(newResult_x[i].num) * 1000) % 1 != 0) {
        newResult_x[i].num = newResult_x[i].num.toFixed(3);
      }
    }
    for (var i = 0; i < newResult_y.length; ++i) {
      if ((Number(newResult_y[i].num) * 1000) % 1 != 0) {
        newResult_y[i].num = newResult_y[i].num.toFixed(3);
      }
    }

    if (length_x != 0)
      this.setData({ result_x: newResult_x });
    if (length_y != 0)
      this.setData({ result_y: newResult_y });

    if (doRegress && length_x == length_y && length_x != 0 && length_y != 0) {
    // 回归计算
      var a1 = 0, a2 = 0, a, b, r;
      for (var i = 0; i < length_x; ++i) {
        a1 = a1 + (array_x[i] - average_x) * (array_y[i] - average_y);
        a2 = a2 + (array_x[i] - average_x) * (array_x[i] - average_x);
      }
      a = (a1 / a2);
      b = average_y - a * average_x;

      // 协方差
      var average_xy = 0;
      for (var i = 0; i < length_x; ++i) {
        average_xy += array_x[i] * array_y[i];
      }
      average_xy = average_xy / length_x; 
      var cov = average_xy - average_x * average_y;
      r = (cov / Math.sqrt(variance_x * variance_y));

      var newRegression = this.data.regression;
      newRegression[0].num = a;
      newRegression[1].num = b;
      newRegression[2].num = r;

      // 小数点后位数
      for (var i = 0; i < newRegression.length; ++i) {
        if ((Number(newRegression[i].num) * 1000) % 1 != 0) {
          newRegression[i].num = newRegression[i].num.toFixed(3);
        }
      }
      this.setData({ regression: newRegression });
    }
    
  },

  // 清空表单和计算结果
  bindReset: function () {
    this.setData({ alert: "输入时请用“,”分隔数字" });
    var newResult_x = this.data.result_x, length_x = newResult_x.length,
      newResult_y = this.data.result_y, length_y = newResult_y.length,
      newRegresion = this.data.regression, length_r = newRegresion.length;
       
    for (var i = 0; i < length_x; ++i) {
      newResult_x[i].num = "";
    }
    for (var i = 0; i < length_y; ++i) {
      newResult_y[i].num = "";
    }
    for (var i = 0; i < length_r; ++i) {
      newRegresion[i].num = "";
    }
    this.setData({
      result_x: newResult_x,
      result_y: newResult_y,
      regression: newRegresion
    });
  },

  checkboxChange: function(e) {
    doRegress = !doRegress;
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

function getValue(value) {
  //var str = String(value);
  var length = value.length, array = new Array();
  for (var i = 0, j = 0; i < length; ++i) {
    var ch = value[i];
    if (("0" <= ch && ch <= "9") || ch == ".") {
      if (array[j] == undefined) {
        if (ch == ".") array[j] = "0.";
        else array[j] = ch;
      }
      else if (ch == ".") {
        var n = String(array[j]).indexOf(".");
        if (n == -1) array[j] = array[j] + ch;
        else return null;
      }
      else array[j] = array[j] + ch;
    }
    else if (ch == " ") continue;
    else if (ch == "," || ch == "，")++j;
    else {
      return null;
    }
  }
  return array;
}

//求和函数
function getSum(array) {
  var sum = 0, length = array.length;
  for (var i = 0; i < length; ++i) {
    sum = sum + Number(array[i]);
  }
  return sum;
}

function getSorted(array) {
  var length = array.length;
  for (var j = 0; j < length - 1; ++j)
    for (var i = 0; i < length - j - 1; ++i) {
      if (array[i] > array[i + 1]) {
        var temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
      }
    }
  return array;
}

function getVariance(array, average) {
  var variance = 0, length = array.length;
  for (var i = 0; i < length; ++i) {
    variance = Number(variance) + (array[i] - average) * (array[i] - average)
  }
  variance = variance / length;
  return variance;
}