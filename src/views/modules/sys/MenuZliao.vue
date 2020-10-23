<template>
  <!--  -->
  <!--  代理商资料页面   -->

  <!--  :title="!dataForm.id ? '新增' : '修改'"-->
  <div class="menulist">


    <el-dialog
      :title="dataForm.id ? '业绩' : '修改'"

      :close-on-click-modal="false"
      :visible.sync="visible">
      <h1>资料</h1>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
               label-width="80px" class="menulist_conent">
        <!--      手机号需要添加prop-->
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="dataForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!--      姓名需要添加prop-->
        <el-form-item label="姓名" prop="nikename">
          <el-input v-model="dataForm.nikename" placeholder="姓名"></el-input>
        </el-form-item>
        <!--      地址 需要prop-->
        <el-form-item label="地址" prop="nikename">
          <el-input v-model="dataForm.nikename" placeholder="地址"></el-input>
        </el-form-item>
        <!--      身份证号 需要添加prop-->
        <el-form-item label="身份证号" prop="nikename" class="identity  ">
          <el-input v-model="dataForm.nikename" placeholder="身份证号"></el-input>
        </el-form-item>
        <!--      代理商等级 需要添加prop-->
        <el-form-item label="代理商等级" prop="nikename">


          <el-select v-model="cang" placeholder="请选择">
            <el-option
              v-for="item in cang"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责区域" prop="nikename">
          <el-select v-model="cang" placeholder="请选择">
            <el-option
              v-for="item in cang"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <div class="menulist_footer">

      </div>

      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import {isMobile, isTruename} from '@/utils/validate'

  export default {
    data () {

      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }

      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      var validateTruename = (rule, value, callback) => {
        if (!isTruename(value)) {
          callback(new Error('名字格式错误'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        roleList: [],
        dataForm: {

          options: [{
            value: '选项1',
            label: '一级'
          }, {
            value: '选项2',
            label: '二级'
          }
          ],
          value: '选项1',

          id: 0,
          nikename: '',
          truename: '',
          password: '',
          comfirmPassword: '',
          salt: '',

          mobile: '',
          roleIdList: [],
          status: 1
        },
        dataRule: {
          nikename: [
            {required: true, message: '昵称不能为空', trigger: 'blur'}
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
            {validator: validateTruename, trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/role/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.roleList = data && data.code === 0 ? data.list : []
        }).then(() => {
          this.visible = true
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
                this.dataForm.salt = data.user.salt
                //密码
                this.dataForm.password = data.user.password
                //  昵称
                this.dataForm.nikename = data.user.nikename
                //  手机号
                this.dataForm.mobile = data.user.mobile
                //真实姓名
                this.dataForm.truename = data.user.truename

                this.dataForm.roleIdList = data.user.roleIdList
                //  状态
                this.dataForm.status = data.user.status
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
              url: this.$http.adornUrl(`/sys/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                //  手机号
                'mobile': this.dataForm.mobile,
                // //  密码
                'password': this.dataForm.password,

                'salt': this.dataForm.salt,
                //  昵称
                'nikename': this.dataForm.nikename,

                //真实姓名
                'truename': this.dataForm.truename,
                // 状态
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList
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


<style lang="scss" scoped>
  .menulist {

    .el-input__inner {
      width: 200%;
    }

    .el-input__suffix {
      right: -4rem;
    }
  }

  .menulist_footer {
    width: 200%;
    margin-left: -9rem;
    border: 1px solid #666;
  }
</style>

