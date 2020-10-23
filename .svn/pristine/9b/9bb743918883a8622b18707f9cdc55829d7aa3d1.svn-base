<template>
  <!--  医生主页-->
  <div class="mod-config">

<!--    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">-->
<!--      <el-form-item>-->
<!--        <el-input clearable placeholder="参数名" v-model="dataForm.key"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button @click="getDataList()">查询</el-button>-->
<!--&lt;!&ndash;        <el-button @click="addOrUpdateHandle()" type="primary">新增</el-button>&ndash;&gt;-->
<!--        <el-button :disabled="dataListSelections.length <= 0" @click="deleteHandle()" type="danger"-->
<!--                   v-if="isAuth('ycyl:ycyladdress:delete')">批量删除-->
<!--        </el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
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
        label="审核医生姓名"
        prop="truename">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="审核医生手机号"
        prop="mobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="审核身份证号"
        prop="idcard">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="状态"
        prop="isRecipe">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isRecipe == 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-if="scope.row.isRecipe ==1 " size="small" type="success">正常</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-dropdown>
  <span class="el-dropdown-link" style="color: #19678E;font-size: 12px">
    状态
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="DoctorOpen(scope.row.userId)">开启</el-dropdown-item>
              <el-dropdown-item @click.native="DoctorClose(scope.row.userId)">关闭</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="small" type="text" @click="toMallInfo(scope.row.userId)">业绩详情</el-button>
        </template>
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
    <!-- 弹窗, 新增 -->
    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"
                   v-bind:usernumber="DoctorUserid"></add-or-update>
  </div>
</template>
<script>

  import AddOrUpdate from './auditdoctor-add'

  export default {
    data() {
      return {
        dictId: '',
        DoctorUserid: '',
        enterpriseList: '',
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
      AddOrUpdate,

    },
    activated() {
      this.getDataList();
    },
    methods: {
      DoctorClose(id) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/update'),
          method: 'post',
          params: this.$http.adornParams({
            "userId": id,
            'isRecipe': 0,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.getDataList()
          }
        })
      },
      DoctorOpen(id) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/update'),
          method: 'post',
          params: this.$http.adornParams({
            "userId": id,
            'isRecipe': 1,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.getDataList()
          }
        })
      },
      toMallInfo(userId) {

        this.$router.push({
          path: '/auditdoctorList',
          query: {
            userId: userId,
          }
        })
      },

      // 获取数据列表
      getDataList() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            "doctorStatus": "1",
            'doctorRank': 1,

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
      //新增
      addOrUpdateHandle() {
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()

        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .mod-config {
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }
  }

</style>

