<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="分享人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="分享人userid"></el-input>
    </el-form-item>
    <el-form-item label="1:行情动态，2：畜牧知识 3:畜牧圈" prop="shareType">
      <el-input v-model="dataForm.shareType" placeholder="1:行情动态，2：畜牧知识 3:畜牧圈"></el-input>
    </el-form-item>
    <el-form-item label="文章id" prop="marketId">
      <el-input v-model="dataForm.marketId" placeholder="文章id"></el-input>
    </el-form-item>
    <el-form-item label="分享时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="分享时间"></el-input>
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
          recordId: 0,
          userId: '',
          shareType: '',
          marketId: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '分享人userid不能为空', trigger: 'blur' }
          ],
          shareType: [
            { required: true, message: '1:行情动态，2：畜牧知识 3:畜牧圈不能为空', trigger: 'blur' }
          ],
          marketId: [
            { required: true, message: '文章id不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '分享时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.recordId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.recordId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylsharerecord/info/${this.dataForm.recordId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycylsharerecord.userId
                this.dataForm.shareType = data.ycylsharerecord.shareType
                this.dataForm.marketId = data.ycylsharerecord.marketId
                this.dataForm.createTime = data.ycylsharerecord.createTime
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
              url: this.$http.adornUrl(`/generator/ycylsharerecord/${!this.dataForm.recordId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'recordId': this.dataForm.recordId || undefined,
                'userId': this.dataForm.userId,
                'shareType': this.dataForm.shareType,
                'marketId': this.dataForm.marketId,
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
