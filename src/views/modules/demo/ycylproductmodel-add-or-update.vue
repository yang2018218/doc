<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父表id  ycyl_product 表中id" prop="productId">
      <el-input v-model="dataForm.productId" placeholder="父表id  ycyl_product 表中id"></el-input>
    </el-form-item>
    <el-form-item label="主仓规格表ycyl_main_product_model 中model_id" prop="mainModelId">
      <el-input v-model="dataForm.mainModelId" placeholder="主仓规格表ycyl_main_product_model 中model_id"></el-input>
    </el-form-item>
    <el-form-item label="规格名称" prop="modelName">
      <el-input v-model="dataForm.modelName" placeholder="规格名称"></el-input>
    </el-form-item>
    <el-form-item label="产品售价" prop="price">
      <el-input v-model="dataForm.price" placeholder="产品售价"></el-input>
    </el-form-item>
    <el-form-item label="产品市场价" prop="marketPrice">
      <el-input v-model="dataForm.marketPrice" placeholder="产品市场价"></el-input>
    </el-form-item>
    <el-form-item label="计量单位" prop="units">
      <el-input v-model="dataForm.units" placeholder="计量单位"></el-input>
    </el-form-item>
    <el-form-item label="规格状态 0隐藏；1显示" prop="status">
      <el-input v-model="dataForm.status" placeholder="规格状态 0隐藏；1显示"></el-input>
    </el-form-item>
    <el-form-item label="创建人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="创建人userid"></el-input>
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
          modelId: 0,
          productId: '',
          mainModelId: '',
          modelName: '',
          price: '',
          marketPrice: '',
          units: '',
          status: '',
          userId: '',
          createTime: ''
        },
        dataRule: {
          productId: [
            { required: true, message: '父表id  ycyl_product 表中id不能为空', trigger: 'blur' }
          ],
          mainModelId: [
            { required: true, message: '主仓规格表ycyl_main_product_model 中model_id不能为空', trigger: 'blur' }
          ],
          modelName: [
            { required: true, message: '规格名称不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '产品售价不能为空', trigger: 'blur' }
          ],
          marketPrice: [
            { required: true, message: '产品市场价不能为空', trigger: 'blur' }
          ],
          units: [
            { required: true, message: '计量单位不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '规格状态 0隐藏；1显示不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '创建人userid不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.modelId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.modelId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylproductmodel/info/${this.dataForm.modelId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.productId = data.ycylproductmodel.productId
                this.dataForm.mainModelId = data.ycylproductmodel.mainModelId
                this.dataForm.modelName = data.ycylproductmodel.modelName
                this.dataForm.price = data.ycylproductmodel.price
                this.dataForm.marketPrice = data.ycylproductmodel.marketPrice
                this.dataForm.units = data.ycylproductmodel.units
                this.dataForm.status = data.ycylproductmodel.status
                this.dataForm.userId = data.ycylproductmodel.userId
                this.dataForm.createTime = data.ycylproductmodel.createTime
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
              url: this.$http.adornUrl(`/generator/ycylproductmodel/${!this.dataForm.modelId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'modelId': this.dataForm.modelId || undefined,
                'productId': this.dataForm.productId,
                'mainModelId': this.dataForm.mainModelId,
                'modelName': this.dataForm.modelName,
                'price': this.dataForm.price,
                'marketPrice': this.dataForm.marketPrice,
                'units': this.dataForm.units,
                'status': this.dataForm.status,
                'userId': this.dataForm.userId,
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
