<template>
  <!--  客服列表页-->
  <div class="mod-config">
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column prop="truename" header-align="center" align="center" label="客服姓名"></el-table-column>
      <el-table-column prop="nickname" header-align="center" align="center" label="客服昵称"></el-table-column>
      <el-table-column prop="mobile" header-align="center" align="center" label="客服登录名"></el-table-column>
      <el-table-column prop="pushOrders" header-align="center" align="center" label="推单量"></el-table-column>
      <el-table-column prop="sinceOrders" header-align="center" align="center" label="自购单"></el-table-column>
      <el-table-column prop="videoOrders" header-align="center" align="center" label="视频单"></el-table-column>
      <el-table-column prop="price" header-align="center" align="center" label="销售额"></el-table-column>
      <el-table-column prop="status" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <p v-if="scope.row.status==0" style="color: red">禁用</p>
          <p v-if="scope.row.status==1" style="color: green">正常</p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="resetpassword(scope.row.userId)"
            v-if="$store.state.user.id==1"
          >密码重置
          </el-button>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">管理</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="statusManage(scope.row.userId,1)">开启</el-dropdown-item>
              <el-dropdown-item @click.native="statusManageQq(scope.row)">区域管理</el-dropdown-item>
              <el-dropdown-item @click.native="statusManage(scope.row.userId,0)">关闭</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="text" size="small" @click="pathJump(scope.row.userId)">个人详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisibleaa" width="30%">
      <span>确认重置密码吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleaa = false">取 消</el-button>
        <el-button type="primary" @click="sure(id)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 客服区域管理弹窗 -->
    <el-dialog title="客服地区管理" :show-close="false" custom-class="dialog_servermane" :visible.sync="dialogVisible"
               width="524px" :before-close="handleClose">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>客服手机号:{{editData.mobile}}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <span>客服姓名:{{editData.truename}}</span>
          </div>
        </el-col>
        <p>管理区域： </p>
        <div style="display: inline-block;border: 1px solid #d9d9d9;">
          <span v-for='(item,index) in cityList' :key='index'
                style='padding: 5px 8px;margin-right: 10px;display: inline-block;'>{{item.name}}</span>
        </div>

      </el-row>
      <div style="height: 2rem;"></div>
      <el-cascader v-model="areaIdw" popper-class="server_cascader" :show-all-levels="false" :options="options"
                   :props="props" @expand-change="expand" @change="handleChange"></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quXiao()">返回</el-button>
        <el-button type="primary" @click="makeSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
                   :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                   layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <!--    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>-->
  </div>
</template>

