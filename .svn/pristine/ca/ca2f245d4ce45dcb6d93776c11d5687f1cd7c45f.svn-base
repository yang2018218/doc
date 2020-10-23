<template>
  <div class="mod-config mod-config-xx">
    <div id="useragent_sunch" style=" background-color: #eee">
      <label class="agent_crux">
        昵称：
        <el-input placeholder="昵称" v-model="searchData.nickname" clearable></el-input>
      </label>
      <label class="agent_crux">
        手机号：
        <el-input placeholder="手机号" v-model="searchData.mobile" clearable></el-input>
      </label>
      <label>
        种类：
        <el-select placeholder="请选择" v-model="searchData.animalKind" clearable>
          <el-option
            :key="inde" :label="item.dictName" :value="item.dataId" v-for="(item,inde) in enterpriseList">
          </el-option>
        </el-select>
      </label>
      <label class="">
        养殖规模：
        <el-select placeholder="请选择" v-model="searchData.scaleId" clearable>
          <el-option
            :key="inde" :label="item.dictName" :value="item.dataId" v-for="(item,inde) in scaleList">
          </el-option>
        </el-select>
      </label>
      <label>
        <span class="demonstration">最后登录时间：</span>
        <el-date-picker
          clearable
          v-model="searchData.startLastLoginTime"
          type="date"
          value-format='yyyy-MM-dd 00:00:00'
          placeholder="选择日期" style="width: 9rem">
        </el-date-picker>
        -
        <el-date-picker
          clearable
          v-model="searchData.endLastLoginTime"
          type="date"
          value-format='yyyy-MM-dd 23:59:59'
          placeholder="选择日期" style="width: 9rem">
        </el-date-picker>
      </label>
            <label>
              <span class="demonstration">注册时间：</span>
              <el-date-picker
                v-model="searchData.startCreateTime"
                type="date"
                value-format='yyyy-MM-dd 00:00:00'
                placeholder="选择日期" style="width: 9rem">
              </el-date-picker>
              -
              <el-date-picker
                v-model="searchData.endCreateTime"
                type="date"
                value-format='yyyy-MM-dd 23:59:59'
                placeholder="选择日期" style="width: 9rem">
              </el-date-picker>
            </label>
      <label style="width: 600px !important;" id="user_area">
        用户地区：
        <el-cascader
          v-model="areaId"
          :options="options"
          :show-all-levels="false"
          :props="props"
          @expand-change="expand"
          clearable @change="areaIdChange" style="width: 200px" class="diqu"></el-cascader>
      </label>
      <label style="">
        <el-button type="primary" @click="searchMethod()" style="padding: 8px 20px;">搜索</el-button>
      </label>
      <label >
        <el-popover
          placement="bottom"
          width="160"
          v-model="visibleExcel">
          <p>{{text}}</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visibleExcel = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visibleExcel = false"><a :href="this.excelPath" style="list-style: none">确定</a> </el-button>
          </div>
          <el-button slot="reference" type="warning" class="excel"   style="padding: 8px 20px" @click="downloadFile">下载文件</el-button>
        </el-popover>
      </label>
    </div>
    <div id="userTop">
      <el-button type="primary" @click="addcommonuserHandle()" style="margin: 16px 0;padding: 8px 20px">添加</el-button>
    </div>

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
        label="昵称"
        prop="nickname">
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
        label="养殖种类"
        prop="animalKind">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="养殖规模"
        prop="scaleId">
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
        label="注册时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="最后登录时间"
        prop="lastLoginTime">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="登录次数"
        prop="lastDays">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="总购金额"
        prop="sumPrice">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="总购买单数"
        prop="orderCount">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="问诊次数"
        prop="specialistInfoCount">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="咨询次数"
        prop="advisoryInfoCount">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        header-align="center"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button @click="addOrUpdateHandle(scope.row)" size="small" type="text">编辑</el-button>
          <el-button @click="deleteHandle(scope.row.uId)" size="small" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="totalPage"
                   @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update @refreshDataList="getDataList" ref="addOrUpdate" v-if="addOrUpdateVisible"></add-or-update>

    <add-commonuser @refreshDataList="getDataList" ref="addcommonuser" v-if="addcommonuserVisible"
                    v-bind:dataAnimal="enterpriseList"></add-commonuser>
  </div>
</template>

