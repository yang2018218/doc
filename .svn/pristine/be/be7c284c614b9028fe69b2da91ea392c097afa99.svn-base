<template>
<!--  代理商认证页面-->
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
    </el-form>
    <el-table
      :data="dataList"
      stripe
      @selection-change="selectionChangeHandle"
      border
      style="width: 100%;"
      v-loading="dataListLoading">

      <el-table-column
        align="center"
        header-align="center"
        label="手机号"
        prop="mobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="申请代理等级"
        prop="level">
        <template slot-scope="scope">
          <span v-if="scope.row.level ==1" size="small" style="color: #00b7ee">市级</span>
          <span v-if="scope.row.level ==2" size="small" style="color: #f56c6c">县级</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="地区"
        prop="area">
      </el-table-column>

      <el-table-column
        align="center"
        header-align="center"
        label="代理姓名"
        prop="truename">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="申请时间"
        prop="creatTime">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="身份证号"
        prop="idcard">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="个人地址"
        prop="address">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="审核状态"
        prop="agentStatus">
        <template slot-scope="scope">
          <el-tag size="small" type="danger" v-if="scope.row.agentStatus == '2'">未认证</el-tag>
          <el-tag size="small"  v-if="scope.row.agentStatus == '1'">已通过</el-tag>
          <el-tag size="small"  v-if="scope.row.agentStatus == '0'">未通过</el-tag>
          <el-tag size="small"  v-if="scope.row.agentStatus == '3'">认证中</el-tag>

        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.userId,scope.row.agentStatus)" size="small" type="text">审核</el-button>

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
    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './ycyluseragentaudit-add'
  export default {
    data() {
      return {
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
    activated() {
      setTimeout(this.getDataList,10)
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            "status": 1,
            'agentSta':"0,2,3"
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
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      //  审核
      addOrUpdateHandle(id,ids) {
        if(!Number(ids))
        return this.$message.error('请提交资料后重新审核')
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle(id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.agentId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/ycyluseragent/delete'),
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
