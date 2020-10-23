<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('generator:ycyluserdoctor:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('generator:ycyluserdoctor:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        prop="doctorId"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        label="用户信息表userid">
      </el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        align="center"
        label="区域字典表id">
      </el-table-column>
      <el-table-column
        prop="idcard"
        header-align="center"
        align="center"
        label="身份证号码">
      </el-table-column>
      <el-table-column
        prop="company"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="yearsNum"
        header-align="center"
        align="center"
        label="从业年限">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="个人地址">
      </el-table-column>
      <el-table-column
        prop="adeptKind"
        header-align="center"
        align="center"
        label="保存字典表id,用逗号分隔">
      </el-table-column>
      <el-table-column
        prop="adeptTerritory"
        header-align="center"
        align="center"
        label="擅长领域 保存字典表id,用逗号分隔">
      </el-table-column>
      <el-table-column
        prop="idcardFrontImgUrl"
        header-align="center"
        align="center"
        label="身份证正面照片">
      </el-table-column>
      <el-table-column
        prop="idcardReverseImgUrl"
        header-align="center"
        align="center"
        label="身份证反面照片">
      </el-table-column>
      <el-table-column
        prop="certificateCoverImgUrl"
        header-align="center"
        align="center"
        label="执业证封面照片">
      </el-table-column>
      <el-table-column
        prop="certificateOneImgUrl"
        header-align="center"
        align="center"
        label="执业证第1页">
      </el-table-column>
      <el-table-column
        prop="certificateTwoImgUrl"
        header-align="center"
        align="center"
        label="执业证第2页">
      </el-table-column>
      <el-table-column
        prop="doctorStatus"
        header-align="center"
        align="center"
        label="审核状态 0:审核未通过 1:审核已通过">
      </el-table-column>
      <el-table-column
        prop="rejectReason"
        header-align="center"
        align="center"
        label="驳回理由 保存字典表id">
      </el-table-column>
      <el-table-column
        prop="doctorRank"
        header-align="center"
        align="center"
        label="医生等级 保存数字 1或2">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.doctorId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.doctorId)">删除</el-button>
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
  import AddOrUpdate from './ycyluserdoctor-add-or-update'
  export default {
    data () {
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
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/generator/ycyluserdoctor/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
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
          return item.doctorId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/generator/ycyluserdoctor/delete'),
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
