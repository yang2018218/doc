<template>
  <div class="mod-config">
    <div class="useragent_sunch">
      <label class="agent_crux">
        药品名称：
        <el-input onblur="this.value=this.value.trim()" placeholder="请输入药品名称" v-model="searchData.productName" clearable></el-input>
      </label>
      <label class="agent_crux">
        申请时间：
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="searchData.timeRange"
          type="datetimerange"
          range-separator="-"
          start-placeholde="开始时间"
          end-placeholde="结束时间"
          clearable
        ></el-date-picker>
      </label>
      <label class="agent_crux">
        申请单号：
        <el-input onblur="this.value=this.value.trim()" placeholder="请输入申请单号" v-model="searchData.orderNum" clearable style="width:220px"></el-input>
      </label>
      <label>
        <el-button type="primary" @click="getDataList()" style="padding:8px 20px">搜索</el-button>
      </label>
    <el-button
      type="primary"
      @click="exportTable()"
      style="margin-bottom: 16px;padding: 8px 20px;margin-left:10px;"
    >导出表格</el-button>
      <download-excel
        v-show="false"
        class="export-excel-wrapper"
        :data="jsonlist"
        :fields="json_fields"
        id="downloadExcel"
        name="线下推广.xls">
      </download-excel>
    </div>
    <el-table :data="dataList" border style="width: 100%;" v-loading="dataListLoading">
      <el-table-column align="center" header-align="center" label="申请单号" prop="orderNum"></el-table-column>
      <el-table-column align="center" header-align="center" label="申请时间" prop="createTime"></el-table-column>
      <el-table-column align="center" header-align="center" label="商品名称" prop="productName"></el-table-column>
      <el-table-column align="center" header-align="center" label="商品规格" prop="modelName"></el-table-column>
      <el-table-column align="center" header-align="center" label="商品数量" prop="count"></el-table-column>
      <el-table-column align="center" header-align="center" label="商品价格" prop="price"></el-table-column>
      <el-table-column align="center" header-align="center" label="商品市场价" prop="marketPrice"></el-table-column>
      <el-table-column align="center" header-align="center" label="总金额" prop="sumPrice"></el-table-column>
      <el-table-column align="center" header-align="center" label="库位" prop="place"></el-table-column>
      <el-table-column align="center" header-align="center" label="出库方式">
        <template slot-scope="scope">{{scope.row.orderType|orderTypeFilter(that)}}</template>
      </el-table-column>
    </el-table>
    <!--    {{medicine}}-->
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="totalPage"
      @current-change="currentChangeHandle"
      @size-change="sizeChangeHandle"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      that: this,
      searchData: {},
      dataList: [],
      dataListLoading: false,
      pageIndex: 1,
      attributes: [
        {
          label: "自提",
          value: 1,
        },
        {
          label: "快递",
          value: 2,
        },
      ],
      pageSize: 10,
      totalPage: 0,
      // 导出
      jsonlist: [],
      json_fields: {
          '申请单号': 'orderNum',   
          '申请时间': 'createTime', 
          '商品名称': 'productName', 
          '商品规格': 'modelName',
          '商品数量': 'count',
          '商品价格': 'price',
          '商品市场价': 'marketPrice',
          '总金额': 'sumPrice',
          '库位': 'place',
          '出库方式': 'orderType',
        },
    };
  },
  mounted() {
    this.getDataList();
  },
  filters: {
    orderTypeFilter: function (val, that) {
      if (!val) return "";
      var a;
      that.attributes.map((item) => {
        if (item.value == val) a = item.label;
      });
      return a;
    },
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/topushorderdetail/getPageList"),
        method: "post",
        data: this.$http.adornData({
          page: this.pageIndex,
          pageSize: this.pageSize,
          productName: this.searchData.productName || "",
          orderNum: this.searchData.orderNum || "",
          startCreatetTime: this.searchData.timeRange
            ? this.searchData.timeRange[0]
            : "",
          endCreateTime: this.searchData.timeRange
            ? this.searchData.timeRange[1]
            : "",
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 导出表格
    exportTable() {
      var loading=this.$loading({lock:true,text:"下载中",spinner:"el-icon-loading",background:"rgba(255,255,255,0.7)"})
      this.$http({
        url: this.$http.adornUrl("/topushorderdetail/getList"),
        method: "post",
        data: this.$http.adornData({
          productName: this.searchData.productName || "",
          orderNum: this.searchData.orderNum || "",
          startCreateTime: this.searchData.timeRange
            ? this.searchData.timeRange[0]
            : "",
          endCreateTime: this.searchData.timeRange
            ? this.searchData.timeRange[1]
            : "",
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          data.list = data.list.map((item) => {
            this.attributes.map((itemIn) => {
              if (itemIn.value == item.orderType) item.orderType = itemIn.label;
            });
            return item
          });
          this.jsonlist=data.list
          setTimeout(function(){
            document.querySelector("#downloadExcel").click()
            loading.close()
          },0)
          } else {
            loading.close()
          }
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
  },
};
</script>
<style lang="scss" scoped>
.mod-config {
  .useragent_sunch {
    padding: 10px 5px;
    border-radius: 0.4rem;
    margin-bottom: 16px;
    background-color: #eeeeee;

    label {
      margin-left: 16px;
    }
  }
}
.el-range-editor.el-input__inner {
  padding: 0 10px !important;
}
</style>
