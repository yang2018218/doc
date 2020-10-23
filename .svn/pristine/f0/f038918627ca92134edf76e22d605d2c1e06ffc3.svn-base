<template>
  <div>
    <expert-video ref="expert"></expert-video>
  </div>
</template>

<script>
  import expertVideo from '../../../components/doctor/doctorVideoCom'

  export default {
    activated () {
      var id = this.$route.query.userId
      this.$refs.expert.getDataList(id)
    },
    components: {
      expertVideo
    }
  }
</script>

<style scoped>

</style>
