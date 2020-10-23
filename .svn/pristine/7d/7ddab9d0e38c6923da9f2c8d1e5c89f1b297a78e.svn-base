<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="!dataForm.id ? '新增' : '修改'"
    :visible.sync="visible"
    width="600px">
    <el-form :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmit()" label-width="80px"
             ref="dataForm">
      <!--      <el-form-item label="名字" prop="dictValue">-->
      <!--        <el-input placeholder="类型" v-model="dataForm.dictValue"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="字典ID" prop="dictId">-->
      <!--        <el-input placeholder="ID" v-model="dataForm.dictId"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="名称" prop="dictName">
        <el-input placeholder="名称" v-model="dataForm.dictName" maxlength="15"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input placeholder="备注" v-model="dataForm.remark"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <!--        <el-input placeholder="0为不显示1为显示" v-model="dataForm.isShow"></el-input>-->
        <el-radio v-model="dataForm.isShow" :label="1">显示</el-radio>
        <el-radio v-model="dataForm.isShow" :label="0">不显示</el-radio>
      </el-form-item>

    </el-form>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="dataFormSubmit()" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                visible: false,
                dataVal: '',
                dataForm: {
                    dataId: 0,
                    dictValue: '',
                    dictName: '',
                    remark: '',
                    isShow: '',
                },
                dataRule: {
                    dictName: [{
                        required: true,
                        message: '字典名称不能为空',
                        trigger: 'blur'
                    }],
                    dictValue: [{
                        required: true,
                        message: '标识不能为空',
                        trigger: 'blur'
                    }],
                    remark: [{
                        required: true,
                        message: '备注不能为空',
                        trigger: 'blur'
                    }],
                    isShow: [{
                        required: true,
                        message: '是否显示请选择',
                        trigger: 'blur'
                    }],
                }
            }
        },

        methods: {
            init(id, val, dictId) {
                this.dataForm.dictValue = val
                this.dataForm.dictId = dictId
                this.dataForm.dataId = id || 0
                this.visible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                    if (this.dataForm.dataId) {
                        this.$http({
                            url: this.$http.adornUrl(`/ycyl/ycyldictdata/info/${this.dataForm.dataId}`),
                            method: 'get',
                            params: this.$http.adornParams()
                        }).then(({
                            data
                        }) => {
                            if (data && data.code === 0) {
                                this.dataForm.dictValue = data.ycylDictData.dictValue
                                this.dataForm.dictId = data.ycylDictData.dictId
                                this.dataForm.dictName = data.ycylDictData.dictName
                                this.dataForm.remark = data.ycylDictData.remark
                                this.dataForm.isShow = data.ycylDictData.isShow
                            }
                        })
                    }
                })
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {

                        this.$http({
                            url: this.$http.adornUrl(`/ycyl/ycyldictdata/${!this.dataForm.dataId ? 'save' : 'update'}`),
                            method: 'post',
                            data: this.$http.adornData({
                                'dataId': this.dataForm.dataId || undefined,
                                'dictValue': this.dataForm.dictValue,
                                'dictId': this.dataForm.dictId,
                                'dictName': this.dataForm.dictName,
                                'remark': this.dataForm.remark,
                                'isShow': this.dataForm.isShow
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