// pages/annuity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pv: -1,
    c: -1,
    i: -1,
    n: -1,
    fv: -1,
    resultTitle: 'Unknown',
    resultValue: 0
  },

  name: ['现值', '每期金额', '折现率', '期数', '面值'],

  bindKeyPVInput: function (e) {
    this.setData({
      pv: parseFloat(e.detail.value) 
    })
  },

  bindKeyCInput: function (e) {
    this.setData({
      c: parseFloat(e.detail.value)
    })
  },
  bindKeyInterestInput: function (e) {
    this.setData({
      i: parseFloat(e.detail.value)
    })
  },

  bindKeyNInput: function (e) {
    this.setData({
      n: parseFloat(e.detail.value)
    })
  },
  bindKeyFVInput: function (e) {
    this.setData({
      fv: parseFloat(e.detail.value)
    })
  },

  calBtn: function (e) {
    var inputValue = [this.data.pv, this.data.c, this.data.i, this.data.n, this.data.fv]
    let empty = 0; //记录未填写数值项目的数量，只能为1
    let i = 0, index = -1; //index时待求项目的序号
    for(i = 0; i < 5; i++){
      if(inputValue[i] < 0) {
        empty++;
        index = i;
      } 
    }
    
    if(empty != 1) {
      this.setData({
        resultTitle: '请重新输入'
      })
      this.setData({
        resultValue: 0
      })
      // return false;
      this.setData({
        pv: -1
      })
      this.setData({
        c: -1
      })
      this.setData({
        i: -1
      })
      this.setData({
        n: -1
      })
      this.setData({
        fv: -1
      })
    }
    else{
      switch (index) {
        case 0: 
          this.setData({
            resultTitle: this.name[index] //现值
          })
          var pv = 0, n = this.data.n, int = this.data.i, c = this.data.c, fv = this.data.fv;
          for( i = 1; i <= n; i++) {
            pv = pv + c/Math.pow(1 + int, i);
          }
          pv = pv + fv / Math.pow(1 + int, n);
          this.setData({
            resultValue: pv.toFixed(4)//保留四位小数
          })
          break;
        case 1:
          this.setData({
            resultTitle: this.name[index] //每期金额
          })
          var c = 0, pv = this.data.pv, int = this.data.i, fv = this.data.fv, n = this.data.n;
          c = ( pv * Math.pow(1+int, n) * int - fv *int ) / ( Math.pow( 1+int, n ) - 1 )
          this.setData({
            resultValue: c.toFixed(4)//保留四位小数
          })
          break;
        case 2:
          this.setData({
            resultTitle: this.name[index] //折现率
          })
          var int = 0.1, delta = 0, pv = this.data.pv, c = this.data.c, fv = this.data.fv, n = this.data.n, most = 500, last_delta = 0, last_int = 0;//最多循环500次,[5%，15%]之间
          var find = false;
          while(most > 0){
            if (most != 500) last_delta = delta;
            delta = calPV(c, int, n, fv) - pv;
            if (Math.abs(delta) <= 0.1) {
              this.setData({
                resultValue: int.toFixed(4)
              })
              find = true;
              break;
            }
            else{
              if (last_delta * delta < 0) {
                if (Math.abs(last_delta) > Math.abs(delta)) {
                  this.setData({
                    resultValue: int.toFixed(4)
                  })
                } else {
                  this.setData({
                    resultValue: last_int.toFixed(4)
                  })
                }
                find = true;
                break;
              }
              last_int = int;
              if(delta < 0) {
                int = int - 0.0001;
                most--;
                continue;
              }
              else{
                int = int + 0.0001;
                most--;
                continue;
              }
            }
          }
          if(!find){
            this.setData({
              resultValue: 'Not Find.'
            })
          }
          break;
        case 3:
          this.setData({
            resultTitle: this.name[index] //期数
          })
          var int = this.data.i, delta = 0, pv = this.data.pv, c = this.data.c, fv = this.data.fv, n = 1, most = 20;//最多循环10次
          var find = false;
          while (most) {
            delta = calPV(c, int, n, fv) - pv;
            if (Math.abs(delta) <= 0.1) {
              this.setData({
                resultValue: n.toFixed(0)
              })
              find = true;
              break;
            }
            else {
              n = n + 1;
              most--;
              continue;  
            }
          }
          if (!find) {
            this.setData({
              resultValue: 'Not Find.'
            })
          }
          break;
        case 4:
          this.setData({
            resultTitle: this.name[index] //面值
          })  
          var c = this.data.c, pv = this.data.pv, int = this.data.i, fv = 0, n = this.data.n;
          fv = pv * Math.pow(1 + int, n) - c * (Math.pow(1 + int, n) - 1) / int;
          this.setData({
            resultValue: fv.toFixed(4)//保留四位小数
          })
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

function calPV(c, int, n, fv) {
  var pv = 0;
  for (var i = 1; i <= n; i++) {
    pv = pv + c / Math.pow(1 + int, i);
  }
  pv = pv + fv / Math.pow(1 + int, n);
  pv = parseFloat(pv.toFixed(5));
  return pv;
}