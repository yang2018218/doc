<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    title="退货单信息"
    width="651px"
  >
    <div class="centerBigBox">
      <div class="certerTop">
        <section>
          <p>
            <span>
              订单号：
              <i></i>
            </span>
            <span style="width:auto">{{orderNum}}</span>
          </p>
          <p>
            <span>
              退款类型：
              <i></i>
            </span>
            <i v-if="orderDetails1.refundType==1" style="color:red">全额退款</i>
            <i v-if="orderDetails1.refundType==2" style="color:red">部分退款</i>
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
            <i>{{orderDetails1.refundPrice}}</i>
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
              购买时间
              ：
              <i></i>
            </span>
            <i>{{orderDetails1.createTime}}</i>
          </p>
          <p>
            <span>
              退款状态
              ：
              <i></i>
            </span>
            <i>{{status}}</i>
          </p>
        </section>

        <section>
          <p style="width: 100%">
            <span>
              收货地址：
              <i></i>
            </span>
            <i style="width: auto;display: inline-block">{{orderDetails1.goodsAddress}}</i>
          </p>
        </section>
      </div>
      <div class="returnBox">
        <div class="returnTitle">填写退货信息</div>
        <section class="returncount">
          <div>
            <span>
              快递公司：
              <i></i>
            </span>
            <el-input v-model="refundTrackingCompany" placeholder="请输入快递公司" style="width:15rem"></el-input>
          </div>
          <div>
            <span>
              退货快递单号：
              <i></i>
            </span>
            <el-input v-model="refundTrackingNum" placeholder="请输入退货单号" style="width:15rem"></el-input>
          </div>
        </section>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-popover placement="top" v-model="visibleNew" width="160">
        <p>你确定要提交吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button @click="visibleNew = false" size="mini" type="text">取消</el-button>
          <el-button @click="overSubmit()" size="mini" type="danger">确定</el-button>
        </div>
        <el-button slot="reference" type="danger">提交仓储</el-button>
      </el-popover>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        alipayName: '', //退款支付宝名字
        alipayNum: '', //退款支付宝号
        refundTrackingCompany: '',
        refundTrackingNum: '',
        options: [{
          value: 1,
          label: '全额退款'
        }, {
          value: 2,
          label: '部分退款'
        }],
        value: 1,
        visibleNew: false,
        visible: false,

        orderDetails1: '',
        orderProperty: '',
        status: '',
        orderNum: '',
        deliverWay: '',
        trackingCompany: '',
        trackingNum: '',
        orderDetails: {
          list: []
        },
        orderId: ''
      }
    },
    methods: {
      btnDel (index) {
      },
      change (id) {
      },
      //提交仓储
      overSubmit () {
        if (this.refundTrackingCompany && this.refundTrackingNum) {
          this.$http({
            url: this.$http.adornUrl(`/ycyl/ycylorder/update`),
            method: 'post',
            params: {
              orderId: this.orderId,
              'refundTrackingCompany': this.refundTrackingCompany,
              'refundTrackingNum': this.refundTrackingNum,
              'status': 7
            }
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
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
          this.visible = false
        }else {
          this.$message.error('您没有正确填写退货单')
        }
        this.visibleNew = false
      },
      init (id) {
        this.alipayName = '',
          this.alipayNum = '',
          this.refundTrackingCompany = '',
          this.refundTrackingNum = '',
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
            this.orderDetails1 = data.orderDetails
            if (data.orderDetails.orderNum) {
              this.orderNum = data.orderDetails.orderNum
            }
            (this.trackingCompany = '暂无数据'), (this.trackingNum = '暂无数据')

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

    .returnBox {
      padding: 2rem 3rem;

      .returnTitle {
        font-size: 20px;
        width: 100%;
        text-align: center;
      }

      .returncount {
        border: 1px solid #999;
        border-radius: 5px;
        margin-top: 2rem;
        padding-top: 2rem;

        div {
          display: flex;
          justify-content: center;

          span {
            display: inline-block;
            width: 7em;
            text-align: justify;

            i {
              display: inline-block;
              width: 100%;
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
</style>
