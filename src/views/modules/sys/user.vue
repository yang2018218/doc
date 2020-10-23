<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      stripe
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <el-table-column
        prop="trueName"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="nickName"
        header-align="center"
        align="center"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
</el-table-column>
<el-table-column prop="creatTime" header-align="center" align="center" width="180" label="创建时间">
</el-table-column>
<el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
    <template slot-scope="scope">
           <!-- <el-button   type="text" size="small" @click="alterUser(scope.row.userId)">
          </el-button> -->
          <el-button type="text" size="small"    @click="resetpassword(scope.row.userId) ">密码重置</el-button>
          <el-button v-if="isAuth('sys:user:update')" type="text" size="small" @click="alterUser(scope.row.userId)">修改
          </el-button>
          <el-button v-if="isAuth('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.userId)">
            删除
          </el-button>
        </template>
</el-table-column>
</el-table>
<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
    <span>确认重置密码吗?</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sure(id)">确 定</el-button>
  </span>
</el-dialog>
<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
</el-pagination>
<!-- 弹窗, 新增  -->
<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
<!--    修改-->
<user-add-alter v-if="alterUpdateVisible" ref="UserAddAlter" @refreshDataList="getDataList"></user-add-alter>
</div>
</template>

<script>
    import AddOrUpdate from './user-add-or-update'
    import UserAddAlter from './user-add-alter'

    export default {
        data() {
            return {
                dataForm: {
                    userName: ''
                },
                dataList: [],
                dialogVisible: false,
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                alterUpdateVisible: false,
                id: '',
            }
        },
        components: {
            AddOrUpdate,
            UserAddAlter
        },
        activated() {
            this.getDataList()
        },
        methods: {
            sure(userId) {
                if (userId == '1') {
                    this.$message.warning('您没有权限对最高管理员进行任何处理！若有需求，请联系后台')
                } else {
                    this.$http({
                        url: this.$http.adornUrl('/sys/user/resetPW'),
                        method: 'post',
                        data: this.$http.adornParams({
                            userId

                        })
                    }).then(({
                        data
                    }) => {

                        if (data && data.code === 0) {
                            this.$message.success('密码重置成功')
                        } else {
                            this.$message.error(data.msg)
                        }
                        this.dialogVisible = false

                    })

                }



            },
            resetpassword(a) {
                this.dialogVisible = true
                this.id = a;

            },
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/sys/user/list'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'page': this.pageIndex,
                        'limit': this.pageSize,
                        'username': this.dataForm.userName,
                        'userType': 0,
                    })
                }).then(({
                    data
                }) => {
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
            // 新增
            addOrUpdateHandle(id) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
            //修改
            alterUser(id) {
                if (id === '1') {
                    this.$message.warning('您没有权限对最高管理员进行任何处理！若有需求，请联系后台')
                } else {
                    this.alterUpdateVisible = true
                    this.$nextTick(() => {
                        this.$refs.UserAddAlter.init(id)
                    })
                }
            },
            // 删除
            deleteHandle(id) {
                if (id == '1') {
                    this.$message.warning('您没有权限删除最高管理员！若有需求，请联系后台')
                } else {
                    var userIds = id ? [id] : this.dataListSelections.map(item => {
                        return item.userId
                    });

                    this.$confirm(`确定删除 ?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http({
                            url: this.$http.adornUrl('/sys/user/delete'),
                            method: 'post',
                            data: this.$http.adornData(userIds, false)
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
    }
</script>
