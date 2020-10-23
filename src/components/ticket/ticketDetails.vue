<template>
  <div class="content">
    <p>代金券类型：<span v-if="itemList.voucherType==1">代金券</span> <span v-if="itemList.voucherType==2">打折券</span></p>
    <p>代金券名称：{{itemList.voucherName}}</p>
    <p>创建时间：{{itemList.createTime}}</p>
    <p v-if="itemList.beginTime">有&nbsp;&nbsp;效&nbsp;&nbsp;&nbsp;期：{{itemList.beginTime}}~{{itemList.endTime}}</p>
    <p v-if="itemList.useDays">有&nbsp;&nbsp;效&nbsp;&nbsp;&nbsp;期：{{itemList.useDays}}  天</p>
    <div>
      <p>会员使用条件：{{itemList.memberMinAvailMoney}} 元</p>
      <p>非会员使用条件：{{itemList.commonMinAvailMoney}} 元</p>
    </div>
    <div>
      <p>会员代金券面额：{{itemList.memberMinimum}}元~{{itemList.memberMaximum}}元</p>
      <p>非会员代金券面额：{{itemList.commonMinimum}}元~{{itemList.commonMaximum}}元</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: ['itemList'],
    mounted () {

    }

  }
</script>

<style scoped lang="scss">
  .content {
    font-size: 16px;
    color: #333;

    p {
      line-height: 36px;
    }

    div {
      p {
        display: inline-block;
        width: 240px;
      }
    }
  }
</style>
