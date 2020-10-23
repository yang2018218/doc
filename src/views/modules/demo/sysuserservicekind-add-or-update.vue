<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户userid"></el-input>
    </el-form-item>
    <el-form-item label="动物种类字典表中的id" prop="kindId">
      <el-input v-model="dataForm.kindId" placeholder="动物种类字典表中的id"></el-input>
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
          kId: 0,
          userId: '',
          kindId: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户userid不能为空', trigger: 'blur' }
          ],
          kindId: [
            { required: true, message: '动物种类字典表中的id不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.kId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.kId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/sysuserservicekind/info/${this.dataForm.kId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.sysuserservicekind.userId
                this.dataForm.kindId = data.sysuserservicekind.kindId
                this.dataForm.createTime = data.sysuserservicekind.createTime
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
              url: this.$http.adornUrl(`/generator/sysuserservicekind/${!this.dataForm.kId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'kId': this.dataForm.kId || undefined,
                'userId': this.dataForm.userId,
                'kindId': this.dataForm.kindId,
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
