<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="订单号" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder="订单号"></el-input>
    </el-form-item>
    <el-form-item label="操作类型" prop="optType">
      <el-input v-model="dataForm.optType" placeholder="操作类型"></el-input>
    </el-form-item>
    <el-form-item label="操作员userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="操作员userid"></el-input>
    </el-form-item>
    <el-form-item label="操作员姓名" prop="optName">
      <el-input v-model="dataForm.optName" placeholder="操作员姓名"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="ip地址" prop="ip">
      <el-input v-model="dataForm.ip" placeholder="ip地址"></el-input>
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
          logId: 0,
          orderId: '',
          optType: '',
          userId: '',
          optName: '',
          remark: '',
          ip: '',
          createTime: ''
        },
        dataRule: {
          orderId: [
            { required: true, message: '订单号不能为空', trigger: 'blur' }
          ],
          optType: [
            { required: true, message: '操作类型不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '操作员userid不能为空', trigger: 'blur' }
          ],
          optName: [
            { required: true, message: '操作员姓名不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          ip: [
            { required: true, message: 'ip地址不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.logId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.logId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylorderlog/info/${this.dataForm.logId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderId = data.ycylorderlog.orderId
                this.dataForm.optType = data.ycylorderlog.optType
                this.dataForm.userId = data.ycylorderlog.userId
                this.dataForm.optName = data.ycylorderlog.optName
                this.dataForm.remark = data.ycylorderlog.remark
                this.dataForm.ip = data.ycylorderlog.ip
                this.dataForm.createTime = data.ycylorderlog.createTime
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
              url: this.$http.adornUrl(`/generator/ycylorderlog/${!this.dataForm.logId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'logId': this.dataForm.logId || undefined,
                'orderId': this.dataForm.orderId,
                'optType': this.dataForm.optType,
                'userId': this.dataForm.userId,
                'optName': this.dataForm.optName,
                'remark': this.dataForm.remark,
                'ip': this.dataForm.ip,
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
