<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父表id" prop="mainId">
      <el-input v-model="dataForm.mainId" placeholder="父表id"></el-input>
    </el-form-item>
    <el-form-item label="规格名称" prop="modelName">
      <el-input v-model="dataForm.modelName" placeholder="规格名称"></el-input>
    </el-form-item>
    <el-form-item label="字典表id逗号分隔 计量单位" prop="units">
      <el-input v-model="dataForm.units" placeholder="字典表id逗号分隔 计量单位"></el-input>
    </el-form-item>
    <el-form-item label="主仓警戒线" prop="mainWarningLine">
      <el-input v-model="dataForm.mainWarningLine" placeholder="主仓警戒线"></el-input>
    </el-form-item>
    <el-form-item label="一级代理商警戒线" prop="oneWarningLine">
      <el-input v-model="dataForm.oneWarningLine" placeholder="一级代理商警戒线"></el-input>
    </el-form-item>
    <el-form-item label="二级代理商警戒线" prop="twoWarningLine">
      <el-input v-model="dataForm.twoWarningLine" placeholder="二级代理商警戒线"></el-input>
    </el-form-item>
    <el-form-item label="库存" prop="count">
      <el-input v-model="dataForm.count" placeholder="库存"></el-input>
    </el-form-item>
    <el-form-item label="库位" prop="place">
      <el-input v-model="dataForm.place" placeholder="库位"></el-input>
    </el-form-item>
    <el-form-item label="生产厂家" prop="manufacturer">
      <el-input v-model="dataForm.manufacturer" placeholder="生产厂家"></el-input>
    </el-form-item>
    <el-form-item label="规格状态 0隐藏；1显示" prop="status">
      <el-input v-model="dataForm.status" placeholder="规格状态 0隐藏；1显示"></el-input>
    </el-form-item>
    <el-form-item label="创建人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="创建人userid"></el-input>
    </el-form-item>
    <el-form-item label="发布时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="发布时间"></el-input>
    </el-form-item>
    <el-form-item label="库存状态 0正常 1缺货" prop="inventoryStatus">
      <el-input v-model="dataForm.inventoryStatus" placeholder="库存状态 0正常 1缺货"></el-input>
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
          mainId: '',
          modelName: '',
          units: '',
          mainWarningLine: '',
          oneWarningLine: '',
          twoWarningLine: '',
          count: '',
          place: '',
          manufacturer: '',
          status: '',
          userId: '',
          createTime: '',
          inventoryStatus: ''
        },
        dataRule: {
          mainId: [
            { required: true, message: '父表id不能为空', trigger: 'blur' }
          ],
          modelName: [
            { required: true, message: '规格名称不能为空', trigger: 'blur' }
          ],
          units: [
            { required: true, message: '字典表id逗号分隔 计量单位不能为空', trigger: 'blur' }
          ],
          mainWarningLine: [
            { required: true, message: '主仓警戒线不能为空', trigger: 'blur' }
          ],
          oneWarningLine: [
            { required: true, message: '一级代理商警戒线不能为空', trigger: 'blur' }
          ],
          twoWarningLine: [
            { required: true, message: '二级代理商警戒线不能为空', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '库存不能为空', trigger: 'blur' }
          ],
          place: [
            { required: true, message: '库位不能为空', trigger: 'blur' }
          ],
          manufacturer: [
            { required: true, message: '生产厂家不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '规格状态 0隐藏；1显示不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '创建人userid不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '发布时间不能为空', trigger: 'blur' }
          ],
          inventoryStatus: [
            { required: true, message: '库存状态 0正常 1缺货不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/ycylmainproductmodel/info/${this.dataForm.modelId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.mainId = data.ycylmainproductmodel.mainId
                this.dataForm.modelName = data.ycylmainproductmodel.modelName
                this.dataForm.units = data.ycylmainproductmodel.units
                this.dataForm.mainWarningLine = data.ycylmainproductmodel.mainWarningLine
                this.dataForm.oneWarningLine = data.ycylmainproductmodel.oneWarningLine
                this.dataForm.twoWarningLine = data.ycylmainproductmodel.twoWarningLine
                this.dataForm.count = data.ycylmainproductmodel.count
                this.dataForm.place = data.ycylmainproductmodel.place
                this.dataForm.manufacturer = data.ycylmainproductmodel.manufacturer
                this.dataForm.status = data.ycylmainproductmodel.status
                this.dataForm.userId = data.ycylmainproductmodel.userId
                this.dataForm.createTime = data.ycylmainproductmodel.createTime
                this.dataForm.inventoryStatus = data.ycylmainproductmodel.inventoryStatus
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
              url: this.$http.adornUrl(`/generator/ycylmainproductmodel/${!this.dataForm.modelId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'modelId': this.dataForm.modelId || undefined,
                'mainId': this.dataForm.mainId,
                'modelName': this.dataForm.modelName,
                'units': this.dataForm.units,
                'mainWarningLine': this.dataForm.mainWarningLine,
                'oneWarningLine': this.dataForm.oneWarningLine,
                'twoWarningLine': this.dataForm.twoWarningLine,
                'count': this.dataForm.count,
                'place': this.dataForm.place,
                'manufacturer': this.dataForm.manufacturer,
                'status': this.dataForm.status,
                'userId': this.dataForm.userId,
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
