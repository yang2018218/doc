<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      stripe
      style="width: 100%;"
      v-loading="dataListLoading">

      <el-table-column
        align="center"
        header-align="center"
        label="姓名"
        prop="truename">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="手机号"
        prop="mobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="地区"
        prop="address">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="擅长类型"
        prop="adeptKind">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="职称"
        prop="position">
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
        label="就业单位"
        prop="company">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="从业年限"
        prop="yearsNum">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="执业证书"
        prop="certificateImgUrl">
        <template slot-scope="scope">
         <p v-if="scope.row.certificateImgUrl=='' " style="color: red"> 无</p>
          <p v-else style="color: green"> 有</p>
        </template>

</el-table-column>
<el-table-column align="center" header-align="center" label="身份证照片" prop="idcardFrontImgUrl">
    <template slot-scope="scope">
          <p v-if="scope.row.idcardReverseImgUrl=='' " style="color: red"> 无</p>
          <p v-else style="color: green"> 有</p>
        </template>
</el-table-column>
<el-table-column align="center" header-align="center" label="审核状态" prop="doctorStatus">
    <template slot-scope="scope">
          <p v-if="scope.row.doctorStatus==0 " style="color: red"> 审核未通过</p>
            <p v-if="scope.row.doctorStatus==1 " style="color: green"> 审核已通过</p>
              <p v-if="scope.row.doctorStatus==2 " style="color: green"> 未认证</p>
          <p v-if="scope.row.doctorStatus==3 " style="color: green"> 认证中</p>
        </template>
</el-table-column>
<el-table-column align="center" fixed="right" header-align="center" label="操作" width="150">
    <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row.userId)"  size="small" type="text">审核</el-button>
        </template>
</el-table-column>
</el-table>
<el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="totalPage" @current-change="currentChangeHandle" @size-change="sizeChangeHandle" layout="total, sizes, prev, pager, next, jumper">
</el-pagination>
<!-- 弹窗, 新增 / 修改 -->
<add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>
</div>
</template>

<script>
    import AddOrUpdate from './ycyluserperformanceproduct-add-or-update'

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
            this.getDataList()
        },
        methods: {
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyluserexpert/list'),
                    method: 'post',
                    data: ({
                        'page': this.pageIndex,
                        'pageSize': this.pageSize,
                        'key': this.dataForm.key,
                        'doctorStatuss': ['0', '3']
                    })
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.dataList = data.page.list
                        this.totalPage = data.page.totalCount
                        for (var i = 0; i < this.dataList.length; i++) {

                        }
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

            //审核页面
            addOrUpdateHandle(id) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                    this.$refs.addOrUpdate.getEveryDoctor(id)
                })
            },
            // 删除
            deleteHandle(id) {
                var ids = id ? [id] : this.dataListSelections.map(item => {
                    return item.prId
                })
                this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl('/ycyl/ycyluserperformanceproduct/delete'),
                        method: 'post',
                        data: this.$http.adornData(ids, false)
                    }).then(({
                        data
                    }) => {
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
