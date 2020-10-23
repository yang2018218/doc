<template>
  <div class="mod-config">
    <div class="searchBox">
      <label>
        讲师姓名：
        <el-select v-model="searchData.truename" placeholder="请选择" @click.native="doctorExample" clearable>
          <el-option
            v-for="item in options"
            :key="item.userId"
            :label="item.truename"
            :value="item.truename">
          </el-option>
        </el-select>
      </label>
      <label>
        课程名称：
        <el-input
          placeholder="请输入内容"
          v-model="searchData.courseName"
          oninput="this.value = this.value.trim()"
          clearable>
        </el-input>
      </label>
      <label>
        创建时间：
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
      <label>
        课程类型：
        <el-select v-model="searchData.fitKind" placeholder="请选择" clearable>
          <el-option
            v-for="item in animals"
            :key="item.dictId"
            :label="item.name"
            :value="item.dictId">
          </el-option>
        </el-select>
      </label>
      <label>
        学习人数：
        <el-input
          placeholder="请输入内容"
          v-model="searchData.startTotalNumber"
          oninput="this.value = this.value.trim()"
          clearable>
        </el-input>
        -
        <el-input
          placeholder="请输入人数"
          v-model="searchData.endTotalNumber"
          oninput="this.value = this.value.trim()"
          clearable>
        </el-input>
      </label>
      <label>
        <el-button type="success" class="searchStyle" @click="search()">搜索</el-button>
      </label>
    </div>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="courseName"
        header-align="center"
        align="center"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="chapterNumber"
        header-align="center"
        align="center"
        label="现有节数">
      </el-table-column>
      <el-table-column
        prop="studyId"
        header-align="center"
        align="center"
        label="跳转ID">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="truename"
        header-align="center"
        align="center"
        label="主讲老师">
      </el-table-column>
      <el-table-column
        prop="fitKind"
        header-align="center"
        align="center"
        label="课程类型">
      </el-table-column>
      <el-table-column
        prop="userType"
        header-align="center"
        align="center"
        label="老师类型">
        <div slot-scope="scope">
          <span>{{fStatus(scope.row.userType)}}</span>
        </div>
      </el-table-column>
      <el-table-column
        prop="totalNumber"
        header-align="center"
        align="center"
        label="学习人数">
      </el-table-column>
      <el-table-column
        prop="average"
        header-align="center"
        align="center"
        label="评分">
      </el-table-column>
      <el-table-column
        prop="ip"
        header-align="center"
        align="center"
        label="状态">
        <div slot-scope="scope">
          <div v-if="scope.row.isRecommend=='1' ">
            <span>上架并推荐</span>
          </div>
          <div v-else-if="scope.row.isRecommend=='0' ">
           <span v-if="scope.row.status==0">
            下架
          </span>
            <span v-if="scope.row.status==1">
            上架
          </span>
          </div>

        </div>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="180"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.studyId)">编辑课程</el-button>
          <el-button type="text" size="small" @click="compileChapter(scope.row.studyId)">编辑章节</el-button>
          <el-dropdown>
  <span class="el-dropdown-link">
    状态管理
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="statusManage(scope.row.studyId,isStatus='0')">下架</el-dropdown-item>
              <el-dropdown-item @click.native="statusManage(scope.row.studyId,isStatus='1')">上架</el-dropdown-item>
              <el-dropdown-item @click.native="statusManage(scope.row.studyId,isStatus='2')">上架并推荐</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <!--    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>-->
    <div id="bianjizhangjie">
      <el-dialog title="编辑章节" :visible.sync="outerVisible" center>
        <div style="text-align: left;margin-bottom: 22px">
          <el-button type="primary" @click="addVideoMessage()" style="padding: 5px 15px;text-align: left">新增章节
          </el-button>
        </div>
        <compile-chapter v-bind:studyIdMessageID="studyIdMessage" ref="addOrUpdate"
                         @xiangQing='bianJiXiangQing'></compile-chapter>
        <div v-if="innerVisible">
          <el-dialog
            :show-close="false"
            :destroy-on-close="berTrue"
            width="30%"
            title="编辑章节"
            :visible.sync="innerVisible"
            append-to-body center>
            <div>
              <add-chapter v-bind:studyIdMessageID="studyIdMessage" @guanbi="guanbiBtn" @returnGuanbi="returnGuanbiBtn"
                           ref="addOrUpdateNewBianJi"></add-chapter>
            </div>
          </el-dialog>
        </div>

        <!--        -->
        <el-dialog
          :show-close="false"
          width="30%"
          title="新增章节"
          :visible.sync="AddInnerVisible"
          append-to-body center>
          <div>
            <add-chapter v-bind:studyIdMessageID="studyIdMessage" @guanbiAdd="guanbiAdd"
                         @returnAddGuanbi="returnAddGuanbiBtn" ref="AddRefMessage"></add-chapter>
          </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">返回</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import compileChapter from '../../../components/course/compileChapter'
  import addChapter from '../../../components/course/addJingPin'

  export default {
    data () {
      return {
        animals: '',//动物种类
        dataTime: '',//时间
        searchData: {},//搜索
        options: [],//转家医生
        isStatus: '',
        berTrue: true,
        AddInnerVisible: false,//添加弹窗
        false: false,
        studyIdMessage: '',
        outerVisible: false,//弹窗
        innerVisible: false,//弹窗
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
      compileChapter,
      addChapter

    },
    activated () {
      this.getDataList()
      this.getDoctor()
      this.getExpert()
      this.getAnimal()
    },
    methods: {
      getAnimal () {
        // animals
        this.$http({
          url: this.$http.adornUrl('/study/studyanimaldict/list'),
          method: 'post',
          data: {
            page: '1',
            pageSize: '30',
            dictValue: 'animal_type'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.animals = data.list
          } else {
            this.$message.error('暂未获取到动物种类，请联系管理员或稍后重试')
          }
        })
      },
      search (pageIndex = 1) {//搜索
        this.searchData.theFree='0'
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.searchData.key = this.dataForm.key
        if (this.dataTime && this.dataTime.length > 1) {
          this.searchData.startCreateTime = this.dataTime[0]+' 00:00:00'
          this.searchData.endCreateTime = this.dataTime[1]+' 23:59:59'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studycurriculum/list'),
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
      doctorExample () {//合并医生与专家
        this.expertName.forEach(e => {
          this.doctorName.push(e)
        })
        this.options = this.doctorName
      },
      getDoctor () {//获取所有医生
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/getAllDoctor'),
          method: 'post',
          data: {
            page: 1,
            pageSize: '100',
            doctorStatus: '1'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.doctorName = data.doc
          } else {
            this.$message.error('获取医生信息错误，请稍后重试或联系管理员')
          }
        })
      },
      getExpert () {//获取所有专家
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserexpert/getAllExpert'),
          method: 'post',
          data: {
            page: 1,
            pageSize: '100',
            doctorStatus: '1'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.expertName = data.exp
          } else {
            this.$message.error('获取专家信息错误，请稍后重试或联系管理员')
          }
        })
      },
      guanbiAdd (id) {
        this.AddInnerVisible = false
        this.$nextTick(() => {
          this.$refs.addOrUpdate.getDataList(id)
        })
      },
      funBtn () {
      },
      addVideoMessage () {
        this.bianJiId = ''
        this.AddInnerVisible = true
        var id = ''
        this.$nextTick(() => {
          this.$refs.AddRefMessage.initBianJi(id)
        })

      },
      bianJiXiangQing (id) {
        this.innerVisible = true
        this.bianJiId = id
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdateNewBianJi.initBianJi(id)
        })
      },
      guanbiBtn (id) {
        this.innerVisible = false
        this.$nextTick(() => {
          this.$refs.addOrUpdate.getDataList(id)
        })
      },
      returnGuanbiBtn () {
        this.innerVisible = false
        this.bianJiId = ''
      },
      returnAddGuanbiBtn () {
        this.AddInnerVisible = false
      },
      fStatus (status) {
        switch (status) {
          case 5:
            return '医生'
            break
          case 6:
            return '专家'
            break

        }
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/study/studycurriculum/list'),
          method: 'post',
          data: this.$http.adornParams({
            'page': this.pageIndex,
            'pageSize': this.pageSize,
            'key': this.dataForm.key,
            'theFree': '0',
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
        this.search(this.pageIndex)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.search(this.pageIndex)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 编辑课程
      addOrUpdateHandle (id) {
        this.$router.push({
          path: 'course-addExcellent', query: {
            'id': id
          }
        })
      },
      compileChapter (id) {
        var num = '0'
        this.outerVisible = true
        this.studyIdMessage = id
        this.$nextTick(() => {
          this.$refs.addOrUpdate.getDataList(id, num)
        })
      },
      // 状态管理
      statusManage (id, isStatus) {
        var data = {
          studyId: id
        }
        if (isStatus === '1' || isStatus === '0') {
          data.status = isStatus
          data.isRecommend = '0'
        } else if (isStatus === '2') {
          data.isRecommend = '1'
          data.status = '1'
        }
        this.$http({
          url: this.$http.adornUrl('/study/studycurriculum/update'),
          method: 'post',
          data: data
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('修改成功')

            this.getDataList()
          } else {
            this.$message.error(data.msg)
          }
          this.dataListLoading = false
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-dropdown-link {
    cursor: pointer;
    color: #19678E;
    font-size: 12px;
  }

  .el-dropdown-link:hover {
    color: #409EFF;
  }

  .mod-config {

    .searchBox {
      background-color: #eee;
      padding: 8px 0;
      margin-bottom: 10px;

      label {
        margin-left: 5px;
      }

    }

    header {
      background-color: #fff !important;

      label {
        font-size: 16px;
        margin-right: 20px;
      }

    }
  }
</style>
