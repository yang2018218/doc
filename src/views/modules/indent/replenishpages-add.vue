<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    title="进货单详情"
    width="700px"
  >
    <div class="centerBigBox">
      <div class="certerTop" v-for="(item,ind) in orderDetails" :key="ind">
        <section>
          <p>
            <span>
              订单号：
              <i></i>
            </span>
            <span style="width:10rem">{{item.orderNum}}</span>
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
          </p>
        </section>
        <section style="min-height:24px;">
          <p>
            <span>
              代理姓名：
              <i></i>
            </span>
            <i>{{item.agentName}}</i>
          </p>
          <p>
            <span>
              联系电话：
              <i></i>
            </span>
            {{item.mobile}}
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
        <section v-for="(it,index) in orderDetails[0].obj" :key="index">
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
              购买时间
              ：
              <i></i>
            </span>
            <i>{{item.payTime}}</i>
          </p>
        </section>
        <footer style="padding-left:32px ">
          <p>代&nbsp;理&nbsp;区&nbsp;域&nbsp;：{{item.agentAddress}}</p>
          <p>收&nbsp;货&nbsp;地&nbsp;址&nbsp;：{{item.goodsAddress}}</p>
        </footer>
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
                <img :src="/,/.test(item.mainImages)? item.mainImages.split(',')[0]:item.mainImages" alt/>
              </div>
              <div class="orderRigth">
                <section style="overflow: hidden">{{item.productName}}</section>
                <section class="little">{{item.modelName}}</section>
                <section class="little">数量*{{item.count}}
                </section>
                <section class="little">价格{{item.price}}</section>
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
      <p>你确认审核通过吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button @click="visibleNew = false" size="mini" type="text">取消</el-button>

        <el-button @click="indentSubmit" size="mini" type="danger">确定</el-button>
      </div>
      <el-button slot="reference" type="primary">通过</el-button>
    </el-popover>
 <el-popover
   placement="top"
   v-model="visibleSty"
   width="160">
      <p>你确认将该订单驳回吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button @click="visibleSty = false" size="mini" type="text">取消</el-button>
        <el-button @click="runturSubmit" size="mini" type="danger">确定</el-button>
      </div>
       <el-button slot="reference" type="danger">驳回</el-button>
    </el-popover>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        visibleSty: false,
        execute: '',
        agentOrderDetail: null,
        visibleNew: false,
        visible: false,
        timer: '',
        orderDetails: '',
        orderProperty: '',
        status: '',
        orderNum: '',
        deliverWay: '',

      }
    },
    methods: {
      runturSubmit () {//驳回
        this.visibleSty = false
        if (this.execute == 3) {
          this.$http({
            url: this.$http.adornUrl(`/ycyl/ycylagentorder/update`),
            method: 'post',
            data: {
              orderId: this.orderId,
              status: '7'
            }
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '驳回成功',
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
        } else {
          this.$message('您暂时没有权限')
        }

        this.visibleNew = false
        this.visible = false
      },
      qq () {
        this.timer = 2
        this.visibleNew = true
      },
      ww () {
        this.timer = 1
        this.visibleNew = true
      },
      //提交数据
      indentSubmit () {
        if (this.execute == 3) {
          this.$http({
            url: this.$http.adornUrl(`/ycyl/ycylagentorder/update`),
            method: 'post',
            data: {
              orderId: this.orderId,
              status: '4',
            }
          }).then(({data}) => {
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
        } else {
          this.$message('您暂时没有权限')
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
        }).then(({data}) => {
          if (data && data.code === 0) {
            var obj = []
            if (data.ycylAgentOrder[0].trackingCompany && data.ycylAgentOrder[0].trackingCompany.indexOf(',') !== -1) {
              var A = data.ycylAgentOrder[0].trackingCompany.split(',')
              var B = data.ycylAgentOrder[0].trackingNum.split(',')
              A.map((e, index) => {
                obj.push({trackingCompany: e, trackingNum: B[index]})
              })
            } else {
              var array = {}
              array.trackingCompany = data.ycylAgentOrder[0].trackingCompany
              array.trackingNum = data.ycylAgentOrder[0].trackingNum
              obj.push(array)
            }
            data.ycylAgentOrder[0].obj = obj
            this.orderDetails = data.ycylAgentOrder
            this.agentOrderDetail = data.ycylAgentOrder[0].agentOrderDetail
            this.execute = this.orderDetails[0].status
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

          width: 18rem;
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
          margin-top: 1rem;
          // border: 1px solid red;
          margin-left: 2%;
          display: inline-block;
          width: 48%;

          section {
            display: flex;

            .orderLeft {
              display: inline-block;
              // border: 1px solid red;
              width: 150px;
              height: 120px;
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



