<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="动物类型 数据字典表id" prop="poultryType">
      <el-input v-model="dataForm.poultryType" placeholder="动物类型 数据字典表id"></el-input>
    </el-form-item>
    <el-form-item label="" prop="title">
      <el-input v-model="dataForm.title" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="出售价格 保存为 分" prop="price">
      <el-input v-model="dataForm.price" placeholder="出售价格 保存为 分"></el-input>
    </el-form-item>
    <el-form-item label="单位 盒 袋" prop="units">
      <el-input v-model="dataForm.units" placeholder="单位 盒 袋"></el-input>
    </el-form-item>
    <el-form-item label="省份id" prop="provinecId">
      <el-input v-model="dataForm.provinecId" placeholder="省份id"></el-input>
    </el-form-item>
    <el-form-item label="城市" prop="cityId">
      <el-input v-model="dataForm.cityId" placeholder="城市"></el-input>
    </el-form-item>
    <el-form-item label="区域" prop="areaId">
      <el-input v-model="dataForm.areaId" placeholder="区域"></el-input>
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
    <el-form-item label="发布人userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="发布人userid"></el-input>
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
          sellId: 0,
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
            { required: true, message: '动物类型 数据字典表id不能为空', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '出售价格 保存为 分不能为空', trigger: 'blur' }
          ],
          units: [
            { required: true, message: '单位 盒 袋不能为空', trigger: 'blur' }
          ],
          provinecId: [
            { required: true, message: '省份id不能为空', trigger: 'blur' }
          ],
          cityId: [
            { required: true, message: '城市不能为空', trigger: 'blur' }
          ],
          areaId: [
            { required: true, message: '区域不能为空', trigger: 'blur' }
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
            { required: true, message: '发布人userid不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '发布时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.sellId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.sellId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylpoultrysellinfo/info/${this.dataForm.sellId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.poultryType = data.ycylpoultrysellinfo.poultryType
                this.dataForm.title = data.ycylpoultrysellinfo.title
                this.dataForm.price = data.ycylpoultrysellinfo.price
                this.dataForm.units = data.ycylpoultrysellinfo.units
                this.dataForm.provinecId = data.ycylpoultrysellinfo.provinecId
                this.dataForm.cityId = data.ycylpoultrysellinfo.cityId
                this.dataForm.areaId = data.ycylpoultrysellinfo.areaId
                this.dataForm.coverImg = data.ycylpoultrysellinfo.coverImg
                this.dataForm.content = data.ycylpoultrysellinfo.content
                this.dataForm.label = data.ycylpoultrysellinfo.label
                this.dataForm.userId = data.ycylpoultrysellinfo.userId
                this.dataForm.createTime = data.ycylpoultrysellinfo.createTime
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
              url: this.$http.adornUrl(`/generator/ycylpoultrysellinfo/${!this.dataForm.sellId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'sellId': this.dataForm.sellId || undefined,
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
