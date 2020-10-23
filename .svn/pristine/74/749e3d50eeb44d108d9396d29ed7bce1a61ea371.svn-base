<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户userId" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户userId"></el-input>
    </el-form-item>
    <el-form-item label="省份id 省份表中的id" prop="provinceId">
      <el-input v-model="dataForm.provinceId" placeholder="省份id 省份表中的id"></el-input>
    </el-form-item>
    <el-form-item label="城市id 区域表中的id" prop="cityId">
      <el-input v-model="dataForm.cityId" placeholder="城市id 区域表中的id"></el-input>
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
          aId: 0,
          userId: '',
          provinceId: '',
          cityId: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户userId不能为空', trigger: 'blur' }
          ],
          provinceId: [
            { required: true, message: '省份id 省份表中的id不能为空', trigger: 'blur' }
          ],
          cityId: [
            { required: true, message: '城市id 区域表中的id不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.aId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.aId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/sysuserservicearea/info/${this.dataForm.aId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.sysuserservicearea.userId
                this.dataForm.provinceId = data.sysuserservicearea.provinceId
                this.dataForm.cityId = data.sysuserservicearea.cityId
                this.dataForm.createTime = data.sysuserservicearea.createTime
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
              url: this.$http.adornUrl(`/generator/sysuserservicearea/${!this.dataForm.aId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'aId': this.dataForm.aId || undefined,
                'userId': this.dataForm.userId,
                'provinceId': this.dataForm.provinceId,
                'cityId': this.dataForm.cityId,
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
