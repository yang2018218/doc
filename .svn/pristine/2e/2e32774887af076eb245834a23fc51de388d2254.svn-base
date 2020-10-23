<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    title="审核医生添加"
  width="538px"
    center
  >

    <div class="doctorBox">
      <ul>
        <li><span>审核医生ID：</span></li>
        <li></li>
        <li></li>
        <li></li>

      </ul>
    </div>

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
        visible: false,

      }
    },
    methods: {
      init() {
        this.visible = true

      },
    }
  }
</script>
<style lang="scss" scoped>


</style>

