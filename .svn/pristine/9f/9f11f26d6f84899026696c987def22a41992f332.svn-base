<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="sys_user表中的user_id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="sys_user表中的user_id"></el-input>
    </el-form-item>
    <el-form-item label="案例日期" prop="exaDate">
      <el-input v-model="dataForm.exaDate" placeholder="案例日期"></el-input>
    </el-form-item>
    <el-form-item label="案例视频地址" prop="videoUrl">
      <el-input v-model="dataForm.videoUrl" placeholder="案例视频地址"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="orderBy">
      <el-input v-model="dataForm.orderBy" placeholder="排序"></el-input>
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
          exaId: 0,
          userId: '',
          exaDate: '',
          videoUrl: '',
          orderBy: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: 'sys_user表中的user_id不能为空', trigger: 'blur' }
          ],
          exaDate: [
            { required: true, message: '案例日期不能为空', trigger: 'blur' }
          ],
          videoUrl: [
            { required: true, message: '案例视频地址不能为空', trigger: 'blur' }
          ],
          orderBy: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.exaId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.exaId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluserdoctorexample/info/${this.dataForm.exaId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycyluserdoctorexample.userId
                this.dataForm.exaDate = data.ycyluserdoctorexample.exaDate
                this.dataForm.videoUrl = data.ycyluserdoctorexample.videoUrl
                this.dataForm.orderBy = data.ycyluserdoctorexample.orderBy
                this.dataForm.createTime = data.ycyluserdoctorexample.createTime
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
              url: this.$http.adornUrl(`/generator/ycyluserdoctorexample/${!this.dataForm.exaId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'exaId': this.dataForm.exaId || undefined,
                'userId': this.dataForm.userId,
                'exaDate': this.dataForm.exaDate,
                'videoUrl': this.dataForm.videoUrl,
                'orderBy': this.dataForm.orderBy,
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
