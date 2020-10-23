<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="操作类型:1:添加;2:修改;3:删除;4:查询；5登录" prop="optType">
      <el-input v-model="dataForm.optType" placeholder="操作类型:1:添加;2:修改;3:删除;4:查询；5登录"></el-input>
    </el-form-item>
    <el-form-item label="模块代码" prop="module">
      <el-input v-model="dataForm.module" placeholder="模块代码"></el-input>
    </el-form-item>
    <el-form-item label="操作内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="操作内容"></el-input>
    </el-form-item>
    <el-form-item label="操作人" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="操作人"></el-input>
    </el-form-item>
    <el-form-item label="1.普通用户；2.代理商;3.医助;4.客服,5.医生,6.专家" prop="userType">
      <el-input v-model="dataForm.userType" placeholder="1.普通用户；2.代理商;3.医助;4.客服,5.医生,6.专家"></el-input>
    </el-form-item>
    <el-form-item label="访问时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="访问时间"></el-input>
    </el-form-item>
    <el-form-item label="1.ios;2安卓;3.pc" prop="terminalType">
      <el-input v-model="dataForm.terminalType" placeholder="1.ios;2安卓;3.pc"></el-input>
    </el-form-item>
    <el-form-item label="访问ip" prop="ip">
      <el-input v-model="dataForm.ip" placeholder="访问ip"></el-input>
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
          optType: '',
          module: '',
          content: '',
          userId: '',
          userType: '',
          createTime: '',
          terminalType: '',
          ip: ''
        },
        dataRule: {
          optType: [
            { required: true, message: '操作类型:1:添加;2:修改;3:删除;4:查询；5登录不能为空', trigger: 'blur' }
          ],
          module: [
            { required: true, message: '模块代码不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '操作内容不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '操作人不能为空', trigger: 'blur' }
          ],
          userType: [
            { required: true, message: '1.普通用户；2.代理商;3.医助;4.客服,5.医生,6.专家不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '访问时间不能为空', trigger: 'blur' }
          ],
          terminalType: [
            { required: true, message: '1.ios;2安卓;3.pc不能为空', trigger: 'blur' }
          ],
          ip: [
            { required: true, message: '访问ip不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/ycyloperationlog/info/${this.dataForm.logId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.optType = data.ycyloperationlog.optType
                this.dataForm.module = data.ycyloperationlog.module
                this.dataForm.content = data.ycyloperationlog.content
                this.dataForm.userId = data.ycyloperationlog.userId
                this.dataForm.userType = data.ycyloperationlog.userType
                this.dataForm.createTime = data.ycyloperationlog.createTime
                this.dataForm.terminalType = data.ycyloperationlog.terminalType
                this.dataForm.ip = data.ycyloperationlog.ip
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
              url: this.$http.adornUrl(`/generator/ycyloperationlog/${!this.dataForm.logId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'logId': this.dataForm.logId || undefined,
                'optType': this.dataForm.optType,
                'module': this.dataForm.module,
                'content': this.dataForm.content,
                'userId': this.dataForm.userId,
                'userType': this.dataForm.userType,
                'createTime': this.dataForm.createTime,
                'terminalType': this.dataForm.terminalType,
                'ip': this.dataForm.ip
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
