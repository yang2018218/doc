<template>
  <div class="mod-config">
    <div class="searchBox">
      <label> 起止时间：
        <el-date-picker
          @change="butto()"
          v-model="startDeliverTime"
          type="date"
          style="width: 140px"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
        --
        <el-date-picker
          v-model="endDeliverTime"
          type="date"
          value-format="yyyy-MM-dd 23:59:59"
          style="width: 140px"
          placeholder="选择日期">
        </el-date-picker>
      </label>
      <label for="product">
        药品名字：
        <el-input
          id="product"
          placeholder="请输入内容"
          v-model="productName"
          clearable>
        </el-input>
      </label>
      <label for="order">
        订单号：
        <el-input
          id="order"
          placeholder="请输入内容"
          v-model="orderNum"
          clearable>
        </el-input>
      </label>
      <label>
        <el-button type="primary" style="padding: 8px 20px" @click="searchbtn()">搜索</el-button>
      </label>

      <label >
        <el-popover
          placement="bottom"
          width="160"
          v-model="visibleExcel">
          <p>请确认您是否要下载普通订单的出库信息</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visibleExcel = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visibleExcel = false"><a :href="this.excelPath" style="list-style: none">确定</a> </el-button>
          </div>
          <el-button slot="reference" type="warning" class="excel"   style="padding: 8px 20px" @click="downloadFile">下载文件</el-button>
        </el-popover>
      </label>
    </div>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        prop="deliverTime"
        header-align="center"
        align="center"
        label="出库日期">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        header-align="center"
        align="center"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="productName"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="modelName"
        header-align="center"
        align="center"
        label="商品规格">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="商品价格">
      </el-table-column>
      <el-table-column
        prop="marketPrice"
        header-align="center"
        align="center"
        label="商品市场价">
      </el-table-column>
      <el-table-column
        prop="sumPrice"
        header-align="center"
        align="center"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="count"
        header-align="center"
        align="center"
        label="商品数量">
      </el-table-column>
      <el-table-column
        prop="place"
        header-align="center"
        align="center"
        label="库位">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="订单状态">
      </el-table-column>
      <el-table-column
        prop="outboundWay"
        header-align="center"
        align="center"
        label="出库方式">
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        excelPath:'',//下载文件
        visibleExcel:false,
        orderNum: '',//订单号
        productName: '',//商品名字
        startDeliverTime: '',//开始时间
        endDeliverTime:'',//结束时间
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
    activated () {
      this.getDataList()
    },
    methods: {
      butto(){
      },
      downloadFile(){
        this.$http({
          url: this.$http.adornUrl('/ycyl/report/getOrderReport'),
          method: 'post',
          data: ({
            'key': this.dataForm.key,
            'orderNum': this.orderNum,
            'productName': this.productName,
            'startDeliverTime': this.startDeliverTime,
            'endDeliverTime': this.endDeliverTime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
         this.excelPath = data.path
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })

      },
      searchbtn (pageIndex=1) {//搜索
        this.$http({
          url: this.$http.adornUrl('/ycyl/report/getOrdRepPageList'),
          method: 'post',
          data: ({
            'page': pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'orderNum': this.orderNum,
            'productName': this.productName,
            'startDeliverTime': this.startDeliverTime,
            'endDeliverTime': this.endDeliverTime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/report/getOrdRepPageList'),
          method: 'post',
          data: ({
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
        this.searchbtn(this.pageIndex)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchbtn(this.pageIndex)
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
            url: this.$http.adornUrl('/generator/ycyluserperformance/delete'),
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
      padding: 10px 10px;

      label {
        margin-right: 32px;
      }
    }
  }

</style>
