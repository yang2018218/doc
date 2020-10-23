<template>
  <div class="mod-config">
    <div class="searchBox">
      <label>
        订单ID：
        <el-input
          placeholder="请输入内容"
          v-model="searchData.orderNum"
          clearable style="width: 250px">
        </el-input>
      </label>
      <label>
        退款状态：
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
        核查时间：
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
        <download-excel
          class="export-excel-wrapper"
          :data="jsonlist"
          :fields="json_fields"
          :name="text">
          <el-button type="primary" size="mini" @click="" id="downFileBtn" style="display: none;padding: 0;margin: 0">
          </el-button>
        </download-excel>
        <el-button slot="reference" type="warning" class="excel" style="padding: 8px 20px" @click="downloadFile">
          下载文件
        </el-button>
    </header>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="outTime"
        header-align="center"
        align="center"
        label="主仓退款核查时间">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        header-align="center"
        align="center"
        label="订单ID">
      </el-table-column>
      <el-table-column
        prop="linkman"
        header-align="center"
        align="center"
        label="收货人姓名">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="用户手机号">
      </el-table-column>
      <el-table-column
        prop="deduct"
        header-align="center"
        align="center"
        label="用户地区">
        <div slot-scope="scope">
          <span>{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}</span>
        </div>
      </el-table-column>
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
        prop="price"
        header-align="center"
        align="center"
        label="订单价值">
      </el-table-column>
      <el-table-column
        prop="voucherMoney"
        header-align="center"
        align="center"
        label="代金券金额">
      </el-table-column>
      <el-table-column
        prop="deduct"
        header-align="center"
        align="center"
        label="退款类型">
        <div slot-scope="scope">
          <span>{{scope.row.refundType==1?'全额退款':'部分退款'}}</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="productName"
        header-align="center"
        align="center"
        label="退货商品">
      </el-table-column>
      <el-table-column
        prop="modelName"
        header-align="center"
        align="center"
        label="商品规格">
      </el-table-column>
      <el-table-column
        prop="modelPrice"
        header-align="center"
        align="center"
        label="商品价格">
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
    <!--    <doctor-video-particulars v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></doctor-video-particulars>-->
  </div>
</template>

<script>
  // import doctorVideoParticulars from '../../views/modules/ycylDoctor/doctorVideoParticulars'
  export default {
    data () {
      return {
        jsonlist: [],
        json_fields: {},
        json_meta: [
          [
            {
              ' key ': ' charset ',
              ' value ': ' utf- 8 '
            }
          ]
        ],
        excelPath: '',
        text: '数据正在处理，请等待...',
        visibleExcel: false,//按钮
        dataTime: [],//检索时间
        searchData: {},//检索的条件
        statusList: [
          {
            name: '财务打款',
            val: '8'
          },
          {
            name: '退款完成',
            val: '6'
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
      // doctorVideoParticulars
    },
    activated () {
      this.getDataList()
    },
    methods: {
      downloadFile () {
        const loading = this.$loading({
          lock: true,
          text: '下载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        })
        if (this.dataTime.length > 1) {
          this.searchData.startOutTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endOutTime = this.dataTime[1].slice(0, 11) + ' 23:59:59'
        }
        this.text = `退款记录表`
        this.$http({
          url: this.$http.adornUrl(`/ycyl/ycylrefundorderdetail/export`),
          method: 'post',
          data: this.searchData
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            if (data.list.length > 0) {
              data.list.map(i=>{
                i.site = i.province+i.city+i.area
                if (i.status==6){
                  i.status="退款完成"
                }else if(i.status==8){
                  i.status="财务打款"
                }
                if(i.refundType==1){
                  i.refundType="全额退款"
                }else if(i.refundType==0){
                  i.refundType="部分退款"
                }
              })
              this.jsonlist = data.list
              this.json_fields = {
                '主仓退款时间': 'outTime',
                '订单号': 'orderNum',    //
                '收货人姓名': 'linkman',    //
                '用户手机': 'mobile',    //
                '用户地区': 'site',    //
                '订单状态': 'status',    //
                '订单价值': 'price',    //
                '代金券金额': 'voucherMoney',    //
                '退款类型': 'refundType',    //
                '退款商品': 'productName',    //
                '商品规格': 'modelName',    //
                '商品价格': 'modelPrice',    //
              }
              setTimeout(() => {
                document.getElementById('downFileBtn').click()
                loading.close()
              }, 10)
            } else {
              this.$message(`温馨提示：暂无退款表`)
              loading.close()
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      downloadFile1 () {//导出信息
        const loading = this.$loading({
          lock: true,
          text: '下载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        })
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startPayTime = this.dataTime[0]+ ' 00:00:00'
          this.searchData.endPayTime = this.dataTime[1]+ ' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylrefundorderdetail/export'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.json_fields = {
              '主仓退款时间': '无',
              '订单号': 'orderNum',    //
              '用户昵称': 'nickname',    //
              '用户手机': '',    //
              '用户地区': 'consigneeMobile',    //
              '订单状态': 'status',    //
              '订单价值': 'sumPrice',    //
              '代金券金额': 'voucherMoney',    //
              '退款类型': 'refundType',    //
              '退款商品': 'payType',    //
              '商品规格': 'deduct',    //
              '商品价格': 'trackingCompany',    //
            }
            setTimeout(() => {
              document.getElementById('downFileBtn').click()
              loading.close()
            }, 0)
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      search (pageIndex = 1) {//搜索
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startOutTime = this.dataTime[0]+ ' 00:00:00'
          this.searchData.endOutTime = this.dataTime[1]+ ' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylrefundorderdetail/list'),
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
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylrefundorderdetail/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'statuss': ['6', '8']
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


