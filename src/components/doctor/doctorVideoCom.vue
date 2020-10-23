<template>
  <div class="mod-config">
    <div class="searchBox">
      <label>
        购买时间：
        <el-date-picker
          width="200px"
          v-model="dataTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </label>
      <label>
        <el-button type="success" class="searchStyle" @click="search()">搜索</el-button>
      </label>
    </div>
    <header class="searchBox ">

      <label><span>订单金额金额：{{orderMoney}}元</span></label>
      <label><span>提成：{{doctorMoney}}元</span></label>
      <label style="float: right">
            <el-button slot="reference" type="warning" class="excel" style="padding: 8px 20px" @click="downloadFile()">
            下载文件
          </el-button>
      </label>
    </header>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="courseName"
        header-align="center"
        align="center"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="fitKind"
        header-align="center"
        align="center"
        label="课程类型">
      </el-table-column>
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
        prop="doctorTruename"
        header-align="center"
        align="center"
        label="主讲老师">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="付款金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="购买时间">
      </el-table-column>

      <el-table-column
        prop="deduct"
        header-align="center"
        align="center"
        label="提成">
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
    <!-- 弹窗, 新增 / 修改 -->
    <!--    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>-->
  </div>
</template>

<script>
  // import AddOrUpdate from './ycylagentperformance-add-or-update'
  export default {
    data () {
      return {
        doctorId: '',//医生id
        orderMoney: '0',//订单金额
        doctorMoney: '0',//提成
        excelPath: '',
        visibleExcel: false,//按钮
        dataTime: [],//检索时间
        searchData: {},//检索的条件
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
      // this.getDataList()
    },
    methods: {
      downloadFile () {//导出信息
        const loading = this.$loading({
          lock: true,
          text: '下载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        this.searchData.doctorId = this.doctorId
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startPayTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endPayTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studybuyrecord/getStudyBuyRep'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.excelPath = data.path
            window.location.href=this.excelPath
            loading.close()
          } else {
           this.$message.error(data.msg)
          }
        })

      },
      search (pageIndex = 1) {//搜索
        this.getSumPrice()
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        this.searchData.doctorId = this.doctorId
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startPayTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endPayTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studybuyrecord/list'),
          method: 'post',
          data: this.searchData
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
      getSumPrice (pageIndex = 1) {//视频单业绩
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        this.searchData.doctorId = this.doctorId
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startPayTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endPayTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studybuyrecord/getPriceAndDeduct'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (data.price && data.price[0]) {
              this.orderMoney = data.price[0].price
              this.doctorMoney = data.price[0].deduct
            } else {
              this.orderMoney = '0'
              this.doctorMoney = '0'
            }

          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
      // 获取数据列表
      getDataList (doctorId) {
        this.doctorId = doctorId
        this.getSumPrice()
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/study/studybuyrecord/list'),
          method: 'post',
          data: ({
            'doctorId': doctorId,
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key
          })
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
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.pId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/ycylagentperformance/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .mod-config {
    .searchBox {
      background-color: #eee;
      width: 100%;
      padding: 8px 0;
      margin-bottom: 10px;

      label {
        margin-left: 5px;
      }
    }

    header {
      background-color: #fff !important;

      label {
        font-size: 16px;
        margin-right: 20px;
      }
    }
  }
</style>


