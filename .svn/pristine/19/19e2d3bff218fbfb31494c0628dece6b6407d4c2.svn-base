<template>
  <div class="mod-config">
    <div class="searchBox">
      <label>主题：
        <el-input
          placeholder="请输入内容"
          v-model.trim="searchData.theme"
          clearable>
        </el-input>
      </label>
      <label>
        可领时间：
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
      <label>状态：
        <el-select v-model="searchData.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in stateList"
            :key="item.val"
            :label="item.message"
            :value="item.val">
          </el-option>
        </el-select>
      </label>

      <label>
        领取张数：
        <el-input
          placeholder="请输入内容"
          v-model.trim="searchData.startGetSheets"
          clearable>
        </el-input>
        -
        <el-input
          placeholder="请输入内容"
          v-model.trim="searchData.endGetSheets"
          clearable>
        </el-input>
      </label>
      <label>
        使用张数：
        <el-input
          placeholder="请输入内容"
          v-model.trim="searchData.startUseSheets"
          clearable>
        </el-input>
        -
        <el-input
          placeholder="请输入内容"
          v-model.trim="searchData.startUseSheets"
          clearable>
        </el-input>
      </label>
      <label>
        <el-button type="success" class="searchStyle" @click="search()">搜索</el-button>
      </label>
    </div>
    <section class="addTicket">
      <el-button type="success" class="searchStyle" @click="addOrUpdateHandle()">新增发放</el-button>
    </section>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="theme"
        header-align="center"
        align="center"
        label="发放主题">
      </el-table-column>
      <el-table-column
        prop="beginTime"
        header-align="center"
        align="center"
        label="可领时间（开始）" width="300">
        <div slot-scope="scope">
          <span v-if="scope.row.beginTime&&scope.row.endTime">
            {{scope.row.beginTime}}~{{scope.row.endTime}}
          </span>
          <span v-else>
          永久
          </span>
        </div>
      </el-table-column>
      <el-table-column
        prop="packageIssuedSheets"
        header-align="center"
        align="center"
        label="发放张数/次" width="120">
      </el-table-column>
      <el-table-column
        prop="issuedMoney"
        header-align="center"
        align="center"
        label="总发放金额" width="120">
      </el-table-column>
      <el-table-column
        prop="getSheets"
        header-align="center"
        align="center"
        label="领取张数" width="120">
      </el-table-column>
      <el-table-column
        prop="useSheets"
        header-align="center"
        align="center"
        label="使用张数" width="120">
      </el-table-column>
      <el-table-column
        prop="orderProperty"
        header-align="center"
        align="center"
        label="状态" width="120">
        <div slot-scope="scope">
          <span v-if="scope.row.status==1" style="color: green">开启</span>
          <span v-if="scope.row.status==0" style="color: #ff4d51">关闭</span>
        </div>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="isAuth('ycyl:voucherissued:info')"
                     @click="addOrUpdateHandle(scope.row.issuedId)">编辑
          </el-button>
          <el-popconfirm
            @onConfirm="staticManage(scope.row.issuedId,scope.row.status)"
            @onCancel=""
            title="您确认要修改状态吗？"
          >
            <el-button slot="reference" type="text" style="font-size: 12px"
                       v-if="isAuth('ycyl:voucherissued:shutDown')">{{scope.row.status==1 ? '关闭':'开启'}}
            </el-button>
          </el-popconfirm>
          <el-button type="text" size="small" v-if="isAuth('ycyl:voucheruserrecord:list')" @click="getTicketLog(scope.row.issuedId,)">获取记录</el-button>
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
  </div>
</template>

<script>
  import AddOrUpdate from './../../../../components/ticket/addSendOutTicket'

  export default {
    data () {
      return {
        stateList:[
          {
            val:'1',
            message:'开启'
          },

          {
            val:'0',
            message:'关闭'
          },
        ],
        visible: false,
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
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      staticManage (id, status) {//状态管理log
        this.dataList.forEach(e=>{
          if (e.status==1){
            this.$message({message:'温馨提示：请将开启状态'})
            return
          }
        })
        this.$http({
          url: this.$http.adornUrl('/voucherissued/shutDown'),
          method: 'post',
          data: {
            issuedId: id,
            status: status == 0 ? '1' : '0'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.getDataList()
            this.$message({message: '操作成功', duration: 2000, type: 'success'})
          } else {
            this.$message({message: `错误提示：${data.msg}`})
          }
        })
        this.visible = false
      },
      getTicketLog (id) {
        //  获取记录
        this.$router.push({
          path: '/getTicketLog',
          query: {
            id: id,
          }
        })
      },
      search (pageIndex = 1) {//搜索
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        this.searchData.doctorId = this.doctorId
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.beginTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/voucherissued/list'),
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
          url: this.$http.adornUrl('/voucherissued/list'),
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
            url: this.$http.adornUrl('/generator/ycylmainproduct/delete'),
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

