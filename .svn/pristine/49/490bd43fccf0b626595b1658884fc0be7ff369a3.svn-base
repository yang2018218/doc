<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="主仓表中id" prop="mainId">
      <el-input v-model="dataForm.mainId" placeholder="主仓表中id"></el-input>
    </el-form-item>
    <el-form-item label="sys_user表中的id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="sys_user表中的id"></el-input>
    </el-form-item>
    <el-form-item label="ycyl_user_agent表中的id" prop="agentId">
      <el-input v-model="dataForm.agentId" placeholder="ycyl_user_agent表中的id"></el-input>
    </el-form-item>
    <el-form-item label="适用种类 字典表中id逗号分隔" prop="fitKind">
      <el-input v-model="dataForm.fitKind" placeholder="适用种类 字典表中id逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="产品种类" prop="productType">
      <el-input v-model="dataForm.productType" placeholder="产品种类"></el-input>
    </el-form-item>
    <el-form-item label="创建人用户id" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建人用户id"></el-input>
    </el-form-item>
    <el-form-item label="发布时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="发布时间"></el-input>
    </el-form-item>
    <el-form-item label="总储量" prop="totalReserves">
      <el-input v-model="dataForm.totalReserves" placeholder="总储量"></el-input>
    </el-form-item>
    <el-form-item label="库存状态 1正常  0 缺货 与子表一致 同时修改" prop="inventoryStatus">
      <el-input v-model="dataForm.inventoryStatus" placeholder="库存状态 1正常  0 缺货 与子表一致 同时修改"></el-input>
    </el-form-item>
    <el-form-item label="产品总价值" prop="totalValue">
      <el-input v-model="dataForm.totalValue" placeholder="产品总价值"></el-input>
    </el-form-item>
    <el-form-item label="商品id 于主仓商品id一致" prop="goodsId">
      <el-input v-model="dataForm.goodsId" placeholder="商品id 于主仓商品id一致"></el-input>
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
          wId: 0,
          mainId: '',
          userId: '',
          agentId: '',
          fitKind: '',
          productType: '',
          createUserId: '',
          createTime: '',
          totalReserves: '',
          inventoryStatus: '',
          totalValue: '',
          goodsId: ''
        },
        dataRule: {
          mainId: [
            { required: true, message: '主仓表中id不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: 'sys_user表中的id不能为空', trigger: 'blur' }
          ],
          agentId: [
            { required: true, message: 'ycyl_user_agent表中的id不能为空', trigger: 'blur' }
          ],
          fitKind: [
            { required: true, message: '适用种类 字典表中id逗号分隔不能为空', trigger: 'blur' }
          ],
          productType: [
            { required: true, message: '产品种类不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建人用户id不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '发布时间不能为空', trigger: 'blur' }
          ],
          totalReserves: [
            { required: true, message: '总储量不能为空', trigger: 'blur' }
          ],
          inventoryStatus: [
            { required: true, message: '库存状态 1正常  0 缺货 与子表一致 同时修改不能为空', trigger: 'blur' }
          ],
          totalValue: [
            { required: true, message: '产品总价值不能为空', trigger: 'blur' }
          ],
          goodsId: [
            { required: true, message: '商品id 于主仓商品id一致不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.wId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.wId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylagentwproduct/info/${this.dataForm.wId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.mainId = data.ycylagentwproduct.mainId
                this.dataForm.userId = data.ycylagentwproduct.userId
                this.dataForm.agentId = data.ycylagentwproduct.agentId
                this.dataForm.fitKind = data.ycylagentwproduct.fitKind
                this.dataForm.productType = data.ycylagentwproduct.productType
                this.dataForm.createUserId = data.ycylagentwproduct.createUserId
                this.dataForm.createTime = data.ycylagentwproduct.createTime
                this.dataForm.totalReserves = data.ycylagentwproduct.totalReserves
                this.dataForm.inventoryStatus = data.ycylagentwproduct.inventoryStatus
                this.dataForm.totalValue = data.ycylagentwproduct.totalValue
                this.dataForm.goodsId = data.ycylagentwproduct.goodsId
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
              url: this.$http.adornUrl(`/generator/ycylagentwproduct/${!this.dataForm.wId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'wId': this.dataForm.wId || undefined,
                'mainId': this.dataForm.mainId,
                'userId': this.dataForm.userId,
                'agentId': this.dataForm.agentId,
                'fitKind': this.dataForm.fitKind,
                'productType': this.dataForm.productType,
                'createUserId': this.dataForm.createUserId,
                'createTime': this.dataForm.createTime,
                'totalReserves': this.dataForm.totalReserves,
                'inventoryStatus': this.dataForm.inventoryStatus,
                'totalValue': this.dataForm.totalValue,
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
