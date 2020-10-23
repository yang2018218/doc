<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="产品名称" prop="productName">
      <el-input v-model="dataForm.productName" placeholder="产品名称"></el-input>
    </el-form-item>
    <el-form-item label="适用种类 汉字 用逗号分隔" prop="fitKind">
      <el-input v-model="dataForm.fitKind" placeholder="适用种类 汉字 用逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="功能分类  存汉字 逗号隔开" prop="productType">
      <el-input v-model="dataForm.productType" placeholder="功能分类  存汉字 逗号隔开"></el-input>
    </el-form-item>
    <el-form-item label="创建人" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="货品总储量" prop="totalReserves">
      <el-input v-model="dataForm.totalReserves" placeholder="货品总储量"></el-input>
    </el-form-item>
    <el-form-item label="库存状态 0正常  1缺货 与子表一致 同时修改" prop="inventoryStatus">
      <el-input v-model="dataForm.inventoryStatus" placeholder="库存状态 0正常  1缺货 与子表一致 同时修改"></el-input>
    </el-form-item>
    <el-form-item label="规格状态 0隐藏；1显示" prop="status">
      <el-input v-model="dataForm.status" placeholder="规格状态 0隐藏；1显示"></el-input>
    </el-form-item>
    <el-form-item label="商品id 与代理商仓库商品id一致" prop="goodsId">
      <el-input v-model="dataForm.goodsId" placeholder="商品id 与代理商仓库商品id一致"></el-input>
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
          mainId: 0,
          productName: '',
          fitKind: '',
          productType: '',
          userId: '',
          createTime: '',
          totalReserves: '',
          inventoryStatus: '',
          status: '',
          goodsId: ''
        },
        dataRule: {
          productName: [
            { required: true, message: '产品名称不能为空', trigger: 'blur' }
          ],
          fitKind: [
            { required: true, message: '适用种类 汉字 用逗号分隔不能为空', trigger: 'blur' }
          ],
          productType: [
            { required: true, message: '功能分类  存汉字 逗号隔开不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '创建人不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          totalReserves: [
            { required: true, message: '货品总储量不能为空', trigger: 'blur' }
          ],
          inventoryStatus: [
            { required: true, message: '库存状态 0正常  1缺货 与子表一致 同时修改不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '规格状态 0隐藏；1显示不能为空', trigger: 'blur' }
          ],
          goodsId: [
            { required: true, message: '商品id 与代理商仓库商品id一致不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.mainId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.mainId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylmainproduct/info/${this.dataForm.mainId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.productName = data.ycylmainproduct.productName
                this.dataForm.fitKind = data.ycylmainproduct.fitKind
                this.dataForm.productType = data.ycylmainproduct.productType
                this.dataForm.userId = data.ycylmainproduct.userId
                this.dataForm.createTime = data.ycylmainproduct.createTime
                this.dataForm.totalReserves = data.ycylmainproduct.totalReserves
                this.dataForm.inventoryStatus = data.ycylmainproduct.inventoryStatus
                this.dataForm.status = data.ycylmainproduct.status
                this.dataForm.goodsId = data.ycylmainproduct.goodsId
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
              url: this.$http.adornUrl(`/generator/ycylmainproduct/${!this.dataForm.mainId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'mainId': this.dataForm.mainId || undefined,
                'productName': this.dataForm.productName,
                'fitKind': this.dataForm.fitKind,
                'productType': this.dataForm.productType,
                'userId': this.dataForm.userId,
                'createTime': this.dataForm.createTime,
                'totalReserves': this.dataForm.totalReserves,
                'inventoryStatus': this.dataForm.inventoryStatus,
                'status': this.dataForm.status,
                'goodsId': this.dataForm.goodsId
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
