// pages/basic/basic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formular: "",
    result: "",
    bracket: 0//半个括号出现次数
  },

  bindTap_clear: function() {
    this.setData({
      formular: "",
      result: "",
      bracket: 0//半个括号出现次数
    })
  },

  bindTap_delete: function () {
    // var len = this.data.result.length;
    var tmp = String(this.data.result);

    this.setData({
      // result: this.data.result.substring(0, this.data.result.length - 1) //报错：this.data.result.substring is not a function
      result: tmp.substring(0, tmp.length - 1)
    })
  },

  bindTap_percent: function () {
    this.setData({ result: this.data.result + "%" })
  },

  bindTap_divide: function () {
    this.setData({ result: this.data.result + "÷" })
  },

  bindTap_seven: function() {
    this.setData({ result: this.data.result + 7 })
  },

  bindTap_eight: function () {
    this.setData({ result: this.data.result + 8 })
  },

  bindTap_nine: function () {
    this.setData({ result: this.data.result + 9 })
  },

  bindTap_multiply: function () {
    this.setData({ result: this.data.result + "×" })
  },

  bindTap_four: function () {
    this.setData({ result: this.data.result + 4 })
  },

  bindTap_five: function () {
    this.setData({ result: this.data.result + 5 })
  },

  bindTap_six: function () {
    this.setData({ result: this.data.result + 6 })
  },

  bindTap_minus: function () {
    this.setData({ result: this.data.result + "-" })
  },

  bindTap_one: function () {
    this.setData({ result: this.data.result + 1 })
  },

  bindTap_two: function () {
    this.setData({ result: this.data.result + 2 })
  },

  bindTap_three: function () {
    this.setData({ result: this.data.result + 3 })
  },

  bindTap_add: function () {
    this.setData({ result: this.data.result + "+" })
  },

  bindTap_zero: function () {
    this.setData({ result: this.data.result + 0 })
  },

  bindTap_point: function () {
    this.setData({ result: this.data.result + "." })
  },

  bindTap_bracket: function () {
    if(this.data.bracket == 0){
      this.setData({result: this.data.result + "("});
      this.setData({bracket: this.data.bracket + 1});
    }
    else{
      this.setData({ result: this.data.result + ")" });
      this.setData({ bracket: 0 });
    }
  },

  bindTap_equal: function () {
    var str = this.data.result;
    this.setData({ result: calculate(str) })
    this.setData({ formular: str + "="})
  },

  bindTap_power: function() {
    this.setData({
      result: this.data.result + "^"
    })
  },

  bindTap_factorial: function () {
    this.setData({
      result: this.data.result + "!"//阶乘
    })
  },

  bindTap_sqrt: function () {
    this.setData({
      result: this.data.result + "^0.5"//开平方根
    })
  },

  bindTap_square: function () {
    this.setData({
      result: this.data.result + "^2"
    })
  },

  bindTap_exp: function () {
    this.setData({
      result: this.data.result + "e^"
    })
  },

  bindTap_pm: function () {
    var result = this.data.result;
    var i = result.length - 1, head = 0;
    for(; i >= 0; i--){
      if(isDigital(result[i])){
        head = i; continue;
      }
      else break;
    }
    var s = this.data.result.substring(0, head);
    var num = this.data.result.substring(head);
    var r = s + "(-" + num + ")";
    this.setData({
      result: r
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

function calculate(formular) {
  // var arr = formular.split(/\+\-×÷\(\)/); //将string转为数组
  var arr = split(formular);//将string转为数组
  var result = [];
  var stack = new Stack();
  result = transform(arr);
  var error = false;//记录运算是否规范
  for (var i = 0; i < result.length; i++) {
    if(error) break;
    var symbol = result[i];
    if (isDigital(symbol)) { //数字直接入栈
      if(symbol == "e") 
        stack.push(symbol);
      else if(symbol[symbol.length - 1]=="%"){
        symbol = symbol.substring(0, symbol.length - 1)
        stack.push(parseFloat(symbol)/100);
      }else{
          stack.push(parseFloat(symbol));
      }
    } else { // 处理操作符
      var num1, num2, ans;
      switch (symbol) {
        case "+":
          num1 = stack.pop(); //取出两个数
          num2 = stack.pop();
          ans = parseFloat((num2 + num1).toFixed(6));
          stack.push(ans);
          break;
        case "-":
          num1 = stack.pop(); //取出两个数
          num2 = stack.pop();
          if (typeof(num2) == "number" ){
            // stack.push(num2 - num1);
            ans = parseFloat((num2 - num1).toFixed(6));
            stack.push(ans);
          }
          else{
            // stack.push(0 - num1);
            ans = parseFloat((0 - num1).toFixed(6));
            stack.push(ans);
          }
          break;
        case "×":
          num1 = stack.pop(); //取出两个数
          num2 = stack.pop();
          // stack.push(num2 * num1);
          ans = parseFloat((num2 * num1).toFixed(6));
          stack.push(ans);
          break;
        case "÷":
          num1 = stack.pop(); //取出两个数
          num2 = stack.pop();
          if (num1 == 0){
            stack.push("除数不能为0，请重新输入");
            error = true;
            break;
          }
          // stack.push(num2 / num1);
          ans = parseFloat((num2 / num1).toFixed(6));
          stack.push(ans);
          break;
        case "^":
          num1 = stack.pop(); //取出两个数
          num2 = stack.pop();
          if(num2 == "e"){
            // stack.push(Math.exp(num1));
            ans = parseFloat((Math.exp(num1)).toFixed(6));
            stack.push(ans);
          }
          else{
            // stack.push(Math.pow(num2,num1));
            ans = parseFloat((Math.pow(num2,num1)).toFixed(6));
            stack.push(ans);
          }
          break;
        case "!":
          var num = stack.pop(); //取出一个数
          if(num < 0){
            stack.push("无法计算负数阶乘，请重新输入");
            error = true;
            break;
          }
          var n = num, tmp = 1; 
          // for(var i = 0; i < n - 1; i++ ){
          //   if(n > 1)
          //     tmp = tmp * (num--);
          //   else{
          //     tmp = 1;
          //     break;
          //   } 
          // }
          if(n > 1){
            for(var j = 0; j < n; j++){
              tmp = tmp * (num--);
            }
          }
          else{
            tmp = 1;
          }
          stack.push(tmp);
          break;
        default:
          break;
      }
    }
  }
  return String(stack.pop());

  // return formular[0];
}

/*使用栈stack类的实现*/
function Stack() {
  this.dataStore = [];//保存栈内元素，初始化为一个空数组
  // this.top = 0;//栈顶位置，初始化为0
  // this.push = push;//入栈
  // this.pop = pop;//出栈
  // this.peek = peek;//查看栈顶元素
  // this.clear = clear;//清空栈
  // this.length = length;//栈内存放元素的个数
  // this.isEmpty = true;
}

Stack.prototype = {
  constructor: Stack,
  push: function (element) {
    this.dataStore.push(element)
  },
  pop: function () {
    return this.dataStore.pop()
  },
  peek: function () {
    return this.dataStore[this.dataStore.length - 1];
  },
  length: function () {
    return this.dataStore.length;
  },
  clear: function () {
    this.dataStore.length = 0;
  },
  isEmpty: function() {
    if(this.dataStore.length > 0) return false;
    else return true;
  }
};

// function isEmpty() {
//   if(this.dataStore.length > 0) return false;
//   else return true;
// }
// function push(element) {
//   this.dataStore[this.top++] = element;
// }

// function pop() {
//   return this.dataStore[--this.top];
// }

// function peek() {
//   return this.dataStore[this.top - 1];
// }

// function clear() {
//   this.top = 0;
// }

// function length() {
//   return this.top;
// }
function split(formular){
  var arr=[];
  var head = 0, right_bracket = 0;
  for(var i = 0; i < formular.length; i++){
    // if (formular[i] == "e") formular[i] = "2.7182818285";
    if (formular.substring(i, i + 2) == "(-") {
      for (right_bracket = i + 2; i < formular.length; right_bracket++) {
        if (formular[right_bracket] != ")") continue;
        else break;
      }
      var num = formular.substring(i + 1, right_bracket);
      arr.push(num);
      i = right_bracket;
      head = right_bracket + 1;
      continue;
    }
    if (isDigital(formular[i])){
      if(i == formular.length - 1) {
        arr.push(formular.substring(head));
      }
      else
        continue;
    }
    else{
      // if(formular)
      arr.push(formular.substring(head, i));//数字
      arr.push(formular.substring(i, i+1));//运算符
      head = i + 1;
    }
  }
  return arr;
}

function transform(arrayList){//改中序为后序；将特殊运算转为数值
  var stack = new Stack();
  var result = [];
  for (var index = 0; index < arrayList.length ; index++) {
    var symbol = arrayList[index];
    if(symbol.trim().length == 0) continue;
    if (isDigital(symbol)) { //如果是数字直接输出
      result.push(symbol);
      // var tmp = symbol[symbol.length - 1];
      // if(tmp >= "0" && tmp <="9"){
      //   var prefix = symbol[0];
      //   if(prefix >= "0" && prefix <= "9")
      //     result.push(symbol);//加入数值
      //   else{
      //     switch(prefix){
      //       case "√": 
      //         var num = Math.sqrt(parseFloat(symbol.substring(1)));
      //         result.push(num);
      //         break;
      //     }
      //   }
      // }
      // switch(tmp){
      //   case "%": //末尾为%,处理百分数
      //     result.push(parseFloat(symbol.substring(0, symbol.length - 1)) / 100); 
      //     break;
      //   case "!": //末尾为!，计算阶乘
      //     var num =  parseFloat(symbol.substring(0, symbol.length - 1)) , tmp = 1;
      //     var n = num; 
      //     for(var i = 0; i < n - 1; i++ ){
      //       if(n > 1)
      //         tmp = tmp * (num--);
      //       else{
      //         tmp = 1;
      //         break;
      //       } 
      //     }
      //     result.push(tmp);
      //     break;
      // }
    } else if (symbol == ")") {
               var tmp;
                while ((tmp = stack.pop()) != "(") { // 匹配成功后停止
                     result.push(tmp);
                 }
            } 
            else {
               if (stack.isEmpty()) {
               stack.push(symbol);
                continue;
                }
               var tmp = stack.peek();
              while (outPriority(symbol) <= inPriority(tmp)) { //优先级小于栈内优先级，一直出栈
                   result.push(tmp);
                    stack.pop();
                   if (stack.length() <= 0) {
                   break;
                    }    
                   tmp = stack.peek();
                }
                 stack.push(symbol);
              }
    }
  //将剩余的出栈
  while (stack.length() > 0) {
    result.push(stack.pop());
  }
  return result;
}

function isDigital(symbol) {
  // return !symbol.equals("+") && !symbol.equals("-")
  //   && !symbol.equals("*") && !symbol.equals("/")
  //   && !symbol.equals("(") && !symbol.equals(")");
  if (symbol != "+" && symbol != "-" && symbol != "×" && symbol != "÷" && symbol != "(" && symbol != ")" && symbol != "^" && symbol != "!") 
    return true;
  else return false;
}

function outPriority(ch) {
  switch (ch) {
    case "+":
    case "-":
      return 2;
    case "×":
    case "÷":
      return 4;
    case "!":
      return 6;
    case "^":
      return 8;
    case ")":
      return 1;
    case "(":
      return 10;
    default:
      return 0;
  }
}

function inPriority(ch) {
  switch (ch) {
    case "+":
    case "-":
      return 3;
    case "×":
    case "÷":
      return 5;
    case "!":
      return 7;
    case "^":
      return 9;
    case ")":
      return 10;
    case "(":
      return 1;
    default:
      return 0;
  }
}