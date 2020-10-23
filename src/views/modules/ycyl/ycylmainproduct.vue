<template>
  <div class="mod-config">
    <div class="useragent_sunch">
      <label class="agent_crux">
        产品名称：
        <el-input placeholder="产品名称" v-model="searchData.productName" clearable></el-input>
      </label>
      <label>
        种类：
        <el-select placeholder="请选择" v-model="searchData.fitKind" clearable>
          <el-option
            :key="inde" :label="item.dictName" :value="item.dataId" v-for="(item,inde) in enterpriseList">
          </el-option>
        </el-select>
      </label>
      <label @click=" virus()">
        功能类目：
        <el-select placeholder="请选择" v-model="searchData.productType" clearable>
          <el-option
            :key="index"
            :label="item.dictName"
            :value="item.dataId"
            v-for="(item,index) in medicine">
          </el-option>
        </el-select>
      </label>
      <label class="agent_crux">
        总储量：
        <el-input placeholder="" v-model="searchData.startTotalReserves" clearable></el-input>
        <span>-</span>
        <el-input placeholder="" v-model="searchData.endTotalReserves" clearable></el-input>
      </label>
      <label>
        状态：
        <el-select placeholder="请选择" v-model="searchData.inventoryStatus" clearable>
          <el-option
            :key="item.shu"
            :label="item.label"
            :value="item.shu"
            v-for="item in condition">
          </el-option>
        </el-select>
      </label>
      <label>
        <el-button type="primary" @click="searchGoods()" style="padding:8px 20px">搜索</el-button>
        <!--          <button   class="chairman_sunch">搜索</button>-->
      </label>
    </div>
    <el-button type="primary" @click="addOrUpdateHandle()" style="margin-bottom: 16px;padding: 8px 20px"
               v-if="isAuth('ycyl:ycylmainproduct:addMainproduct')">新增
    </el-button>
    <!--    </el-form>-->

    <el-table
      :data="dataList"
      @selection-change="selectionChangeHandle"
      border
      style="width: 100%;"
      v-loading="dataListLoading">
      <el-table-column
        align="center"
        header-align="center"
        label="产品名称"
        prop="productName"
        width="">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="产品Id"
        prop="productNo"
        width="">
      </el-table-column>
      <!--      确定-->
      <el-table-column
        align="center"
        header-align="center"
        label="适用种类"
        prop="fitKind"
        width="100">
      </el-table-column>
      <!--      确定-->
      <el-table-column
        align="center"
        header-align="center"
        label="功能类目"
        prop="productType"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="库位"
        prop="place1"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="总储量"
        prop="totalreserves"
        width="80">
      </el-table-column>
      <!--      添加状态-->
      <el-table-column
        align="center"
        header-align="center"
        label="状态"

        width="80">
        <template slot-scope="scope">
          {{scope.row.inventoryStatus==1 ? '缺货':'正常'}}
        </template>
      </el-table-column>
      <!--      规格数-->
      <el-table-column align="center" header-align="center" label="规格1" prop="count1" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count1"> {{ scope.row.count1}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格2" prop="count2" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count2"> {{ scope.row.count2}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格3" prop="count3" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count3"> {{ scope.row.count3}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格4" prop="count4" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count4"> {{ scope.row.count4}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格5" prop="count5" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count5"> {{ scope.row.count5}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格6" prop="count6" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count6"> {{ scope.row.count6}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格7" prop="count7" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count7"> {{ scope.row.count7}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格8" prop="count8" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count8"> {{ scope.row.count8}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格9" prop="count9" width="80">
        <template slot-scope="scope">
          <p v-if="scope.row.count9"> {{ scope.row.count9}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="123">
        <template slot-scope="scope">
          <el-button @click="addGodownHandle(scope.row)" size="small" type="text"
                     v-if="isAuth('ycyl:ycylmainproduct:addBank')">入库
          </el-button>
          <el-button @click="addOrUpdateHandleedit(scope.row)" size="small" type="text"
                     v-if="isAuth('ycyl:ycylmainproduct:compile')">编辑
          </el-button>
          <el-button @click="deleteHandle(scope.row.mainId)" size="small" type="text"
                     v-if="isAuth('ycyl:ycylmainproduct:conceal')">隐藏
          </el-button>
          <el-button size="small" type="text"
                     v-if="isAuth('ycyl:ycylmainproduct:zanshi')">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="totalPage"
                   @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增  -->
    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-bind:medicineNew="medicine"
                   v-bind:pannerName="enterpriseList" v-if="addOrUpdateVisible"></add-or-update>
    <!-- 弹窗, 入库 -->
    <add-godown ref="addGodown" @refreshRKList="getDataList" v-bind:pannete="pannetext" v-if="godown"></add-godown>

    <!-- 弹窗, 编辑 -->
    <add-edit ref="AddEdit" v-if="addedit" v-bind:medicineNew="medicine" v-bind:pannerName="enterpriseList"
              @refreshDataList="getDataList"></add-edit>
  </div>
</template>

<script>
  import AddOrUpdate from './ycylmainproduct-add-or-update'
  import AddGodown from './AddGodown'
  import AddEdit from './AddEdit'

  export default {
    data () {
      return {
        searchData: {},
        status: '0',
        timeFrom: {},
        dataForm: {
          key: '',
        },
        totalreserves: '',
        pannetext: '',
        dataList: [],
        sizeArr: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        agentCrux: '',
        enterpriseList: '',
        addedit: false,
        godown: false,
        dataId: '',
        dictId: '',
        // 药品种类
        medicine: [],
        dictName: '',
        condition: [{
          shu: 0,
          label: '正常'
        }, {
          shu: 1,
          label: '缺货'
        }],
        shu: ''

      }
    },
    components: {
      AddOrUpdate,
      AddGodown,
      AddEdit
    },
    beforeMount () {
      this.virus()
      this.variety()
    },
    mounted () {
      this.getDataList()
    },
    methods: {
      searchGoods (pageIndex = 1) {
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylmainproduct/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({
          data
        }) => {
          if (data && data.code == 0) {
            this.dataList = data.page.list
            this.dataList.map((item) => {
              var place1=[]
              item.list.map((v, i) => {
                place1.push(v.place)
                item['count' + (i + 1)] = v.count
              })
              item.place1=place1.join(',')
            })
            this.totalPage = data.page.totalCount
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      variety () {// 获取动物种类数据

        var that = this
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': '30',
            'key': this.dataForm.key,
            'dictValue': 'animal_type'
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.enterpriseList = data.page.list
            this.animal_type = data.animal_type
          } else {
            this.dataList = []
            this.totalPage = 0
            this.animal_type = []
          }
        })
      },
      // 获取药品种类的方法
      virus () {
        // eslint-disable-next-line no-unused-vars
        var that = this
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': '30',
            'key': this.dataForm.key,
            'dictValue': 'sys_drug'
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            var that = this
            this.medicine = data.page.list
            this.totalPage = data.page.totalCount
          } else {

          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylmainproduct/getPageList'),
          method: 'post',
          data: this.$http.adornParams({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.dataList.map((item) => {
              var place1=[]
              item.list.map((v, i) => {
                place1.push(v.place)
                item['count' + (i + 1)] = v.count
              })
              item.place1=place1.join(',')
            })
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
      // 新增
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      //编辑
      addOrUpdateHandleedit (data) {

        var animal = this.enterpriseList
        this.addedit = true
        this.$nextTick(() => {
          this.$refs.AddEdit.init(data, animal)
        })
      },
      //入库
      addGodownHandle (data) {
        this.godown = true
        this.$nextTick(() => {
          this.$refs.addGodown.init(data)
        })
      },
      // 隐藏
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.mainId
        })
        var stringNum = ids.toString()

        this.$confirm(`确定隐藏 ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylmainproduct/update'),
            method: 'post',
            data: this.$http.adornData({
              status: this.status,
              mainId: stringNum
            })
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
        }).catch(error => {
          this.$message.error(error)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .mod-config {
    .useragent_sunch {
      padding: 10px 5px;
      border-radius: 0.4rem;
      margin-bottom: 16px;
      background-color: #eeeeee;

      label {
        margin-left: 1rem;
      }

      .chairman_sunch {
        background-color: rgb(25, 103, 142);
        color: #fff;
        height: 2rem;
        width: 4rem;
        border-radius: 10%;
        margin-left: 10px;
        border: 1px solid transparent;
      }
    }
  }
</style>
