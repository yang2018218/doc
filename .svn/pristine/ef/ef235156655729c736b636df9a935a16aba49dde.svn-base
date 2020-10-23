<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="字典类型名称" prop="dictName">
      <el-input v-model="dataForm.dictName" placeholder="字典类型名称"></el-input>
    </el-form-item>
    <el-form-item label="分类标识" prop="dictValue">
      <el-input v-model="dataForm.dictValue" placeholder="分类标识"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
          dictId: 0,
          dictName: '',
          dictValue: '',
          remark: '',
          isShow: '',
          userId: '',
          createTime: ''
        },
        dataRule: {
          dictName: [
            { required: true, message: '字典类型名称不能为空', trigger: 'blur' }
          ],
          dictValue: [
            { required: true, message: '分类标识不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
        this.dataForm.dictId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.dictId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyldict/info/${this.dataForm.dictId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.dictName = data.ycyldict.dictName
                this.dataForm.dictValue = data.ycyldict.dictValue
                this.dataForm.remark = data.ycyldict.remark
                this.dataForm.isShow = data.ycyldict.isShow
                this.dataForm.userId = data.ycyldict.userId
                this.dataForm.createTime = data.ycyldict.createTime
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
              url: this.$http.adornUrl(`/generator/ycyldict/${!this.dataForm.dictId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'dictId': this.dataForm.dictId || undefined,
                'dictName': this.dataForm.dictName,
                'dictValue': this.dataForm.dictValue,
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
