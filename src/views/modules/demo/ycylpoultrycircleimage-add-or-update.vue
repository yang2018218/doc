<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="ycyl_poultry_circle表中的c_id" prop="cId">
      <el-input v-model="dataForm.cId" placeholder="ycyl_poultry_circle表中的c_id"></el-input>
    </el-form-item>
    <el-form-item label="图片地址" prop="imageUrl">
      <el-input v-model="dataForm.imageUrl" placeholder="图片地址"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder=""></el-input>
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
          imageId: 0,
          cId: '',
          imageUrl: '',
          createTime: ''
        },
        dataRule: {
          cId: [
            { required: true, message: 'ycyl_poultry_circle表中的c_id不能为空', trigger: 'blur' }
          ],
          imageUrl: [
            { required: true, message: '图片地址不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.imageId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.imageId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylpoultrycircleimage/info/${this.dataForm.imageId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.cId = data.ycylpoultrycircleimage.cId
                this.dataForm.imageUrl = data.ycylpoultrycircleimage.imageUrl
                this.dataForm.createTime = data.ycylpoultrycircleimage.createTime
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
              url: this.$http.adornUrl(`/generator/ycylpoultrycircleimage/${!this.dataForm.imageId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'imageId': this.dataForm.imageId || undefined,
                'cId': this.dataForm.cId,
                'imageUrl': this.dataForm.imageUrl,
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
