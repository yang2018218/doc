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
        订单状态：
        <el-select v-model="searchData.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in statusList"
            :key="item.val"
            :label="item.name"
            :value="item.val">
          </el-option>
        </el-select>
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
        prop="orderNum"
        header-align="center"
        align="center"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="payTime"
        header-align="center"
        align="center"
        label="购买时间">
      </el-table-column>
      <el-table-column
        prop="doctorName"
        header-align="center"
        align="center"
        label="主讲老师">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="订单价值">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="resultsId"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="药品种类">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="订单状态">
        <div slot-scope="scope">
          <span>
            {{fn(scope.row.status)}}
          </span>
        </div>
      </el-table-column>
      <el-table-column
        prop="deduct"
        header-align="center"
        align="center"
        label="提成">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.resultsId)">详情</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
        <doctor-video-particulars v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></doctor-video-particulars>
  </div>
</template>

<script>
 import doctorVideoParticulars from '../../views/modules/ycylDoctor/doctorVideoParticulars'
  export default {
    data () {
      return {
        doctorId:'',//医生id
        orderMoney:'0',//订单金额
        doctorMoney:'0',//提成
        isdisabled:false,
        excelPath:"",
        text:'数据正在处理，请等待...',
        visibleExcel:false,//按钮
        dataTime:[],//检索时间
        searchData:{},//检索的条件
        statusList: [
          {
            name: '未付款',
            val: '0'
          },
          {
            name: '已付款',
            val: '1'
          },
          {
            name: '已发货',
            val: '2'
          },
          {
            name: '已完成',
            val: '3'
          },
          {
            name: '客服审核',
            val: '4'
          }, {
            name: '退款完成',
            val: '6'
          },
          {
            name: '主仓审核',
            val: '7'
          },
          {
            name: '财务打款',
            val: '8'
          },
          {
            name: '急速退款',
            val: '9'
          },

        ],
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
      doctorVideoParticulars
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

        this.isdisabled = true
        this.$http({
          url: this.$http.adornUrl('/study/studyorderresults/getStudyOrederReq'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.excelPath = data.path
            window.location.href=this.excelPath
            loading.close()

            this.isdisabled = false
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      search (pageIndex=1) {//搜索
        this.getSumPrice()
        this.searchData.doctorId = this.doctorId
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startPayTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endPayTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studyorderresults/list'),
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
      getSumPrice(pageIndex=1){//视频单业绩
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        this.searchData.doctorId = this.doctorId
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startPayTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endPayTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studyorderresults/getSumPrice'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (data.list&& data.list[0]){
              this.orderMoney = data.list[0].price
              this.doctorMoney = data.list[0].deduct
            }else {
              this.orderMoney = '0'
              this.doctorMoney = '0'
            }

          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
      fn (i) {
        switch (i) {
          case 0:
            return '未付款'
            break
          case 1:
            return '已付款'
            break
          case 2:
            return '已发货'
            break
          case 3:
            return '已完成'
            break
          case 4:
            return '客服审核'
            break
          case 5:
            return '财务审核'
            break
          case 6:
            return '退款完成'
            break
          case 7:
            return '仓库审核'
            break
          case 8:
            return '财务打款'
            break
          case 9:
            return '急速退款'
            break

        }
      },
      // 获取数据列表
      getDataList (doctorId) {
        this.doctorId = doctorId
        this.getSumPrice()
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/study/studyorderresults/list'),
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
        this.search(this.pageIndex)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.search(this.pageIndex)
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
    }
  }
</script>
<style lang="scss" scoped>
  .mod-config {
    .searchBox {
      background-color: #eee;
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


