<template>
<!--  专家某个案例详情-->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    title="订单详情"
    width="700px"
  >
    <div class="DoctorCount">
      <div>
        <ul :key="inde" v-for="(castNum,inde) in doctorCase">
          <li><span >订&nbsp;&nbsp;单&nbsp;&nbsp;ID：{{castNum.orderNum}}</span> <span>订单状态：{{fn(castNum.status)}}</span>
          </li>
          <li><span>服务时间：{{castNum.serviceTime}}</span> <span>付款时间：{{castNum.payTime}}</span></li>
          <li><span>指导老师：{{castNum.teacherTruename}}</span>  <span style="width: 22rem;">老师ID：{{castNum.teacherUserId}}</span></li>
          <li><span>审核医生：{{castNum.doctorTruename}}</span> <span style="width: 22rem;">审核人ID：{{castNum.doctorUserId}}</span></li>
          <li><span>医助姓名：{{castNum.assistantTruename}}</span> <span style="width: 22rem;">医&nbsp;助&nbsp;ID：{{castNum.assistantUserId}}</span></li>
          <li><span>诊疗动物：{{castNum.animal}}</span> <span>养殖规模：{{castNum.breedScale}}</span></li>
          <li><span>动物日龄：{{castNum.ageindays}}</span> <span>药品种类：{{castNum.typeCount}}</span></li>
          <li>用户地区：<p>{{castNum.userArea}}</p></li>
          <li class="malady">
            <div style="display: inline-block;width: 9rem">病症特点：</div>
            <p>{{castNum.diagnoseDisease}}</p></li>
          <div class="doctorBottom">
            <p>药品详情</p>
            <ul>
              <li :key="index" v-for="(docCon,index) in castNum.list" style="line-height: 30px"><span style="width: 550px;"> 药品名称：{{docCon.productName}}</span><span style="width: 350px">规格 ： {{docCon.modelName}}</span><span style="width: 150px;"> 数量 ： {{docCon.count}}</span>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">返回</el-button>
    </span>
  </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                visible: false,
                dataForm: {
                    expId: 0,
                    userId: '',
                    startDate: '',
                    endDate: '',
                    company: '',
                    intor: '',
                    createTime: ''
                },
                dataRule: {}
            }
        },
        props: ['doctorCase'],
        methods: {
            init(id) {
                // this.dataForm.expId = id || 0
                this.visible = true

            },
            fn(w) {
                switch (w) {
                    case 0:
                        return "待付款"
                        break;
                    case 1:
                        return "已付款"
                        break;
                    case 2:
                        return "待收货"
                        break;
                    case 3:
                        return "已完成"
                        break;
                    case 4:
                        return "客服审核"
                        break;
                    case 5:
                        return "财务审核"
                        break;
                    case 6:
                        return "退款完成"
                        break;
                    case 7:
                        return "仓储审核"
                        break;
                    case 8:
                        return "财务退款"
                        break;

                }
            }
        }

    }
</script>
<style lang="scss" scoped>
    .DoctorCount {
        padding-left: 0.5rem;
        font-size: 16px;
        line-height: 20px;
        div {
            ul {
                li {
                  line-height: 25px;
                    display: flex;
                    /*justify-content: space-between;*/
                    span {
                        text-align: left;
                        width: 15rem;
                    }
                }
                .malady {
                    // background-color: #dfe4ed;
                    margin-top: 1rem;
                    p {
                        padding: 0 1rem;
                        // background-color: #dfe4ed;
                        padding: 0.5rem 0;
                        line-height: 23px;
                    }
                }
            }
        }
        .doctorBottom {
            margin-top: 1rem;
            p {
                text-align: center;
                text-indent: -4rem;
                font-size: 16px;
                // color: #555;
                margin-bottom: 1rem;
            }
        }
    }
</style>
