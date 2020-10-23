<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    title="审核状态"
    width="300px">

    <span class="dialog-footer" slot="footer">
      <el-button @click="passPages(2)">驳回</el-button>
      <el-button @click="passPages(1)" type="primary">通过</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        status:'',
        cId: '',
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataForm: {
          key: ''
        },

      }
    },
    methods: {
      init(id,s) {
        this.cId = id
        this.visible = true
        this.status=--s


      },

      passPages(status) {

        if(!this.status){
           this.visible = false
          return this.$message.error('审核已通过,禁止操作')
        }


        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylpoultrycircle/update'),
          method: 'get',
          params: this.$http.adornParams({
            cId: this.cId,
            status,
            page: this.pageIndex,
            pageSize: this.pageSize,
            key: this.dataForm.key,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
             this.visible = false
            this.$emit("refreshDataList")
          }
        })

      },


    }
  }
</script>

