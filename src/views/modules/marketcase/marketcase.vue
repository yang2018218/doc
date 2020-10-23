<template>
  <div class="mod-config">

  </div>
</template>

<script>


  export default {
    data() {
      return {

      }
    },
    components: {

    },
    activated() {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList() {
        // this.dataListLoading = true;
        // this.$http({
        //   url: this.$http.adornUrl('/ycyl/spikestart/do_miaosha'),
        //   method: 'get',
        //   params: this.$http.adornParams({
        //     'page': this.pageIndex,
        //     'pageSize': this.pageSize,
        //     'key': this.dataForm.key,
        //     'helpType': 1
        //   })
        // }).then(({data}) => {
        //   if (data && data.code === 0) {
        //     this.dataList = data.page.list;
        //     this.totalPage = data.page.totalCount
        //   } else {
        //     this.dataList = [];
        //     this.totalPage = 0
        //   }
        //   this.dataListLoading = false
        // })
      },

    }
  }
</script>
