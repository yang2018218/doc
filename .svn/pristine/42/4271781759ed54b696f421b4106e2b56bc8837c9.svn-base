<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '添加'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="540px">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="字典名称" prop="dictName" required="required">
        <el-input v-model="dataForm.dictName" placeholder="字典类型名称" maxlength="15"
                  show-word-limit></el-input>
      </el-form-item>
          <el-form-item label="分类标识" prop="dictValue">
            <el-input v-model="dataForm.dictValue" placeholder="分类标识"></el-input>
          </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
<!--        <el-input v-model="dataForm.isShow" placeholder="0为不显示1为显示"></el-input>-->
        <el-radio v-model="dataForm.isShow" :label="1">显示</el-radio>
        <el-radio v-model="dataForm.isShow" :label="0">不显示</el-radio>
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
        },
        dataRule: {
          dictName: [
            {required: true, message: '字典名称不能为空', trigger: 'blur'}
          ],
          dictValue: [
            {required: true, message: '标识不能为空', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '备注不能为空', trigger: 'blur'}
          ],
          isShow: [
            {required: true, message: '是否显示请选择', trigger: 'blur'}
          ],
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
              url: this.$http.adornUrl(`/ycyl/ycyldict/info/${this.dataForm.dictId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.dictName = data.ycylDict.dictName
                this.dataForm.dictValue = data.ycylDict.dictValue
                this.dataForm.remark = data.ycylDict.remark
                this.dataForm.isShow = data.ycylDict.isShow
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
              url: this.$http.adornUrl(`/ycyl/ycyldict/${!this.dataForm.dictId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'dictId': this.dataForm.dictId || undefined,
                'dictName': this.dataForm.dictName,
                'dictValue': this.dataForm.dictValue,
                'remark': this.dataForm.remark,
                'isShow': this.dataForm.isShow,
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
