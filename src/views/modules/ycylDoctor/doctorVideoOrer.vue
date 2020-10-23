<template>
  <div>
    <doctorVideoOrderCom ref="videoOrder"></doctorVideoOrderCom>
  </div>
</template>

<script>
  import doctorVideoOrderCom from '../../../components/doctor/doctorVideoOrderCom'

  export default {
    activated () {
      var id = this.$route.query.userId
      this.$refs.videoOrder.getDataList(id)
    },
    components: {
      doctorVideoOrderCom
    }

  }
</script>

<style scoped>

</style>
