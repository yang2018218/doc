<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="userId">
      <el-input v-model="dataForm.userId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="agentId">
      <el-input v-model="dataForm.agentId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="服务订单id" prop="serviceId">
      <el-input v-model="dataForm.serviceId" placeholder="服务订单id"></el-input>
    </el-form-item>
    <el-form-item label="订单表id" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder="订单表id"></el-input>
    </el-form-item>
    <el-form-item label="订单时间" prop="buyTime">
      <el-input v-model="dataForm.buyTime" placeholder="订单时间"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="nikename">
      <el-input v-model="dataForm.nikename" placeholder="用户昵称"></el-input>
    </el-form-item>
    <el-form-item label="用户手机号" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="用户手机号"></el-input>
    </el-form-item>
    <el-form-item label="配送方式字典表中id" prop="deliverWay">
      <el-input v-model="dataForm.deliverWay" placeholder="配送方式字典表中id"></el-input>
    </el-form-item>
    <el-form-item label="订单号" prop="expressNum">
      <el-input v-model="dataForm.expressNum" placeholder="订单号"></el-input>
    </el-form-item>
    <el-form-item label="发货时间" prop="deliverTime">
      <el-input v-model="dataForm.deliverTime" placeholder="发货时间"></el-input>
    </el-form-item>
    <el-form-item label="省份id" prop="provinceId">
      <el-input v-model="dataForm.provinceId" placeholder="省份id"></el-input>
    </el-form-item>
    <el-form-item label="" prop="cityId">
      <el-input v-model="dataForm.cityId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="areaId">
      <el-input v-model="dataForm.areaId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="详细地址"></el-input>
    </el-form-item>
    <el-form-item label="药品价值" prop="orderMoney">
      <el-input v-model="dataForm.orderMoney" placeholder="药品价值"></el-input>
    </el-form-item>
    <el-form-item label="提成金额 保存为分" prop="deductMoney">
      <el-input v-model="dataForm.deductMoney" placeholder="提成金额 保存为分"></el-input>
    </el-form-item>
    <el-form-item label="所属代理商" prop="agentName">
      <el-input v-model="dataForm.agentName" placeholder="所属代理商"></el-input>
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
          pId: 0,
          userId: '',
          agentId: '',
          serviceId: '',
          orderId: '',
          buyTime: '',
          nikename: '',
          mobile: '',
          deliverWay: '',
          expressNum: '',
          deliverTime: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          address: '',
          orderMoney: '',
          deductMoney: '',
          agentName: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          agentId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          serviceId: [
            { required: true, message: '服务订单id不能为空', trigger: 'blur' }
          ],
          orderId: [
            { required: true, message: '订单表id不能为空', trigger: 'blur' }
          ],
          buyTime: [
            { required: true, message: '订单时间不能为空', trigger: 'blur' }
          ],
          nikename: [
            { required: true, message: '用户昵称不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '用户手机号不能为空', trigger: 'blur' }
          ],
          deliverWay: [
            { required: true, message: '配送方式字典表中id不能为空', trigger: 'blur' }
          ],
          expressNum: [
            { required: true, message: '订单号不能为空', trigger: 'blur' }
          ],
          deliverTime: [
            { required: true, message: '发货时间不能为空', trigger: 'blur' }
          ],
          provinceId: [
            { required: true, message: '省份id不能为空', trigger: 'blur' }
          ],
          cityId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          areaId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '详细地址不能为空', trigger: 'blur' }
          ],
          orderMoney: [
            { required: true, message: '药品价值不能为空', trigger: 'blur' }
          ],
          deductMoney: [
            { required: true, message: '提成金额 保存为分不能为空', trigger: 'blur' }
          ],
          agentName: [
            { required: true, message: '所属代理商不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.pId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.pId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylagentperformance/info/${this.dataForm.pId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycylagentperformance.userId
                this.dataForm.agentId = data.ycylagentperformance.agentId
                this.dataForm.serviceId = data.ycylagentperformance.serviceId
                this.dataForm.orderId = data.ycylagentperformance.orderId
                this.dataForm.buyTime = data.ycylagentperformance.buyTime
                this.dataForm.nikename = data.ycylagentperformance.nikename
                this.dataForm.mobile = data.ycylagentperformance.mobile
                this.dataForm.deliverWay = data.ycylagentperformance.deliverWay
                this.dataForm.expressNum = data.ycylagentperformance.expressNum
                this.dataForm.deliverTime = data.ycylagentperformance.deliverTime
                this.dataForm.provinceId = data.ycylagentperformance.provinceId
                this.dataForm.cityId = data.ycylagentperformance.cityId
                this.dataForm.areaId = data.ycylagentperformance.areaId
                this.dataForm.address = data.ycylagentperformance.address
                this.dataForm.orderMoney = data.ycylagentperformance.orderMoney
                this.dataForm.deductMoney = data.ycylagentperformance.deductMoney
                this.dataForm.agentName = data.ycylagentperformance.agentName
                this.dataForm.createTime = data.ycylagentperformance.createTime
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
              url: this.$http.adornUrl(`/generator/ycylagentperformance/${!this.dataForm.pId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'pId': this.dataForm.pId || undefined,
                'userId': this.dataForm.userId,
                'agentId': this.dataForm.agentId,
                'serviceId': this.dataForm.serviceId,
                'orderId': this.dataForm.orderId,
                'buyTime': this.dataForm.buyTime,
                'nikename': this.dataForm.nikename,
                'mobile': this.dataForm.mobile,
                'deliverWay': this.dataForm.deliverWay,
                'expressNum': this.dataForm.expressNum,
                'deliverTime': this.dataForm.deliverTime,
                'provinceId': this.dataForm.provinceId,
                'cityId': this.dataForm.cityId,
                'areaId': this.dataForm.areaId,
                'address': this.dataForm.address,
                'orderMoney': this.dataForm.orderMoney,
                'deductMoney': this.dataForm.deductMoney,
                'agentName': this.dataForm.agentName,
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
