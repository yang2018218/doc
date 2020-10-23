<template>
  <div class="mod-config  mode_config_xx">
<!--    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">-->
<!--      <el-form-item>-->
<!--        <el-button @click="addOrUpdateHandle()" type="primary" v-if="isAuth('ycyl:ycylagentwproduct:save')">新增-->
<!--        </el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <div class="ycylagentwproductSearch">
      <label class="agent_crux">
        手机号：
        <el-input placeholder="手机号" v-model="searchData.mobile"></el-input>
      </label>
      <label class="agent_crux">
        负责人：
        <el-input placeholder="负责人姓名" v-model="searchData.truename"></el-input>
      </label>

      <label class="">
        状态：
        <el-select placeholder="请选择" v-model="searchData.inventoryStatus">
          <el-option
            :key="inde" :label="item.name" :value="item.id" v-for="(item,inde) in arr">
          </el-option>
        </el-select>
      </label>
      <span style="padding-left:20px;">地区：</span>

      <el-cascader
        v-model="areaIdw"
        :options="options"
        popper-class="ageng_xx"
        :props="props"
        @expand-change="expand"
        @change="handleChange">
      </el-cascader>
      <label>
        <button @click="searchGoods()" class="chairman_sunch">搜索</button>
      </label>
    </div>
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
        label="负责人"
        prop="truename"
        width="80px">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="服务等级"
        prop="level"
        width="60px">
        <template slot-scope="scope">
          <span v-if="scope.row.level ==1" size="small" style="color: #00b7ee">市级</span>
          <span v-if="scope.row.level ==2" size="small" style="color: #f56c6c">县级</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        header-align="center"
        label="服务地区"
        prop="area">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="代理商收货地址"
        prop="address">
      </el-table-column>

      <el-table-column
        align="center"
        header-align="center"
        label="联系电话"
        prop="mobile">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="仓储产品价值"
        prop="totalValue">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="库存状态"
        width="130"
        prop="productStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.productStatus ==0" size="small" style="color: #00b7ee">正常</span>
          <span v-if="scope.row.productStatus ==1" size="small" style="color: #f56c6c">缺货</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="库存数量"
        prop="totalReserves">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="replenis(scope.row.userId)" size="small" type="text">库存状况</el-button>
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
  import AddOrUpdate from './ycylagentwproduct-add-or-update'

  export default {
    data () {
      return {
        dataCity: '',
        one: '15',
        two: '0',
        three: '0',
        dataForm: {
          key: '',
          condition: [
            {
              shu: '种类一',
              label: '正常'
            },

            {
              shu: '种类二',
              label: '缺货'
            }
          ],
          shu: '',
          time: ''

        },
        areaIdw: [],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        searchData: {},

        options: [],
        valued: [],
        props: {
          value: 'id',
          label: 'name',
          children: 'list',
        },
        arr: [
          {id: 0, name: '正常'},
          {id: 1, name: '缺货'}
        ],

      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
      this.getprovince()
    },
    methods: {
      expand (value) {
        this.handleChange(value)
      },
      handleChange (value) {
        if (value.length == 1) {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylprovincecity/getCity'),
            method: 'post',
            data: {
              state: 2,
              pid: value[0]
            }
          }).then(({data}) => {
            if (data && data.code == 0) {
              data.list.forEach(item => item.list = [])
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
            url: this.$http.adornUrl('/ycyl/ycylprovincecity/getCity'),
            method: 'post',
            data: {
              state: 3,
              pid: value[1]
            }
          }).then(({data}) => {
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
      getprovince () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylprovincecity/getCity'),
          method: 'post',
          data: {
            state: 1
          }
        }).then(({data}) => {
          if (data && data.code == 0) {
            data.list.forEach(item => item.list = [])
            this.options = data.list
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      searchGoods (pageIndex=1) {

        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        if (this.areaIdw.length == 2) {
          this.searchData.cityId = this.areaIdw[1]
        }
        if (this.areaIdw.length == 3) {
          this.searchData.areaId = this.areaIdw[2]
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/list'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            // this.dataList = data.page.list
            // this.totalPage = data.page.totalCount
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      guiling () {
        this.cits = this.three = 0
      },
      guiling1 () {
        this.three = 0
      },
      replenis (id) {
        this.$router.push({
          path: '/producttian',
          query: {
            agentUserId: id
          }
        })
      },

      // 获取数据列表
      getDataList () {
        // this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluseragent/list'),
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
          // this.dataListLoading = false
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
          return item.wId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylagentwproduct/delete'),
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

  .mod-config {
    .ycylagentwproductSearch {
       background-color: #eee;
      border-radius: 0.2rem;
      padding: 10px 5px;

      .chairman_sunch {
        background-color: rgb(25, 103, 142);
        color: #fff;
        height: 2rem;
        width: 4rem;
        border-radius: 10%;
        margin-left: 50px;
        border: 1px solid transparent;
      }
    }

    .contact {
      select {
        padding: 0.2rem 1rem;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        margin-left: 1rem;
        color: #888;
      }
    }

  }

  .mod-config .el-input--suffix {
    width: 137px;
  }
</style>
<style lang="scss">
  @import '../../../assets/scss/el_casder';

  .mod-config {
    .el-input--suffix {
      width: 260px;
    }

  }

  .el-cascader-menu {
    height: auto;
  }
</style>
