<template>
  <div class="mod-config">
    <div class="searchBox">
      <label>
        代金券类型：
        <el-select v-model="searchData.voucherType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </label>
      <label>代金券名称：
        <el-input
          placeholder="请输入内容"
          v-model.trim="searchData.voucherName"
          clearable>
        </el-input>
      </label>
      <label>
        <el-button type="success" class="searchStyle" @click="search()">搜索</el-button>
      </label>
    </div>
    <section class="addTicket">
      <el-button type="success" class="searchStyle" @click="addOrUpdateHandle()">新增代金券</el-button>
    </section>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="voucherId"
        header-align="center"
        align="center"
        label="代金券Id" width="260">
      </el-table-column>
      <el-table-column
        prop="orderProperty"
        header-align="center"
        align="center"
        label="代金券类型" width="120">
        <div slot-scope="scope">
          <span v-if="scope.row.voucherType==1">代金券</span>
          <span v-if="scope.row.voucherType==2">打折券</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="voucherName"
        header-align="center"
        align="center"
        label="代金券名称">
      </el-table-column>
      <el-table-column
        prop="memberMinAvailMoney"
        header-align="center"
        align="center"
        label="代金券使用条件（会员）" width="120">
      </el-table-column>
      <el-table-column
        prop="commonMinAvailMoney"
        header-align="center"
        align="center"
        label="代金券使用条件（非会员）" width="120">
      </el-table-column>
      <el-table-column
        prop="orderProperty"
        header-align="center"
        align="center"
        label="代金券额度（会员）" width="120">
        <div slot-scope="scope">
          <span>{{scope.row.memberMinimum}}~{{scope.row.memberMaximum}}</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="orderProperty"
        header-align="center"
        align="center"
        label="代金券额度（非会员）" width="120">
        <div slot-scope="scope">
          <span>{{scope.row.commonMinimum}}~{{scope.row.commonMaximum}}</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间" width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="isAuth('ycyl:voucherinfo:info')" @click="ticketDetailsFun(scope.row.voucherId)">查看</el-button>
          <el-button type="text" size="small" v-if="isAuth('ycyl:voucherinfo:delete')" @click="deleteHandle(scope.row.voucherId)">删除</el-button>
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <ticket-details :itemList='ticketData'></ticket-details>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import AddOrUpdate from './../../../../components/ticket/addTicket'
  import ticketDetails from '../../../../components/ticket/ticketDetails'

  export default {
    data () {
      return {
        ticketData:'',
        centerDialogVisible: false,//代金券详情
        options: [{
          value: '1',
          label: '代金券'
        }, {
          value: '2',
          label: '打折券'
        }],
        value: '',
        searchData: {},//检索使用对象
        dataTime: [],//检索时间
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
      AddOrUpdate,
      ticketDetails
    },
    activated () {
      this.getDataList()
    },
    methods: {
      ticketDetailsFun (id) {
        this.centerDialogVisible = true
        this.$http({
          url: this.$http.adornUrl(`/voucherinfo/info/${id}`),
          method: 'post',
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.ticketData = data.voucherInfo
          } else {
            this.$message({message: `错误提示:${data.msg}`, type: 'error', duration: 2000})
          }
          this.dataListLoading = false
        })
      },
      search (pageIndex = 1) {//搜索
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        this.$http({
          url: this.$http.adornUrl('/voucherinfo/list'),
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
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/voucherinfo/list'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key
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
        this.getDataList(this.pageIndex)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList(this.pageIndex)
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
          return item.mainId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/voucherinfo/delete'),
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
  .searchBox {
    background-color: #eee;
    width: 100%;
    padding: 8px 0;
    margin-bottom: 10px;

    label {
      margin-left: 5px;
    }
  }

  .addTicket {
    margin-bottom: 10px;
  }
</style>