<script>
  import axios from 'axios'
  import AddOrUpdate from './ycyluserinfo-add-or-update'
  import AddCommonuser from './AddCommonuser'
  export default {
    data () {
      return {
        searchData:{},//检索条件
        text:'正在根据您的检索条件进行数据整理查找中，请稍等...',
        excelPath:'',
        visibleExcel:false,
        props: {
          multiple: true,
          value: 'id',
          label: 'name',
          children: 'list',
          disabled: 'B',
          checkStrictly: true
        },
        areaId: [],
        options: [],
        name: '',
        scaleList: '',
        mobile: '',
        nickname: '',
        enterpriseList: '',
        animalKind: '',
        scaleId: '',
        startLastLoginTime: '',
        endLastLoginTime: '',
        startCreateTime:'',
        endCreateTime:'',
        agentCrux: '',

        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        addcommonuserVisible: false,
      }
    },
    components: {
      AddOrUpdate,
      AddCommonuser
    },
    activated () {
      this.getDataList()
      this.getCitys()
      this.variety()
      this.scaleMethod()
    },
    methods: {
      downloadFile(){//文件导出
        this.text='正在根据您的检索条件进行数据整理查找中，请稍等...'
        var provinceId
        var cityId
        var areaId
        var provinceId=[]
        var cityId=[]
        var areaId=[]
        this.areaId.forEach((e) => {
          if (e.length == 1) {
            // provinceId = e[0]
            provinceId.push(e[0])
          }
          if (e.length == 2) {
            // provinceId = e[0]
            // cityId = e[1]
            provinceId.push(e[0])
            cityId.push(e[1])
          }
          if (e.length == 3) {
            // provinceId = e[0]
            // cityId = e[1]
            provinceId.push(e[0])
            cityId.push(e[1])
            areaId.push(e[2])
          }
        })
        this.searchData.provinces= provinceId
        this.searchData.citys= cityId
        this.searchData.areas= areaId
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserinfo/getUserRop'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.excelPath = data.path
            this.text='数据整理完毕，请您点击下载用户信息'
          } else {
            this.dataList = []
            this.totalPage = 0
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
              //  userId: this.editData.userId
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
      areaIdChange () {
      },
      getCitys () {
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
      sksksss () {
      },
      searchMethod (pageIndex = 1) {
        var areaQuYu
        var provinceId=[]
        var cityId=[]
        var areaId=[]
        this.areaId.forEach((e) => {
          if (e.length == 1) {
            // provinceId = e[0]
            provinceId.push(e[0])
          }
          if (e.length == 2) {
            // provinceId = e[0]
            // cityId = e[1]
            provinceId.push(e[0])
            cityId.push(e[1])
          }
          if (e.length == 3) {
            // provinceId = e[0]
            // cityId = e[1]
            provinceId.push(e[0])
            cityId.push(e[1])
            areaId.push(e[2])
          }
        })
        this.searchData.page= pageIndex
        this.searchData.pageSize= this.pageSize
        this.searchData.provinces= provinceId
        this.searchData.citys= cityId
        this.searchData.areas= areaId

        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserinfo/getPageList'),
          method: 'post',
          data:this.searchData
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
        })
      },
      //获取动物种类
      variety () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': '30',
            'key': this.dataForm.key,
            'dictValue': 'animal_type',
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
      //获取养殖规模
      scaleMethod () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: ({
            'page': this.pageIndex,
            'pageSize': '30',
            'key': this.dataForm.key,
            'dictValue': 'scale',
          })
        }).then(({
          data
        }) => {
          if (data && data.code === 0) {
            this.scaleList = data.page.list
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserinfo/getPageList'),
          method: 'post',
          data: {
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'userType': '1'
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
        this.searchMethod()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchMethod(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 编辑用户
      addOrUpdateHandle (data) {

        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(data)
        })
      },
      //添加普通用户
      addcommonuserHandle () {
        this.addcommonuserVisible = true
        this.$nextTick(() => {
          this.$refs.addcommonuser.init()
          this.$refs.addcommonuser.animal()
          this.$refs.addcommonuser.getScale()
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.uId
        })
        this.$confirm(`确定删除 ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycyluserinfo/delete'),
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
<style lang="scss" scoped>

  .diqu .el-input .el-input__inner{
  height: 32px !important;
}
  #userTop {
    font-size: 14px;

  }

  #useragent_sunch {
    padding: 0.3rem 2.0rem;
    border-radius: 0.5rem;
    background-color: #eeeeee;

    label {
      margin-right: 16px;
    }
  }

  .agent_crux {
    width: 13rem;
  }

  label {
    line-height: 40px;
    display: inline-block;
    margin-left: 0.3rem;

    .el-input {
      width: 8rem;
    }
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
</style>
<style lang="scss">
  .mod-config-xx {
    .el-input__icon {
      line-height: 35px;
    }
  }
</style>
