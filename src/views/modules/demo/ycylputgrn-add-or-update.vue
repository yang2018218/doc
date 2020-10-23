<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="入库单url" prop="url">
      <el-input v-model="dataForm.url" placeholder="入库单url"></el-input>
    </el-form-item>
    <el-form-item label="创建人id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="创建人id"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="仓库id" prop="mainId">
      <el-input v-model="dataForm.mainId" placeholder="仓库id"></el-input>
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
          putId: 0,
          url: '',
          userId: '',
          createTime: '',
          mainId: ''
        },
        dataRule: {
          url: [
            { required: true, message: '入库单url不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '创建人id不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          mainId: [
            { required: true, message: '仓库id不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.putId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.putId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylputgrn/info/${this.dataForm.putId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.url = data.ycylputgrn.url
                this.dataForm.userId = data.ycylputgrn.userId
                this.dataForm.createTime = data.ycylputgrn.createTime
                this.dataForm.mainId = data.ycylputgrn.mainId
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
              url: this.$http.adornUrl(`/generator/ycylputgrn/${!this.dataForm.putId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'putId': this.dataForm.putId || undefined,
                'url': this.dataForm.url,
                'userId': this.dataForm.userId,
                'createTime': this.dataForm.createTime,
                'mainId': this.dataForm.mainId
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
