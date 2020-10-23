<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="标签名称" prop="labelName">
      <el-input v-model="dataForm.labelName" placeholder="标签名称"></el-input>
    </el-form-item>
    <el-form-item label="标签图片地址" prop="labelImg">
      <el-input v-model="dataForm.labelImg" placeholder="标签图片地址"></el-input>
    </el-form-item>
    <el-form-item label="标签编号" prop="labelNum">
      <el-input v-model="dataForm.labelNum" placeholder="标签编号"></el-input>
    </el-form-item>
    <el-form-item label="标签备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="标签备注"></el-input>
    </el-form-item>
    <el-form-item label="创建人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="创建人userid"></el-input>
    </el-form-item>
    <el-form-item label="0不显示；1显示" prop="isShow">
      <el-input v-model="dataForm.isShow" placeholder="0不显示；1显示"></el-input>
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
          labelId: 0,
          labelName: '',
          labelImg: '',
          labelNum: '',
          remark: '',
          userId: '',
          isShow: '',
          createTime: ''
        },
        dataRule: {
          labelName: [
            { required: true, message: '标签名称不能为空', trigger: 'blur' }
          ],
          labelImg: [
            { required: true, message: '标签图片地址不能为空', trigger: 'blur' }
          ],
          labelNum: [
            { required: true, message: '标签编号不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '标签备注不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '创建人userid不能为空', trigger: 'blur' }
          ],
          isShow: [
            { required: true, message: '0不显示；1显示不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.labelId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.labelId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyllabel/info/${this.dataForm.labelId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.labelName = data.ycyllabel.labelName
                this.dataForm.labelImg = data.ycyllabel.labelImg
                this.dataForm.labelNum = data.ycyllabel.labelNum
                this.dataForm.remark = data.ycyllabel.remark
                this.dataForm.userId = data.ycyllabel.userId
                this.dataForm.isShow = data.ycyllabel.isShow
                this.dataForm.createTime = data.ycyllabel.createTime
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
              url: this.$http.adornUrl(`/generator/ycyllabel/${!this.dataForm.labelId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'labelId': this.dataForm.labelId || undefined,
                'labelName': this.dataForm.labelName,
                'labelImg': this.dataForm.labelImg,
                'labelNum': this.dataForm.labelNum,
                'remark': this.dataForm.remark,
                'userId': this.dataForm.userId,
                'isShow': this.dataForm.isShow,
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
