<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    title="编辑用户"
    width="500px">
    <div id="userBox">
      <div>手机号码 ：
        <el-input disabled placeholder="" v-model="dataForm.mobile"></el-input>
      </div>
      <div>用户昵称 ：
        <el-input placeholder="" v-model="dataForm.nickname"></el-input>
      </div>
      <div class="imgCount">
        <img :src="dataForm.headImgUrl" alt="图片违规">
        <div>
          <el-button @click="shut()" round size="small">禁用该图片</el-button>
        </div>
      </div>
      <div class="stopBox">
        用户状态:
        <template>
          <el-radio @click="useragent()" label="1" v-model="dataForm.status">开启</el-radio>
          <el-radio @click="useragentstop()" label="0" v-model="dataForm.status">禁用</el-radio>
        </template>
      </div>
    </div>
<!--    {{dataForm}}-->
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button @click="dataFormSubmit()" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        dataList: [],
        visible: false,
        dataForm: {
          headImgUrl:'',
          status: '1',
          userId: '',
          nickname: '',
        },
        dataRule: {}
      }
    },
    methods: {
      useragentstop() {
        this.$alert('您确定要禁用该用户吗', '禁用操作', {
          confirmButtonText: '确定',
          callback: () => {
            this.dataForm.status = "0"
          }
        })
      },
      useragent() {
        this.$alert('您确定要开启该用户吗', '开启操作', {
          confirmButtonText: '确定',
          callback: () => {
            this.dataForm.status = "1"
          }
        })
      },
      shut() {
        this.$alert('您确定要删除该图片吗', '删除操作', {
          confirmButtonText: '确定',
          callback: () => {
            this.dataForm.headImgUrl = "1"
          }
        })
      },
      init(data) {
        this.visible = true
        this.dataForm.userId = data.userId
        this.dataForm = data
        if (this.dataForm.userId) {
          this.$http({
            url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.userId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataList = data
              //  昵称
              this.dataForm.nickname = data.user.nickname
              //   手机号
              this.dataForm.mobile = data.user.mobile
              //图片
              this.dataForm.headImgUrl = data.user.headImgUrl
            }
          })
        }
      },
      dataFormSubmit() {
        this.$http({
          url: this.$http.adornUrl(`/sys/user/updateUserStatus`),
          method: 'post',
          data: this.$http.adornData({
            'userId': this.dataForm.userId,
            // 状态
            'status': this.dataForm.status,
            'nickname':this.dataForm.nickname
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
            this.$message.error("有误")
          }
        })
      }

    }
  }
</script>
<style lang="scss" scoped>
  #userBox {
    text-align: center;
    font-size: 16px;

    div {
      margin: 0.5rem 0;
    }

    div:nth-of-type(1) {
      margin-left: 0.8em;
    }

    div:nth-of-type(2) {
      margin-left: 0.8em;
    }

    div:nth-of-type(4) {
      margin-top: 2rem;
    }

    img {
      width: 100px;
      height: 100px;
    }

  }
</style>
