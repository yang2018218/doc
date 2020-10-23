<template>
  <div id="state">
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      center
      title="代理商状态管理" width="300px"
    >
    <span class="dialog-footer" slot="footer">
     <el-button @click="getState(num1)" type="primary">开启</el-button>
<el-button @click="getState(num2)" style="background-color: #ff5500">关闭</el-button>
    </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        num1: '1',
        num2:'0',
        dataList: '',
        visible: false,
        dataForm: {},
      }
    },
    methods: {
      state(sta) {
        this.visible = true
        this.dataForm = sta
      },
      getState(state) {
        this.$confirm('您确定要改变用户状态吗?', '执行操作', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.$http({
            url: this.$http.adornUrl(`/sys/user/updateUserStatus`),
            method: 'post',
            data: this.$http.adornData({
              'userId':this.dataForm.userId,
              'status':state
            })
          }).then(()=>{
            this.$message({
              type: 'success',
              message: '用户状态已经改变!'
            })
            this.visible = false
            this.$emit('refreshDataList')
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消改变用户的状态'
          });
        });



        // this.$alert('您确定要改变用户状态吗', '执行操作', {
        //   confirmButtonText: '确定',
        // })
        //     this.$http({
        //       url: this.$http.adornUrl(`/sys/user/updateUserStatus`),
        //       method: 'post',
        //       data: this.$http.adornData({
        //       'userId':this.dataForm.userId,
        //         'status':state
        //       })
        //     }).then(()=>{
        //         this.visible = false
        //         this.$emit('refreshDataList')
        //     })
          }
    }
  }
</script>
<style lang="scss" scoped>
  #state {
    .el-dialog__body {
      border-top: 2px solid transparent !important;

    }

  }
</style>

