<template>
<!--  会员编辑页面-->
  <el-dialog
    title="添加标签"
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    width="600px">
    <div id="countBox">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="标签名称" prop="labelName">
        <el-input v-model="dataForm.labelName" placeholder="标签名称"></el-input>
      </el-form-item>
      <el-form-item label="标签图片" prop="labelImg">
        <el-input v-model="dataForm.labelImg" placeholder="标签图片地址"></el-input>
        <div class="imgBox">
          <el-upload
            action="http://manage.xumutang999.com/ycyl-manage/sys/oss/uploadAll"
            list-type="picture-card"
            :name="fileUpload"
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
        data() {
            return {
                fileUpload: '1',
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
                    labelName: [{
                        required: true,
                        message: '标签名称不能为空',
                        trigger: 'blur'
                    }],
                    // labelImg: [
                    //   { required: true, message: '标签图片地址不能为空', trigger: 'blur' }
                    // ],
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
            init(data) {
                this.visible = true
                this.dataForm.labelName = data.labelName
                this.dataForm.remark = data.remark
                this.dataForm.labelId = data.labelId

            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl(`/ycyl/ycyllabel/${!this.dataForm.labelId ? 'save' : 'update'}`),
                            method: 'post',
                            data: this.$http.adornData({
                                'labelId': this.dataForm.labelId,
                                'labelName': this.dataForm.labelName,
                                'labelImg': this.dataForm.labelImg,
                                'labelNum': this.dataForm.labelNum,
                                'remark': this.dataForm.remark,
                            })
                        }).then(({
                            data
                        }) => {
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
    #countBox {
        margin-left: 9rem;
    }
</style>
