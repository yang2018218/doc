<template>
    <footer class="footerd">
      <span style="padding-right:5px;">共{{pages.totalCount}}条</span>
      <select class="footer_select" v-model="pageSize">
          <option value="1">1条/页</option>
        <option value="10">10条/页</option>
        <option value="15">15条/页</option>
        <option value="30">30条/页</option>
        <option value="50">50条/页</option>
      </select>
      <span style="padding-right:5px;">前往</span>
      <select class="footer_select_last" v-model="page">
        <option v-for="item in pages.totalPage" :key="item" :value="item">{{item+'页'}}</option>
      </select>
      <span style="padding:0 6px;">页</span>
      <span @click="$emit('pagechange',{pageSize,page})" class="sure_btn">确定</span>
    </footer>
</template>

<script>
export default {
  data() {
    return {
         pageSize: 10,
         page:1,//去第几页,默认展示第一页

    };
  },

  props: ['pages'],

};
</script>
<style lang="scss" scoped>
 // 底部页码样式
  .footerd {
    padding-top: 45px;
    text-align: right;
    color: #333;
    .footer_select {
      width: 103px;
      height: 30px;
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 6px;
      padding-left: 5px;
      margin-right: 18px;
    }
    .footer_select_last {
      width: 57px;
      height: 30px;
      padding-left: 5px;

      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 6px;
    }
    .sure_btn {
      width: 57px;
      height: 30px;
      background: #19678E;
      border-radius: 6px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      color: #fff;
      cursor: pointer;
    }
  }
</style>