<script>
  // import AddOrUpdate from './ycyldict-add-or-update'
  export default {
    data () {
      return {
        quId: [],
        cityList: '', //回显客服管理的城市
        quYuList: '',
        dataForm: {
          key: ''
        },
        dialogVisibleaa: false,
        id: '',
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        dialogVisible: false,
        editData: {},
        options: [],
        areaIdw: [],
        props: {
          multiple: true,
          value: 'id',
          label: 'name',
          children: 'list',
          disabled: 'B'
        }
      }
    },

    activated () {
      this.getDataList()
      this.getprovince()
    },
    methods: {
      quXiao () { //取消
        this.dialogVisible = false
        //this.getDataList() //获取数据重新渲染页面
        setTimeout(location.reload(), 200)
      },
      sure (userId) {
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
          this.dialogVisibleaa = false
        })
      },
      resetpassword (a) {
        this.dialogVisibleaa = true
        this.id = a
      },
      makeSure () {//确定提交仓储
        let list = []
        let cityIds = []
        this.areaIdw.forEach(item => {
          list.push({
            userId: this.editData.userId,
            areaId: item[2],
            provinceId: item[0],
            cityId: item[1]
          })

          if (!cityIds.some(items => items == item[1])) {
            cityIds.push(item[1])
          }
        })
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylcustomerarea/updateCusArea'),
          method: 'post',
          data: {
            list,
            cityIds: this.quId
          }
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.dialogVisible = false
            this.$message.success('修改成功')
            setTimeout(location.reload(), 200)
            // setTimeout(location.reload(), 200)

          } else {
            this.$message.error(data.msg)
          }
        })
      },
      expand (value) {
        if (value.length == 1) {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylprovincecity/getCity'),
            method: 'post',
            data: {
              state: 2,
              pid: value[0]
            }
          }).then(({
            data
          }) => {
            if (data && data.code == 0) {
              data.list.forEach(item => (item.list = []))
              this.options.some(item => {
                if (item.id == value && item.state == 1) {
                  item.list = data.list
                  return true
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
        if (value.length == 2) {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylprovincecity/getCityForCus'),
            method: 'post',
            data: {
              state: 3,
              pid: value[1],
              userId: this.editData.userId
            }
          }).then(({
            data
          }) => {
            if (data && data.code == 0) {
              data.list.forEach(item => {
                if (item.A) {
                  let arra = []
                  arra.push(item.id)
                  let arr = value.concat(arra)

                  let bool = this.areaIdw.some(item => {
                    return JSON.stringify(item) == JSON.stringify(arr)
                  })

                  if (!bool) {
                    this.areaIdw.push(arr)
                  }
                }
              })
              this.options.some(items => {
                if (items.list) {
                  items.list.some(item => {
                    if (item.id == value[1] && item.state == 2) {
                      item.list = data.list

                      return true
                    }
                  })
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }

      },
      getprovince () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylprovincecity/getCity'),
          method: 'post',
          data: {
            state: 1
          }
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            data.list.forEach(item => (item.list = []))
            this.options = data.list
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      handleChange (value) {
        if (value.length == 1) {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylprovincecity/getCity'),
            method: 'post',
            data: {
              state: 2,
              pid: value[0][0]
            }
          }).then(({
            data
          }) => {
            if (data && data.code == 0) {
              this.options.some(item => {
                if (item.id == value) {
                  item.list = data.list
                  return true
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })

        }
        if (value.length == 2) {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylprovincecity/getCityForCus'),
            method: 'post',
            data: {
              state: 3,
              pid: value[0][1],
              userId: this.editData.userId
            }
          }).then(({
            data
          }) => {
            if (data && data.code == 0) {
              this.options.some(items => {
                if (items.list) {
                  items.list.some(item => {
                    if (item.id == value[1]) {
                      item.list = data.list
                      return true
                    }
                  })
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      },
      // 区域管理
      statusManageQq (i) {
        this.quyu(i)
        this.dialogVisible = true
        this.editData = JSON.parse(JSON.stringify(i))
      },
      handleClose () {
      },
      // 管理区域返回的数据
      quyu (i) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylcustomerarea/infoById'),
          method: 'post',
          data: {
            userId: i.userId
          }
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            let maps = new Map()
            let arrays = new Array() // 数组用于返回结果
            for (let i = 0; i < data.area[0].id.split(",").length; i++) {
              if (maps.has(data.area[0].id.split(',')[i])) {
                // 如果有该key值
                maps.set(data.area[0].id.split(',')[i], true)
              } else {
                maps.set(data.area[0].id.split(',')[i], false) // 如果没有该key值
                arrays.push(data.area[0].id.split(',')[i])
                this.quId = arrays
              }
            }
            let map = new Map()
            let array = new Array() // 数组用于返回结果
            for (let i = 0; i < data.area[0].city.split(",").length; i++) {
              if (map.has(data.area[0].city.split(',')[i])) {

                // 如果有该key值
                map.set(data.area[0].city.split(',')[i], true)
              } else {
                map.set(data.area[0].city.split(',')[i], false) // 如果没有该key值
                array.push(data.area[0].city.split(',')[i])
                this.quYuList = array
              }
            }
            var arrey1 = []
            for (var obgect in this.quYuList) {
              arrey1.push({
                name: this.quYuList[obgect],
              })
            }
            this.cityList = arrey1

          } else {
            this.$message.error(data.msg)
          }
          // this.dialogVisibleaa = false;
        })
      },
      pathJump (id) {
        this.$router.push({
          path: '/servepath',
          query: {
            userID: id
          }
        })
      },

      statusManage (id, sta) {
        if (sta == 0) {
          this.$confirm('此操作将改变客服的区域信息，请慎重操作', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var than = this
            this.$http({
              url: this.$http.adornUrl('/sys/user/updateUserStatus'),
              method: 'post',
              data: {
                userId: id,
                userType: '4',
                status: sta
              }
            }).then(({
              data
            }) => {
              if (data && data.code === 0) {
                this.$message.success("该客服已关闭，区域已经释放")
                than.getDataList()
              } else {
                this.$message.error(data.msg)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          var than = this
          this.$http({
            url: this.$http.adornUrl('/sys/user/updateUserStatus'),
            method: 'post',
            data: {
              userId: id,
              userType: '4',
              status: sta
            }
          }).then(({
            data
          }) => {

            if (data && data.code === 0) {
              than.getDataList()
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/customer/getPageList'),
          method: 'post',
          data: {
            page: this.pageIndex,
            pageSize: this.pageSize,
            key: this.dataForm.key,
            userType: '4'
          }
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
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/scss/el_casder";

  .mod-config {
    .dialog_servermane {
      min-height: 300px;
      border-radius: 10px;

      .el-dialog__header {
        text-align: center;
      }

      .el-dialog__body {
        border-top: 0;
      }

      .el-dialog__footer {
        text-align: center;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .el-dropdown-link:hover {
    color: #0bb2d4;
  }

  .el-dropdown-link {
    font-size: 12px;
    color: #19678e;
  }
</style>
