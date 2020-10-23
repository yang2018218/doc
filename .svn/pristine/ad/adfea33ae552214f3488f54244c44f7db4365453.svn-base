<template>
  <div>
    <doctorVideoCom ref="everyDoctorVideo"></doctorVideoCom>
  </div>

</template>

<script>
  import doctorVideoCom from '../../../components/doctor/doctorVideoCom'

  export default {
    components: {
      doctorVideoCom
    },
    activated(){
      var id = this.$route.query.userId
     this.$refs.everyDoctorVideo.getDataList(id)
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
