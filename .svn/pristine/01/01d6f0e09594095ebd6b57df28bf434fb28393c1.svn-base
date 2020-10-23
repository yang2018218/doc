<template>
  <!--  诊断单-->
  <el-dialog
    :close-on-click-modal="false"
    title="咨询单"
    :visible.sync="visible"
    center
    style="padding-top-top: 2rem;font-weight:600; font-size: 20px"
    width="700px">
    <div id="helpDortor">
      <div class="helpTop">
        <section>
          <div>
            <section>订单ID：<i></i></section>
            <span>{{dataList.orderNum}}</span>
          </div>
          <div>
            <section>订单状态：<i></i></section>
            <span v-if="dataList.status==0">未付款</span>
            <span v-if="dataList.status==1">已付款</span>
            <span v-if="dataList.status==2">待收货</span>
            <span v-if="dataList.status==3">已完成</span>
            <span v-if="dataList.status==4">仓库审核中</span>
            <span v-if="dataList.status==5">财务审核</span>
            <span v-if="dataList.status==6">退款完成</span>
            <span v-if="dataList.status==7">主仓审核</span>
            <span v-if="dataList.status==8">财务退款</span>
            <span v-if="dataList.status==9">急速退款</span>

          </div>
        </section>
        <section>
          <div>
            <section>指导专家：<i></i></section>
            <span>{{dataList.teacherTruename}}</span>
          </div>
          <div>
            <section>专家手机：<i></i></section>
            <span>{{dataList.auditDoctorMobile}}</span>
          </div>
        </section>
        <section>
          <div>
            <section>医助姓名：<i></i></section>
            <span>{{dataList.assistantTruename}}</span>
          </div>
          <div>
            <section>医助手机：<i></i></section>
            <span>{{dataList.assistantMobile}}</span>
          </div>
        </section>
        <section>
          <div>
            <section>用户昵称：<i></i></section>
            <span>{{dataList.nickname}}</span>
          </div>
          <div>
            <section>订单价格：<i></i></section>
            <span>{{dataList.price}}</span>
          </div>
        </section>
        <section>
          <div>
            <section>服务时间：<i></i></section>
            <span>{{dataList.createTime}}</span>
          </div>
          <div>
            <section>药品种类：<i></i></section>
            <span>{{dataList.typeCount}}</span>
          </div>
        </section>
        <section>
          <div>
            <section>付款时间：<i></i></section>
            <span>{{dataList.payTime}}</span>
          </div>
          <div>
            <section>药单价值：<i></i></section>
            <span>{{dataList.orderMoney}}</span>
          </div>
        </section>
        <section v-if="!type">
          <div>
            <section>动物种类：<i></i></section>
            <span>{{dataList.animal}}</span>
          </div>
          <div>
            <section>动物日龄：<i></i></section>
            <span>{{dataList.ageindays}}</span>
          </div>
        </section>
        <div style="font-size: 16px;font-weight: normal">
          用户区域：<span>{{dataList.userArea}}</span>
        </div>
        <footer style="font-weight: 500">
          <div style="margin-top:1rem">
            <section>诊疗病症：<i></i></section>
            <span>{{dataList.advisoryIncident}}</span></div>
        </footer>
      </div>
      <h3 style="margin: 20px 0px">药品详情</h3>
      <div class="helpBottom">
        <div :key="indnus" v-for="(nesList,indnus) in dataList.list" style="border-bottom: 5px">
          <p><span>{{nesList.productName}}</span>
            <span>{{nesList.modelName}}</span>
            <span>{{nesList.count}}</span>
          </p>
        </div>
      </div>
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
        type: '',
        dataList: [],
        symbol: '',
        newAnimai: '',
        visible: false,
        dataForm: {
          title: '',
        }
      }
    },
    methods: {
      init (data, type) {
        this.visible = true
        this.dataList = data
        this.type = type
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-dialog__header {
    padding-top: 2rem;
  }

  #helpDortor {
    font-size: 16px;
    padding: 0 0px;
    color: #333;
    margin-top: -1rem;

    h3 {
      text-align: center;
      font-size: 18px;
      /*font-weight: 600;*/
    }

    .helpTop {
      section {
        div:nth-of-type(1) {
          width: 52%;
        }

        div:nth-of-type(2) {
          width: 45%;
        }

        div {
          margin: 0.25rem 0;
          font-weight: 600;
          display: inline-block;

          section {
            width: 5em;
            display: inline-block;
            text-align: justify;;
            line-height: 0;
            font-weight: 500;

            i {
              display: inline-block;
              /*padding-left: 100%;*/
              width: 100%;
            }
          }

          span {
            font-size: 15px;
            font-weight: 300;
            color: #666;
          }
        }
      }

    }

    .helpBottom {

      div {
        margin-top: 0.25rem;

        p {
          font-size: 16px;
          margin: 1rem 0 0 0;

          span:nth-of-type(1) {
            width: 320px;
          }

          span:nth-of-type(2) {
            width: 185px;
          }

          span {
            display: inline-block;
            font-size: 16px;
            font-weight: normal;
          }

        }
      }

      section {
        font-size: 14px;
        margin-top: 0.2rem;
        font-weight: 400;
        color: #666666;

        p {
          display: inline-block;
          font-size: 14px;
          color: #333;
        }
      }

    }
  }
</style>


