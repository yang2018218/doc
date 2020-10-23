<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="省份id" prop="provinceId">
      <el-input v-model="dataForm.provinceId" placeholder="省份id"></el-input>
    </el-form-item>
    <el-form-item label="区域类型1普通区域 2特殊区域" prop="areaType">
      <el-input v-model="dataForm.areaType" placeholder="区域类型1普通区域 2特殊区域"></el-input>
    </el-form-item>
    <el-form-item label="邮费保存为分" prop="cost">
      <el-input v-model="dataForm.cost" placeholder="邮费保存为分"></el-input>
    </el-form-item>
    <el-form-item label="创建人userid" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建人userid"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="修改时间"></el-input>
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
          freightId: 0,
          provinceId: '',
          areaType: '',
          cost: '',
          createUserId: '',
          updateTime: ''
        },
        dataRule: {
          provinceId: [
            { required: true, message: '省份id不能为空', trigger: 'blur' }
          ],
          areaType: [
            { required: true, message: '区域类型1普通区域 2特殊区域不能为空', trigger: 'blur' }
          ],
          cost: [
            { required: true, message: '邮费保存为分不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建人userid不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '修改时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.freightId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.freightId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylfreight/info/${this.dataForm.freightId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.provinceId = data.ycylfreight.provinceId
                this.dataForm.areaType = data.ycylfreight.areaType
                this.dataForm.cost = data.ycylfreight.cost
                this.dataForm.createUserId = data.ycylfreight.createUserId
                this.dataForm.updateTime = data.ycylfreight.updateTime
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
              url: this.$http.adornUrl(`/generator/ycylfreight/${!this.dataForm.freightId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'freightId': this.dataForm.freightId || undefined,
                'provinceId': this.dataForm.provinceId,
                'areaType': this.dataForm.areaType,
                'cost': this.dataForm.cost,
                'createUserId': this.dataForm.createUserId,
                'updateTime': this.dataForm.updateTime
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
