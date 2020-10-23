<template>
  <!-- 客服端代理商进货主页 -->
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        手机号：
        <el-input style="width:140px;" placeholder="代理手机号" v-model="searchData.mobile" clearable></el-input>
      </label>
      <label class="agent_crux">
        姓名：
        <el-input style="width:126px;" placeholder="代理姓名" v-model="searchData.agentName" clearable></el-input>
      </label>

      <label>
        进货状态：
        <el-select placeholder="请选择" v-model="searchData.status" class="doctor" clearable>
          <el-option
            :key="inde" :label="item.name" :value="item.id" v-for="(item,inde) in enterpriseList">
          </el-option>
        </el-select>
      </label>
      <label class="">
        申请时间：
        <el-date-picker
          end-placeholder="结束日期"
          value-format='yyyy-MM-dd '
          range-separator=" - "
          start-placeholder="开始日期"
          type="daterange"
          v-model="qqTime" clearable>
        </el-date-picker>
      </label>
      <label class="">
        进货价值：
        <el-input placeholder="" v-model="searchData.startPrice" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="searchData.endPrice" clearable></el-input>
      </label>
      <label>
        <el-button type="primary" @click="searchGoods()" style="padding:7px 18px">搜索</el-button>
        <!-- <button  @click="searchGoods" class="chairman_sunch">搜索</button> -->
      </label>
    </div>
    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      stripe
      style="width: 100%;"
    >
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
        label="申请时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="进货价值"
        prop="price"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="进货状态"
        prop="status" width="150">
        <template slot-scope="scope">

          <el-tag size="small" type="primary" v-if="scope.row.status === 1">客服审核</el-tag>
          <el-tag size="small" type="warning" v-if="scope.row.status === 3">财务审核</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.status === 4">仓储发货</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status === 5">已发货</el-tag>
          <el-tag size="small" v-if="scope.row.status === 6">已完成</el-tag>
          <el-tag size="small" v-if="scope.row.status === 7">已驳回</el-tag>
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
    <!-- 弹窗, 详情-->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>

  import AddOrUpdate from './servestock-add'

  export default {
    data () {
      return {
        // sta:1,
        dataForm: {
          key: '',
          time: '',
        },
        dictId: '',
        enterpriseList: [
          {name: '客服审核', id: 1},
          {name: '财务审核', id: 3},
          {name: '仓储发货', id: 4},
          {name: '已发货', id: 5},
          {name: '已完成', id: 6},
          {name: '已驳回', id: 7},
        ],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
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
    },
    methods: {
      searchGoods (pageIndex = 1) {
        if (this.searchData.mobile && !/1\d{10}/.test(this.searchData.mobile)) {
          this.$message.error('手机号格式错误')
          return
        }
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        if (this.qqTime && this.qqTime.length>1){
          this.searchData.endCreateTime = this.qqTime[1]+' 23:59:59'
          this.searchData.startCreateTime = this.qqTime[0]+' 00:00:00'
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentorder/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            // for (let k in this.searchData) {
            //   this.searchData[k] = ''
            // }
            // this.qqTime = []
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
            agentUserId: id,
            c
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylagentorder/getPageList'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            //获取进货单
            // 'status':this.sta
          }
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
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        // this.searchGoods()
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

    }
  }
</script>
<style lang="scss" scoped>
  #doctorSearch {
    background-color: #eee;
    border-radius: 0.4rem;
    margin-bottom: 16px;
    padding: 10px 5px;

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
</style>



