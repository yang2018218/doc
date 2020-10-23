<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    title="订单详情"
    width="651px"
  >
    <div class="centerBigBox">
      <div class="certerTop">
        <section>
          <p>
            <span>
              用户昵称：
              <i></i>
            </span>
            {{orderDetails.nickname}}
          </p>
          <p>
            <span>
              用户电话：
              <i></i>
            </span>
            {{orderDetails.mobile}}
          </p>
        </section>
        <section>
          <p>
            <span>
              订单属性：
              <i></i>
            </span>
            {{orderProperty}}
          </p>
          <p>
            <span>
              订单状态：
              <i></i>
            </span>
            {{status}}
          </p>
        </section>
        <section>
          <p>
            <span>
              订单号：
              <i></i>
            </span>
            {{orderNum}}
          </p>

          <p>
            <span>
              订单有效期：
              <i></i>
            </span>
            <span>{{orderDetails.validTime}}天</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              关系人：
              <i></i>
            </span>
            <span style="display:inline-block;width:100px;">{{orderDetails.doctorName}}</span>
          </p>
          <p v-if="orderProperty!=='视频单'">
            <span>
              关联单号：
              <i></i>
            </span>
            <span style="display:inline-block;width:120px;">{{orderDetails.diagnoseId}}</span>
          </p>
          <p v-if="orderProperty=='视频单'">
            <span>
              视频ID：
              <i></i>
            </span>
            <span style="display:inline-block;width:auto;">{{orderDetails.diagnoseId}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              关系人收益：
              <i></i>
            </span>
            <span>{{orderDetails.doctorAmount}}</span>
          </p>
          <p>
            <span>
              关系人手机：
              <i></i>
            </span>
            <span style="display:inline-block;width:100px;">{{orderDetails.doctorMobile}}</span>
          </p>
        </section>

        <section>
          <p>
            <span>
              订单价值：
              <i></i>
            </span>
            <span>{{orderDetails.price+orderDetails.voucherMoney}}</span>
          </p>
          <p>
            <span>
              快递费用：
              <i></i>
            </span>
            <span>{{orderDetails.freight}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              代金券金额：
              <i></i>
            </span>
            <span style="width: auto">{{orderDetails.voucherMoney}}  元</span>
          </p>

          <p>
            <span>
              实付金额：
              <i></i>
            </span>
            <i style="width: auto">{{orderDetails.sumPrice}}</i>
          </p>
        </section>
        <section>
          <p>
            <span>
              创建时间：
              <i></i>
            </span>
            <i>{{orderDetails.createTime}}</i>
          </p>
          <p>
            <span>
              服务商收益：
              <i></i>
            </span>
            <span>{{orderDetails.agentAmount}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              收货人姓名：
              <i></i>
            </span>
            <span style="width: auto">{{orderDetails.shouHuolinkman}}</span>
          </p>
          <p>
            <span>
              收货人电话：
              <i></i>
            </span>
            <span style="width: auto">{{orderDetails.shouHuoMobile}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              配送方式：
              <i></i>
            </span>
            <span v-if="orderDetails.outboundWay==1">主仓发货</span>
            <span v-if="orderDetails.outboundWay==2">代理发货</span>
          </p>
<!--          <p>-->
<!--            <span>-->
<!--              收货人电话：-->
<!--              <i></i>-->
<!--            </span>-->
<!--            <span style="width: auto">{{orderDetails.shouHuoMobile}}</span>-->
<!--          </p>-->
        </section>
        <section v-for="(item,index) in orderDetails.objectTracking">
          <p>
            <span>
              发货快递：
              <i></i>
            </span>
            <i>{{item.trackingCompany}}</i>
          </p>
          <p>
            <span>
              发货单号：
              <i></i>
            </span>
            <span style="width: auto">{{item.trackingNum}}</span>
          </p>
        </section>
        <section>
            <span style="margin-left: 35px">
              服&nbsp;&nbsp;务&nbsp;&nbsp;商&nbsp;&nbsp;：
              <i></i>
            </span>
          <span style="width: auto">{{orderDetails.agentAddress}}</span>
        </section>
        <section>
            <span style="margin-left: 35px">
              收&nbsp;货地&nbsp;址：
              <i></i>
            </span>
          <span style="word-wrap:break-word;">{{orderDetails.userAddress}}</span>
        </section>
      </div>
      <div class="remark">
        <p>订单备注</p>
        <div class="remarkCenter">{{orderDetails.remark}}</div>
      </div>
      <div class="order">
        <p>订单药品</p>
        <div class="orderCenter">
          <div :key="index" class="orderCenterBox" v-for="(item,index) in orderDetails.list">
            <section>
              <div class="orderLeft">
                <img :src="/,/.test(item.url)? item.url.split(',')[0]:item.url" alt/>
              </div>
              <div class="orderRigth">
                <section>{{item.productName}}</section>
                <section class="little">{{item.modelName}}</section>
                <section class="little">数量*{{item.count}}</section>
                <section class="little">价格{{item.price}}</section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取消</el-button>

     <el-popover
       placement="top"
       v-model="visibleNew"
       width="160">
  <p>你确定要延迟收货码？</p>
  <div style="text-align: right; margin: 0">
    <el-button @click="visibleNew = false" size="mini" type="text">取消</el-button>
    <el-button @click="overtime()" size="mini" type="danger">确定</el-button>
  </div>
       <div v-if="delayReceiving==2">
         <el-button slot="reference" type="danger">延迟收货</el-button>
       </div>

</el-popover>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        delayReceiving: '',
        visibleNew: false,
        visible: false,
        orderDetails: '',
        orderProperty: '',
        status: '',
        orderNum: '',
        deliverWay: ''
      }
    },
    methods: {
      overtime () {
        if (this.orderDetails.validTime === '10') {
          this.$message.error('错误提示：您已经将收货日期延长为10天了，请勿重复操作')
        } else {
          this.$http({
            url: this.$http.adornUrl(`/ycyl/ycylorder/update`),
            method: 'get',
            params: this.$http.adornParams({
              'validTime': 10,
              'orderId': this.orderDetails.orderId,
            })
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
            }
          })
        }
        this.visibleNew = false
        this.visible = false
      },
      init (id) {
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/infoById`),
          method: 'post',
          data: ({
            orderId: id
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            var objectTracking = []
            if (data.orderDetails.trackingCompany && data.orderDetails.trackingCompany.indexOf(',') !== -1) {
              var arrayA = data.orderDetails.trackingCompany.split(',')
              var arrayB = data.orderDetails.trackingNum.split(',')
              arrayB.map((e, i) => {
                objectTracking.push({trackingNum: e, trackingCompany: arrayA[i]})
              })
            } else {
              var obj = {}
              obj.trackingNum = data.orderDetails.trackingNum
              obj.trackingCompany = data.orderDetails.trackingCompany
              objectTracking.push(obj)
            }
            data.orderDetails.objectTracking = objectTracking
            this.orderDetails = data.orderDetails
            this.delayReceiving = data.orderDetails.orderProperty
            if (data.orderDetails.orderNum) {
              this.orderNum = data.orderDetails.orderNum
            }
            if (data.orderDetails.orderProperty === 3) {
              this.orderProperty = '进货单'
            }
            if (data.orderDetails.orderProperty === 4) {
              this.orderProperty = '视频单'
            }
            if (data.orderDetails.orderProperty === 2) {
              this.orderProperty = '购物单'
            }
            if (data.orderDetails.orderProperty === 1) {
              this.orderProperty = '自购单'
            }
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
              this.status = '仓库审核'
            }
            if (data.orderDetails.status === 9) {
              this.status = '急速退款'
            }
            if (data.orderDetails.deliverWay === 0) {
              this.deliverWay = '自取'
            }
            if (data.orderDetails.deliverWay === 0) {
              this.deliverWay = '快递'
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
          margin-left: 1%;
          display: inline-block;
          width: 45%;

          section {
            display: flex;

            .orderLeft {
              display: inline-block;
              width: 150px;
              height: 120px;
              padding: 0 0.1rem;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .orderRigth {
              p {
                font-size: 14px;
                font-weight: 500;
                line-height: 15px;
              }

              .little {
                font-size: 14px;
                color: #aaaaaa;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
  }
</style>
