<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="dictId">
      <el-input v-model="dataForm.dictId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="数据字典值 与sys_dict表中的dict_value保持一致 1对多关系" prop="dictValue">
      <el-input v-model="dataForm.dictValue" placeholder="数据字典值 与sys_dict表中的dict_value保持一致 1对多关系"></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="dictName">
      <el-input v-model="dataForm.dictName" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="排序字段" prop="orderBy">
      <el-input v-model="dataForm.orderBy" placeholder="排序字段"></el-input>
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
          dataId: 0,
          dictId: '',
          dictValue: '',
          dictName: '',
          orderBy: '',
          remark: '',
          isShow: '',
          userId: '',
          createTime: ''
        },
        dataRule: {
          dictId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          dictValue: [
            { required: true, message: '数据字典值 与sys_dict表中的dict_value保持一致 1对多关系不能为空', trigger: 'blur' }
          ],
          dictName: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          orderBy: [
            { required: true, message: '排序字段不能为空', trigger: 'blur' }
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
        this.dataForm.dataId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.dataId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyldictdata/info/${this.dataForm.dataId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.dictId = data.ycyldictdata.dictId
                this.dataForm.dictValue = data.ycyldictdata.dictValue
                this.dataForm.dictName = data.ycyldictdata.dictName
                this.dataForm.orderBy = data.ycyldictdata.orderBy
                this.dataForm.remark = data.ycyldictdata.remark
                this.dataForm.isShow = data.ycyldictdata.isShow
                this.dataForm.userId = data.ycyldictdata.userId
                this.dataForm.createTime = data.ycyldictdata.createTime
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
              url: this.$http.adornUrl(`/generator/ycyldictdata/${!this.dataForm.dataId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'dataId': this.dataForm.dataId || undefined,
                'dictId': this.dataForm.dictId,
                'dictValue': this.dataForm.dictValue,
                'dictName': this.dataForm.dictName,
                'orderBy': this.dataForm.orderBy,
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
