<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="分类标识" prop="typeMarking">
      <el-input v-model="dataForm.typeMarking" placeholder="分类标识"></el-input>
    </el-form-item>
    <el-form-item label="分类名称" prop="typeName">
      <el-input v-model="dataForm.typeName" placeholder="分类名称"></el-input>
    </el-form-item>
    <el-form-item label="" prop="remark">
      <el-input v-model="dataForm.remark" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="是否显示0不显示1显示" prop="isShow">
      <el-input v-model="dataForm.isShow" placeholder="是否显示0不显示1显示"></el-input>
    </el-form-item>
    <el-form-item label="创建人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="创建人userid"></el-input>
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
          typeId: 0,
          typeMarking: '',
          typeName: '',
          remark: '',
          isShow: '',
          userId: '',
          createTime: ''
        },
        dataRule: {
          typeMarking: [
            { required: true, message: '分类标识不能为空', trigger: 'blur' }
          ],
          typeName: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          isShow: [
            { required: true, message: '是否显示0不显示1显示不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '创建人userid不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.typeId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.typeId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyldrugtype/info/${this.dataForm.typeId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.typeMarking = data.ycyldrugtype.typeMarking
                this.dataForm.typeName = data.ycyldrugtype.typeName
                this.dataForm.remark = data.ycyldrugtype.remark
                this.dataForm.isShow = data.ycyldrugtype.isShow
                this.dataForm.userId = data.ycyldrugtype.userId
                this.dataForm.createTime = data.ycyldrugtype.createTime
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
              url: this.$http.adornUrl(`/generator/ycyldrugtype/${!this.dataForm.typeId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'typeId': this.dataForm.typeId || undefined,
                'typeMarking': this.dataForm.typeMarking,
                'typeName': this.dataForm.typeName,
                'remark': this.dataForm.remark,
                'isShow': this.dataForm.isShow,
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
