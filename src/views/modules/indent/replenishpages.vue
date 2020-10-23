<template>
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        手机号：
        <el-input placeholder="手机号" style="width:126px;" v-model="searchData.mobile"></el-input>
      </label>
      <label class="agent_crux">
        姓名：
        <el-input placeholder="姓名" v-model="searchData.agentName"></el-input>
      </label>
      <label class="agent_crux">
        订单Id：
        <el-input placeholder="订单id" v-model="searchData.orderNum" style="width:188px;"></el-input>
      </label>
      <label>
        进货状态：
        <el-select placeholder="请选择" v-model="searchData.status" class="doctor">
          <el-option
            :key="inde" :label="item.name" :value="item.id" v-for="(item,inde) in enterpriseList">
          </el-option>
        </el-select>
      </label>
      <label class="">
        支付时间：
        <el-date-picker
          end-placeholder="结束日期"
          value-format='yyyy-MM-dd'
          range-separator=" - "
          start-placeholder="开始日期"
          type="daterange"
          v-model="qqTime">
        </el-date-picker>
      </label>
      <label class="">
        进货价值：
        <el-input placeholder="" v-model="searchData.startPrice"></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="searchData.endPrice"></el-input>
      </label>
<!--      <label>-->
<!--        代理区域：-->
<!--        <el-input placeholder="代理区域" v-model="searchData.agentAddress"></el-input>-->
<!--      </label>-->
      <label>
        <el-button type="primary" @click="searchGoods()" style="padding:7px 18px">搜索</el-button>
      </label>
    </div>
    <header class="searchBox ">
      <label><span>进货价值：{{allMoney}}元</span></label>
      <label >
            <el-button slot="reference" type="warning" class="excel" style="padding: 8px 20px" @click="downloadFile()">
            下载文件
          </el-button>
      </label>
    </header>
    <el-table
      :cell-style="cellStyle"
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      stripe
      style="width: 100%;"
      v-loading="dataListLoading" ref="configurationTable">

      <el-table-column
        align="center"
        header-align="center"
        label="进货单ID"
        prop="orderNum">
      </el-table-column>

      <el-table-column
        align="center"
        header-align="center"
        label="代理手机号"
        prop="mobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="代理姓名"
        prop="agentName">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="代理区域"
        prop="agentAddress">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="支付时间"
        prop="payTime">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="进货价值"
        prop="price">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="进货状态"
        prop="status">
        <template slot-scope="scope">
          <el-tag size="small" type="primary" v-if="scope.row.status === 1" style="border:1px solid transparent;background-color: transparent ">客服审核</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.status === 3" style="border:1px solid transparent;background-color: transparent ">财务审核</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.status === 4" style="border:1px solid transparent;background-color: transparent ">仓储发货</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status === 5" style="border:1px solid transparent;background-color: transparent ">已发货</el-tag>
          <p  v-if="scope.row.status === 6" style="color: greenyellow;font-size: 12px">已完成</p>
          <p  v-if="scope.row.status === 7" style="color: #ff4d51;font-size: 12px">驳回</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.orderId)" size="small" type="text">详情</el-button>
          <el-button @click="replenis(scope.row.agentUserId,scope.row.userId)" size="small" type="text">库存状况</el-button>
          <!-- <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button> -->
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './replenishpages-add'

  export default {
    data () {
      return {
        allMoney:'',//金额
        isdisabled:false,
        excelPath:"",
        text:'数据正在处理，请等待...',
        visibleExcel:false,//按钮
        sta: [3, 7],
        dataForm: {
          key: '',
          time: '',
        },
        dictId: '',
        enterpriseList: [
          {id: 1, name: '客服审核'},
          {id: 3, name: '财务审核'},
          {id: 4, name: '主仓发货'},
          {id: 5, name: '已发货'},
          {id: 6, name: '完成'},
          {id: 7, name: '驳回'},
        ],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        searchData: {},
        qqTime: [],
      }
    },
    components: {
      AddOrUpdate
    },
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
        });
        if (this.qqTime && this.qqTime.length == 2) {
          this.searchData.endCreateTime = this.qqTime[1]+" 23:59:59"
          this.searchData.startCreateTime = this.qqTime[0]+" 00:00:00"
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentorder/getAgentOrderRep'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {

            this.excelPath = data.path
            window.location.href=this.excelPath
            this.isdisabled = false
            loading.close()
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      getSumPrice(){//视频单业绩统计
        if (this.qqTime && this.qqTime.length == 2) {
          this.searchData.endCreateTime = this.qqTime[1]+" 23:59:59"
          this.searchData.startCreateTime = this.qqTime[0]+" 00:00:00"
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentorder/getSumPrice'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            if ( data.price &&data.price.price){
              this.allMoney = data.price.price
            }
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      },
        cellStyle ({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 10 || columnIndex === 11) {
            // 指定坐标
            return 'cursor:pointer'
          }
          if (columnIndex === 9) {
            // 指定坐标
            return 'text-align:center'
          }
        },
      searchGoods (pageIndex=1) {
        this.getSumPrice()
        if (this.qqTime && this.qqTime.length == 2) {
          this.searchData.endCreateTime = this.qqTime[1]+" 23:59:59"
          this.searchData.startCreateTime = this.qqTime[0]+" 00:00:00"
        }
        if (this.searchData.mobile && !/1\d{10}/.test(this.searchData.mobile)) {
          this.$message.error('手机号格式错误')
          return
        }
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentorder/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {

            this.$message.error(data.msg)
          }
        })
      },

      //路径跳转
      replenis (id, c) {
        this.$router.push({
          path: '/producttian',
          query: {
            agentUserId: c,
            c
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentorder/getPageList'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            this.$refs.configurationTable.doLayout()
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
        this.searchGoods()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchGoods(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 详情
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      //删除操作
      deleteHandle (data) {
        //orderId
        var id = data.orderId
        if (data.status == 2) {
          var ids = id ? [id] : this.dataListSelections.map(item => {
            return item.orderId
          })
          this.$confirm(`确定对进货单id是【${ids.join(',')}】进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http({
              url: this.$http.adornUrl('/ycyl/ycylagentorder/delete'),
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

        } else {
          alert('您暂时没有权限！')
        }

      },
    }
  }
</script>
<style lang="scss" scoped>
  .el-table th {
    display: table-cell !important;
  }
  #doctorSearch {
    background-color: #eee;
    border-radius: 0.4rem;
    padding: 10px 5px;
    margin-bottom: 16px;

    .chairman_sunch {
      background-color: rgb(25, 103, 142);
      color: #fff;
      height: 2rem;
      width: 4rem;
      border-radius: 10%;
      margin-left: 10px;
      border: 1px solid transparent;
    }

    label {
      margin-top: 0.5rem;
      display: inline-block;
      margin-left: 1rem;
    }

    .el-input {
      width: 6rem;
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
<style>

  .el-select-dropdown__wrap {
    max-height: 325px;
  }


</style>


