<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父级id" prop="pId">
      <el-input v-model="dataForm.pId" placeholder="父级id"></el-input>
    </el-form-item>
    <el-form-item label="产品id" prop="productId">
      <el-input v-model="dataForm.productId" placeholder="产品id"></el-input>
    </el-form-item>
    <el-form-item label="规格id" prop="modelId">
      <el-input v-model="dataForm.modelId" placeholder="规格id"></el-input>
    </el-form-item>
    <el-form-item label="产品名称" prop="productName">
      <el-input v-model="dataForm.productName" placeholder="产品名称"></el-input>
    </el-form-item>
    <el-form-item label="规格名称" prop="modelName">
      <el-input v-model="dataForm.modelName" placeholder="规格名称"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="count">
      <el-input v-model="dataForm.count" placeholder="数量"></el-input>
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
          prId: 0,
          pId: '',
          productId: '',
          modelId: '',
          productName: '',
          modelName: '',
          count: '',
          createTime: ''
        },
        dataRule: {
          pId: [
            { required: true, message: '父级id不能为空', trigger: 'blur' }
          ],
          productId: [
            { required: true, message: '产品id不能为空', trigger: 'blur' }
          ],
          modelId: [
            { required: true, message: '规格id不能为空', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '产品名称不能为空', trigger: 'blur' }
          ],
          modelName: [
            { required: true, message: '规格名称不能为空', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.prId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.prId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluserperformanceproduct/info/${this.dataForm.prId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.pId = data.ycyluserperformanceproduct.pId
                this.dataForm.productId = data.ycyluserperformanceproduct.productId
                this.dataForm.modelId = data.ycyluserperformanceproduct.modelId
                this.dataForm.productName = data.ycyluserperformanceproduct.productName
                this.dataForm.modelName = data.ycyluserperformanceproduct.modelName
                this.dataForm.count = data.ycyluserperformanceproduct.count
                this.dataForm.createTime = data.ycyluserperformanceproduct.createTime
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
              url: this.$http.adornUrl(`/generator/ycyluserperformanceproduct/${!this.dataForm.prId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'prId': this.dataForm.prId || undefined,
                'pId': this.dataForm.pId,
                'productId': this.dataForm.productId,
                'modelId': this.dataForm.modelId,
                'productName': this.dataForm.productName,
                'modelName': this.dataForm.modelName,
                'count': this.dataForm.count,
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
