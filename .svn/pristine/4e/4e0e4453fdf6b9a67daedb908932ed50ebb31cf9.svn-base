<template>
  <div class="mod-config">
    <div class="searchBox">
      <label>
        商品Id：
        <el-input
          placeholder="请输入内容"
          oninput="this.value = this.value.trim()"
          v-model="searchData.productNo"
          clearable>
        </el-input>
      </label>
      <label>
        商品名称：
        <el-input
          oninput="this.value = this.value.trim()"
          placeholder="请输入内容"
          v-model="searchData.productName"
          clearable>
        </el-input>
      </label>
      <label>
        规格名称：
        <el-input
          oninput="this.value = this.value.trim()"
          placeholder="请输入内容"
          v-model="searchData.modelName"
          clearable>
        </el-input>
      </label>
      <label>
        入库时间：
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
        厂商名字：
        <el-input
          oninput="this.value = this.value.trim()"
          placeholder="厂商名字"
          v-model="searchData.manufacturer"
          clearable>
        </el-input>
      </label>
      <label>
        <el-button type="success" class="searchStyle" @click="search()">搜索</el-button>
      </label>
    </div>
    <header class="searchBox ">
      <label><span>采购金额：{{overallMoney}}元</span></label>
      <download-excel
        v-show="false"
        class="export-excel-wrapper"
        :data="jsonlist"
        :fields="json_fields"
        name="入库记录表格.xls" ref="downFile">
        <el-button type="primary" size="mini" id="downFileBtn">确定
        </el-button>
      </download-excel>
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
        prop="productNo"
        header-align="center"
        align="center"
        label="商品Id">
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
        label="规格名称">
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        header-align="center"
        align="center"
        label="采购单价">
      </el-table-column>
      <el-table-column
        prop="count"
        header-align="center"
        align="center"
        label="采购数量">
      </el-table-column>
      <el-table-column
        prop="sumPrice"
        header-align="center"
        align="center"
        label="采购金额">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="入库时间">
      </el-table-column>
      <el-table-column
        prop="place"
        header-align="center"
        align="center"
        label="库位">
      </el-table-column>
      <el-table-column
        prop="manufacturer"
        header-align="center"
        align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="examinePicture(scope.row.url)">查看图片</el-button>
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
    <el-dialog
      title="入库图片"
      :visible.sync="dialogVisible"
      width="30%" center>
      <div class="imgBox">
        <img :src="imgUrl" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">返回</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        jsonlist: [],
        // visibleExcel :false,
        // text: '数据正在处理中，请稍后...',
        json_fields: {
          '商品Id': 'productNo',    //单号
          '商品名称': 'productName', //名字
          '规格名称': 'modelName', //地区
          '采购单价': 'unitPrice',
          '采购数量': 'count',
          '采购金额': 'sumPrice',
          '入库时间': 'createTime',
          '库位': 'place',
          '厂商': 'manufacturer'
        },
        json_meta: [
          [
            {
              ' key ': ' charset ',
              ' value ': ' utf- 8 '
            }
          ]
        ],
        overallMoney: '0',
        excelPath: '',
        text: '数据正在处理，请等待...',
        visibleExcel: false,
        isdisabled: '',
        searchData: {},//检索的条件
        dataTime: '',
        imgUrl: '',
        dialogVisible: false,
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
    components: {},
    activated () {
      this.getDataList()
      this.getSumPrice()
    },
    methods: {
      downloadFile () {//导出信息
        const loading = this.$loading({
          lock: true,
          text: '下载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        })
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startCreateTime = this.dataTime[0]+" 00:00:00"
          this.searchData.endCreateTime = this.dataTime[1]+" 23:59:59"
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylputgrndetail/getGrnDetailReq'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.jsonlist = data.list
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
      getSumPrice () {//统计
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startCreateTime = this.dataTime[0]+" 00:00:00"
          this.searchData.endCreateTime = this.dataTime[1]+" 23:59:59"
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylputgrndetail/getSumPrice'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (data.price) {
              this.overallMoney = data.price.sumPrice
            } else {
              this.overallMoney = '0'
            }
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
      search (pageIndex = 1) {//搜索
        this.getSumPrice()
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        this.searchData.doctorId = this.doctorId
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startCreateTime = this.dataTime[0]+" 00:00:00"
          this.searchData.endCreateTime = this.dataTime[1]+" 23:59:59"
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylputgrndetail/getGrnDetail'),
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
      examinePicture (url) {//弹出框
        this.imgUrl = ''
        this.imgUrl = url
        this.dialogVisible = true
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylputgrndetail/getGrnDetail'),
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
    }
  }
</script>
<style lang="scss" scoped>
  .imgBox {
    img {
      width: 100%;
    }
  }

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

