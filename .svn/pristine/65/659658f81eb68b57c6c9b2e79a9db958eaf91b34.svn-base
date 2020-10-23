<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="关联订单表中的order_num" prop="orderNum">
      <el-input v-model="dataForm.orderNum" placeholder="关联订单表中的order_num"></el-input>
    </el-form-item>
    <el-form-item label="服务时间" prop="serviceTime">
      <el-input v-model="dataForm.serviceTime" placeholder="服务时间"></el-input>
    </el-form-item>
    <el-form-item label="指导老师" prop="teacherTruename">
      <el-input v-model="dataForm.teacherTruename" placeholder="指导老师"></el-input>
    </el-form-item>
    <el-form-item label="指导老师userid" prop="teacherUserId">
      <el-input v-model="dataForm.teacherUserId" placeholder="指导老师userid"></el-input>
    </el-form-item>
    <el-form-item label="审核医生" prop="doctorTruename">
      <el-input v-model="dataForm.doctorTruename" placeholder="审核医生"></el-input>
    </el-form-item>
    <el-form-item label="审核医生userid" prop="doctorUserId">
      <el-input v-model="dataForm.doctorUserId" placeholder="审核医生userid"></el-input>
    </el-form-item>
    <el-form-item label="医助姓名" prop="assistantTruename">
      <el-input v-model="dataForm.assistantTruename" placeholder="医助姓名"></el-input>
    </el-form-item>
    <el-form-item label="医助userid" prop="assistantUserId">
      <el-input v-model="dataForm.assistantUserId" placeholder="医助userid"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="dataForm.nickname" placeholder="用户昵称"></el-input>
    </el-form-item>
    <el-form-item label="用户userid" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户userid"></el-input>
    </el-form-item>
    <el-form-item label="用户区域" prop="userArea">
      <el-input v-model="dataForm.userArea" placeholder="用户区域"></el-input>
    </el-form-item>
    <el-form-item label="字典表id" prop="animal">
      <el-input v-model="dataForm.animal" placeholder="字典表id"></el-input>
    </el-form-item>
    <el-form-item label="药单价值" prop="orderMoney">
      <el-input v-model="dataForm.orderMoney" placeholder="药单价值"></el-input>
    </el-form-item>
    <el-form-item label="动物日龄" prop="ageindays">
      <el-input v-model="dataForm.ageindays" placeholder="动物日龄"></el-input>
    </el-form-item>
    <el-form-item label="药品种类数量" prop="typeCount">
      <el-input v-model="dataForm.typeCount" placeholder="药品种类数量"></el-input>
    </el-form-item>
    <el-form-item label="字典表id" prop="breedScale">
      <el-input v-model="dataForm.breedScale" placeholder="字典表id"></el-input>
    </el-form-item>
    <el-form-item label="诊断病症" prop="diagnoseDisease">
      <el-input v-model="dataForm.diagnoseDisease" placeholder="诊断病症"></el-input>
    </el-form-item>
    <el-form-item label="用户手机号" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="用户手机号"></el-input>
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
          pId: 0,
          orderNum: '',
          serviceTime: '',
          teacherTruename: '',
          teacherUserId: '',
          doctorTruename: '',
          doctorUserId: '',
          assistantTruename: '',
          assistantUserId: '',
          nickname: '',
          userId: '',
          userArea: '',
          animal: '',
          orderMoney: '',
          ageindays: '',
          typeCount: '',
          breedScale: '',
          diagnoseDisease: '',
          mobile: '',
          createTime: ''
        },
        dataRule: {
          orderNum: [
            { required: true, message: '关联订单表中的order_num不能为空', trigger: 'blur' }
          ],
          serviceTime: [
            { required: true, message: '服务时间不能为空', trigger: 'blur' }
          ],
          teacherTruename: [
            { required: true, message: '指导老师不能为空', trigger: 'blur' }
          ],
          teacherUserId: [
            { required: true, message: '指导老师userid不能为空', trigger: 'blur' }
          ],
          doctorTruename: [
            { required: true, message: '审核医生不能为空', trigger: 'blur' }
          ],
          doctorUserId: [
            { required: true, message: '审核医生userid不能为空', trigger: 'blur' }
          ],
          assistantTruename: [
            { required: true, message: '医助姓名不能为空', trigger: 'blur' }
          ],
          assistantUserId: [
            { required: true, message: '医助userid不能为空', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '用户昵称不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '用户userid不能为空', trigger: 'blur' }
          ],
          userArea: [
            { required: true, message: '用户区域不能为空', trigger: 'blur' }
          ],
          animal: [
            { required: true, message: '字典表id不能为空', trigger: 'blur' }
          ],
          orderMoney: [
            { required: true, message: '药单价值不能为空', trigger: 'blur' }
          ],
          ageindays: [
            { required: true, message: '动物日龄不能为空', trigger: 'blur' }
          ],
          typeCount: [
            { required: true, message: '药品种类数量不能为空', trigger: 'blur' }
          ],
          breedScale: [
            { required: true, message: '字典表id不能为空', trigger: 'blur' }
          ],
          diagnoseDisease: [
            { required: true, message: '诊断病症不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '用户手机号不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.pId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.pId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycyluserperformance/info/${this.dataForm.pId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderNum = data.ycyluserperformance.orderNum
                this.dataForm.serviceTime = data.ycyluserperformance.serviceTime
                this.dataForm.teacherTruename = data.ycyluserperformance.teacherTruename
                this.dataForm.teacherUserId = data.ycyluserperformance.teacherUserId
                this.dataForm.doctorTruename = data.ycyluserperformance.doctorTruename
                this.dataForm.doctorUserId = data.ycyluserperformance.doctorUserId
                this.dataForm.assistantTruename = data.ycyluserperformance.assistantTruename
                this.dataForm.assistantUserId = data.ycyluserperformance.assistantUserId
                this.dataForm.nickname = data.ycyluserperformance.nickname
                this.dataForm.userId = data.ycyluserperformance.userId
                this.dataForm.userArea = data.ycyluserperformance.userArea
                this.dataForm.animal = data.ycyluserperformance.animal
                this.dataForm.orderMoney = data.ycyluserperformance.orderMoney
                this.dataForm.ageindays = data.ycyluserperformance.ageindays
                this.dataForm.typeCount = data.ycyluserperformance.typeCount
                this.dataForm.breedScale = data.ycyluserperformance.breedScale
                this.dataForm.diagnoseDisease = data.ycyluserperformance.diagnoseDisease
                this.dataForm.mobile = data.ycyluserperformance.mobile
                this.dataForm.createTime = data.ycyluserperformance.createTime
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
              url: this.$http.adornUrl(`/generator/ycyluserperformance/${!this.dataForm.pId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'pId': this.dataForm.pId || undefined,
                'orderNum': this.dataForm.orderNum,
                'serviceTime': this.dataForm.serviceTime,
                'teacherTruename': this.dataForm.teacherTruename,
                'teacherUserId': this.dataForm.teacherUserId,
                'doctorTruename': this.dataForm.doctorTruename,
                'doctorUserId': this.dataForm.doctorUserId,
                'assistantTruename': this.dataForm.assistantTruename,
                'assistantUserId': this.dataForm.assistantUserId,
                'nickname': this.dataForm.nickname,
                'userId': this.dataForm.userId,
                'userArea': this.dataForm.userArea,
                'animal': this.dataForm.animal,
                'orderMoney': this.dataForm.orderMoney,
                'ageindays': this.dataForm.ageindays,
                'typeCount': this.dataForm.typeCount,
                'breedScale': this.dataForm.breedScale,
                'diagnoseDisease': this.dataForm.diagnoseDisease,
                'mobile': this.dataForm.mobile,
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
