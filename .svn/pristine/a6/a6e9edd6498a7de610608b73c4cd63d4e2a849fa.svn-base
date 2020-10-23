<template>
  <!--  添加管理员业-->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    title="添加普通用户"
    width="600px">
    <el-form :model="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmit()" id="adduserBox"
             label-width="80px" ref="dataForm">
      <el-form-item label="手机号码" prop="mobile">
        <el-input placeholder="请输入手机号" v-model="dataForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input placeholder="昵称" v-model="dataForm.nickname"></el-input>
      </el-form-item>
      <el-form-item :class="{ 'is-required': !dataForm.id }" label="用户密码" prop="password">
        <el-input placeholder="用户密码" type="password" v-model="dataForm.password"></el-input>
      </el-form-item>
      <el-form-item :class="{ 'is-required': !dataForm.id }" label="确认密码" prop="comfirmPassword">
        <el-input placeholder="确认密码" type="password" v-model="dataForm.comfirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="comfirmPassword">
        <div style="width: 148px;height: 148px;overflow: hidden">
          <el-upload
            name="fileUpload"
            :data="folderName"
            :action="this.$http.adornUrl('/sys/oss/uploadAll')"
            list-type="picture-card"
            :on-success="successUpdata"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <div class="addBottom">
        饲养种类111：
        <template>
          <div>
            <el-radio-group v-for="(animalList,index) in dataAnimal " :key="index" v-model="dataForm.dictName">
              <el-radio-button :label="animalList.dictName"></el-radio-button>
            </el-radio-group>
          </div>
        </template>
</div>
<div class="addBottom">
    饲养规模：
    <el-radio-group v-for="(animalList,ind) in scale " v-model="dataForm.animalList" :key="ind">
        <el-radio-button :key="animalList.dictName" :label="animalList.dictName"></el-radio-button>
    </el-radio-group>
</div>
</el-form>
<span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="dataFormSubmit()" type="primary">确定</el-button>
    </span>
</el-dialog>
</template>
<script>
    import {
        isMobile,
        isTruename
    } from '@/utils/validate'

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
                if (!isMobile(value)) {
                    callback(new Error('手机号格式错误'))
                } else {
                    callback()
                }
            };
            var validateTruename = (rule, value, callback) => {
                if (!isTruename(value)) {
                    callback(new Error('名字格式错误'))
                } else {
                    callback()
                }
            };
            return {
                headImg: '',
                folderName: {
                    folderName: 'ycylManage'
                },
                dictNum: [],
                scale: [],
                dictId: '',
                dataAnimal: [],
                dialogImageUrl: '',
                dialogVisible: false,
                visible: false,
                roleList: [],
                dataForm: {
                    //数据饲养规模
                    animalList: '',
                    dictName: '',
                    id: 0,
                    nickname: "",
                    truename: "",
                    password: '',
                    comfirmPassword: '',
                    salt: '',

                    mobile: '',
                    roleIdList: [],
                    status: 1
                },
                dataRule: {
                    nickname: [{
                        required: true,
                        message: '昵称为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        validator: validatePassword,
                        trigger: 'blur'
                    }],
                    comfirmPassword: [{
                        validator: validateComfirmPassword,
                        trigger: 'blur'
                    }],
                    mobile: [{
                        required: true,
                        message: '手机号不能为空',
                        trigger: 'blur'
                    }, {
                        validator: validateMobile,
                        trigger: 'blur'
                    }]
                }
            }
        },

        methods: {
            handleRemove(file, fileList) {
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            successUpdata(file) {
                this.headImg = file.paths[0]
            },
            //获取规模
            getScale() {
                this.dataListLoading = true;
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
                    method: 'post',
                    data: ({
                        'page': this.pageIndex,
                        'pageSize': '30',
                        'key': this.dataForm.key,
                        'dictValue': 'scale'
                    })
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.scale = data.page.list;
                    }
                })
            },
            //获取动物种类
            animal() {
                this.dataListLoading = true;
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
                    method: 'post',
                    data: ({
                        'page': this.pageIndex,
                        'pageSize': '30',
                        'key': this.dataForm.key,
                        'dictValue': 'animal_type'
                    })
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.dataAnimal = data.page.list;
                        this.animal_type = data.animal_type;
                    }
                })

            },

            init(id) {
                this.dataForm.id = id || 0;
                this.$http({
                    url: this.$http.adornUrl('/sys/role/select'),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({
                    data
                }) => {
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
                        }).then(({
                            data
                        }) => {
                            if (data && data.code === 0) {
                                //
                                this.dataForm.salt = data.user.salt;
                                //密码
                                this.dataForm.password = data.user.password;
                                //  昵称
                                this.dataForm.nickname = data.user.nickname;
                                //  手机号
                                this.dataForm.mobile = data.user.mobile;

                                this.dataForm.status = data.user.status
                            }
                        })
                    }
                })
            },
            // 表单提交
            dataFormSubmit() {
                this.foldddd = this.dataAnimal.filter(item => item.dictName == this.dataForm.dictName)
                this.$http({
                    url: this.$http.adornUrl(`/ycyl/ycyluserinfo/saveUser`),
                    method: 'post',
                    data: this.$http.adornData({
                        'mobile': this.dataForm.mobile,
                        //   密码
                        'password': this.dataForm.password,
                        //  昵称
                        'nickname': this.dataForm.nickname,
                        'scaleId': this.dataForm.animalList,
                        'status': this.dataForm.status,
                        'animalKind': this.foldddd[0].dataId,
                        'headImgUrl': this.headImg
                    })
                }).then(({
                    data
                }) => {
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    #adduserBox {
        padding: 0 8rem;
        .addBottom {
            margin: 1rem 0;
            label {
                margin-top: 0.5rem;
            }
        }
    }
</style>
