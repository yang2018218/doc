<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="商品id" prop="productId">
      <el-input v-model="dataForm.productId" placeholder="商品id"></el-input>
    </el-form-item>
    <el-form-item label="商品规格id" prop="modelId">
      <el-input v-model="dataForm.modelId" placeholder="商品规格id"></el-input>
    </el-form-item>
    <el-form-item label="商品规格名称" prop="modelName">
      <el-input v-model="dataForm.modelName" placeholder="商品规格名称"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input v-model="dataForm.price" placeholder="商品价格"></el-input>
    </el-form-item>
    <el-form-item label="商品市场价" prop="marketPrice">
      <el-input v-model="dataForm.marketPrice" placeholder="商品市场价"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" prop="count">
      <el-input v-model="dataForm.count" placeholder="商品数量"></el-input>
    </el-form-item>
    <el-form-item label="单位字典表id" prop="units">
      <el-input v-model="dataForm.units" placeholder="单位字典表id"></el-input>
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
          detailId: 0,
          orderId: '',
          productId: '',
          modelId: '',
          modelName: '',
          price: '',
          marketPrice: '',
          count: '',
          units: '',
          createTime: ''
        },
        dataRule: {
          orderId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          productId: [
            { required: true, message: '商品id不能为空', trigger: 'blur' }
          ],
          modelId: [
            { required: true, message: '商品规格id不能为空', trigger: 'blur' }
          ],
          modelName: [
            { required: true, message: '商品规格名称不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '商品价格不能为空', trigger: 'blur' }
          ],
          marketPrice: [
            { required: true, message: '商品市场价不能为空', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '商品数量不能为空', trigger: 'blur' }
          ],
          units: [
            { required: true, message: '单位字典表id不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.detailId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.detailId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylrefundorderdetail/info/${this.dataForm.detailId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderId = data.ycylrefundorderdetail.orderId
                this.dataForm.productId = data.ycylrefundorderdetail.productId
                this.dataForm.modelId = data.ycylrefundorderdetail.modelId
                this.dataForm.modelName = data.ycylrefundorderdetail.modelName
                this.dataForm.price = data.ycylrefundorderdetail.price
                this.dataForm.marketPrice = data.ycylrefundorderdetail.marketPrice
                this.dataForm.count = data.ycylrefundorderdetail.count
                this.dataForm.units = data.ycylrefundorderdetail.units
                this.dataForm.createTime = data.ycylrefundorderdetail.createTime
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
              url: this.$http.adornUrl(`/generator/ycylrefundorderdetail/${!this.dataForm.detailId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'detailId': this.dataForm.detailId || undefined,
                'orderId': this.dataForm.orderId,
                'productId': this.dataForm.productId,
                'modelId': this.dataForm.modelId,
                'modelName': this.dataForm.modelName,
                'price': this.dataForm.price,
                'marketPrice': this.dataForm.marketPrice,
                'count': this.dataForm.count,
                'units': this.dataForm.units,
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
