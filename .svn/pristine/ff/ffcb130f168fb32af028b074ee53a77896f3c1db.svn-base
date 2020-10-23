<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户userid"></el-input>
    </el-form-item>
    <el-form-item label="执业开始日期" prop="startDate">
      <el-input v-model="dataForm.startDate" placeholder="执业开始日期"></el-input>
    </el-form-item>
    <el-form-item label="执业结束日期" prop="endDate">
      <el-input v-model="dataForm.endDate" placeholder="执业结束日期"></el-input>
    </el-form-item>
    <el-form-item label="就职单位" prop="company">
      <el-input v-model="dataForm.company" placeholder="就职单位"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="intor">
      <el-input v-model="dataForm.intor" placeholder="简介"></el-input>
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
          expId: 0,
          userId: '',
          startDate: '',
          endDate: '',
          company: '',
          intor: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户userid不能为空', trigger: 'blur' }
          ],
          startDate: [
            { required: true, message: '执业开始日期不能为空', trigger: 'blur' }
          ],
          endDate: [
            { required: true, message: '执业结束日期不能为空', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '就职单位不能为空', trigger: 'blur' }
          ],
          intor: [
            { required: true, message: '简介不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.expId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.expId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluserdoctorexperience/info/${this.dataForm.expId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycyluserdoctorexperience.userId
                this.dataForm.startDate = data.ycyluserdoctorexperience.startDate
                this.dataForm.endDate = data.ycyluserdoctorexperience.endDate
                this.dataForm.company = data.ycyluserdoctorexperience.company
                this.dataForm.intor = data.ycyluserdoctorexperience.intor
                this.dataForm.createTime = data.ycyluserdoctorexperience.createTime
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
              url: this.$http.adornUrl(`/generator/ycyluserdoctorexperience/${!this.dataForm.expId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'expId': this.dataForm.expId || undefined,
                'userId': this.dataForm.userId,
                'startDate': this.dataForm.startDate,
                'endDate': this.dataForm.endDate,
                'company': this.dataForm.company,
                'intor': this.dataForm.intor,
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
