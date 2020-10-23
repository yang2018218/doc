<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户userid"></el-input>
    </el-form-item>
    <el-form-item label="省份id" prop="provinceId">
      <el-input v-model="dataForm.provinceId" placeholder="省份id"></el-input>
    </el-form-item>
    <el-form-item label="城市id" prop="cityId">
      <el-input v-model="dataForm.cityId" placeholder="城市id"></el-input>
    </el-form-item>
    <el-form-item label="区域id" prop="areaId">
      <el-input v-model="dataForm.areaId" placeholder="区域id"></el-input>
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="详细地址"></el-input>
    </el-form-item>
    <el-form-item label="联系人" prop="linkman">
      <el-input v-model="dataForm.linkman" placeholder="联系人"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="假删除0否1是,避免发货后找不到地址" prop="isDel">
      <el-input v-model="dataForm.isDel" placeholder="假删除0否1是,避免发货后找不到地址"></el-input>
    </el-form-item>
    <el-form-item label="是否默认地址0否1是" prop="isDefault">
      <el-input v-model="dataForm.isDefault" placeholder="是否默认地址0否1是"></el-input>
    </el-form-item>
    <el-form-item label="添加时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="添加时间"></el-input>
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
          addressId: 0,
          userId: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          address: '',
          linkman: '',
          mobile: '',
          isDel: '',
          isDefault: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户userid不能为空', trigger: 'blur' }
          ],
          provinceId: [
            { required: true, message: '省份id不能为空', trigger: 'blur' }
          ],
          cityId: [
            { required: true, message: '城市id不能为空', trigger: 'blur' }
          ],
          areaId: [
            { required: true, message: '区域id不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '详细地址不能为空', trigger: 'blur' }
          ],
          linkman: [
            { required: true, message: '联系人不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          isDel: [
            { required: true, message: '假删除0否1是,避免发货后找不到地址不能为空', trigger: 'blur' }
          ],
          isDefault: [
            { required: true, message: '是否默认地址0否1是不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '添加时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.addressId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.addressId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyladdress/info/${this.dataForm.addressId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycyladdress.userId
                this.dataForm.provinceId = data.ycyladdress.provinceId
                this.dataForm.cityId = data.ycyladdress.cityId
                this.dataForm.areaId = data.ycyladdress.areaId
                this.dataForm.address = data.ycyladdress.address
                this.dataForm.linkman = data.ycyladdress.linkman
                this.dataForm.mobile = data.ycyladdress.mobile
                this.dataForm.isDel = data.ycyladdress.isDel
                this.dataForm.isDefault = data.ycyladdress.isDefault
                this.dataForm.createTime = data.ycyladdress.createTime
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
              url: this.$http.adornUrl(`/generator/ycyladdress/${!this.dataForm.addressId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'addressId': this.dataForm.addressId || undefined,
                'userId': this.dataForm.userId,
                'provinceId': this.dataForm.provinceId,
                'cityId': this.dataForm.cityId,
                'areaId': this.dataForm.areaId,
                'address': this.dataForm.address,
                'linkman': this.dataForm.linkman,
                'mobile': this.dataForm.mobile,
                'isDel': this.dataForm.isDel,
                'isDefault': this.dataForm.isDefault,
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
