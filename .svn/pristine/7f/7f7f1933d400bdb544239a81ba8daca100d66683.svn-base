<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="发布人userid" prop="issuserUserId">
      <el-input v-model="dataForm.issuserUserId" placeholder="发布人userid"></el-input>
    </el-form-item>
    <el-form-item label="关注人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="关注人userid"></el-input>
    </el-form-item>
    <el-form-item label="关注类型 1:行情动态，2：畜牧知识 ，3市场行情；4:畜牧圈" prop="cocusType">
      <el-input v-model="dataForm.cocusType" placeholder="关注类型 1:行情动态，2：畜牧知识 ，3市场行情；4:畜牧圈"></el-input>
    </el-form-item>
    <el-form-item label="关注时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="关注时间"></el-input>
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
          circleId: 0,
          issuserUserId: '',
          userId: '',
          cocusType: '',
          createTime: ''
        },
        dataRule: {
          issuserUserId: [
            { required: true, message: '发布人userid不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '关注人userid不能为空', trigger: 'blur' }
          ],
          cocusType: [
            { required: true, message: '关注类型 1:行情动态，2：畜牧知识 ，3市场行情；4:畜牧圈不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '关注时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.circleId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.circleId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylfocuscircle/info/${this.dataForm.circleId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.issuserUserId = data.ycylfocuscircle.issuserUserId
                this.dataForm.userId = data.ycylfocuscircle.userId
                this.dataForm.cocusType = data.ycylfocuscircle.cocusType
                this.dataForm.createTime = data.ycylfocuscircle.createTime
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
              url: this.$http.adornUrl(`/generator/ycylfocuscircle/${!this.dataForm.circleId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'circleId': this.dataForm.circleId || undefined,
                'issuserUserId': this.dataForm.issuserUserId,
                'userId': this.dataForm.userId,
                'cocusType': this.dataForm.cocusType,
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
