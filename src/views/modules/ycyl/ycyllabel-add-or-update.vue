<template>
  <el-dialog
    title="添加标签"
    :close-on-click-modal="false"
    :visible.sync="visible"
  center
  width="600px">
    <div  id="addEdit">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="标签名称" prop="labelName">
        <el-input v-model="dataForm.labelName" placeholder="标签名称"></el-input>
      </el-form-item>
      <el-form-item label="标签图片" prop="labelImg">
        <el-input v-model="dataForm.labelImg" placeholder="标签图片地址"></el-input>
        <div class="imgBox">
          <el-upload
            :action="this.$http.adornUrl(`/sys/oss/uploadAll`)"
            list-type="picture-card"
            name="fileUpload"
            :data="dataN"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
      </el-form-item>

      <el-form-item label="标签备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="标签备注"></el-input>
      </el-form-item>


    </el-form>
    </div>
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
        dataN:'fileUpload',
        // fileUpload:'1',
        dialogImageUrl: '',
        dialogVisible: false,
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
          // labelImg: [
          //   { required: true, message: '标签图片地址不能为空', trigger: 'blur' }
          // ],
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
      handleRemove(fileUpload, fileList) {
      },
      handlePictureCardPreview(fileUpload) {
        this.dialogImageUrl = fileUpload.url;
        this.dialogVisible = true;
      },
      init (id) {
        this.dataForm.labelId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.labelId) {
            this.$http({
              url: this.$http.adornUrl(`/ycyl/ycyllabel/save`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                // this.dataForm.labelName = data.ycyllabel.labelName
                // this.dataForm.labelImg = data.ycyllabel.labelImg
                // this.dataForm.labelNum = data.ycyllabel.labelNum
                // this.dataForm.remark = data.ycyllabel.remark
                // this.dataForm.userId = data.ycyllabel.userId
                // this.dataForm.isShow = data.ycyllabel.isShow
                // this.dataForm.createTime = data.ycyllabel.createTime
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
              url: this.$http.adornUrl(`/ycyl/ycyllabel/${!this.dataForm.labelId ? 'save' : 'update'}`),
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
<style lang="scss" scoped>
  #addEdit{
    margin-left: 9rem;
    font-size: 16px !important;
  }
</style>

