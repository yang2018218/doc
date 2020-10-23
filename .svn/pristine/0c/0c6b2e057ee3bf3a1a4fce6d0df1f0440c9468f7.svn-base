<template>
  <!-- 后台退货单详情页第一页 -->
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
            <span style="width:auto">{{orderNum}}</span>
          </p>
          <p>
            <span>
              订单状态：
              <i></i>
            </span>
            <i>{{status}}</i>
          </p>
        </section>
        <section>
          <p>
            <span>
              订单属性：
              <i></i>
            </span>
            <i>自购单</i>
          </p>
          <p>
            <span>
              购买时间
              ：
              <i></i>
            </span>
            <i>{{orderDetails.createTime}}</i>
          </p>

        </section>
        <section>
          <p>
            <span>
              用户昵称：
              <i></i>
            </span>
            <i>{{orderDetails.nickname}}</i>
          </p>
          <p>
            <span>
              用户电话：
              <i></i>
            </span>
            <i>{{orderDetails.mobile}}</i>
          </p>
        </section>

        <section>
          <p>
            <span>
              总金额：
              <i></i>
            </span>
            <i>{{orderDetails.sumPrice}}</i>
          </p>
          <p>
            <span>
              订单价值：
              <i></i>
            </span>
            <i>{{orderDetails.price}}</i>
          </p>
        </section>
        <section>
          <p>
            <span>
              快递费用：
              <i></i>
            </span>
            <i>{{orderDetails.freight}}</i>
          </p>
          <p>
            <span>
              服务商收益：
              <i></i>
            </span>
            <span>{{orderDetails.serviceEarnings}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              退货快递：
              <i></i>
            </span>
            <i>{{orderDetails.refundTrackingCompany}}</i>
          </p>

          <p>
            <span>
              快递单号：
              <i></i>
            </span>
            <i>{{orderDetails.refundTrackingNum}}</i>
          </p>
        </section>

        <!--        关系人有显示没有隐藏-->
        <section>
          <p>
            <span>
              关系人：
              <i></i>
            </span>
            <i>{{orderDetails.doctorName}}</i>
          </p>
          <p>
            <span>
              关系人收益：
              <i></i>
            </span>
            <i>{{orderDetails.relationEarnings}}</i>
          </p>
        </section>
        <!--代理商姓名有显示没有隐藏-->
        <section>
          <p>
            <span>
              收货人姓名：
              <i></i>
            </span>
            <i>{{orderDetails.doctorName}}</i>
          </p>
          <p>
            <span>
              收货人电话：
              <i></i>
            </span>
            <i>{{orderDetails.relationEarnings}}</i>
          </p>
        </section>
        <section>
          <span style="margin-left: 32px">服务商地址：</span>
          {{orderDetails.agentAddress}}
        </section>
        <section style="width: 100%;">
          <span style="margin-left: 32px">收货地址：</span>
          {{orderDetails.userAddress}}
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
                <section style="overflow: hidden">{{item.productName}}</section>
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
      <el-popover placement="top" v-model="visibleNew" width="160">
        <p>你确认取消退货吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button @click="visibleNew = false" size="mini" type="text">取消</el-button>
          <el-button @click="quXiaoTuiKuan()" size="mini" type="danger">确定</el-button>
        </div>
        <el-button slot="reference" type="danger">取消退货</el-button>
      </el-popover>
      <el-button type="warning" @click="tuihuoinformation()">修改购物单</el-button>
      <el-button type="primary" @click="tuihuoDan()">填写退货信息</el-button>
      <el-button @click="visible = false" style="margin-bottom: 70px">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        statuesed: '',
        options: [
          {
            value: 1,
            label: '全额退款'
          },
          {
            value: 2,
            label: '部分退款'
          }
        ],
        value: 1,
        visibleNew: false,
        visible: false,
        orderDetails: '',
        orderProperty: '',
        status: '',
        orderNum: '',
        deliverWay: ''
      }
    },
    components: {
      // TuiHuo
    },
    methods: {
      //退货单信息填写
      tuihuoDan () {
        this.$emit('tuiHuoXin', this.orderId)
      },
      //退货单详情
      tuihuoinformation () {
        if (this.statuesed == 4 || this.statuesed == 7) {
          this.$emit('tuiHuoD', this.orderId)
        } else {
          this.$alert('您没有权利操作此单', '温馨提示', {
            confirmButtonText: '确定'
          })
        }
      },
      btnDel (index) {
        console.log(this.orderDetails.list.splice(index, 1), 100)
      },
      change (id) {
      },
      audit () {
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/update`),
          method: 'post',
          params: this.$http.adornParams({
            orderId: this.orderId,
            status: 5
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      quXiaoTuiKuan () {
        //取消退款
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/update`),
          method: 'post',
          params: {
            orderId: this.orderId,
            status: 3
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.visibleNew = false
                this.$emit('refreshDataList')
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      init (id) {
        this.orderId = id
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/infoById`),
          method: 'post',
          data: {
            orderId: id
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.statuesed = data.orderDetails.status
            this.orderDetails = data.orderDetails
            if (data.orderDetails.orderNum) {
              this.orderNum = data.orderDetails.orderNum
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
            if (data.orderDetails.status === 8) {
              this.status = '财务打款'
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
              this.status = '急速退款'
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
          width: 16rem;
          margin-left: 2rem;
          line-height: 0px;

          span {
            display: inline-block;
            width: 6em;
            text-align: justify;

            i {
              display: inline-block;
              width: 100%;
              height: 100%;
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
          margin-left: 2%;
          display: inline-block;
          width: 48%;
          height: 124px;

          section {
            display: flex;

            .orderLeft {
              display: inline-block;
              width: 120px;
              height: 110px;

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
</style>
