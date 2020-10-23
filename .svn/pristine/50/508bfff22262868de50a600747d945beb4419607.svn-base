<template>
  <!-- 退款页面修改页面 -->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    title="退货单详情"
    width="700px"
  >
    <div class="centerBigBox">
      <div class="certerTop">

        <section>
          <p>
           <span>
             订单号：
             <i></i>
           </span>
            <span style="width: auto">{{orderNum}}</span>
          </p>
          <p>
           <span>
             退款类型：
             <i></i>
           </span>
            <label style="width: 8rem">
              <template>
                <el-select v-model="value" placeholder="请选择" style="width: 8rem;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" @click.native="refundNumber()">
                  </el-option>
                </el-select>
              </template>
            </label>
          </p>

        </section>
        <section>
          <p>
        <span>
                     订单属性：
                     <i></i>
                   </span>
            <i>{{this.orderProperty}}</i>
          </p>
          <p>
        <span>
                     退款金额：
                     <i></i>
                   </span>
            <i>{{backMoney}}</i>
          </p>
        </section>
        <section>
          <p>
        <span>
                 用户电话：
                 <i></i>
               </span>
            <i>{{orderDetails1.mobile}}</i>
          </p>
          <p>
        <span>
                     用户昵称：
                     <i></i>
                   </span>
            <i>{{orderDetails1.nickname}}</i>
          </p>
        </section>
        <section>
          <p>
        <span>
                 总金额：
                 <i></i>
               </span>
            <i>{{orderDetails1.sumPrice}}</i>
          </p>
          <p>
        <span>
                     订单价值：
                     <i></i>
                   </span>
            <!--        &lt;!&ndash;            没有写&ndash;&gt;-->
            <i>{{orderDetails1.price}}</i>
          </p>
        </section>
        <section>
          <p>
        <span>
                 快递费用：
                 <i></i>
               </span>
            <i>{{orderDetails1.freight}}</i>
          </p>
          <p>
        <span>
                     退款时间：
                     <i></i>
                   </span>
            <!--        &lt;!&ndash;            没有写&ndash;&gt;-->
            <i>{{orderDetails1.updateTime}}</i>
          </p>
        </section>
        <section>
          <p>
        <span>
                 快递公司：
                 <i></i>
               </span>
            <i>{{trackingCompany}}</i>
          </p>
          <p>
        <span>
                 快递单号：
                 <i></i>
               </span>
            <i>{{trackingNum}}</i>
          </p>

        </section>
        <section>
          <p>
        <span>
             关系人：
             <i></i>
           </span>
            <i>{{orderDetails1.doctorName}}</i>
          </p>
          <p>
        <span>
             关系人收益：
             <i></i>
           </span>
            <i>{{orderDetails1.relationEarnings}}</i>
          </p>

        </section>

        <section v-if="orderDetails1.serviceEarnings">
          <p>
        <span>
                 服务商区域：
                 <i></i>
               </span>
            <i>{{orderDetails1.agentAddress}}</i>
          </p>
          <p>
        <span>
                 服务商收益：
                 <i></i>
               </span>
            <span>{{orderDetails1.serviceEarnings}}</span>
          </p>
        </section>
        <section>
          <p>
        <span>
                     购买时间
                     ：
                     <i></i>
                   </span>
            <i>{{orderDetails1.createTime}}</i>
          </p>
        </section>
        <section>
          <p style="width: 100%">
        <span style="">
                     收货地址：
                     <i></i>
                   </span>
            <i style="display: inline-block; width: auto">{{orderDetails1.userAddress}}</i>
          </p>
        </section>
      </div>
      <div class="remark">
        <p>订单备注</p>
        <div class="remarkCenter">{{orderDetails1.remark}}</div>
      </div>
      <div class="order">
        <p>订单药品</p>
        <div class="orderCenter">
          <div :key="index" class="orderCenterBox" v-for="(item,index) in orderDetails1.list">
            <section>
              <div class="orderLeft">
                <img :src="/,/.test(item.url)? item.url.split(',')[0]:item.url" alt/>
              </div>
              <div class="orderRigth">
                <section style="overflow: hidden">{{item.productName}}</section>
                <section class="little">{{item.modelName}}</section>
                <section class="little">价格{{item.price}}
                </section>
                <section class="little" style=" line-height: 36px;"> 数量&nbsp;*&nbsp;
                  <span v-if='shouldNot'>{{item.count}}</span>
                  <el-input-number v-model="item.count" @change="handleChange" :min="1" :max="item.countMax"
                                   label="描述文字" v-show="inputNumber" size="mini" class="inpBox"></el-input-number>
                </section>
                <section>
                  <button class="btn_del" v-if="inputNumber"><i class="el-icon-delete" @click="btnDel(index)"></i>
                  </button>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
    <el-popover
      placement="top"
      v-model="visibleNew"
      width="160">
 <p>你确定要发起退款吗？</p>
 <div style="text-align: right; margin: 0">
   <el-button @click="visibleNew = false" size="mini" type="text">取消</el-button>
   <el-button @click="overtime()" size="mini" type="danger">确定</el-button>
 </div>
 <el-button slot="reference" type="danger">发起退款</el-button>
</el-popover>
     <el-button @click="visible = false">取消</el-button>
   </span>
  </el-dialog>
</template>

