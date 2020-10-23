<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
      border
      stripe
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
<!--      <el-table-column-->
<!--        type="selection"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        width="50">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="trueName"
        header-align="center"
        align="center"
        label="医助姓名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="医助手机号">
      </el-table-column>
      <el-table-column
        prop="nickName"
        header-align="center"
        align="center"
        label="医助昵称">
      </el-table-column>

      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.status === 0">禁用</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.status === 1">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">业绩详情</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="pathEveryDoctorHelp(scope.row.userId,null)">购物单业绩</el-dropdown-item>
              <el-dropdown-item @click.native="pathEveryDoctorHelp(scope.row.userId,'selfBuyOrder')">自购单业绩</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="text" size="small" @click="stateChange()">状态</el-button>
          <el-button type="text" size="small" @click="sure(scope.row.userId)">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

<!--    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>-->
  </div>
</template>

<script>
  // import AddOrUpdate from './doctorhelp-add'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
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
      // AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      sure (userId) {//重置密码
        this.$http({
          url: this.$http.adornUrl('/sys/user/resetPW'),
          method: 'post',
          data: this.$http.adornParams({
            userId
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.$message.success('密码重置成功')
          } else {
            this.$message.error(data.msg)
          }
          this.dialogVisibleaa = false
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/sys/user/getAssistedList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key,
            'userType':3
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
      sizeChangeHandle (val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val;
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      //跳转至详情页；
      pathEveryDoctorHelp(id,type){

        this.$router.push({  //核心语句
          path:'/everydoctorhelp',   //跳转的路径
          query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            id:id,
            type,
          }
        })
      },
      stateChange(){

       this.$message.warning('请您前往管理员列表中修改')
      }
    }
  }
</script>

<style lang="scss">
  .el-dropdown-link {
    cursor: pointer;
    color: #19678E;
    font-size: 12px;
  }

  .el-dropdown-link:hover {
    color: #409EFF;
  }
</style>