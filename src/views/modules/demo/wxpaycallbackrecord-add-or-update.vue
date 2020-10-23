<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="订单号 pay_order_no" prop="payOrderNo">
      <el-input v-model="dataForm.payOrderNo" placeholder="订单号 pay_order_no"></el-input>
    </el-form-item>
    <el-form-item label="微信支付订单号 wx_transaction_id" prop="wxTransactionId">
      <el-input v-model="dataForm.wxTransactionId" placeholder="微信支付订单号 wx_transaction_id"></el-input>
    </el-form-item>
    <el-form-item label="appId" prop="appid">
      <el-input v-model="dataForm.appid" placeholder="appId"></el-input>
    </el-form-item>
    <el-form-item label="mch_id" prop="mchId">
      <el-input v-model="dataForm.mchId" placeholder="mch_id"></el-input>
    </el-form-item>
    <el-form-item label="device_info" prop="deviceInfo">
      <el-input v-model="dataForm.deviceInfo" placeholder="device_info"></el-input>
    </el-form-item>
    <el-form-item label="result_code" prop="resultCode">
      <el-input v-model="dataForm.resultCode" placeholder="result_code"></el-input>
    </el-form-item>
    <el-form-item label="err_code" prop="errCode">
      <el-input v-model="dataForm.errCode" placeholder="err_code"></el-input>
    </el-form-item>
    <el-form-item label="err_code_des" prop="errCodeDes">
      <el-input v-model="dataForm.errCodeDes" placeholder="err_code_des"></el-input>
    </el-form-item>
    <el-form-item label="openid" prop="openid">
      <el-input v-model="dataForm.openid" placeholder="openid"></el-input>
    </el-form-item>
    <el-form-item label="is_subscribe" prop="isSubscribe">
      <el-input v-model="dataForm.isSubscribe" placeholder="is_subscribe"></el-input>
    </el-form-item>
    <el-form-item label="trade_type" prop="tradeType">
      <el-input v-model="dataForm.tradeType" placeholder="trade_type"></el-input>
    </el-form-item>
    <el-form-item label="bank_type" prop="bankType">
      <el-input v-model="dataForm.bankType" placeholder="bank_type"></el-input>
    </el-form-item>
    <el-form-item label="total_fee" prop="totalFee">
      <el-input v-model="dataForm.totalFee" placeholder="total_fee"></el-input>
    </el-form-item>
    <el-form-item label="settlement_total_fee" prop="settlementTotalFee">
      <el-input v-model="dataForm.settlementTotalFee" placeholder="settlement_total_fee"></el-input>
    </el-form-item>
    <el-form-item label="fee_type" prop="feeType">
      <el-input v-model="dataForm.feeType" placeholder="fee_type"></el-input>
    </el-form-item>
    <el-form-item label="cash_fee" prop="cashFee">
      <el-input v-model="dataForm.cashFee" placeholder="cash_fee"></el-input>
    </el-form-item>
    <el-form-item label="cash_fee_type" prop="cashFeeType">
      <el-input v-model="dataForm.cashFeeType" placeholder="cash_fee_type"></el-input>
    </el-form-item>
    <el-form-item label="coupon_count" prop="couponCount">
      <el-input v-model="dataForm.couponCount" placeholder="coupon_count"></el-input>
    </el-form-item>
    <el-form-item label="coupon_fee_$n" prop="couponFee">
      <el-input v-model="dataForm.couponFee" placeholder="coupon_fee_$n"></el-input>
    </el-form-item>
    <el-form-item label="attach" prop="attach">
      <el-input v-model="dataForm.attach" placeholder="attach"></el-input>
    </el-form-item>
    <el-form-item label="time_end" prop="timeEnd">
      <el-input v-model="dataForm.timeEnd" placeholder="time_end"></el-input>
    </el-form-item>
    <el-form-item label="add_time" prop="addTime">
      <el-input v-model="dataForm.addTime" placeholder="add_time"></el-input>
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
          id: 0,
          payOrderNo: '',
          wxTransactionId: '',
          appid: '',
          mchId: '',
          deviceInfo: '',
          resultCode: '',
          errCode: '',
          errCodeDes: '',
          openid: '',
          isSubscribe: '',
          tradeType: '',
          bankType: '',
          totalFee: '',
          settlementTotalFee: '',
          feeType: '',
          cashFee: '',
          cashFeeType: '',
          couponCount: '',
          couponFee: '',
          attach: '',
          timeEnd: '',
          addTime: ''
        },
        dataRule: {
          payOrderNo: [
            { required: true, message: '订单号 pay_order_no不能为空', trigger: 'blur' }
          ],
          wxTransactionId: [
            { required: true, message: '微信支付订单号 wx_transaction_id不能为空', trigger: 'blur' }
          ],
          appid: [
            { required: true, message: 'appId不能为空', trigger: 'blur' }
          ],
          mchId: [
            { required: true, message: 'mch_id不能为空', trigger: 'blur' }
          ],
          deviceInfo: [
            { required: true, message: 'device_info不能为空', trigger: 'blur' }
          ],
          resultCode: [
            { required: true, message: 'result_code不能为空', trigger: 'blur' }
          ],
          errCode: [
            { required: true, message: 'err_code不能为空', trigger: 'blur' }
          ],
          errCodeDes: [
            { required: true, message: 'err_code_des不能为空', trigger: 'blur' }
          ],
          openid: [
            { required: true, message: 'openid不能为空', trigger: 'blur' }
          ],
          isSubscribe: [
            { required: true, message: 'is_subscribe不能为空', trigger: 'blur' }
          ],
          tradeType: [
            { required: true, message: 'trade_type不能为空', trigger: 'blur' }
          ],
          bankType: [
            { required: true, message: 'bank_type不能为空', trigger: 'blur' }
          ],
          totalFee: [
            { required: true, message: 'total_fee不能为空', trigger: 'blur' }
          ],
          settlementTotalFee: [
            { required: true, message: 'settlement_total_fee不能为空', trigger: 'blur' }
          ],
          feeType: [
            { required: true, message: 'fee_type不能为空', trigger: 'blur' }
          ],
          cashFee: [
            { required: true, message: 'cash_fee不能为空', trigger: 'blur' }
          ],
          cashFeeType: [
            { required: true, message: 'cash_fee_type不能为空', trigger: 'blur' }
          ],
          couponCount: [
            { required: true, message: 'coupon_count不能为空', trigger: 'blur' }
          ],
          couponFee: [
            { required: true, message: 'coupon_fee_$n不能为空', trigger: 'blur' }
          ],
          attach: [
            { required: true, message: 'attach不能为空', trigger: 'blur' }
          ],
          timeEnd: [
            { required: true, message: 'time_end不能为空', trigger: 'blur' }
          ],
          addTime: [
            { required: true, message: 'add_time不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/generator/wxpaycallbackrecord/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.payOrderNo = data.wxpaycallbackrecord.payOrderNo
                this.dataForm.wxTransactionId = data.wxpaycallbackrecord.wxTransactionId
                this.dataForm.appid = data.wxpaycallbackrecord.appid
                this.dataForm.mchId = data.wxpaycallbackrecord.mchId
                this.dataForm.deviceInfo = data.wxpaycallbackrecord.deviceInfo
                this.dataForm.resultCode = data.wxpaycallbackrecord.resultCode
                this.dataForm.errCode = data.wxpaycallbackrecord.errCode
                this.dataForm.errCodeDes = data.wxpaycallbackrecord.errCodeDes
                this.dataForm.openid = data.wxpaycallbackrecord.openid
                this.dataForm.isSubscribe = data.wxpaycallbackrecord.isSubscribe
                this.dataForm.tradeType = data.wxpaycallbackrecord.tradeType
                this.dataForm.bankType = data.wxpaycallbackrecord.bankType
                this.dataForm.totalFee = data.wxpaycallbackrecord.totalFee
                this.dataForm.settlementTotalFee = data.wxpaycallbackrecord.settlementTotalFee
                this.dataForm.feeType = data.wxpaycallbackrecord.feeType
                this.dataForm.cashFee = data.wxpaycallbackrecord.cashFee
                this.dataForm.cashFeeType = data.wxpaycallbackrecord.cashFeeType
                this.dataForm.couponCount = data.wxpaycallbackrecord.couponCount
                this.dataForm.couponFee = data.wxpaycallbackrecord.couponFee
                this.dataForm.attach = data.wxpaycallbackrecord.attach
                this.dataForm.timeEnd = data.wxpaycallbackrecord.timeEnd
                this.dataForm.addTime = data.wxpaycallbackrecord.addTime
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
              url: this.$http.adornUrl(`/generator/wxpaycallbackrecord/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'payOrderNo': this.dataForm.payOrderNo,
                'wxTransactionId': this.dataForm.wxTransactionId,
                'appid': this.dataForm.appid,
                'mchId': this.dataForm.mchId,
                'deviceInfo': this.dataForm.deviceInfo,
                'resultCode': this.dataForm.resultCode,
                'errCode': this.dataForm.errCode,
                'errCodeDes': this.dataForm.errCodeDes,
                'openid': this.dataForm.openid,
                'isSubscribe': this.dataForm.isSubscribe,
                'tradeType': this.dataForm.tradeType,
                'bankType': this.dataForm.bankType,
                'totalFee': this.dataForm.totalFee,
                'settlementTotalFee': this.dataForm.settlementTotalFee,
                'feeType': this.dataForm.feeType,
                'cashFee': this.dataForm.cashFee,
                'cashFeeType': this.dataForm.cashFeeType,
                'couponCount': this.dataForm.couponCount,
                'couponFee': this.dataForm.couponFee,
                'attach': this.dataForm.attach,
                'timeEnd': this.dataForm.timeEnd,
                'addTime': this.dataForm.addTime
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
