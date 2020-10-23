<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户userid"></el-input>
    </el-form-item>
    <el-form-item label="职称id 字典表中的id" prop="position">
      <el-input v-model="dataForm.position" placeholder="职称id 字典表中的id"></el-input>
    </el-form-item>
    <el-form-item label="" prop="idcard">
      <el-input v-model="dataForm.idcard" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="就职单位" prop="company">
      <el-input v-model="dataForm.company" placeholder="就职单位"></el-input>
    </el-form-item>
    <el-form-item label="从业年限" prop="yearsNum">
      <el-input v-model="dataForm.yearsNum" placeholder="从业年限"></el-input>
    </el-form-item>
    <el-form-item label="个人地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="个人地址"></el-input>
    </el-form-item>
    <el-form-item label="擅长种类保存字典表id,用逗号分隔" prop="adeptKind">
      <el-input v-model="dataForm.adeptKind" placeholder="擅长种类保存字典表id,用逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="擅长领域保存字典表id,用逗号分隔" prop="adeptTerritory">
      <el-input v-model="dataForm.adeptTerritory" placeholder="擅长领域保存字典表id,用逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="身份证正面照片" prop="idcardFrontImgUrl">
      <el-input v-model="dataForm.idcardFrontImgUrl" placeholder="身份证正面照片"></el-input>
    </el-form-item>
    <el-form-item label="身份证反面照片" prop="idcardReverseImgUrl">
      <el-input v-model="dataForm.idcardReverseImgUrl" placeholder="身份证反面照片"></el-input>
    </el-form-item>
    <el-form-item label="工作证照片" prop="empCardImgUrl">
      <el-input v-model="dataForm.empCardImgUrl" placeholder="工作证照片"></el-input>
    </el-form-item>
    <el-form-item label="职称证照片" prop="certificateImgUrl">
      <el-input v-model="dataForm.certificateImgUrl" placeholder="职称证照片"></el-input>
    </el-form-item>
    <el-form-item label="任职书" prop="takeFficeImgUrl">
      <el-input v-model="dataForm.takeFficeImgUrl" placeholder="任职书"></el-input>
    </el-form-item>
    <el-form-item label="审核状态0:审核未通过 1:审核已通过" prop="doctorStatus">
      <el-input v-model="dataForm.doctorStatus" placeholder="审核状态0:审核未通过 1:审核已通过"></el-input>
    </el-form-item>
    <el-form-item label="驳回理由 保存字典表id" prop="rejectReason">
      <el-input v-model="dataForm.rejectReason" placeholder="驳回理由 保存字典表id"></el-input>
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
          expId: 0,
          userId: '',
          position: '',
          idcard: '',
          company: '',
          yearsNum: '',
          address: '',
          adeptKind: '',
          adeptTerritory: '',
          idcardFrontImgUrl: '',
          idcardReverseImgUrl: '',
          empCardImgUrl: '',
          certificateImgUrl: '',
          takeFficeImgUrl: '',
          doctorStatus: '',
          rejectReason: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户userid不能为空', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '职称id 字典表中的id不能为空', trigger: 'blur' }
          ],
          idcard: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '就职单位不能为空', trigger: 'blur' }
          ],
          yearsNum: [
            { required: true, message: '从业年限不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '个人地址不能为空', trigger: 'blur' }
          ],
          adeptKind: [
            { required: true, message: '擅长种类保存字典表id,用逗号分隔不能为空', trigger: 'blur' }
          ],
          adeptTerritory: [
            { required: true, message: '擅长领域保存字典表id,用逗号分隔不能为空', trigger: 'blur' }
          ],
          idcardFrontImgUrl: [
            { required: true, message: '身份证正面照片不能为空', trigger: 'blur' }
          ],
          idcardReverseImgUrl: [
            { required: true, message: '身份证反面照片不能为空', trigger: 'blur' }
          ],
          empCardImgUrl: [
            { required: true, message: '工作证照片不能为空', trigger: 'blur' }
          ],
          certificateImgUrl: [
            { required: true, message: '职称证照片不能为空', trigger: 'blur' }
          ],
          takeFficeImgUrl: [
            { required: true, message: '任职书不能为空', trigger: 'blur' }
          ],
          doctorStatus: [
            { required: true, message: '审核状态0:审核未通过 1:审核已通过不能为空', trigger: 'blur' }
          ],
          rejectReason: [
            { required: true, message: '驳回理由 保存字典表id不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.expId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.expId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluserexpert/info/${this.dataForm.expId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycyluserexpert.userId
                this.dataForm.position = data.ycyluserexpert.position
                this.dataForm.idcard = data.ycyluserexpert.idcard
                this.dataForm.company = data.ycyluserexpert.company
                this.dataForm.yearsNum = data.ycyluserexpert.yearsNum
                this.dataForm.address = data.ycyluserexpert.address
                this.dataForm.adeptKind = data.ycyluserexpert.adeptKind
                this.dataForm.adeptTerritory = data.ycyluserexpert.adeptTerritory
                this.dataForm.idcardFrontImgUrl = data.ycyluserexpert.idcardFrontImgUrl
                this.dataForm.idcardReverseImgUrl = data.ycyluserexpert.idcardReverseImgUrl
                this.dataForm.empCardImgUrl = data.ycyluserexpert.empCardImgUrl
                this.dataForm.certificateImgUrl = data.ycyluserexpert.certificateImgUrl
                this.dataForm.takeFficeImgUrl = data.ycyluserexpert.takeFficeImgUrl
                this.dataForm.doctorStatus = data.ycyluserexpert.doctorStatus
                this.dataForm.rejectReason = data.ycyluserexpert.rejectReason
                this.dataForm.createTime = data.ycyluserexpert.createTime
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
              url: this.$http.adornUrl(`/generator/ycyluserexpert/${!this.dataForm.expId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'expId': this.dataForm.expId || undefined,
                'userId': this.dataForm.userId,
                'position': this.dataForm.position,
                'idcard': this.dataForm.idcard,
                'company': this.dataForm.company,
                'yearsNum': this.dataForm.yearsNum,
                'address': this.dataForm.address,
                'adeptKind': this.dataForm.adeptKind,
                'adeptTerritory': this.dataForm.adeptTerritory,
                'idcardFrontImgUrl': this.dataForm.idcardFrontImgUrl,
                'idcardReverseImgUrl': this.dataForm.idcardReverseImgUrl,
                'empCardImgUrl': this.dataForm.empCardImgUrl,
                'certificateImgUrl': this.dataForm.certificateImgUrl,
                'takeFficeImgUrl': this.dataForm.takeFficeImgUrl,
                'doctorStatus': this.dataForm.doctorStatus,
                'rejectReason': this.dataForm.rejectReason,
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
