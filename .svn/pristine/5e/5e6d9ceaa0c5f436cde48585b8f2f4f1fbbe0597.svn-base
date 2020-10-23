<template>
  <!--  医生主页-->
  <div class="mod-config">


    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      stripe
      style="width: 100%;"
      v-loading="dataListLoading">


      <el-table-column
        align="center"
        header-align="center"
        label="订单号"
        prop="pId">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="开始时间"
        prop="serviceStartTime">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="指导医生"
        prop="teacherTruename">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="指导医生ID"
        prop="teacherUserId">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="审核医生"
        prop="doctorTruename">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="审核医生手机号"
        prop="auditDoctorMobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="订单金额"
        prop="orderMoney">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="医生审核费"
        prop="reviewDoctor">
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="totalPage"
      @current-change="currentChangeHandle"
      @size-change="sizeChangeHandle"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>
<script>


  export default {
    data() {
      return {
        userId: "",
        DoctorUserid:'',
        enterpriseList:'',
        dataForm: {
          key: '',
          userId: ""
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      // AddOrUpdate,

    },
    activated() {
      this.getDataList();
      // this.userId=this.$route.query.userId
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserperformance/getPageList'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'doctorUserId':this.$route.query.userId,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list;
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = [];
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },

      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val;
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },


    }
  }
</script>
<style lang="scss" scoped>
  .mod-config {

  }

</style>


