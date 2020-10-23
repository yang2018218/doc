<template>
  <div class="addTicket">
    <el-dialog
      :title="!dataForm.id ? '新增代金券' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible" width="714px" center>
      <div class="content">
        <section>
          <label>
            代金券类型：
            <el-select v-model="dataForm.voucherType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </label>
        </section>
        <section>
          <label>
            代金券名称：
            <el-input
              placeholder="请输入内容"
              v-model="dataForm.voucherName"
              clearable class="inputTitle">
            </el-input>
          </label>
        </section>
        <section>
          <label>
            会员使用条件：
            <el-input
              placeholder="请输入最小可用金额"
              v-model="dataForm.memberMinAvailMoney"
              clearable class="cheek">
            </el-input>
          </label>
          <label class="feiCheek"> 非会员使用条件：
            <el-input
              placeholder="请输入最小可用金额"
              v-model="dataForm.commonMinAvailMoney"
              clearable class="cheek">
            </el-input>
          </label>
        </section>
        <section>
          <label>
            会员代金券面额：
            <el-input
              placeholder="请输入元"
              v-model="dataForm.memberMinimum"
              class="cheekMoney">
            </el-input>
            -
            <el-input
              placeholder="请输入元"
              v-model="dataForm.memberMaximum"
              class="cheekMoney">
            </el-input>
          </label>
          <label class="feiCheek1">
            非会员代金券面额：
            <el-input
              placeholder="请输入元"
              v-model="dataForm.commonMinimum"
              class="cheekMoney">
            </el-input>
            -
            <el-input
              placeholder="请输入元"
              v-model="dataForm.commonMaximum"
              class="cheekMoney ">
            </el-input>
          </label>
        </section>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" class="btnClassSty">取消</el-button>
      <el-button type="primary" v-if="isAuth('ycyl:voucherinfo:save')" @click="dataFormSubmit()"
                 class="btnClassSty">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        input: '',
        options: [{
          value: '1',
          label: '代金券'
        }, {
          value: '2',
          label: '打折券'
        }],

        visible: false,
        dataForm: {
          voucherType: '1',
          id: '',
          voucherName: '',//名称
          memberMinAvailMoney: '',//会员使用最小条件
          commonMinAvailMoney: '',//非会员使用最小条件
          memberMinimum: '',//会员代金券面额最小
          memberMaximum: '',//会员代金卷面额最大
          commonMinimum: '',//非会员待金卷面额最小
          commonMaximum: '',//非会员待金娟面额最大
        },
        dataRule: {
          entryId: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
      },
      // 表单提交
      dataFormSubmit () {
        if (this.dataForm.voucherType && this.dataForm.voucherName && this.dataForm.memberMinAvailMoney && this.dataForm.commonMinAvailMoney && this.dataForm.memberMinimum && this.dataForm.memberMaximum && this.dataForm.commonMinimum && this.dataForm.commonMaximum) {
          this.$http({
            url: this.$http.adornUrl('/voucherinfo/save'),
            method: 'post',
            data: this.dataForm
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm = {},
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
              this.$message({message: `错误提示:${data.msg}`, type: 'warning', duration: 2000})
            }
          })
        } else {
          this.$message({message: '请检查是否有未输入的信息', duration: 2000, type: 'warning'})
        }

      }
    }
  }
</script>
<style lang="scss" scoped>
  .addTicket {
    background: rgba(255, 255, 255, 1);
    font-size: 16px !important;

    .content {
      font-size: 16px !important;

      section {
        padding: 15px 0;
      }

      .inputTitle {
        width: 498px;
      }

      .cheek {
        width: 163px;
        height: 30px;
      }

      .cheekMoney {
        width: 80px;
        height: 30px;
      }

      .feiCheek1 {
        margin-left: 28px;
      }

      .feiCheek {
        margin-left: 20px;
      }
    }
  }
</style>
