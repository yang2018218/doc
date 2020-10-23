<template>
  <div id="pushMoneyID">
    <section class="MoneySetting">
      <p class="title">课程购买提成设置</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="demo-ruleForm">
        <el-form-item label="课程购买提成设置：" prop="studyProportion">
          <el-input v-model.number="ruleForm.studyProportion"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;‰
        </el-form-item>
        <el-form-item label="课程带药提成设置：" prop="deductMultiple">
          <el-input v-model="ruleForm.deductMultiple"></el-input>
          <p>（当前老师诊疗提成的倍数）</p>
        </el-form-item>
        <el-form-item class="footerBtn">
          <el-button type="primary" @click="submitForm()" class="footerBtnStyle" :isdisabled="isdisabled">确定</el-button>
          <el-button @click="resetForm('ruleForm')" class="footerBtnStyle">返回</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        rateId: '',
        isdisabled: false,
        ruleForm: {
          studyProportion: 1,
          deductMultiple: 1,
        },
        rules: {
          studyProportion: [
            {type: 'number', message: '必须为数字值'},
            {required: true, message: '请输入课程购买提成设置', trigger: 'blur'}
          ],
          deductMultiple: [{
            required: true, message: '请输入课程带药提成设置', trigger: 'blur'
          },
            {type: 'number', message: '必须为数字值'}
          ]
        }
      }
    },
    activated () {
      this.getList()
    },
    methods: {
      getList () {
        this.$http({
          url: this.$http.adornUrl('/study/studydeductrate/getTc'),
          method: 'post'
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {

            this.rateId = data.list[0].rateId
            this.ruleForm = data.list[0]
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      submitForm () {
        this.isdisabled = true,
          setTimeout(() => {
            this.isdisabled = false
          })
        if (this.rateid) {
          this.ruleForm.rateid = this.rateid
        }
        this.$http({
          url: this.$http.adornUrl(`/study/studydeductrate/${this.rateId ? 'update' : 'save'}`),
          method: 'post',
          data: this.ruleForm
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.$message.success('设置成功')
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      resetForm () {
        //course - goodsclass
        this.$router.push({  //核心语句
          path:'/course-goodsclass',   //跳转的路径
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #pushMoneyID {
    margin: 0;

    background-color: #d9d9d9;
    width: 100%;
    height: 828px;
    padding-top: 220px;

    .MoneySetting {
      border-radius: 10px;
      margin: 0 auto;
      background-color: #FFF;
      width: 422px;
      height: 318px;
      padding: 35px 25px 0px 25px;

      .title {
        margin: 0 auto;
        width: 200px;
        height: 24px;
        font-size: 24px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;

      }

      .demo-ruleForm {
        margin-top: 30px;
      }

      .footerBtn {
        margin: 0 auto;
        margin-top: 50px;

        .footerBtnStyle {
          padding: 8px 20px ;
            }
      }
    }
  }

</style>
