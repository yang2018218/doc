<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="内容"></el-input>
    </el-form-item>
    <el-form-item label="发布人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="发布人userid"></el-input>
    </el-form-item>
    <el-form-item label="0下线1上线" prop="status">
      <el-input v-model="dataForm.status" placeholder="0下线1上线"></el-input>
    </el-form-item>
    <el-form-item label="分享次数" prop="shareNum">
      <el-input v-model="dataForm.shareNum" placeholder="分享次数"></el-input>
    </el-form-item>
    <el-form-item label="评论次数" prop="commentNum">
      <el-input v-model="dataForm.commentNum" placeholder="评论次数"></el-input>
    </el-form-item>
    <el-form-item label="点赞次数" prop="likeNum">
      <el-input v-model="dataForm.likeNum" placeholder="点赞次数"></el-input>
    </el-form-item>
    <el-form-item label="发布时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="发布时间"></el-input>
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
          cId: 0,
          content: '',
          userId: '',
          status: '',
          shareNum: '',
          commentNum: '',
          likeNum: '',
          createTime: ''
        },
        dataRule: {
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '发布人userid不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0下线1上线不能为空', trigger: 'blur' }
          ],
          shareNum: [
            { required: true, message: '分享次数不能为空', trigger: 'blur' }
          ],
          commentNum: [
            { required: true, message: '评论次数不能为空', trigger: 'blur' }
          ],
          likeNum: [
            { required: true, message: '点赞次数不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '发布时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.cId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.cId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylpoultrycircle/info/${this.dataForm.cId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.content = data.ycylpoultrycircle.content
                this.dataForm.userId = data.ycylpoultrycircle.userId
                this.dataForm.status = data.ycylpoultrycircle.status
                this.dataForm.shareNum = data.ycylpoultrycircle.shareNum
                this.dataForm.commentNum = data.ycylpoultrycircle.commentNum
                this.dataForm.likeNum = data.ycylpoultrycircle.likeNum
                this.dataForm.createTime = data.ycylpoultrycircle.createTime
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
              url: this.$http.adornUrl(`/generator/ycylpoultrycircle/${!this.dataForm.cId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'cId': this.dataForm.cId || undefined,
                'content': this.dataForm.content,
                'userId': this.dataForm.userId,
                'status': this.dataForm.status,
                'shareNum': this.dataForm.shareNum,
                'commentNum': this.dataForm.commentNum,
                'likeNum': this.dataForm.likeNum,
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
