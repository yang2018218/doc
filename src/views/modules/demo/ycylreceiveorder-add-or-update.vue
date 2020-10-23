<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="支付人用户id" prop="payUserId">
      <el-input v-model="dataForm.payUserId" placeholder="支付人用户id"></el-input>
    </el-form-item>
    <el-form-item label="订单编号" prop="orderNum">
      <el-input v-model="dataForm.orderNum" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item label="订单总额" prop="orderAmount">
      <el-input v-model="dataForm.orderAmount" placeholder="订单总额"></el-input>
    </el-form-item>
    <el-form-item label="交易金额" prop="payTotalAmount">
      <el-input v-model="dataForm.payTotalAmount" placeholder="交易金额"></el-input>
    </el-form-item>
    <el-form-item label="交易通道 1.微信公众号，2.支付宝" prop="payChannelCode">
      <el-input v-model="dataForm.payChannelCode" placeholder="交易通道 1.微信公众号，2.支付宝"></el-input>
    </el-form-item>
    <el-form-item label="通道费率" prop="channelRate">
      <el-input v-model="dataForm.channelRate" placeholder="通道费率"></el-input>
    </el-form-item>
    <el-form-item label="通道手续费" prop="channelRateCharge">
      <el-input v-model="dataForm.channelRateCharge" placeholder="通道手续费"></el-input>
    </el-form-item>
    <el-form-item label="交易状态 1：初始化 2：取消或交易失败 3：交易成功" prop="orderState">
      <el-input v-model="dataForm.orderState" placeholder="交易状态 1：初始化 2：取消或交易失败 3：交易成功"></el-input>
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
          payId: 0,
          payUserId: '',
          orderNum: '',
          orderAmount: '',
          payTotalAmount: '',
          payChannelCode: '',
          channelRate: '',
          channelRateCharge: '',
          orderState: '',
          createTime: ''
        },
        dataRule: {
          payUserId: [
            { required: true, message: '支付人用户id不能为空', trigger: 'blur' }
          ],
          orderNum: [
            { required: true, message: '订单编号不能为空', trigger: 'blur' }
          ],
          orderAmount: [
            { required: true, message: '订单总额不能为空', trigger: 'blur' }
          ],
          payTotalAmount: [
            { required: true, message: '交易金额不能为空', trigger: 'blur' }
          ],
          payChannelCode: [
            { required: true, message: '交易通道 1.微信公众号，2.支付宝不能为空', trigger: 'blur' }
          ],
          channelRate: [
            { required: true, message: '通道费率不能为空', trigger: 'blur' }
          ],
          channelRateCharge: [
            { required: true, message: '通道手续费不能为空', trigger: 'blur' }
          ],
          orderState: [
            { required: true, message: '交易状态 1：初始化 2：取消或交易失败 3：交易成功不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.payId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.payId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylreceiveorder/info/${this.dataForm.payId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.payUserId = data.ycylreceiveorder.payUserId
                this.dataForm.orderNum = data.ycylreceiveorder.orderNum
                this.dataForm.orderAmount = data.ycylreceiveorder.orderAmount
                this.dataForm.payTotalAmount = data.ycylreceiveorder.payTotalAmount
                this.dataForm.payChannelCode = data.ycylreceiveorder.payChannelCode
                this.dataForm.channelRate = data.ycylreceiveorder.channelRate
                this.dataForm.channelRateCharge = data.ycylreceiveorder.channelRateCharge
                this.dataForm.orderState = data.ycylreceiveorder.orderState
                this.dataForm.createTime = data.ycylreceiveorder.createTime
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
              url: this.$http.adornUrl(`/generator/ycylreceiveorder/${!this.dataForm.payId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'payId': this.dataForm.payId || undefined,
                'payUserId': this.dataForm.payUserId,
                'orderNum': this.dataForm.orderNum,
                'orderAmount': this.dataForm.orderAmount,
                'payTotalAmount': this.dataForm.payTotalAmount,
                'payChannelCode': this.dataForm.payChannelCode,
                'channelRate': this.dataForm.channelRate,
                'channelRateCharge': this.dataForm.channelRateCharge,
                'orderState': this.dataForm.orderState,
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
