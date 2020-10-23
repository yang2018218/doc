<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="动物类型" prop="poultryType">
      <el-input v-model="dataForm.poultryType" placeholder="动物类型"></el-input>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="dataForm.title" placeholder="标题"></el-input>
    </el-form-item>
    <el-form-item label="求购价格 保存为分" prop="price">
      <el-input v-model="dataForm.price" placeholder="求购价格 保存为分"></el-input>
    </el-form-item>
    <el-form-item label="单位 保存字典表id" prop="units">
      <el-input v-model="dataForm.units" placeholder="单位 保存字典表id"></el-input>
    </el-form-item>
    <el-form-item label="省份id" prop="provinecId">
      <el-input v-model="dataForm.provinecId" placeholder="省份id"></el-input>
    </el-form-item>
    <el-form-item label="城市" prop="cityId">
      <el-input v-model="dataForm.cityId" placeholder="城市"></el-input>
    </el-form-item>
    <el-form-item label="区县" prop="areaId">
      <el-input v-model="dataForm.areaId" placeholder="区县"></el-input>
    </el-form-item>
    <el-form-item label="封面图片" prop="coverImg">
      <el-input v-model="dataForm.coverImg" placeholder="封面图片"></el-input>
    </el-form-item>
    <el-form-item label="详细内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="详细内容"></el-input>
    </el-form-item>
    <el-form-item label="保存字典表中的id 多条记录用，逗号分隔" prop="label">
      <el-input v-model="dataForm.label" placeholder="保存字典表中的id 多条记录用，逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="" prop="userId">
      <el-input v-model="dataForm.userId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="发布时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="发布时间"></el-input>
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
          buyId: 0,
          poultryType: '',
          title: '',
          price: '',
          units: '',
          provinecId: '',
          cityId: '',
          areaId: '',
          coverImg: '',
          content: '',
          label: '',
          userId: '',
          createTime: ''
        },
        dataRule: {
          poultryType: [
            { required: true, message: '动物类型不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '求购价格 保存为分不能为空', trigger: 'blur' }
          ],
          units: [
            { required: true, message: '单位 保存字典表id不能为空', trigger: 'blur' }
          ],
          provinecId: [
            { required: true, message: '省份id不能为空', trigger: 'blur' }
          ],
          cityId: [
            { required: true, message: '城市不能为空', trigger: 'blur' }
          ],
          areaId: [
            { required: true, message: '区县不能为空', trigger: 'blur' }
          ],
          coverImg: [
            { required: true, message: '封面图片不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '详细内容不能为空', trigger: 'blur' }
          ],
          label: [
            { required: true, message: '保存字典表中的id 多条记录用，逗号分隔不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '发布时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.buyId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.buyId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylpoultrybuyinfo/info/${this.dataForm.buyId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.poultryType = data.ycylpoultrybuyinfo.poultryType
                this.dataForm.title = data.ycylpoultrybuyinfo.title
                this.dataForm.price = data.ycylpoultrybuyinfo.price
                this.dataForm.units = data.ycylpoultrybuyinfo.units
                this.dataForm.provinecId = data.ycylpoultrybuyinfo.provinecId
                this.dataForm.cityId = data.ycylpoultrybuyinfo.cityId
                this.dataForm.areaId = data.ycylpoultrybuyinfo.areaId
                this.dataForm.coverImg = data.ycylpoultrybuyinfo.coverImg
                this.dataForm.content = data.ycylpoultrybuyinfo.content
                this.dataForm.label = data.ycylpoultrybuyinfo.label
                this.dataForm.userId = data.ycylpoultrybuyinfo.userId
                this.dataForm.createTime = data.ycylpoultrybuyinfo.createTime
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
              url: this.$http.adornUrl(`/generator/ycylpoultrybuyinfo/${!this.dataForm.buyId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'buyId': this.dataForm.buyId || undefined,
                'poultryType': this.dataForm.poultryType,
                'title': this.dataForm.title,
                'price': this.dataForm.price,
                'units': this.dataForm.units,
                'provinecId': this.dataForm.provinecId,
                'cityId': this.dataForm.cityId,
                'areaId': this.dataForm.areaId,
                'coverImg': this.dataForm.coverImg,
                'content': this.dataForm.content,
                'label': this.dataForm.label,
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
