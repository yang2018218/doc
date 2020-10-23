<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户userid"></el-input>
    </el-form-item>
    <el-form-item label="代理商名称" prop="agentName">
      <el-input v-model="dataForm.agentName" placeholder="代理商名称"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="idcard">
      <el-input v-model="dataForm.idcard" placeholder="身份证号"></el-input>
    </el-form-item>
    <el-form-item label="代理商等级 区域字典表id" prop="level">
      <el-input v-model="dataForm.level" placeholder="代理商等级 区域字典表id"></el-input>
    </el-form-item>
    <el-form-item label="ycyl_province_city表中id" prop="provinceId">
      <el-input v-model="dataForm.provinceId" placeholder="ycyl_province_city表中id"></el-input>
    </el-form-item>
    <el-form-item label="ycyl_province_city表中id" prop="cityId">
      <el-input v-model="dataForm.cityId" placeholder="ycyl_province_city表中id"></el-input>
    </el-form-item>
    <el-form-item label="ycyl_province_city表中id" prop="areaId">
      <el-input v-model="dataForm.areaId" placeholder="ycyl_province_city表中id"></el-input>
    </el-form-item>
    <el-form-item label="代理商地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="代理商地址"></el-input>
    </el-form-item>
    <el-form-item label="身份证正面照片" prop="idcardFrontImgUrl">
      <el-input v-model="dataForm.idcardFrontImgUrl" placeholder="身份证正面照片"></el-input>
    </el-form-item>
    <el-form-item label="身份证背面照片" prop="idcardReverseImgUrl">
      <el-input v-model="dataForm.idcardReverseImgUrl" placeholder="身份证背面照片"></el-input>
    </el-form-item>
    <el-form-item label="门头照片" prop="doorHeadImgUrl">
      <el-input v-model="dataForm.doorHeadImgUrl" placeholder="门头照片"></el-input>
    </el-form-item>
    <el-form-item label="室内照片" prop="indoorImgUrl">
      <el-input v-model="dataForm.indoorImgUrl" placeholder="室内照片"></el-input>
    </el-form-item>
    <el-form-item label="0:审核未通过 1:审核已通过" prop="status">
      <el-input v-model="dataForm.status" placeholder="0:审核未通过 1:审核已通过"></el-input>
    </el-form-item>
    <el-form-item label="驳回理由字典表id" prop="rejectReason">
      <el-input v-model="dataForm.rejectReason" placeholder="驳回理由字典表id"></el-input>
    </el-form-item>
    <el-form-item label="代理商信用值" prop="userFaith">
      <el-input v-model="dataForm.userFaith" placeholder="代理商信用值"></el-input>
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
          agentId: 0,
          userId: '',
          agentName: '',
          idcard: '',
          level: '',
          provinceId: '',
          cityId: '',
          areaId: '',
          address: '',
          idcardFrontImgUrl: '',
          idcardReverseImgUrl: '',
          doorHeadImgUrl: '',
          indoorImgUrl: '',
          status: '',
          rejectReason: '',
          userFaith: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户userid不能为空', trigger: 'blur' }
          ],
          agentName: [
            { required: true, message: '代理商名称不能为空', trigger: 'blur' }
          ],
          idcard: [
            { required: true, message: '身份证号不能为空', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '代理商等级 区域字典表id不能为空', trigger: 'blur' }
          ],
          provinceId: [
            { required: true, message: 'ycyl_province_city表中id不能为空', trigger: 'blur' }
          ],
          cityId: [
            { required: true, message: 'ycyl_province_city表中id不能为空', trigger: 'blur' }
          ],
          areaId: [
            { required: true, message: 'ycyl_province_city表中id不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '代理商地址不能为空', trigger: 'blur' }
          ],
          idcardFrontImgUrl: [
            { required: true, message: '身份证正面照片不能为空', trigger: 'blur' }
          ],
          idcardReverseImgUrl: [
            { required: true, message: '身份证背面照片不能为空', trigger: 'blur' }
          ],
          doorHeadImgUrl: [
            { required: true, message: '门头照片不能为空', trigger: 'blur' }
          ],
          indoorImgUrl: [
            { required: true, message: '室内照片不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0:审核未通过 1:审核已通过不能为空', trigger: 'blur' }
          ],
          rejectReason: [
            { required: true, message: '驳回理由字典表id不能为空', trigger: 'blur' }
          ],
          userFaith: [
            { required: true, message: '代理商信用值不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.agentId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.agentId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluseragent/info/${this.dataForm.agentId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycyluseragent.userId
                this.dataForm.agentName = data.ycyluseragent.agentName
                this.dataForm.idcard = data.ycyluseragent.idcard
                this.dataForm.level = data.ycyluseragent.level
                this.dataForm.provinceId = data.ycyluseragent.provinceId
                this.dataForm.cityId = data.ycyluseragent.cityId
                this.dataForm.areaId = data.ycyluseragent.areaId
                this.dataForm.address = data.ycyluseragent.address
                this.dataForm.idcardFrontImgUrl = data.ycyluseragent.idcardFrontImgUrl
                this.dataForm.idcardReverseImgUrl = data.ycyluseragent.idcardReverseImgUrl
                this.dataForm.doorHeadImgUrl = data.ycyluseragent.doorHeadImgUrl
                this.dataForm.indoorImgUrl = data.ycyluseragent.indoorImgUrl
                this.dataForm.status = data.ycyluseragent.status
                this.dataForm.rejectReason = data.ycyluseragent.rejectReason
                this.dataForm.userFaith = data.ycyluseragent.userFaith
                this.dataForm.createTime = data.ycyluseragent.createTime
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
              url: this.$http.adornUrl(`/generator/ycyluseragent/${!this.dataForm.agentId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'agentId': this.dataForm.agentId || undefined,
                'userId': this.dataForm.userId,
                'agentName': this.dataForm.agentName,
                'idcard': this.dataForm.idcard,
                'level': this.dataForm.level,
                'provinceId': this.dataForm.provinceId,
                'cityId': this.dataForm.cityId,
                'areaId': this.dataForm.areaId,
                'address': this.dataForm.address,
                'idcardFrontImgUrl': this.dataForm.idcardFrontImgUrl,
                'idcardReverseImgUrl': this.dataForm.idcardReverseImgUrl,
                'doorHeadImgUrl': this.dataForm.doorHeadImgUrl,
                'indoorImgUrl': this.dataForm.indoorImgUrl,
                'status': this.dataForm.status,
                'rejectReason': this.dataForm.rejectReason,
                'userFaith': this.dataForm.userFaith,
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
