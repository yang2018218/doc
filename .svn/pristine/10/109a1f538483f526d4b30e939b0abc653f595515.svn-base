<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="轮播图位置 字典表id" prop="imgType">
      <el-input v-model="dataForm.imgType" placeholder="轮播图位置 字典表id"></el-input>
    </el-form-item>
    <el-form-item label="图片标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="图片标题"></el-input>
    </el-form-item>
    <el-form-item label="链接模块字典表id" prop="linkModule">
      <el-input v-model="dataForm.linkModule" placeholder="链接模块字典表id"></el-input>
    </el-form-item>
    <el-form-item label="" prop="moduleId">
      <el-input v-model="dataForm.moduleId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="图片地址" prop="imgUrl">
      <el-input v-model="dataForm.imgUrl" placeholder="图片地址"></el-input>
    </el-form-item>
    <el-form-item label="图片链接 点击之后跳转的地址" prop="linkAddress">
      <el-input v-model="dataForm.linkAddress" placeholder="图片链接 点击之后跳转的地址"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="是否跳转 0否1是" prop="isSkip">
      <el-input v-model="dataForm.isSkip" placeholder="是否跳转 0否1是"></el-input>
    </el-form-item>
    <el-form-item label="0隐藏1显示" prop="status">
      <el-input v-model="dataForm.status" placeholder="0隐藏1显示"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="orderBy">
      <el-input v-model="dataForm.orderBy" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item label="图片有效期" prop="deadline">
      <el-input v-model="dataForm.deadline" placeholder="图片有效期"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="创建人" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建人"></el-input>
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
          bannerId: 0,
          imgType: '',
          title: '',
          linkModule: '',
          moduleId: '',
          imgUrl: '',
          linkAddress: '',
          remark: '',
          isSkip: '',
          status: '',
          orderBy: '',
          deadline: '',
          createTime: '',
          createUserId: ''
        },
        dataRule: {
          imgType: [
            { required: true, message: '轮播图位置 字典表id不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '图片标题不能为空', trigger: 'blur' }
          ],
          linkModule: [
            { required: true, message: '链接模块字典表id不能为空', trigger: 'blur' }
          ],
          moduleId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          imgUrl: [
            { required: true, message: '图片地址不能为空', trigger: 'blur' }
          ],
          linkAddress: [
            { required: true, message: '图片链接 点击之后跳转的地址不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          isSkip: [
            { required: true, message: '是否跳转 0否1是不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0隐藏1显示不能为空', trigger: 'blur' }
          ],
          orderBy: [
            { required: true, message: '排序不能为空', trigger: 'blur' }
          ],
          deadline: [
            { required: true, message: '图片有效期不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建人不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.bannerId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.bannerId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylappbanner/info/${this.dataForm.bannerId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.imgType = data.ycylappbanner.imgType
                this.dataForm.title = data.ycylappbanner.title
                this.dataForm.linkModule = data.ycylappbanner.linkModule
                this.dataForm.moduleId = data.ycylappbanner.moduleId
                this.dataForm.imgUrl = data.ycylappbanner.imgUrl
                this.dataForm.linkAddress = data.ycylappbanner.linkAddress
                this.dataForm.remark = data.ycylappbanner.remark
                this.dataForm.isSkip = data.ycylappbanner.isSkip
                this.dataForm.status = data.ycylappbanner.status
                this.dataForm.orderBy = data.ycylappbanner.orderBy
                this.dataForm.deadline = data.ycylappbanner.deadline
                this.dataForm.createTime = data.ycylappbanner.createTime
                this.dataForm.createUserId = data.ycylappbanner.createUserId
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
              url: this.$http.adornUrl(`/generator/ycylappbanner/${!this.dataForm.bannerId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'bannerId': this.dataForm.bannerId || undefined,
                'imgType': this.dataForm.imgType,
                'title': this.dataForm.title,
                'linkModule': this.dataForm.linkModule,
                'moduleId': this.dataForm.moduleId,
                'imgUrl': this.dataForm.imgUrl,
                'linkAddress': this.dataForm.linkAddress,
                'remark': this.dataForm.remark,
                'isSkip': this.dataForm.isSkip,
                'status': this.dataForm.status,
                'orderBy': this.dataForm.orderBy,
                'deadline': this.dataForm.deadline,
                'createTime': this.dataForm.createTime,
                'createUserId': this.dataForm.createUserId
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
