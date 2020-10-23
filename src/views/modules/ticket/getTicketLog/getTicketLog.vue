<template>
  <div class="get-ticket-manage mod-config">
    <el-form :inline="true" :model="searchForm" :rules="searchRules" class="search-box"
             @keyup.enter.native="getDataList()">
      <el-form-item label="用户昵称:" prop="nickname">
        <el-input v-model.trim="searchForm.nickname" placeholder="请输入用户昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户手机号:" prop="mobile">
        <el-input v-model.number="searchForm.mobile" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="领取时间:" prop="datetime">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="datetime"
          type="datetimerange"
          range-separator="至"
          clearable
          start-placeholder="开始日期"
          end-placeholder="结束日期" class="popup_timePicker">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="代金券名称:" prop="couponName">
        <el-input v-model.trim="searchForm.voucherName" placeholder="请输入代金券名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="padding:8px 20px" @click="searchMessage()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="nickname"
        header-align="center"
        align="center"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="用户手机号">
      </el-table-column>
      <el-table-column
        prop="bonusAmount"
        header-align="center"
        align="center"
        label="代金券金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="领取时间">
      </el-table-column>
      <el-table-column
        prop="voucherName"
        header-align="center"
        align="center"
        label="代金券名称">
      </el-table-column>
      <el-table-column
        prop="theUsed"
        header-align="center"
        align="center"
        label="是否使用">
        <div slot-scope="scope">
          <span v-if="scope.row.theUsed==1" style="color: green">
          已使用
          </span>
          <span v-if="scope.row.theUsed==0" style="color: #ff4d51">
          未使用
          </span>
        </div>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        datetime:[],
        main_id: '',
        main_type: '',
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        searchForm: {},
        searchRules: {
        },
      }
    },
    mounted () {
      this.main_id = this.$route.query.id
      this.getDataList()
    },
    methods: {
      searchMessage (pageIndex = 1) {
        if (this.datetime.length>1){
          this.searchForm.startCreateTime =this.datetime[0]
          this.searchForm.endCreateTime =this.datetime[1]
        }
        this.searchForm.page = pageIndex
        this.searchForm.pageSize = this.pageSize
        this.searchForm.getId = this.main_id
        this.$http({
          url: this.$http.adornUrl('/voucheruserrecord/list '),
          method: 'post',
          data: this.searchForm
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/voucheruserrecord/list '),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'getId': this.main_id,

          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.searchMessage(this.pageIndex)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchMessage(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
    },
  }
</script>
<style>
  .get-ticket-manage .search-box {
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 16px;
    background-color: #eeeeee;
  }
</style>
<style lang="sass" scoped>

</style>
