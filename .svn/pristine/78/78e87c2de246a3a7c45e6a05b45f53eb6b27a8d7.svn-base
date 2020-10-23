<template>
  <div class="mod-config">
    <div id="doctorSearch">
      <label class="agent_crux">
        手机号：
        <el-input style="width:126px;" placeholder="手机号" v-model="searchData.mobile" clearable></el-input>
      </label>
      <label class="agent_crux">
        名字：
        <el-input placeholder="名字" v-model="searchData.nickname" style="width:10rem" clearable></el-input>
      </label>
      <label class="agent_crux">
        药单ID：
        <el-input placeholder="药单ID" v-model="searchData.advisoryNum" style="width:10rem" clearable></el-input>
      </label>
      <label class>
        咨询时间：
        <el-date-picker
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          range-separator=" - "
          start-placeholder="开始日期"
          type="daterange"
          v-model="qqTime"
        ></el-date-picker>
      </label>
      <label>
        养殖种类：
        <el-select placeholder="请选择" v-model="searchData.animal" class="doctor" style="width:8rem" clearable>
          <el-option
            :key="index"
            :label="item.dictName"
            :value="item.dataId"
            v-for="(item,index) in options"
          ></el-option>
        </el-select>
      </label>
      <label>
        状态：
        <el-select placeholder="请选择" v-model="searchData.reviewStatus" class="doctor" style="width:8rem" clearable>
          <el-option
            :key="index"
            :label="item.lable"
            :value="item.name"
            v-for="(item,index) in optStatus"
          ></el-option>
        </el-select>
      </label>
      <label>
        <button @click="searchGoods" class="chairman_sunch">搜索</button>
      </label>
    </div>
    <el-table
      :data="dataList"
      :v-loading="loading"
      @selection-change="selectionChangeHandle"
      border
      style="width: 100%;"
      v-loading="dataListLoading"
    >
      <el-table-column
        align="center"
        header-align="center"
        label="药单ID"
        prop="advisoryNum"
        width="120"
      ></el-table-column>
      <el-table-column align="center" header-align="center" label="药单属性" prop="" width="110">
        <div slot-scope="spoce">
          <span>咨询单</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="咨询时间" prop="createTime"
                       width="150"></el-table-column>
      <el-table-column align="center" header-align="center" label="用户昵称" prop="nickname" width="120"></el-table-column>
      <el-table-column align="center" header-align="center" label="用户手机" prop="mobile" width="110"></el-table-column>
      <el-table-column align="center" header-align="center" label="养殖种类" prop="animal" width="110">

      </el-table-column>
      <!--      <el-table-column-->
      <!--        align="center"-->
      <!--        header-align="center"-->
      <!--        label="养殖规模"-->
      <!--        prop="scale"-->
      <!--        width="110"-->
      <!--      >-->
      <!--      </el-table-column>-->
      <el-table-column
        align="center"
        header-align="center"
        label="药单价值"
        prop="price"
        width="110"
      >
      </el-table-column>
      <el-table-column align="center" header-align="center" label="关系人" prop="docNickname" width="110">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="回访状态" prop width="110">
        <template slot-scope="scope">
          <span style="font-size:14px">{{fn(scope.row.reviewStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="备注内容" prop="">
        <ul slot-scope="scope">
          <li v-if="scope.row.note">
            <p v-for="(item,index) in scope.row.note[0]">{{item.name}}</p>
          </li>
          <li v-else>暂无信息</li>
        </ul>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="130">
        <template slot-scope="scope">
          <span>
            <el-button @click="addOrUpdateHandle(scope.row.infoId)" size="small" type="text">详情</el-button>
          </span>
          <el-dropdown>
            <span class="el-dropdown-link" style="font-size:12px;color:#19678E;">标记</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="reminderVisit(scope.row.infoId)">已催单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="remarkMessage(scope.row.infoId)" size="small" type="text">备注</el-button>
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
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗, 新增 /修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <el-dialog title="备注信息" :visible.sync="centerDialogVisible" width="20%" center>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="note"
        maxlength="50"
        show-word-limit
        style="min-height: 60px"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" style="padding:8px 12px">取 消</el-button>
        <el-button type="primary" style="padding:8px 12px" @click="remarkContent()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import AddOrUpdate from './zixun-add'

  export default {
    data () {
      return {
        optStatus:[
          {
            lable:'未催单',
            name:'0'
          },
          {
            lable:'已催单',
            name:'1'
          },
        ],
        itemId: '', //订单id
        note: '',
        reviewStatus: '',
        centerDialogVisible: false,
        dataForm: {
          key: '',
          time: ''
        },
        dictId: '',
        dict: '',
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        options: [],
        value: '', //选中的快递公司
        searchData: {
        },
        qqTime: [],
        loading: true
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
      this.getAnimal_type()
    },
    created () {

    },
    methods: {
      getAnimal_type () {
        //获取动物种类
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
          method: 'post',
          data: {
            dictValue: 'animal_type'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.page.list
            this.options.unshift({
              dictName: '全部'
            })
            this.value = this.options[0].dataId
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      remarkContent () {//备注

        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylassistantadvisoryinfo/cusReview'),
          method: 'post',
          data: {
            infoId: this.itemId,
            reviewStatus: this.reviewStatus,
            note: this.note
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.centerDialogVisible = false
            this.getDataList()
            this.note = ''
          } else {
            this.$message.error(data.msg)
          }
        })
      },

      reminderVisit (id) {
        //已回访
        this.reviewStatus = 1
        this.Visit(id)
      },
      Visit (id) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylassistantadvisoryinfo/update'),
          method: 'post',
          data: {
            infoId: id,
            reviewStatus: this.reviewStatus
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.getDataList()
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      fn (key) {
        //判断催单状态
        switch (key) {
          case null:
            return '/'
            break
          case 1:
            return '已催单'
            break
          case ' ':
            return '/'
            break
          case 0:
            return '/'
            break

        }
      },
      //备注
      remarkMessage (id) {
        this.centerDialogVisible = true
        this.itemId = id
      },
      searchGoods () {
        if (this.searchData.mobile && !/1\d{10}/.test(this.searchData.mobile)) {
          this.$message.error('手机号格式错误')
          return
        }
        this.searchData.page = this.pageIndex
        this.searchData.pageSize = this.pageSize
        if (this.qqTime.length>1){
          this.searchData.endCreateTime = this.qqTime[1]+' 23:59:59'
          this.searchData.startCreateTime = this.qqTime[0]+' 00:00:00'
        }

        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylassistantadvisoryinfo/getAdvisoryInfo'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            data.page.list.map((e) => {
              var arrey = []
              if (e.note) {
                for (let key in e.note.split('/')) {
                  arrey.push({
                    name: e.note.split('/')[key],
                  })
                }
                e.note = []
                e.note.push(arrey)
              }
            })
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylassistantadvisoryinfo/getAdvisoryInfo'),
          method: 'post',
          data: {
            page: this.pageIndex,
            pageSize: this.pageSize,
            key: this.dataForm.key,
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            data.page.list.map((e) => {
              var arrey = []
              if (e.note) {
                for (let key in e.note.split('/')) {
                  arrey.push({
                    name: e.note.split('/')[key],
                  })
                }
                e.note = []
                e.note.push(arrey)
              }
            })
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.$message.error(data.msg)
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
        this.searchGoods()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 详情
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  #doctorSearch {
    background-color: #eeeeee;
    border-radius: 0.4rem;
    padding: 10px 5px;
    margin-bottom: 16px;

    .chairman_sunch {
      background-color: rgb(25, 103, 142);
      color: #fff;
      height: 2rem;
      width: 4rem;
      border-radius: 10%;
      margin-left: 10px;
      border: 1px solid transparent;
    }

    label {
      margin-top: 0.5rem;
      display: inline-block;
      margin-left: 1rem;
    }

    .el-input {
      width: 6rem;
    }
  }
</style>
<style lang="scss">
  .el-select-dropdown__wrap {
    max-height: 325px;
  }

  .el-dialog--center .el-dialog__body {
    padding: 0 20px 0 20px !important;
  }

  .el-textarea__inner {
    min-height: 111px !important;
  }

  .el-input__count {
    position: absolute;
    right: 32px;
    bottom: 59px;
  }
</style>

