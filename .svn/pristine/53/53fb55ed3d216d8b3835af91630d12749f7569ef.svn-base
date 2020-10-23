<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="文章标题"></el-input>
    </el-form-item>
    <el-form-item label="封面图片" prop="coverImg">
      <el-input v-model="dataForm.coverImg" placeholder="封面图片"></el-input>
    </el-form-item>
    <el-form-item label="视频地址" prop="videoUrl">
      <el-input v-model="dataForm.videoUrl" placeholder="视频地址"></el-input>
    </el-form-item>
    <el-form-item label="正文内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="正文内容"></el-input>
    </el-form-item>
    <el-form-item label="创建人" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item label="文章类型 1：行情动态 2：畜牧知识" prop="articleType">
      <el-input v-model="dataForm.articleType" placeholder="文章类型 1：行情动态 2：畜牧知识"></el-input>
    </el-form-item>
    <el-form-item label="0下线；1上线 2隐藏" prop="status">
      <el-input v-model="dataForm.status" placeholder="0下线；1上线 2隐藏"></el-input>
    </el-form-item>
    <el-form-item label="动物种类字典表id逗号分隔" prop="poultryType">
      <el-input v-model="dataForm.poultryType" placeholder="动物种类字典表id逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="浏览量" prop="views">
      <el-input v-model="dataForm.views" placeholder="浏览量"></el-input>
    </el-form-item>
    <el-form-item label="评论量" prop="comments">
      <el-input v-model="dataForm.comments" placeholder="评论量"></el-input>
    </el-form-item>
    <el-form-item label="音频播放量" prop="audioPlayback">
      <el-input v-model="dataForm.audioPlayback" placeholder="音频播放量"></el-input>
    </el-form-item>
    <el-form-item label="推荐值 1-100" prop="recommended">
      <el-input v-model="dataForm.recommended" placeholder="推荐值 1-100"></el-input>
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
          marketId: 0,
          title: '',
          coverImg: '',
          videoUrl: '',
          content: '',
          userId: '',
          articleType: '',
          status: '',
          poultryType: '',
          createTime: '',
          views: '',
          comments: '',
          audioPlayback: '',
          recommended: ''
        },
        dataRule: {
          title: [
            { required: true, message: '文章标题不能为空', trigger: 'blur' }
          ],
          coverImg: [
            { required: true, message: '封面图片不能为空', trigger: 'blur' }
          ],
          videoUrl: [
            { required: true, message: '视频地址不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '正文内容不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '创建人不能为空', trigger: 'blur' }
          ],
          articleType: [
            { required: true, message: '文章类型 1：行情动态 2：畜牧知识不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0下线；1上线 2隐藏不能为空', trigger: 'blur' }
          ],
          poultryType: [
            { required: true, message: '动物种类字典表id逗号分隔不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          views: [
            { required: true, message: '浏览量不能为空', trigger: 'blur' }
          ],
          comments: [
            { required: true, message: '评论量不能为空', trigger: 'blur' }
          ],
          audioPlayback: [
            { required: true, message: '音频播放量不能为空', trigger: 'blur' }
          ],
          recommended: [
            { required: true, message: '推荐值 1-100不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.marketId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.marketId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylmarketdynamic/info/${this.dataForm.marketId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.title = data.ycylmarketdynamic.title
                this.dataForm.coverImg = data.ycylmarketdynamic.coverImg
                this.dataForm.videoUrl = data.ycylmarketdynamic.videoUrl
                this.dataForm.content = data.ycylmarketdynamic.content
                this.dataForm.userId = data.ycylmarketdynamic.userId
                this.dataForm.articleType = data.ycylmarketdynamic.articleType
                this.dataForm.status = data.ycylmarketdynamic.status
                this.dataForm.poultryType = data.ycylmarketdynamic.poultryType
                this.dataForm.createTime = data.ycylmarketdynamic.createTime
                this.dataForm.views = data.ycylmarketdynamic.views
                this.dataForm.comments = data.ycylmarketdynamic.comments
                this.dataForm.audioPlayback = data.ycylmarketdynamic.audioPlayback
                this.dataForm.recommended = data.ycylmarketdynamic.recommended
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
              url: this.$http.adornUrl(`/generator/ycylmarketdynamic/${!this.dataForm.marketId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'marketId': this.dataForm.marketId || undefined,
                'title': this.dataForm.title,
                'coverImg': this.dataForm.coverImg,
                'videoUrl': this.dataForm.videoUrl,
                'content': this.dataForm.content,
                'userId': this.dataForm.userId,
                'articleType': this.dataForm.articleType,
                'status': this.dataForm.status,
                'poultryType': this.dataForm.poultryType,
                'createTime': this.dataForm.createTime,
                'views': this.dataForm.views,
                'comments': this.dataForm.comments,
                'audioPlayback': this.dataForm.audioPlayback,
                'recommended': this.dataForm.recommended
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
