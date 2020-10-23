<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户userid"></el-input>
    </el-form-item>
    <el-form-item label="支付宝账号" prop="alipayAccount">
      <el-input v-model="dataForm.alipayAccount" placeholder="支付宝账号"></el-input>
    </el-form-item>
    <el-form-item label="提现密码" prop="drawMoneyPass">
      <el-input v-model="dataForm.drawMoneyPass" placeholder="提现密码"></el-input>
    </el-form-item>
    <el-form-item label="钱包金额" prop="walletMoney">
      <el-input v-model="dataForm.walletMoney" placeholder="钱包金额"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
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
          walletId: 0,
          userId: '',
          alipayAccount: '',
          drawMoneyPass: '',
          walletMoney: '',
          createTime: '',
          updateTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户userid不能为空', trigger: 'blur' }
          ],
          alipayAccount: [
            { required: true, message: '支付宝账号不能为空', trigger: 'blur' }
          ],
          drawMoneyPass: [
            { required: true, message: '提现密码不能为空', trigger: 'blur' }
          ],
          walletMoney: [
            { required: true, message: '钱包金额不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.walletId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.walletId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluserwallet/info/${this.dataForm.walletId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycyluserwallet.userId
                this.dataForm.alipayAccount = data.ycyluserwallet.alipayAccount
                this.dataForm.drawMoneyPass = data.ycyluserwallet.drawMoneyPass
                this.dataForm.walletMoney = data.ycyluserwallet.walletMoney
                this.dataForm.createTime = data.ycyluserwallet.createTime
                this.dataForm.updateTime = data.ycyluserwallet.updateTime
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
              url: this.$http.adornUrl(`/generator/ycyluserwallet/${!this.dataForm.walletId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'walletId': this.dataForm.walletId || undefined,
                'userId': this.dataForm.userId,
                'alipayAccount': this.dataForm.alipayAccount,
                'drawMoneyPass': this.dataForm.drawMoneyPass,
                'walletMoney': this.dataForm.walletMoney,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
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
