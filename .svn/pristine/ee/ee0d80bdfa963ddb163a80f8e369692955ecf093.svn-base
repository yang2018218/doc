<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户信息表userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户信息表userid"></el-input>
    </el-form-item>
    <el-form-item label="区域字典表id" prop="position">
      <el-input v-model="dataForm.position" placeholder="区域字典表id"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码" prop="idcard">
      <el-input v-model="dataForm.idcard" placeholder="身份证号码"></el-input>
    </el-form-item>
    <el-form-item label="" prop="company">
      <el-input v-model="dataForm.company" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="从业年限" prop="yearsNum">
      <el-input v-model="dataForm.yearsNum" placeholder="从业年限"></el-input>
    </el-form-item>
    <el-form-item label="个人地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="个人地址"></el-input>
    </el-form-item>
    <el-form-item label="保存字典表id,用逗号分隔" prop="adeptKind">
      <el-input v-model="dataForm.adeptKind" placeholder="保存字典表id,用逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="擅长领域 保存字典表id,用逗号分隔" prop="adeptTerritory">
      <el-input v-model="dataForm.adeptTerritory" placeholder="擅长领域 保存字典表id,用逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="身份证正面照片" prop="idcardFrontImgUrl">
      <el-input v-model="dataForm.idcardFrontImgUrl" placeholder="身份证正面照片"></el-input>
    </el-form-item>
    <el-form-item label="身份证反面照片" prop="idcardReverseImgUrl">
      <el-input v-model="dataForm.idcardReverseImgUrl" placeholder="身份证反面照片"></el-input>
    </el-form-item>
    <el-form-item label="执业证封面照片" prop="certificateCoverImgUrl">
      <el-input v-model="dataForm.certificateCoverImgUrl" placeholder="执业证封面照片"></el-input>
    </el-form-item>
    <el-form-item label="执业证第1页" prop="certificateOneImgUrl">
      <el-input v-model="dataForm.certificateOneImgUrl" placeholder="执业证第1页"></el-input>
    </el-form-item>
    <el-form-item label="执业证第2页" prop="certificateTwoImgUrl">
      <el-input v-model="dataForm.certificateTwoImgUrl" placeholder="执业证第2页"></el-input>
    </el-form-item>
    <el-form-item label="审核状态 0:审核未通过 1:审核已通过" prop="doctorStatus">
      <el-input v-model="dataForm.doctorStatus" placeholder="审核状态 0:审核未通过 1:审核已通过"></el-input>
    </el-form-item>
    <el-form-item label="驳回理由 保存字典表id" prop="rejectReason">
      <el-input v-model="dataForm.rejectReason" placeholder="驳回理由 保存字典表id"></el-input>
    </el-form-item>
    <el-form-item label="医生等级 保存数字 1或2" prop="doctorRank">
      <el-input v-model="dataForm.doctorRank" placeholder="医生等级 保存数字 1或2"></el-input>
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
          doctorId: 0,
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
          certificateCoverImgUrl: '',
          certificateOneImgUrl: '',
          certificateTwoImgUrl: '',
          doctorStatus: '',
          rejectReason: '',
          doctorRank: '',
          createTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '用户信息表userid不能为空', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '区域字典表id不能为空', trigger: 'blur' }
          ],
          idcard: [
            { required: true, message: '身份证号码不能为空', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          yearsNum: [
            { required: true, message: '从业年限不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '个人地址不能为空', trigger: 'blur' }
          ],
          adeptKind: [
            { required: true, message: '保存字典表id,用逗号分隔不能为空', trigger: 'blur' }
          ],
          adeptTerritory: [
            { required: true, message: '擅长领域 保存字典表id,用逗号分隔不能为空', trigger: 'blur' }
          ],
          idcardFrontImgUrl: [
            { required: true, message: '身份证正面照片不能为空', trigger: 'blur' }
          ],
          idcardReverseImgUrl: [
            { required: true, message: '身份证反面照片不能为空', trigger: 'blur' }
          ],
          certificateCoverImgUrl: [
            { required: true, message: '执业证封面照片不能为空', trigger: 'blur' }
          ],
          certificateOneImgUrl: [
            { required: true, message: '执业证第1页不能为空', trigger: 'blur' }
          ],
          certificateTwoImgUrl: [
            { required: true, message: '执业证第2页不能为空', trigger: 'blur' }
          ],
          doctorStatus: [
            { required: true, message: '审核状态 0:审核未通过 1:审核已通过不能为空', trigger: 'blur' }
          ],
          rejectReason: [
            { required: true, message: '驳回理由 保存字典表id不能为空', trigger: 'blur' }
          ],
          doctorRank: [
            { required: true, message: '医生等级 保存数字 1或2不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.doctorId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.doctorId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluserdoctor/info/${this.dataForm.doctorId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.ycyluserdoctor.userId
                this.dataForm.position = data.ycyluserdoctor.position
                this.dataForm.idcard = data.ycyluserdoctor.idcard
                this.dataForm.company = data.ycyluserdoctor.company
                this.dataForm.yearsNum = data.ycyluserdoctor.yearsNum
                this.dataForm.address = data.ycyluserdoctor.address
                this.dataForm.adeptKind = data.ycyluserdoctor.adeptKind
                this.dataForm.adeptTerritory = data.ycyluserdoctor.adeptTerritory
                this.dataForm.idcardFrontImgUrl = data.ycyluserdoctor.idcardFrontImgUrl
                this.dataForm.idcardReverseImgUrl = data.ycyluserdoctor.idcardReverseImgUrl
                this.dataForm.certificateCoverImgUrl = data.ycyluserdoctor.certificateCoverImgUrl
                this.dataForm.certificateOneImgUrl = data.ycyluserdoctor.certificateOneImgUrl
                this.dataForm.certificateTwoImgUrl = data.ycyluserdoctor.certificateTwoImgUrl
                this.dataForm.doctorStatus = data.ycyluserdoctor.doctorStatus
                this.dataForm.rejectReason = data.ycyluserdoctor.rejectReason
                this.dataForm.doctorRank = data.ycyluserdoctor.doctorRank
                this.dataForm.createTime = data.ycyluserdoctor.createTime
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
              url: this.$http.adornUrl(`/generator/ycyluserdoctor/${!this.dataForm.doctorId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'doctorId': this.dataForm.doctorId || undefined,
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
                'certificateCoverImgUrl': this.dataForm.certificateCoverImgUrl,
                'certificateOneImgUrl': this.dataForm.certificateOneImgUrl,
                'certificateTwoImgUrl': this.dataForm.certificateTwoImgUrl,
                'doctorStatus': this.dataForm.doctorStatus,
                'rejectReason': this.dataForm.rejectReason,
                'doctorRank': this.dataForm.doctorRank,
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
