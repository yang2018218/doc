<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="1.行情动态；2.畜牧知识；3.市场行情；4.畜牧圈" prop="articleType">
      <el-input v-model="dataForm.articleType" placeholder="1.行情动态；2.畜牧知识；3.市场行情；4.畜牧圈"></el-input>
    </el-form-item>
    <el-form-item label="文章id" prop="articleId">
      <el-input v-model="dataForm.articleId" placeholder="文章id"></el-input>
    </el-form-item>
    <el-form-item label="评论内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="评论内容"></el-input>
    </el-form-item>
    <el-form-item label="父级userid" prop="parentUserId">
      <el-input v-model="dataForm.parentUserId" placeholder="父级userid"></el-input>
    </el-form-item>
    <el-form-item label="审核状态 0审核未通过1审核通过" prop="status">
      <el-input v-model="dataForm.status" placeholder="审核状态 0审核未通过1审核通过"></el-input>
    </el-form-item>
    <el-form-item label="动物种类字典表id逗号分隔" prop="poultryType">
      <el-input v-model="dataForm.poultryType" placeholder="动物种类字典表id逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="评论人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="评论人userid"></el-input>
    </el-form-item>
    <el-form-item label="评论时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="评论时间"></el-input>
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
          commentId: 0,
          articleType: '',
          articleId: '',
          content: '',
          parentUserId: '',
          status: '',
          poultryType: '',
          userId: '',
          createTime: ''
        },
        dataRule: {
          articleType: [
            { required: true, message: '1.行情动态；2.畜牧知识；3.市场行情；4.畜牧圈不能为空', trigger: 'blur' }
          ],
          articleId: [
            { required: true, message: '文章id不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '评论内容不能为空', trigger: 'blur' }
          ],
          parentUserId: [
            { required: true, message: '父级userid不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '审核状态 0审核未通过1审核通过不能为空', trigger: 'blur' }
          ],
          poultryType: [
            { required: true, message: '动物种类字典表id逗号分隔不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '评论人userid不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '评论时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.commentId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.commentId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylcommentrecord/info/${this.dataForm.commentId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.articleType = data.ycylcommentrecord.articleType
                this.dataForm.articleId = data.ycylcommentrecord.articleId
                this.dataForm.content = data.ycylcommentrecord.content
                this.dataForm.parentUserId = data.ycylcommentrecord.parentUserId
                this.dataForm.status = data.ycylcommentrecord.status
                this.dataForm.poultryType = data.ycylcommentrecord.poultryType
                this.dataForm.userId = data.ycylcommentrecord.userId
                this.dataForm.createTime = data.ycylcommentrecord.createTime
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
              url: this.$http.adornUrl(`/generator/ycylcommentrecord/${!this.dataForm.commentId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'commentId': this.dataForm.commentId || undefined,
                'articleType': this.dataForm.articleType,
                'articleId': this.dataForm.articleId,
                'content': this.dataForm.content,
                'parentUserId': this.dataForm.parentUserId,
                'status': this.dataForm.status,
                'poultryType': this.dataForm.poultryType,
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
