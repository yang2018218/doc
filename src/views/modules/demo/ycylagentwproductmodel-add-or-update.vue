<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父表id ycyl_agent_w_product表中id" prop="wId">
      <el-input v-model="dataForm.wId" placeholder="父表id ycyl_agent_w_product表中id"></el-input>
    </el-form-item>
    <el-form-item label="主仓规格id ycyl_main_product_model 表中model_id" prop="mainModelId">
      <el-input v-model="dataForm.mainModelId" placeholder="主仓规格id ycyl_main_product_model 表中model_id"></el-input>
    </el-form-item>
    <el-form-item label="规格名称" prop="modelName">
      <el-input v-model="dataForm.modelName" placeholder="规格名称"></el-input>
    </el-form-item>
    <el-form-item label="字典表id" prop="units">
      <el-input v-model="dataForm.units" placeholder="字典表id"></el-input>
    </el-form-item>
    <el-form-item label="库存" prop="count">
      <el-input v-model="dataForm.count" placeholder="库存"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="库存状态 1正常  0 缺货 与子表一致 同时修改" prop="inventoryStatus">
      <el-input v-model="dataForm.inventoryStatus" placeholder="库存状态 1正常  0 缺货 与子表一致 同时修改"></el-input>
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
          wId: '',
          mainModelId: '',
          modelName: '',
          units: '',
          count: '',
          createTime: '',
          inventoryStatus: ''
        },
        dataRule: {
          wId: [
            { required: true, message: '父表id ycyl_agent_w_product表中id不能为空', trigger: 'blur' }
          ],
          mainModelId: [
            { required: true, message: '主仓规格id ycyl_main_product_model 表中model_id不能为空', trigger: 'blur' }
          ],
          modelName: [
            { required: true, message: '规格名称不能为空', trigger: 'blur' }
          ],
          units: [
            { required: true, message: '字典表id不能为空', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '库存不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          inventoryStatus: [
            { required: true, message: '库存状态 1正常  0 缺货 与子表一致 同时修改不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/ycylagentwproductmodel/info/${this.dataForm.modelId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.wId = data.ycylagentwproductmodel.wId
                this.dataForm.mainModelId = data.ycylagentwproductmodel.mainModelId
                this.dataForm.modelName = data.ycylagentwproductmodel.modelName
                this.dataForm.units = data.ycylagentwproductmodel.units
                this.dataForm.count = data.ycylagentwproductmodel.count
                this.dataForm.createTime = data.ycylagentwproductmodel.createTime
                this.dataForm.inventoryStatus = data.ycylagentwproductmodel.inventoryStatus
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
              url: this.$http.adornUrl(`/generator/ycylagentwproductmodel/${!this.dataForm.modelId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'modelId': this.dataForm.modelId || undefined,
                'wId': this.dataForm.wId,
                'mainModelId': this.dataForm.mainModelId,
                'modelName': this.dataForm.modelName,
                'units': this.dataForm.units,
                'count': this.dataForm.count,
                'createTime': this.dataForm.createTime,
                'inventoryStatus': this.dataForm.inventoryStatus
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
