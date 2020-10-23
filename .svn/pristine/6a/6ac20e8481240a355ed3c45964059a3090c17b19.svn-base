<template>
  <!--  添加管理员业-->
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  width="600px">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="登录名" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="请输入登录名"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">
        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="truename">
        <el-input v-model="dataForm.truename" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="角色" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份" size="mini" prop="userType" >
        <el-radio-group v-model="dataForm.userType">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="3">医助</el-radio>
          <el-radio :label="4">客服</el-radio>

        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {isMobile, isTruename} from '@/utils/validate'

  export default {
    data() {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      };
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      };


      var validateMobile = (rule, value, callback) => {
        // if (!isMobile(value)) {
        //   callback(new Error('手机号格式错误'))
        // } else {
        //   callback()
        // }
      };
      var validateTruename = (rule, value, callback) => {
        if (!isTruename(value)) {
          callback(new Error('名字格式错误'))
        } else {
          callback()
        }
      };
      return {
        visible: false,
        roleList: [],
        dataForm: {
          id: 0,
          nickname: "",
          truename: "",
          password: '',
          comfirmPassword: '',
          salt: '',
          mobile: '',
          roleIdList: [],
          status: 1,
          userType: 0
        },
        dataRule: {
          nickname: [
            {required: true, message: '昵称为空', trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          comfirmPassword: [
            {validator: validateComfirmPassword, trigger: 'blur'}
          ],
          truename: [
            {required: true, message: '真实姓名不能为空', trigger: 'blur'},
            // {validator: validateEmail, trigger: 'blur'}
            {validator: validateTruename, trigger: "blur"}
          ],
          mobile: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'}
          ],
          roleIdList:[
            {required: true, message: '角色不能为空', trigger: 'blur'},
          ],
          status:[
            {required: true, message: '状态不能为空', trigger: 'blur'},
          ],
          userType:[
            {required: true, message: '状态不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      init(id) {
        this.dataForm.id = id || 0;
        this.$http({
          url: this.$http.adornUrl('/sys/role/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.roleList = data && data.code === 0 ? data.list : []
        }).then(() => {
          this.visible = true;
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                //
                this.dataForm.salt = data.user.salt;
                //密码
                this.dataForm.password = data.user.password;
                //  昵称
                this.dataForm.nickname = data.user.nickname;
                //  手机号
                this.dataForm.mobile = data.user.mobile;
                //真实姓名
                this.dataForm.truename = data.user.truename;

                this.dataForm.roleIdList = data.user.roleIdList;
                //  状态
                this.dataForm.status = data.user.status
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit() {
        // this.$refs['dataForm'].validate((valid) => {
          // if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                //  手机号
                'mobile': this.dataForm.mobile,
                //   密码
                'password': this.dataForm.password,

                'salt': this.dataForm.salt,
                //  昵称
                'nickname': this.dataForm.nickname,

                //真实姓名
                "truename": this.dataForm.truename,
                // 状态
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList,
                'userType': this.dataForm.userType
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          // }
        // })
      }
    }
  }
</script>
