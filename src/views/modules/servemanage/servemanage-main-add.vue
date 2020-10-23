<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    style="font-size:24px"
    :title="titleText"
    width="700px"
  >
    <div class="centerBigBox" v-if="commonBox">
      <div class="certerTop">
        <section>
          <p>
                <span>
                  订单号：
                  <i></i>
                </span>
            {{dataList.orderNum}}
          </p>
          <p>
                          <span>
                            订单状态：
                            <i></i>
                          </span>
            <i v-if="dataList.status==0">未付款</i>
            <i v-if="dataList.status==1">已付款</i>
            <i v-if="dataList.status==2">待收货</i>
            <i v-if="dataList.status==3">已完成</i>
            <i v-if="dataList.status==4">客服审核</i>
            <i v-if="dataList.status==5">财务审核</i>
            <i v-if="dataList.status==6">退款完成</i>
            <i v-if="dataList.status==7">仓库审核</i>
            <i v-if="dataList.status==8">财务打款</i>
            <i v-if="dataList.status==9">急速退款</i>
          </p>
        </section>
        <section>
          <p>
                <span>
                  药品价值：
                  <i></i>
                </span>
            {{dataList.price +dataList.voucherMoney}}
          </p>
          <p>
                <span>
                  付款时间：
                  <i></i>
                </span>
            {{dataList.payTime}}
          </p>
        </section>
        <section v-if="dataList.doctorType=='6'">
          <p>
                <span>
                  指导专家：
                  <i></i>
                </span>
            {{dataList.doctorName}}
          </p>
          <p>
                <span>
                  专家手机：
                  <i></i>
                </span>
            {{dataList.doctorMobile}}
          </p>
        </section>
        <section v-if="dataList.doctorType=='5' ">
          <p>
                <span>
                  指导医生：
                  <i></i>
                </span>
            {{dataList.doctorName}}
          </p>
          <p>
                <span>
                  医生手机：
                  <i></i>
                </span>
            {{dataList.doctorMobile}}
          </p>
        </section>
        <section v-if="dataList.teacherTruename">
          <p>
                <span>
                  审核医生：
                  <i></i>
                </span>
            {{dataList.teacherTruename}}
          </p>
          <p>
                <span>
                  审核老师：
                  <i></i>
                </span>
            {{dataList.teacherMobile}}
          </p>
        </section>
        <section>
          <p>
                <span>
                  用户昵称：
                  <i></i>
                </span>
            {{dataList.nickname}}
          </p>
          <p>
                <span>
                  用户手机：
                  <i></i>
                </span>
            {{dataList.mobile}}
          </p>
        </section>
        <section>
          <p>
                <span>
                  收货人姓名：
                  <i></i>
                </span>
            {{dataList.shouHuolinkman}}
          </p>
          <p class="statusN">
                          <span>
                            收货人电话：
                            <i></i>
                          </span>
            {{dataList.shouHuoMobile}}
          </p>
        </section>
        <section>
          <p>
                <span>
                  诊疗动物：
                  <i></i>
                </span>
            {{dataList.animal}}
          </p>
          <p class="statusN">
                          <span>
                            动物日龄：
                            <i></i>
                          </span>
            {{dataList.ageDays}}
          </p>
        </section>
        <section>
          <p>
                <span>
                  养殖规模：
                  <i></i>
                </span>
            {{dataList.scale}}
          </p>
          <p class="statusN">
                          <span>
                            药品种类：
                            <i></i>
                          </span>
            {{dataList.productCategories}}
            <i style="font-style: normal;"></i>
          </p>
        </section>
        <section>
          <p>
                <span>
                  创建时间：
                  <i></i>
                </span>
            {{dataList.createTime}}
          </p>

        </section>
        <section>
          <p>
                <span>
                  收货地址：
                  <i></i>
                </span>
          </p>
          <div style="margin-left: 128px">{{dataList.userAddress}}</div>
        </section>
        <section v-if="dataList.doctorType=='5'">
          <p >
                <span>
                  诊疗病症：
                  <i></i>
                </span>
          </p>
          <div style="margin-left: 128px">{{dataList.disease}}</div>
        </section>
        <section v-if="dataList.doctorType=='6'">
          <p >
                <span>
                  咨询事件：
                  <i></i>
                </span>
          </p>
          <div style="margin-left: 128px">{{dataList.disease}}</div>
        </section>

      </div>
    </div>
    <div class="centerBigBox" v-if="videoBox">
      <div class="certerTop">
        <section>
          <p>
                <span>
                  订单号：
                  <i></i>
                </span>
            {{dataList.orderNum}}
          </p>
          <p>
                          <span>
                            订单状态：
                            <i></i>
                          </span>
            <i v-if="dataList.status==0">未付款</i>
            <i v-if="dataList.status==1">已付款</i>
            <i v-if="dataList.status==2">待收货</i>
            <i v-if="dataList.status==3">已完成</i>
            <i v-if="dataList.status==4">客服审核</i>
            <i v-if="dataList.status==5">财务审核</i>
            <i v-if="dataList.status==6">退款完成</i>
            <i v-if="dataList.status==7">仓库审核</i>
            <i v-if="dataList.status==8">财务打款</i>
            <i v-if="dataList.status==9">急速退款</i>
          </p>
        </section>
        <section>
          <p>
                <span>
                  药品价值：
                  <i></i>
                </span>
            {{dataList.price}}
          </p>
          <p>
                <span>
                  付款时间：
                  <i></i>
                </span>
            {{dataList.payTime}}
          </p>
        </section>
        <section v-if="dataList.doctorType=='6'">
          <p>
                <span>
                  指导专家：
                  <i></i>
                </span>
            {{dataList.doctorName}}
          </p>
          <p>
                <span>
                  专家手机：
                  <i></i>
                </span>
            {{dataList.doctorMobile}}
          </p>
        </section>
        <section v-if="dataList.doctorType=='5' ">
          <p>
                <span>
                  指导医生：
                  <i></i>
                </span>
            {{dataList.doctorName}}
          </p>
          <p>
                <span>
                  医生手机：
                  <i></i>
                </span>
            {{dataList.doctorMobile}}
          </p>
        </section>
        <section>
          <p>
                <span>
                  用户昵称：
                  <i></i>
                </span>
            {{dataList.nickname}}
          </p>
          <p>
                <span>
                  用户手机：
                  <i></i>
                </span>
            {{dataList.mobile}}
          </p>
        </section>
        <section>
          <p>
                <span>
                  收货人姓名：
                  <i></i>
                </span>
            {{dataList.shouHuolinkman}}
          </p>
          <p class="statusN">
                          <span>
                            收货人电话：
                            <i></i>
                          </span>
            {{dataList.shouHuoMobile}}
          </p>
        </section>
        <section>
          <p>
                <span>
                  创建时间：
                  <i></i>
                </span>
            {{dataList.createTime}}
          </p>
          <p class="statusN">
                          <span>
                            药品种类：
                            <i></i>
                          </span>
            {{dataList.productCategories}}
            <i style="font-style: normal;"></i>
          </p>
        </section>

        <section >
          <p style="width: auto">
                <span>
                  课程名称：
                  <i></i>
                </span>
            {{dataList.courseName}}
          </p>
        </section>
        <section >
          <p style="width: auto">
                <span>
                  章节名称：
                  <i></i>

                </span>
            {{dataList.chapterName}}
          </p>
        </section>
        <section >
          <p >
                <span>
                  推荐主题：
                  <i></i>
                </span>
          </p>
          <div style="margin-left: 128px">{{dataList.theme}}</div>
        </section>
        <section>
          <p>
                <span>
                  收货地址：
                  <i></i>
                </span>
          </p>
          <div style="margin-left: 128px">{{dataList.userAddress}}</div>
        </section>
      </div>
    </div>
    <div class="drugBox">
              <section class="drugManage">
                <p class="bottomTitle">药品详情</p>
                <div>
                  <div v-for="(ite,ind) in dataList.list" :key="ind">
                    <span>名称：{{ite.productName}}</span>
                    <span>规格：{{ite.modelName}}</span>
                    <span>数量：{{ite.count}}</span>
                  </div>
                </div>
              </section>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">返回</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        commonBox: false,
        videoBox: false,
        gouwudan: true,
        titleText: '订单详情（自购单）',
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
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
      init (id) {
        this.videoBox = false
        this.commonBox = true
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylorder/infoById`),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'orderId': id
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.dataList = data.orderDetails
            if (data.orderDetails.orderProperty == '1') {
              this.titleText = '订单详情（自购单）'
            } else if (data.orderDetails.orderProperty == '2') {
              this.titleText = '订单详情（购物单）'
            } else if (data.orderDetails.orderProperty == '3') {
              this.titleText = '订单详情（进货单）'
            } else if (data.orderDetails.orderProperty == '4') {
              this.titleText = '订单详情（视频单）'
              this.videoBox = true
              this.commonBox = false
            }
          }
        })
        this.visible = true
      },
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
          width: 288px;
          margin-left: 32px;
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

      .diagnose {
        margin-left: 32px;

        div {
          display: inline-block;

          span {
            display: inline-block;
            width: 6em;
            text-align: justify;

            i {
              display: inline-block;
              width: 100%;
            }
          }

          div {
            padding: 1rem 1rem;
            /*border: 1px solid #e1e1e1;*/
            width: 420px;
          }
        }
      }


    }
  }
  .drugManage {
    margin-top: 2rem;

    .bottomTitle {
      font-size: 18px;
      color: #333333;
      width: 100%;
      text-align: center;
      margin: 1rem 0 1rem 0.5rem;
    }

    div {
      div {
        margin-top: 0.5rem;
        padding-left: 2rem;

        span {
          display: inline-block;
          font-size: 14px;
        }

        span:nth-of-type(1) {
          width: 40%;
        }

        span:nth-of-type(2) {
          width: 25%;
          margin-left: 2%;
        }

        span:nth-of-type(3) {
          width: 25%;
          margin-left: 2%;
        }
      }
    }
  }
</style>
