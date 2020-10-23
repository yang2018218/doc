<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="sys_user表中的id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="sys_user表中的id"></el-input>
    </el-form-item>
    <el-form-item label="养殖规模 字典表中的id" prop="scaleId">
      <el-input v-model="dataForm.scaleId" placeholder="养殖规模 字典表中的id"></el-input>
    </el-form-item>
    <el-form-item label="养殖种类" prop="animalKind">
      <el-input v-model="dataForm.animalKind" placeholder="养殖种类"></el-input>
    </el-form-item>
    <el-form-item label="创建日期" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建日期"></el-input>
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
          uId: 0,
          userId: '',
          scaleId: '',
          animalKind: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: 'sys_user表中的id不能为空', trigger: 'blur' }
          ],
          scaleId: [
            { required: true, message: '养殖规模 字典表中的id不能为空', trigger: 'blur' }
          ],
          animalKind: [
            { required: true, message: '养殖种类不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建日期不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.uId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.uId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluserinfo/info/${this.dataForm.uId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycyluserinfo.userId
                this.dataForm.scaleId = data.ycyluserinfo.scaleId
                this.dataForm.animalKind = data.ycyluserinfo.animalKind
                this.dataForm.createTime = data.ycyluserinfo.createTime
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
              url: this.$http.adornUrl(`/generator/ycyluserinfo/${!this.dataForm.uId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'uId': this.dataForm.uId || undefined,
                'userId': this.dataForm.userId,
                'scaleId': this.dataForm.scaleId,
                'animalKind': this.dataForm.animalKind,
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
