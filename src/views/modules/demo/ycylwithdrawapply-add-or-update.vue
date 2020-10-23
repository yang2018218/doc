<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="0.管理员；1.普通用户；2.代理商;3.医助;4.客服,5.医生,6.专家，7财务" prop="userType">
      <el-input v-model="dataForm.userType" placeholder="0.管理员；1.普通用户；2.代理商;3.医助;4.客服,5.医生,6.专家，7财务"></el-input>
    </el-form-item>
    <el-form-item label="提现人userid" prop="withdrawUserId">
      <el-input v-model="dataForm.withdrawUserId" placeholder="提现人userid"></el-input>
    </el-form-item>
    <el-form-item label="提现时间" prop="withdrawTime">
      <el-input v-model="dataForm.withdrawTime" placeholder="提现时间"></el-input>
    </el-form-item>
    <el-form-item label="" prop="withdrawMoney">
      <el-input v-model="dataForm.withdrawMoney" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="提现支付宝账号" prop="alipayAccount">
      <el-input v-model="dataForm.alipayAccount" placeholder="提现支付宝账号"></el-input>
    </el-form-item>
    <el-form-item label="处理人userid" prop="disposeUserId">
      <el-input v-model="dataForm.disposeUserId" placeholder="处理人userid"></el-input>
    </el-form-item>
    <el-form-item label="处理时间" prop="disposeTime">
      <el-input v-model="dataForm.disposeTime" placeholder="处理时间"></el-input>
    </el-form-item>
    <el-form-item label="处理状态0未处理1已处理" prop="status">
      <el-input v-model="dataForm.status" placeholder="处理状态0未处理1已处理"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          applyId: 0,
          userType: '',
          withdrawUserId: '',
          withdrawTime: '',
          withdrawMoney: '',
          alipayAccount: '',
          disposeUserId: '',
          disposeTime: '',
          status: '',
          remark: '',
          createTime: ''
        },
        dataRule: {
          userType: [
            { required: true, message: '0.管理员；1.普通用户；2.代理商;3.医助;4.客服,5.医生,6.专家，7财务不能为空', trigger: 'blur' }
          ],
          withdrawUserId: [
            { required: true, message: '提现人userid不能为空', trigger: 'blur' }
          ],
          withdrawTime: [
            { required: true, message: '提现时间不能为空', trigger: 'blur' }
          ],
          withdrawMoney: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          alipayAccount: [
            { required: true, message: '提现支付宝账号不能为空', trigger: 'blur' }
          ],
          disposeUserId: [
            { required: true, message: '处理人userid不能为空', trigger: 'blur' }
          ],
          disposeTime: [
            { required: true, message: '处理时间不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '处理状态0未处理1已处理不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.applyId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.applyId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylwithdrawapply/info/${this.dataForm.applyId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userType = data.ycylwithdrawapply.userType
                this.dataForm.withdrawUserId = data.ycylwithdrawapply.withdrawUserId
                this.dataForm.withdrawTime = data.ycylwithdrawapply.withdrawTime
                this.dataForm.withdrawMoney = data.ycylwithdrawapply.withdrawMoney
                this.dataForm.alipayAccount = data.ycylwithdrawapply.alipayAccount
                this.dataForm.disposeUserId = data.ycylwithdrawapply.disposeUserId
                this.dataForm.disposeTime = data.ycylwithdrawapply.disposeTime
                this.dataForm.status = data.ycylwithdrawapply.status
                this.dataForm.remark = data.ycylwithdrawapply.remark
                this.dataForm.createTime = data.ycylwithdrawapply.createTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylwithdrawapply/${!this.dataForm.applyId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'applyId': this.dataForm.applyId || undefined,
                'userType': this.dataForm.userType,
                'withdrawUserId': this.dataForm.withdrawUserId,
                'withdrawTime': this.dataForm.withdrawTime,
                'withdrawMoney': this.dataForm.withdrawMoney,
                'alipayAccount': this.dataForm.alipayAccount,
                'disposeUserId': this.dataForm.disposeUserId,
                'disposeTime': this.dataForm.disposeTime,
                'status': this.dataForm.status,
                'remark': this.dataForm.remark,
                'createTime': this.dataForm.createTime
              })
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
          }
        })
      }
    }
  }
</script>
