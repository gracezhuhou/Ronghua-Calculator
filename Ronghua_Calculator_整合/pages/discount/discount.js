// pages/discount/discount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cfArray:[],
    i: -1,
    npv: -1,
    resultTitle: 'Unknown',
    resultValue: 0
  },
  name: ['折现率(内部收益率)', '(净)现值'],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindKeyCFInput: function (e) {
    var originalStr = e.detail.value, tmpArr = [];
    tmpArr = originalStr.split(",");//输入现金流以逗号分隔
    this.setData({
      cfArray: tmpArr
    })
  },

  bindKeyInterestInput: function (e) {
    this.setData({
      i: parseFloat(e.detail.value) //避免数值为string型
    })
  },

  bindKeyNPVInput: function (e) {
    this.setData({
      npv: parseFloat(e.detail.value) 
    })
  },

  calBtn: function(e) {
    var inputValue = [this.data.i, this.data.npv]; //"="写成":"报错
    let empty = 0; //记录未填写数值项目的数量，只能为1
    let i = 0, index = -1; //index时待求项目的序号
    for (i = 0; i < 2; i++) {
      if (inputValue[i] < 0) {
        empty++;
        index = i;
      }
    }   
    if (empty != 1 || this.data.cfArray.length == 0) {
      this.setData({
        resultTitle: '请重新输入'
      })
      this.setData({
        resultValue: 0
      })
      this.setData({
        i: -1
      })
      this.setData({
        npv: -1
      })
      this.setData({
        cfArray: []
      })
    }  
    else{
      switch (index) {
        case 0:
          this.setData({
            resultTitle: this.name[index] //折现率(内部收益率)
          })
          var npv = this.data.npv, delta = 0, int = 0.0828, most = 500, find = false, cfArray = this.data.cfArray, last_delta = 0, last_int = 0;
          while(most > 0){
            if(most != 500) last_delta = delta;
            delta = calNPV(cfArray, int) - npv;
            if (Math.abs(delta) <= 0.1) {
              this.setData({
                resultValue: int.toFixed(4)
              })
              find = true;
              break;
            }
            else {
              if(last_delta * delta < 0){
                if(Math.abs(last_delta) > Math.abs(delta)){
                  this.setData({
                    resultValue: int.toFixed(4)
                  })
                }else{
                  this.setData({
                    resultValue: last_int.toFixed(4)
                  })
                }
                find = true;
                break;
              }
              last_int = int;
              if (delta < 0) {
                int = int - 0.0001;
                most--;
                continue;
              }
              else {
                int = int + 0.0001;
                most--;
                continue;
              }
            }
          }
          if (!find) {
            this.setData({
              resultValue: 'Not Find.'
            })
          }
          break;
        case 1:
          this.setData({
            resultTitle: this.name[index] //(净)现值
          })
          var cfArray = this.data.cfArray, int = this.data.i, npv = 0;
          npv = calNPV(cfArray, int);
          this.setData({
            resultValue: npv.toFixed(4)//保留四位小数
          })
          break;
      }
    }
  },

  clrBtn: function (e){
    this.setData({
      resultTitle: 'Unknown'
    })
    this.setData({
      resultValue: 0
    })
    this.setData({
      i: -1
    })
    this.setData({
      npv: -1
    })
    this.setData({
      cfArray: []
    })
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

function calNPV(cfArray, int) {
  var npv = 0, c = 0;
  for (var i = 0; i < cfArray.length; i++) {
    c = parseFloat(cfArray[i]); 
    npv = npv + c / Math.pow(1 + int, i);
    npv = parseFloat(npv.toFixed(5));
  }
  return npv;
}