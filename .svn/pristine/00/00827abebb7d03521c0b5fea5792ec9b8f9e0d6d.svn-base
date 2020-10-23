<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商品规格id" prop="modelId">
      <el-input v-model="dataForm.modelId" placeholder="商品规格id"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="count">
      <el-input v-model="dataForm.count" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="用户id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="购物车类型1:一键生成的商品；2：自选商品" prop="cartType">
      <el-input v-model="dataForm.cartType" placeholder="购物车类型1:一键生成的商品；2：自选商品"></el-input>
    </el-form-item>
    <el-form-item label="购物车中商品是否选中 0未选中 1选中" prop="isChecked">
      <el-input v-model="dataForm.isChecked" placeholder="购物车中商品是否选中 0未选中 1选中"></el-input>
    </el-form-item>
    <el-form-item label="药单id 药品订单号 不是主键id" prop="prescriptionId">
      <el-input v-model="dataForm.prescriptionId" placeholder="药单id 药品订单号 不是主键id"></el-input>
    </el-form-item>
    <el-form-item label="诊疗医生" prop="truename">
      <el-input v-model="dataForm.truename" placeholder="诊疗医生"></el-input>
    </el-form-item>
    <el-form-item label="接诊专家或医生userid" prop="doctorUserId">
      <el-input v-model="dataForm.doctorUserId" placeholder="接诊专家或医生userid"></el-input>
    </el-form-item>
    <el-form-item label="接诊者类型 1医生2专家" prop="doctorType">
      <el-input v-model="dataForm.doctorType" placeholder="接诊者类型 1医生2专家"></el-input>
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
          cartId: 0,
          modelId: '',
          count: '',
          userId: '',
          cartType: '',
          isChecked: '',
          prescriptionId: '',
          truename: '',
          doctorUserId: '',
          doctorType: '',
          createTime: ''
        },
        dataRule: {
          modelId: [
            { required: true, message: '商品规格id不能为空', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          cartType: [
            { required: true, message: '购物车类型1:一键生成的商品；2：自选商品不能为空', trigger: 'blur' }
          ],
          isChecked: [
            { required: true, message: '购物车中商品是否选中 0未选中 1选中不能为空', trigger: 'blur' }
          ],
          prescriptionId: [
            { required: true, message: '药单id 药品订单号 不是主键id不能为空', trigger: 'blur' }
          ],
          truename: [
            { required: true, message: '诊疗医生不能为空', trigger: 'blur' }
          ],
          doctorUserId: [
            { required: true, message: '接诊专家或医生userid不能为空', trigger: 'blur' }
          ],
          doctorType: [
            { required: true, message: '接诊者类型 1医生2专家不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.cartId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.cartId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylcart/info/${this.dataForm.cartId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.modelId = data.ycylcart.modelId
                this.dataForm.count = data.ycylcart.count
                this.dataForm.userId = data.ycylcart.userId
                this.dataForm.cartType = data.ycylcart.cartType
                this.dataForm.isChecked = data.ycylcart.isChecked
                this.dataForm.prescriptionId = data.ycylcart.prescriptionId
                this.dataForm.truename = data.ycylcart.truename
                this.dataForm.doctorUserId = data.ycylcart.doctorUserId
                this.dataForm.doctorType = data.ycylcart.doctorType
                this.dataForm.createTime = data.ycylcart.createTime
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
              url: this.$http.adornUrl(`/generator/ycylcart/${!this.dataForm.cartId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'cartId': this.dataForm.cartId || undefined,
                'modelId': this.dataForm.modelId,
                'count': this.dataForm.count,
                'userId': this.dataForm.userId,
                'cartType': this.dataForm.cartType,
                'isChecked': this.dataForm.isChecked,
                'prescriptionId': this.dataForm.prescriptionId,
                'truename': this.dataForm.truename,
                'doctorUserId': this.dataForm.doctorUserId,
                'doctorType': this.dataForm.doctorType,
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
