<template>
  <!--  诊断单-->
  <el-dialog
    :close-on-click-modal="false"
    title="诊断单"
    :visible.sync="visible"
    center

    style="padding-top-top: 2rem;font-weight:600; font-size: 20px"

    width="700px">
    <div id="helpDortor">
      <div :key="index" class="helpTop" v-for="(item,index) in dataList">
        <section>
          <div>
            <section>订单ID：<i></i></section>
            <span>{{item.orderNum}}</span>
          </div>
          <div>
            <section>订单状态：<i></i></section>
            <span v-if="item.status==null">未生成</span>
            <span v-if="item.status==0">未付款</span>
            <span v-if="item.status==1">已付款</span>
            <span v-if="item.status==2">待收货</span>
            <span v-if="item.status==3">已完成</span>
            <span v-if="item.status==4">仓库审核中</span>
            <span v-if="item.status==5">财务审核</span>
            <span v-if="item.status==6">退款完成</span>
          </div>
        </section>
        <section>
          <div>
            <section>指导医生：<i></i></section>
            <span>{{item.teacherTruename}}</span>
          </div>
          <div>
            <section>医生手机：<i></i></section>
            <span>{{item.teacherMobile}}</span>
          </div>
        </section>
        <section>
          <div>
            <section>医助姓名：<i></i></section>
            <span>{{item.assistantTruename}}</span>
          </div>
          <div>
            <section>医助手机：<i></i></section>
            <span>{{item.auditDoctorMobile}}</span>
          </div>
        </section>
        <section>
          <div>
            <section>用户昵称：<i></i></section>
            <span>{{item.nickname}}</span>
          </div>
          <div>
            <section>订单价格：<i></i></section>
            <span>{{item.price}}</span>
          </div>
        </section>
        <section v-if="!type">

          <div>
            <section>动物种类：<i></i></section>
            <span>{{item.animal}}</span>
          </div>
          <div>
            <section>日龄体重：<i></i></section>
            <span>{{item.ageindays}}</span>
          </div>

        </section>
        <section>
          <div>
            <section>药品种类：<i></i></section>
            <span>{{GetList.length}}</span>
          </div>
          <div>
            <section>付款时间：<i></i></section>
            <span>{{item.payTime}}</span>
          </div>
        </section>
        <section v-if="!item.doctorTruename==''">
          <div v-if="!type">
            <section>审核医生：<i></i></section>
            <span>{{item.doctorTruename}}</span>
          </div>
          <div v-if="!type">
            <section>医生电话：<i></i></section>
            <span>{{item.auditDoctorMobile}}</span>
          </div>
        </section>
        <section v-if="!type">
          <div>
            <section>服务时间：<i></i></section>
            <span>{{item.createTime}}</span>
          </div>

          <div >
            <section>养殖规模：<i></i></section>
            <span>{{item.scaleId}}</span>
          </div>
        </section>
        <p style="font-weight: normal">用户区域：{{item.userArea}}</p>
        <div class="bingzheng" v-if="!type">
          <div style="margin-top:16px">
            <section>诊疗病症：<i></i></section>
            <footer style="width: auto;font-size: 14px;margin-left: 32px">{{item.diagnoseDisease}}</footer>
          </div>
        </div>
        <div class="bingzheng" v-if="!type">
          <div style="margin-top:16px">
            <section>使用方法：<i></i></section>
            <footer style="width: auto;font-size: 14px;margin-left: 32px">{{item.specialistMeans}}</footer>
          </div>
        </div>
      </div>
      <h3>药品详情</h3>
      <div class="helpBottom">
        <div :key="indnus" v-for="(nesList,indnus) in GetList" style="margin-bottom: 5px">
          <h5><span>{{nesList.productName}}</span>

            <span>{{nesList.modelName}}</span>
            <span>数量：{{nesList.count}}</span></h5>
          <!--          <section>使用方法：<p>{{nesList.usage}}</p></section>-->
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
        type:'',
        GetList: [],
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
      init (data,type) {
        this.type=type
        this.visible = true
        this.dataForm = data
        this.dataForm.title = data.doctorType
        this.secondGetList(this.dataForm.diagnosisNum)
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getInfoById'),
          method: 'post',
          data: ({
            pId: data.pId,
            pageSize: 10,
            page: 1
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }

        })
      },
      secondGetList (id) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylassistantadvisoryinfo/getByNum'),
          method: 'post',
          data: ({
            type: 2,
            num: id,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.GetList = data.ycylAssistantAdvisoryInfo
          } else {
            this.dataList = []
            this.totalPage = 0
          }

        })
      },
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
    margin-top: -16px;
    color: #333;

    h3 {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
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
            color: #333;

          }
        }
      }
    }

    .helpBottom {
margin-top: 20px;
      div {
        margin-top: 0.25rem;

        h5 {
          font-size: 16px;
          font-weight: 500;
          margin: 0;

          span {
            display: inline-block;
            font-size: 16px;
            /*font-weight: 600;*/
          }

          span:nth-of-type(1) {
            width: 330px;
            /*background-color: #ff5500;*/
          }

          span:nth-of-type(2) {
            width: 185px;
            /*background-color: blue;*/
          }
        }
      }


      section {
        font-size: 14px;
        /*margin-top: 1rem;*/
        font-weight: 400;
        color: #333;

        p {
          display: inline-block;
          font-size: 14px;
          color: #333;
        }
      }

    }
  }

  .bingzheng {
    width: 100%;
    font-size: 16px !important;
    font-weight: 400 !important;

    section {
      font-size: 16px !important;
      font-weight: 400 !important;


      footer {
        width: 100%;
        font-size: 14px !important;
      }
    }


  }
</style>


