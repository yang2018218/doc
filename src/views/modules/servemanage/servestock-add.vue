<template>
  <!-- 客服端代理进货审核页 -->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    title="进货单详情"
    width="651px"
  >
    <div class="centerBigBox">
      <div class="certerTop" v-for="(item,ind) in orderDetails" :key="ind">
        <section>
          <p>
            <span>
              订单号：
              <i></i>
            </span>

            <span style="white-space: nowrap;">{{item.orderNum}}</span>
          </p>
          <p>
            <span>
              订单状态：
              <i></i>
            </span>
            <i v-if="item.status==1">客服审核</i>
            <i v-if="item.status==3">财务审核</i>
            <i v-if="item.status==4">主仓发货</i>
            <i v-if="item.status==5">已发货</i>
            <i v-if="item.status==6">已完成</i>
            <i v-if="item.status==7">已驳回</i>
          </p>
        </section>
        <section>
          <p>
            <span>
              代理姓名：
              <i></i>
            </span>
            <i>{{item.agentName}}</i>
          </p>
          <p>
            <span>
              代理手机：
              <i></i>
            </span>
            <i>{{item.mobile}}</i>
          </p>
        </section>
        <section>
          <p>
            <span>
              订单价值：
              <i></i>
            </span>
            <i>{{item.price}}</i>
          </p>
          <p>
            <span>
              剩余信用值：
              <i></i>
            </span>
            <i>{{item.residueFaith}}元</i>
          </p>
        </section>
        <section v-for="(it,ind) in item.obj">
          <p>
            <span>
              发货快递：
              <i></i>
            </span>
            <i>{{it.trackingCompany}}</i>
          </p>
          <p>
            <span>
              快递单号：
              <i></i>
            </span>
            <i>{{it.trackingNum}}</i>
          </p>

        </section>
        <section>
          <p>
            <span>
              创建时间：
              <i></i>
            </span>
            <i>{{item.createTime}}</i>
          </p>
          <p>
            <span>
              购买时间：
              <i></i>
            </span>
            <i>{{item.payTime}}</i>
          </p>
        </section>
        <section>
            <span style="margin-left: 16px">
              代理区域：
            </span>
          {{item.agentAddress}}
        </section>
        <section>
            <span style="margin-left: 16px">
              收货地址：
            </span>
          {{item.goodsAddress}}
        </section>
        <div class="remark">
          <p>订单备注</p>
          <div class="remarkCenter">{{item.remark}}</div>
        </div>
      </div>
      <div class="order">
        <p>订单药品</p>
        <div class="orderCenter">
          <div :key="index" class="orderCenterBox" v-for="(item,index) in agentOrderDetail">
            <section>
              <div class="orderLeft">
                <img
                  :src="/,/.test(item.mainImages)? item.mainImages.split(',')[0]:item.mainImages"
                  alt
                />
              </div>
              <div class="orderRigth">
                <section style="overflow: hidden">{{item.productName}}</section>
                <section class="little">{{item.units}}</section>
                <section class="little">
                  数量*
                  <span style="padding-right:30px;">{{item.count}}</span>
                </section>
                <section class="little">价格{{item.price}}</section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
  <el-popconfirm
    @onConfirm="indentSubmit('1')"
    title="您确定通过该进货单吗？"
  >
  <el-button slot="reference" type="success" class="btnClassSty">通过</el-button>
</el-popconfirm>
      <el-popconfirm
        @onConfirm="indentSubmit('3')"
        style="margin-left: 20px"
        title="您确定要驳回该进货单吗？"
      >
  <el-button slot="reference" type="danger" class="btnClassSty">驳回</el-button>
</el-popconfirm>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        timer: '',
        agentOrderDetail: null,
        visibleNew: false,
        visible: false,
        orderDetails: '',
        orderProperty: '',
        status: '',
        orderNum: '',
        deliverWay: '',
        flag: false
      }
    },
    methods: {
      qq () {
        this.timer = 2
        this.visibleNew = true
      },
      ww () {
        this.visibleNew = true
        this.timer = 1
      },

      change (id) {
      },
      audit () {
      },
      //提交数据
      indentSubmit (timer) {
        if (this.execute == 1) {
          this.$http({
            url: this.$http.adornUrl(`/ycyl/ycylagentorder/update`),
            method: 'post',
            data: {
              orderId: this.orderId,
              status: timer == 1 ? '3' : '7'
            }
          }).then(({
            data
          }) => {
            if (data && data.code === 0) {
              this.flag = false
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
              this.flag = false
              this.$message.error(data.msg)
            }
          })
        } else {
          this.flag = false
          alert('您暂时没有权限！')
        }
        this.visibleNew = false
        this.visible = false
      },
      init (id) {
        this.orderId = id
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylagentorder/infoById`),
          method: 'post',
          data: {
            orderId: id
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            var obj = []
            if (data.ycylAgentOrder[0].trackingNum && data.ycylAgentOrder[0].trackingNum.indexOf(',') !== -1) {
              var A = data.ycylAgentOrder[0].trackingCompany.split(',')
              var B = data.ycylAgentOrder[0].trackingNum.split(',')

              A.map((e, index) => {
                obj.push({
                  trackingCompany: e, trackingNum: B[index]
                })
              })
            } else {
              var array = {}
              array.trackingCompany = data.ycylAgentOrder[0].trackingCompany
              array.trackingNum = data.ycylAgentOrder[0].trackingNum
            }
            data.ycylAgentOrder[0].obj = obj
            this.orderDetails = data.ycylAgentOrder
            this.agentOrderDetail = data.ycylAgentOrder[0].agentOrderDetail
            this.execute = data.ycylAgentOrder[0].status
          }
        })
        this.visible = true
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
          margin-left: 1rem;
          line-height: 0px;

          span {
            display: inline-block;
            width: 6em;
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
          margin-top: 0.5rem;
        }
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
          margin-top: 16px;
          // border: 1px solid red;
          margin-left: 2%;
          display: inline-block;
          width: 48%;

          section {
            display: flex;

            .orderLeft {
              display: inline-block;
              // border: 1px solid red;
              width: 140px;
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
  }
</style>
