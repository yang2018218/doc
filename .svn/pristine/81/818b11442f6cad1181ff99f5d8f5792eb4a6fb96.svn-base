<template>
  <div>
    <expertVideoOrderCom ref="expertvideoOrder"></expertVideoOrderCom>
  </div>
</template>

<script>
  import expertVideoOrderCom from '../../../components/doctor/doctorVideoOrderCom'

  export default {
    activated () {
      let id = this.$route.query.userId
      this.$refs.expertvideoOrder.getDataList(id)
    },
    components: {
      expertVideoOrderCom
    }
  }
</script>

<style scoped>

</style>