<script>

  export default {
    data () {
      return {
        shouldNot: true,
        inputNumber: false, //是否可以修改数字
        backMoney: 0,
        arreyEnd: [],
        options: [{
          value: 1,
          label: '全额退款'
        }, {
          value: 2,
          label: '部分退款'
        },],
        value: 1,
        visibleNew: false,
        visible: true,
        orderDetails1: '',
        orderProperty: '',
        status: '',
        orderNum: '',
        deliverWay: '',
        trackingCompany: '',
        trackingNum: '',
        orderDetails: {
          list: [],
        },
        orderId: ''
      }
    },
    methods: {
      handleChange (value) { //点击变化
      },
      refundNumber () { //点击时候做出现判断

        if (this.value == 1) {
          this.shouldNot = true
          this.inputNumber = false
        } else if (this.value == 2) {
          this.inputNumber = true
          this.shouldNot = false
           document.querySelector('.inpBox .el-input').style.width="111px"
        }

      },
      btnDel (index) {
        if (this.value == 1) {
          this.$alert('请确定是否是全额退款', '温馨提示', {
            confirmButtonText: '确定',
          })

        } else {
          var back = ''
          back = this.orderDetails.list.splice(index, 1)[0]
          // var backObj = []
          this.arreyEnd.push(back)
        }
        this.numberAdd()

      },
      change () {
        if (this.value == 1) {
          this.$alert('请确定是否是全额退款', '温馨提示', {
            confirmButtonText: '确定',
          })
        } else {
          this.numberAdd()

        }

      },
      numberAdd () { //数字相加
        var z = ''
        var moneyArrey = []
        this.orderDetails1.list.forEach(ele => {
          z = ele.count * ele.price
          moneyArrey.push(z)
        })

        var number = 0
        moneyArrey.forEach(e => {
          number = number + e
        })
        this.backMoney = number
      },
      //发起退货
      overtime () {
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/refund`),
          method: 'post',
          data: {
            'list': this.orderDetails1.list,
            'orderId': this.orderId,
            'refundType': this.value,
            'status': 7
          },
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.visibleNew = false
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
        this.visibleNew = false
        this.visible = false
      },
      init (id) {
        this.orderId = id
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/infoById`),
          method: 'post',
          data: {
            orderId: id
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            var than = this
            setTimeout( ()=> {
              than.numberAdd()
            },500)

            this.orderDetails1 = data.orderDetails

            this.orderDetails1.list.map((ele) => {
              ele.countMax = ele.count
              return ele
            })

            if (data.orderDetails.orderNum) {
              this.orderNum = data.orderDetails.orderNum
            }
            this.trackingCompany = '暂无数据',
              this.trackingNum = '暂无数据'

            if (data.orderDetails.status === 0) {
              this.status = '未付款'
            }
            if (data.orderDetails.status === 1) {
              this.status = '已付款'
            }
            if (data.orderDetails.status === 2) {
              this.status = '待收货'
            }
            if (data.orderDetails.status === 3) {
              this.status = '已完成'
            }
            if (data.orderDetails.status === 4) {
              this.status = '客服审核'
            }
            if (data.orderDetails.status === 5) {
              this.status = '财务审核'
            }
            if (data.orderDetails.status === 6) {
              this.status = '退款完成'
            }
            if (data.orderDetails.status === 7) {
              this.status = '仓储审核'
            }
            if (data.orderDetails.status === 8) {
              this.status = '财务打款'
            }
            if (data.orderDetails.status === 9) {
              this.status = '财务打款'
            }
            if (data.orderDetails.orderProperty === 4) {
              this.orderProperty = '视频单'
            }
            if (data.orderDetails.orderProperty === 3) {
              this.orderProperty = '进货单'
            }
            if (data.orderDetails.orderProperty === 2) {
              this.orderProperty = '购物单'
            }
            if (data.orderDetails.orderProperty === 1) {
              this.orderProperty = '自购单'
            }
          }
        })
        this.visible = true
      },
      // 表单提交
      dataFormSubmit () {

      }
    }
  }
</script>
<style lang="scss" scoped>



  .centerBigBox {
    font-size: 16px;

    .certerTop {
      display: inline-block;

      section {
        p {
          display: inline-block;
          // background-color: #aaa;
          width: 16rem;
          margin-left: 2rem;
          line-height: 0px;

          span {
            display: inline-block;
            width: 6em;
            // border: 1px solid red;
            text-align: justify;

            i {
              display: inline-block;
              width: 100%;
            }
          }

          i {
            font-style: normal;
          }
        }
      }
    }

    .remark {
      margin: 1rem 0;

      p {
        height: 20px;
        font-size: 19px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        text-align: center;
      }

      .remarkCenter {
        border-radius: 0.2rem;
        border: 1px solid #f9fafa;
        padding: 0.5rem;
      }
    }

    .order {
      margin: 1rem 0;

      p {
        height: 20px;
        font-size: 19px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        text-align: center;
        margin: 1rem 0;
      }

      .orderCenter {
        .orderCenterBox {
          margin-top: 1rem;
          // border: 1px solid red;
          margin-left: 2%;
          display: inline-block;
          width: 48%;
          height: 124px;

          section {
            display: flex;

            .orderLeft {
              display: inline-block;
              // border: 1px solid red;
              width: 96px;
              height: 124px;
              /*padding: 0 0.1rem;*/
              img {
                width: 100%;
                height: 100%;
              }
            }

            .orderRigth {
              margin-left: 0.2rem;

              p {
                font-size: 14px;
                font-weight: 500;
                line-height: 15px;
              }

              .little {
                font-size: 14px;
                color: #999999;
                font-weight: 400;
              }
            }
          }
        }
      }
    }

    .btn_del {
      background-color: transparent;
      border-radius: 50%;
      color: darkgreen;
      border: 1px solid transparent;
      margin-left: 0.5rem;
    }
  }


  .el-input-number--mini {
    width: 110px;
  }
</style>
