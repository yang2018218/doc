<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="文章模块类型 1.行情动态；2.畜牧知识；3.市场行情" prop="articleType">
      <el-input v-model="dataForm.articleType" placeholder="文章模块类型 1.行情动态；2.畜牧知识；3.市场行情"></el-input>
    </el-form-item>
    <el-form-item label="文章id" prop="articleId">
      <el-input v-model="dataForm.articleId" placeholder="文章id"></el-input>
    </el-form-item>
    <el-form-item label="浏览人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="浏览人userid"></el-input>
    </el-form-item>
    <el-form-item label="浏览时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="浏览时间"></el-input>
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
          viewId: 0,
          articleType: '',
          articleId: '',
          userId: '',
          createTime: ''
        },
        dataRule: {
          articleType: [
            { required: true, message: '文章模块类型 1.行情动态；2.畜牧知识；3.市场行情不能为空', trigger: 'blur' }
          ],
          articleId: [
            { required: true, message: '文章id不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '浏览人userid不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '浏览时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.viewId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.viewId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylpageview/info/${this.dataForm.viewId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.articleType = data.ycylpageview.articleType
                this.dataForm.articleId = data.ycylpageview.articleId
                this.dataForm.userId = data.ycylpageview.userId
                this.dataForm.createTime = data.ycylpageview.createTime
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
              url: this.$http.adornUrl(`/generator/ycylpageview/${!this.dataForm.viewId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'viewId': this.dataForm.viewId || undefined,
                'articleType': this.dataForm.articleType,
                'articleId': this.dataForm.articleId,
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
