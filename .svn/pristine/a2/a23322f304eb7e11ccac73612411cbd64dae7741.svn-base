<template>
  <!-- 订单中心财务退款核查弹窗页面 -->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    title="退款详情"
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
            <span style="width:9.6rem">{{orderNum}}</span>
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
            <span style>{{status}}</span>
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
            <span>{{orderDetails.mobile}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              用户昵称：
              <i></i>
            </span>
            <span>{{orderDetails.nickname}}</span>
          </p>
          <p>
            <span>
              支付宝号：
              <i></i>
            </span>
            <span>{{orderDetails.alipayNum}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              退款金额：
              <i></i>
            </span>
            <span>{{orderDetails.refundPrice}}</span>
          </p>
          <p>
            <span>
              支付宝名：
              <i></i>
            </span>
            <span>{{orderDetails.alipayName}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              订单价值：
              <i></i>
            </span>
            <span>{{orderDetails.price}}</span>
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
              付款时间：
              <i></i>
            </span>
            <i>{{orderDetails.payTime}}</i>
          </p>
          <p>
            <span>
              快递单号：
              <i></i>
            </span>
            <span>{{orderDetails.refundTrackingNum}}</span>
          </p>
        </section>
        <section>
          <p>
            <span>
              用户区域：
              <i></i>
            </span>
            <span>{{orderDetails.goodsAddress}}</span>
          </p>
        </section>
      </div>
      <div class="remark">
        <p>退款备注</p>
        <div class="remarkCenter">{{orderDetails.serviceRemark}}</div>
      </div>
      <div class="order">
        <p>订单药品</p>
        <div class="orderCenter">
          <div :key="index" class="orderCenterBox" v-for="(item,index) in orderDetails.list">
            <section>
              <div class="orderLeft">
                <img :src="/,/.test(item.url)? item.url.split(',')[0]:item.url" alt />
              </div>
              <div class="orderRigth">
                <section>{{item.productName}}</section>
                <!-- <section class="little">{{item.units}}</section> -->
                <section class="little">数量*{{item.count}}</section>
                <section class="little">价格{{item.price}}</section>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="finance()">财务审核通过</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                visibleNew: false,
                visible: false,
                orderDetails: "",
                orderProperty: "",
                status: "",
                orderNum: "",
                deliverWay: "",
                orderId: ""
            };
        },
        methods: {
            finance() {
                if (this.orderDetails.status == 5) {
                    // this.$emit('refreshDataList');
                    this.caiwu(this.orderId);
                    this.$emit("financeOpen", this.orderId);
                    this.visible = false;
                } else {
                    alert("您暂时无权限进行处理哦");
                    this.visible = false;
                }
            },
            caiwu(id) {
                this.$http({
                    url: this.$http.adornUrl(`/ycyl/ycylorder/update`),
                    method: "post",
                    params: this.$http.adornParams({
                        orderId: id,
                        status: 7
                    })
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: "操作成功",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                this.$emit("refreshDataList");
                            }
                        })

                    }
                    this.dataListLoading = false;

                });
            },
            init(id) {
                this.orderId = id;
                this.$http({
                    url: this.$http.adornUrl(`/ycyl/ycylorder/getRefundOrder`),
                    method: "post",
                    data: {
                        orderId: id
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.orderDetails = data.orderDetails;
                        if (data.orderDetails.orderNum) {
                            this.orderNum = data.orderDetails.orderNum;
                        }
                        if (data.orderDetails.orderProperty === 4) {
                            this.orderProperty = "视频单";
                        }
                      if (data.orderDetails.orderProperty === 3) {
                        this.orderProperty = "进货单";
                      }
                        if (data.orderDetails.orderProperty === 2) {
                            this.orderProperty = "购物单";
                        }
                        if (data.orderDetails.orderProperty === 1) {
                            this.orderProperty = "自购单";
                        }
                        if (data.orderDetails.status === 0) {
                            this.status = "未付款";
                        }
                        if (data.orderDetails.status === 1) {
                            this.status = "已付款";
                        }
                        if (data.orderDetails.status === 2) {
                            this.status = "待收货";
                        }
                        if (data.orderDetails.status === 3) {
                            this.status = "已完成";
                        }
                        if (data.orderDetails.status === 4) {
                            this.status = "客服审核";
                        }
                        if (data.orderDetails.status === 5) {
                            this.status = "财务审核";
                        }
                        if (data.orderDetails.status === 6) {
                            this.status = "退款完成";
                        }
                        if (data.orderDetails.status === 7) {
                            this.status = "仓库审核";
                        }
                        if (data.orderDetails.deliverWay === 0) {
                            this.deliverWay = "自取";
                        }
                        if (data.orderDetails.deliverWay === 0) {
                            this.deliverWay = "快递";
                        }
                    }
                });
                this.visible = true;
            },
            // 表单提交
            dataFormSubmit() {}
        }
    };
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
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
                border: 1px solid #f9fafa;
                padding: 0.5rem 0.5rem 0.5rem 2rem;
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
                    margin-top: 0.2rem;
                    // border: 1px solid red;
                    margin-left: 1%;
                    display: inline-block;
                    width: 45%;
                    section {
                        display: flex;
                        .orderLeft {
                            display: inline-block;
                            // border: 1px solid red;
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
