<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    title="财务打款"
    width="651px"
  >
    <div class="centerBigBox">
      <div class="certerTop">
        <section>
          <p style="">
            <span>
              订单号：
              <i></i>
            </span>
            <b style="font-style: normal;">{{orderNum}}</b>
          </p>
          <p>
            <span>
             退款类型：
              <i></i>
            </span>
            <span v-if="orderDetails.refundType==1" style="color: #FC3A3A">全额退款</span>
            <span v-if="orderDetails.refundType==2" style="color: #FC3A3A">部分退款</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              优惠券金额：
              <i></i>
            </span>
            <span>{{orderDetails.voucherMoney}}</span>
          </p>
          <p>
            <span>
              订单属性：
              <i></i>
            </span>
            <span style="width: auto">{{fQ(orderDetails.orderProperty)}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              发货方式：
              <i></i>
            </span>
            {{orderDetails.outboundWay==1?'主仓发货':'代理发货'}}
          </p>
          <p>
            <span>
              订单状态：
              <i></i>
            </span>
            <span style="">{{fn(orderDetails.status)}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              退款时间：
              <i></i>
            </span>
            <i>{{orderDetails.refundApplyTime}}</i>
          </p>
          <p>
            <span>
              用户电话：
              <i></i>
            </span>
            <span style="width: auto;">{{orderDetails.mobile}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              用户昵称：
              <i></i>
            </span>
            <span style="width: auto">{{orderDetails.nickname}}</span>
          </p>
          <p>
            <span>
              快递公司：
              <i></i>
            </span>
            <span>{{orderDetails.refundTrackingCompany}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              实付金额：
              <i></i>
            </span>
            <span>{{orderDetails.sumPrice ||'0'}} 元</span>
          </p>
          <p>
            <span>
              订单价值：
              <i></i>
            </span>
            <span>{{orderDetails.price+orderDetails.voucherMoney ||'0'}} 元</span>
          </p>

        </section>
        <section>
          <p>
            <span>
              快递运费：
              <i></i>
            </span>
            <span>{{orderDetails.freight||'0'}} 元</span>
          </p>
          <p>
            <span>
              退款金额：
              <i></i>
            </span>
            <span>{{orderDetails.refundPrice||'0'}} 元</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              代金券金额：
              <i></i>
            </span>
            <span>{{orderDetails.voucherMoney||'0'}} 元</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              付款时间：
              <i></i>
            </span>
            <i>{{orderDetails.payTime}}</i>
          </p>
          <p>
            <span>
              退款单号：
              <i></i>
            </span>
            <span style="width: auto">{{orderDetails.refundTrackingNum}}</span>
          </p>
        </section>
        <section>
          <p style="width: 100%;">
            <span>
            收货地址：
              <i></i>
            </span>
            <span style="width: auto;display: inline-block;">{{orderDetails.goodsAddress}}</span>
          </p>
        </section>

      </div>
      <div class="remark">
        <p>退款备注</p>
        <div class="remarkCenter">
          <div>{{orderDetails.serviceRemark}}</div>
        </div>
      </div>
      <div class="order">
        <p>填写打款信息</p>
        <div class="orderCenter">
          <div class="orderCenterBox">
            <div class="finance">打款金额：
              <span v-if="orderDetails.status=='8'">
                 <el-input :placeholder="orderDetails.refundPrice" v-if="retreatMoney"
                           :disabled="true"></el-input>
                 <el-input v-model="amountMoney" :placeholder="orderDetails.refundPrice" @blur.native.capture="onChange"
                           v-if="amendMoney"></el-input>
                <button @click="amendMessage" class="amendClass">修改金额</button>
              </span>
              <span v-if="orderDetails.status=='9'">
                 <el-input :placeholder="orderDetails.sumPrice" v-if="retreatMoney"
                           :disabled="true"></el-input>
              </span>



            </div>
            <!--            <div style="display: flex;" class="finance">打款截图：-->
            <!--              <el-upload class="hid"-->
            <!--                         :action="$http.adornUrl('/sys/oss/uploadAll')"-->
            <!--                         :data="folderName"-->
            <!--                         list-type="picture-card"-->
            <!--                         :on-preview="handlePictureCardPreview"-->
            <!--                         :on-remove="handleRemove"-->
            <!--                         :on-success="handSuccess"-->
            <!--                         name="fileUpload">-->
            <!--                <i class="el-icon-plus"></i>-->
            <!--              </el-upload>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="finance()">确认退款</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        amendMoney: false,
        retreatMoney: true,
        amountMoney: '',
        folderName: {
          folderName: 'ycylManage'
        },
        dialogImageUrl: '',
        visibleNew: false,
        visible: false,
        orderDetails: '',
        orderProperty: '',
        status: '',
        orderNum: '',
        deliverWay: '',
        orderId: '',
        photoPaths: '',
      }
    },
    methods: {
      fQ(a){
        switch (a) {
          case 1:
            return '自购单'
            break
          case 2:
            return '购物单'
            break
          case 3:
            return '进货单'
            break
          case 4:
            return '视频单'
            break

        }
      },
      onChange () {
        if (this.amountMoney <= this.orderDetails.sumPrice) {
        } else {
          this.$confirm('您输入的金额大于应退金额', '温馨提示', {
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消成功'
            })
          })
        }
      },
      amendMessage () {
        this.amendMoney = true
        this.retreatMoney = false

      },
      handSuccess (file) {
        this.photoPaths = file.paths.toString()
      },
      handleRemove (file, fileList) {
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
      },
      //退款
      finance () {
        this.$confirm('您是否确定要退款', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          if (this.amountMoney <= this.orderDetails.sumPrice) {
            this.tuiKuan()
          } else {
            this.$message({
              type: 'info',
              message: '您输入的金额大于应退金额啦'
            })
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消成功'
          })
        })
      },
      tuiKuan () {
        if (this.orderDetails.status == '9') {
          this.amountMoney = this.orderDetails.sumPrice
        }
        if (this.orderDetails.status == '8') {
          if (this.amountMoney) {
            this.amountMoney = this.amountMoney
          } else {
            this.amountMoney = this.orderDetails.refundPrice
          }
        }
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/ApiRefundPrice`),
          method: 'get',
          params: {
            'orderId': this.orderNum,
            'price': this.amountMoney,
          }
        }).then(({
          data
        }) => {
          this.$emit('refreshDataList')
          this.visible = false
          if (data && data.code === 0) {
            this.$message({
              type: 'success',
              message: '退款成功!'
            })
          } else {
this.$message.error(data.msg)
          }
        })
      },
      init (id) {
        this.amendMoney = false
        this.retreatMoney = true
        this.orderId = id
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/getRefundOrder`),
          method: 'post',
          data: {
            orderId: id
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.orderDetails = data.orderDetails
            this.amountMoney = this.orderDetails.refundPrice
            if (data.orderDetails.orderNum) {
              this.orderNum = data.orderDetails.orderNum
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
            // if (data.orderDetails.status === 0) {
            //   this.status = '未付款'
            // }
            // if (data.orderDetails.status === 1) {
            //   this.status = '已付款'
            // }
            // if (data.orderDetails.status === 2) {
            //   this.status = '待收货'
            // }
            // if (data.orderDetails.status === 3) {
            //   this.status = '已完成'
            // }
            // if (data.orderDetails.status === 4) {
            //   this.status = '客服审核'
            // }
            // if (data.orderDetails.status === 5) {
            //   this.status = '财务审核'
            // }
            // if (data.orderDetails.status === 6) {
            //   this.status = '退款完成'
            // }
            // if (data.orderDetails.status === 7) {
            //   this.status = '仓库审核'
            // }
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
      fn (n) {
        switch (n) {
          case 0:
            return '待付款'
            break
          case 1:
            return '已付款'
            break
          case 2:
            return '已发货'
            break
          case 3:
            return '已完成'
            break
          case 4:
            return '客服审核'
            break
          case 5:
            return '财务审核'
            break
          case 6:
            return '退款完成'
            break
          case 7:
            return '仓储审核'
            break
          case 8:
            return '财务退款'
            break
          case 9:
            return '急速退款'
            break

        }
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
        padding: 0.5rem 0.5rem 0.5rem 2rem;

        div {
          border: 1px solid #f9fafa;
          padding: 1rem 0;
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
        padding: 0.5rem 2rem;

        .orderCenterBox {
          border: 1px solid #999;
          padding: 1rem 0 1rem 0;

          .finance {
            margin-left: 8rem;
            margin-top: 2rem;
          }

          .hid {
            width: 150px;
            height: 150px;
            overflow: hidden;
          }
        }
      }
    }
  }

  .amendClass {
    padding: 5px 10px;
    font-size: 14px;
  }
</style>
