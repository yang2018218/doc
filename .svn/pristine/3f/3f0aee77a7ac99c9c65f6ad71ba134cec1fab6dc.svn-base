<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="订单号" prop="orderNum">
      <el-input v-model="dataForm.orderNum" placeholder="订单号"></el-input>
    </el-form-item>
    <el-form-item label="订单金额" prop="price">
      <el-input v-model="dataForm.price" placeholder="订单金额"></el-input>
    </el-form-item>
    <el-form-item label="购买人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="购买人userid"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="dataForm.nickname" placeholder="用户昵称"></el-input>
    </el-form-item>
    <el-form-item label="0:待付款，1：已付款，2：待收货，3：已完成，4：仓库审核中，5:财务审核，6:退款完成" prop="status">
      <el-input v-model="dataForm.status" placeholder="0:待付款，1：已付款，2：待收货，3：已完成，4：仓库审核中，5:财务审核，6:退款完成"></el-input>
    </el-form-item>
    <el-form-item label="收货地址表id" prop="addressId">
      <el-input v-model="dataForm.addressId" placeholder="收货地址表id"></el-input>
    </el-form-item>
    <el-form-item label="代理商userid" prop="agentUserId">
      <el-input v-model="dataForm.agentUserId" placeholder="代理商userid"></el-input>
    </el-form-item>
    <el-form-item label="支付方式1:支付宝 2：微信" prop="payType">
      <el-input v-model="dataForm.payType" placeholder="支付方式1:支付宝 2：微信"></el-input>
    </el-form-item>
    <el-form-item label="物流单号" prop="trackingNum">
      <el-input v-model="dataForm.trackingNum" placeholder="物流单号"></el-input>
    </el-form-item>
    <el-form-item label="物流公司" prop="trackingCompany">
      <el-input v-model="dataForm.trackingCompany" placeholder="物流公司"></el-input>
    </el-form-item>
    <el-form-item label="配送方式 字典表中id" prop="deliverWay">
      <el-input v-model="dataForm.deliverWay" placeholder="配送方式 字典表中id"></el-input>
    </el-form-item>
    <el-form-item label="发货时间" prop="deliverTime">
      <el-input v-model="dataForm.deliverTime" placeholder="发货时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="诊断单id" prop="diagnoseId">
      <el-input v-model="dataForm.diagnoseId" placeholder="诊断单id"></el-input>
    </el-form-item>
    <el-form-item label="关系人userId" prop="relationUserId">
      <el-input v-model="dataForm.relationUserId" placeholder="关系人userId"></el-input>
    </el-form-item>
    <el-form-item label="接诊人类型 1.医生2专家" prop="doctorType">
      <el-input v-model="dataForm.doctorType" placeholder="接诊人类型 1.医生2专家"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" prop="count">
      <el-input v-model="dataForm.count" placeholder="商品数量"></el-input>
    </el-form-item>
    <el-form-item label="订单支付时间" prop="payTime">
      <el-input v-model="dataForm.payTime" placeholder="订单支付时间"></el-input>
    </el-form-item>
    <el-form-item label="退款物流单号" prop="refundTrackingNum">
      <el-input v-model="dataForm.refundTrackingNum" placeholder="退款物流单号"></el-input>
    </el-form-item>
    <el-form-item label="退款物流公司" prop="refundTrackingCompany">
      <el-input v-model="dataForm.refundTrackingCompany" placeholder="退款物流公司"></el-input>
    </el-form-item>
    <el-form-item label="退款订单金额" prop="refundPrice">
      <el-input v-model="dataForm.refundPrice" placeholder="退款订单金额"></el-input>
    </el-form-item>
    <el-form-item label="退款商品数量" prop="refundCount">
      <el-input v-model="dataForm.refundCount" placeholder="退款商品数量"></el-input>
    </el-form-item>
    <el-form-item label="退款申请时间" prop="refundApplyTime">
      <el-input v-model="dataForm.refundApplyTime" placeholder="退款申请时间"></el-input>
    </el-form-item>
    <el-form-item label="退款类型 1全额退款2部分退款" prop="refundType">
      <el-input v-model="dataForm.refundType" placeholder="退款类型 1全额退款2部分退款"></el-input>
    </el-form-item>
    <el-form-item label="运费 有些地区是有运费的" prop="freight">
      <el-input v-model="dataForm.freight" placeholder="运费 有些地区是有运费的"></el-input>
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
          orderId: 0,
          orderNum: '',
          price: '',
          userId: '',
          nickname: '',
          status: '',
          addressId: '',
          agentUserId: '',
          payType: '',
          trackingNum: '',
          trackingCompany: '',
          deliverWay: '',
          deliverTime: '',
          updateTime: '',
          diagnoseId: '',
          relationUserId: '',
          doctorType: '',
          remark: '',
          count: '',
          payTime: '',
          refundTrackingNum: '',
          refundTrackingCompany: '',
          refundPrice: '',
          refundCount: '',
          refundApplyTime: '',
          refundType: '',
          freight: '',
          createTime: ''
        },
        dataRule: {
          orderNum: [
            { required: true, message: '订单号不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '订单金额不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '购买人userid不能为空', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '用户昵称不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0:待付款，1：已付款，2：待收货，3：已完成，4：仓库审核中，5:财务审核，6:退款完成不能为空', trigger: 'blur' }
          ],
          addressId: [
            { required: true, message: '收货地址表id不能为空', trigger: 'blur' }
          ],
          agentUserId: [
            { required: true, message: '代理商userid不能为空', trigger: 'blur' }
          ],
          payType: [
            { required: true, message: '支付方式1:支付宝 2：微信不能为空', trigger: 'blur' }
          ],
          trackingNum: [
            { required: true, message: '物流单号不能为空', trigger: 'blur' }
          ],
          trackingCompany: [
            { required: true, message: '物流公司不能为空', trigger: 'blur' }
          ],
          deliverWay: [
            { required: true, message: '配送方式 字典表中id不能为空', trigger: 'blur' }
          ],
          deliverTime: [
            { required: true, message: '发货时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          diagnoseId: [
            { required: true, message: '诊断单id不能为空', trigger: 'blur' }
          ],
          relationUserId: [
            { required: true, message: '关系人userId不能为空', trigger: 'blur' }
          ],
          doctorType: [
            { required: true, message: '接诊人类型 1.医生2专家不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '商品数量不能为空', trigger: 'blur' }
          ],
          payTime: [
            { required: true, message: '订单支付时间不能为空', trigger: 'blur' }
          ],
          refundTrackingNum: [
            { required: true, message: '退款物流单号不能为空', trigger: 'blur' }
          ],
          refundTrackingCompany: [
            { required: true, message: '退款物流公司不能为空', trigger: 'blur' }
          ],
          refundPrice: [
            { required: true, message: '退款订单金额不能为空', trigger: 'blur' }
          ],
          refundCount: [
            { required: true, message: '退款商品数量不能为空', trigger: 'blur' }
          ],
          refundApplyTime: [
            { required: true, message: '退款申请时间不能为空', trigger: 'blur' }
          ],
          refundType: [
            { required: true, message: '退款类型 1全额退款2部分退款不能为空', trigger: 'blur' }
          ],
          freight: [
            { required: true, message: '运费 有些地区是有运费的不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.orderId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.orderId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylorder/info/${this.dataForm.orderId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderNum = data.ycylorder.orderNum
                this.dataForm.price = data.ycylorder.price
                this.dataForm.userId = data.ycylorder.userId
                this.dataForm.nickname = data.ycylorder.nickname
                this.dataForm.status = data.ycylorder.status
                this.dataForm.addressId = data.ycylorder.addressId
                this.dataForm.agentUserId = data.ycylorder.agentUserId
                this.dataForm.payType = data.ycylorder.payType
                this.dataForm.trackingNum = data.ycylorder.trackingNum
                this.dataForm.trackingCompany = data.ycylorder.trackingCompany
                this.dataForm.deliverWay = data.ycylorder.deliverWay
                this.dataForm.deliverTime = data.ycylorder.deliverTime
                this.dataForm.updateTime = data.ycylorder.updateTime
                this.dataForm.diagnoseId = data.ycylorder.diagnoseId
                this.dataForm.relationUserId = data.ycylorder.relationUserId
                this.dataForm.doctorType = data.ycylorder.doctorType
                this.dataForm.remark = data.ycylorder.remark
                this.dataForm.count = data.ycylorder.count
                this.dataForm.payTime = data.ycylorder.payTime
                this.dataForm.refundTrackingNum = data.ycylorder.refundTrackingNum
                this.dataForm.refundTrackingCompany = data.ycylorder.refundTrackingCompany
                this.dataForm.refundPrice = data.ycylorder.refundPrice
                this.dataForm.refundCount = data.ycylorder.refundCount
                this.dataForm.refundApplyTime = data.ycylorder.refundApplyTime
                this.dataForm.refundType = data.ycylorder.refundType
                this.dataForm.freight = data.ycylorder.freight
                this.dataForm.createTime = data.ycylorder.createTime
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
              url: this.$http.adornUrl(`/generator/ycylorder/${!this.dataForm.orderId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'orderId': this.dataForm.orderId || undefined,
                'orderNum': this.dataForm.orderNum,
                'price': this.dataForm.price,
                'userId': this.dataForm.userId,
                'nickname': this.dataForm.nickname,
                'status': this.dataForm.status,
                'addressId': this.dataForm.addressId,
                'agentUserId': this.dataForm.agentUserId,
                'payType': this.dataForm.payType,
                'trackingNum': this.dataForm.trackingNum,
                'trackingCompany': this.dataForm.trackingCompany,
                'deliverWay': this.dataForm.deliverWay,
                'deliverTime': this.dataForm.deliverTime,
                'updateTime': this.dataForm.updateTime,
                'diagnoseId': this.dataForm.diagnoseId,
                'relationUserId': this.dataForm.relationUserId,
                'doctorType': this.dataForm.doctorType,
                'remark': this.dataForm.remark,
                'count': this.dataForm.count,
                'payTime': this.dataForm.payTime,
                'refundTrackingNum': this.dataForm.refundTrackingNum,
                'refundTrackingCompany': this.dataForm.refundTrackingCompany,
                'refundPrice': this.dataForm.refundPrice,
                'refundCount': this.dataForm.refundCount,
                'refundApplyTime': this.dataForm.refundApplyTime,
                'refundType': this.dataForm.refundType,
                'freight': this.dataForm.freight,
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
