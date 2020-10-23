<template>
  <div class="banner">

    <div class="ycylagentwproductSearch" style="background-color: #eee">
      <el-form :inline="true" :model="searchData" @submit.native.prevent>
        <el-form-item>
          <label class="agent_crux">
            轮播图位置：
            <el-select v-model="searchData.imgType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label>
        </el-form-item>
        <el-form-item>
          <label class="agent_crux">
            操作状态：
            <el-select v-model="searchData.status" placeholder="请选择">
              <el-option
                v-for="item in optionsrr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </label>
        </el-form-item>
        <el-form-item>
          <label>
            <button @click="searchGoods()" class="chairman_sunch">搜索</button>
          </label>
        </el-form-item>

      </el-form>
    </div>

    <el-button class="banner_btn" @click="add" type="primary" size="small">添加轮播图</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      class="split_table"
      stripe
      v-loading="load_boolean"
    >
      <el-table-column align="center" prop="location" label="轮播图位置">
        <template slot-scope="scope">
          <span>{{fn(scope.row.imgType)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="轮播图标题"></el-table-column>

      <el-table-column align="center" prop="linkAddress" label="链接"></el-table-column>
      <el-table-column align="center" label="操作状态">
        <template slot-scope="q">{{q.row.status==1?'显示':'隐藏'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="startDate" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="deadline" label="结束时间"></el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="q">
          <el-button @click="preivew(q.row.imgUrl)" class="split_te" type="text" size="small">查看图片</el-button>
          <el-button class="split_te" @click="edit(q.row)" type="text" size="small">编辑</el-button>
          <el-button class="split_te" @click="deleted(q.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="totalPage"
                   @current-change="currentChangeHandle" @size-change="sizeChangeHandle"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
<!--    <paganation :pages="pages" @pagechange="sureb"/>-->
    <!-- 轮播图编辑页面 -->
    <el-dialog
      title="轮播图编辑"
      :visible.sync="dialogVisiblec"
      width="800px"
      :center="true"
      custom-class="dislog_banner "
      :before-close="handleClose"
    >
      <div class="first">
        <span>轮播图位置：</span>
        <el-select v-model="editData.imgType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="padding-left: 26px;">链接模块：</span>
        <el-select v-model="editData.linkModule" placeholder="请选择">
          <el-option
            v-for="item in optionsadd"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="padding-left: 26px;">是否跳转：</span>
        <el-select v-model="editData.isSkip" placeholder="请选择" @change="isSkipListChange()">
          <el-option
            v-for="item in isSkipList"
            :key="item.num"
            :label="item.name"
            :value="item.num"
          ></el-option>
        </el-select>
      </div>
      <div class="first">
        <span>轮播图排序：</span>
        <el-select v-model="editData.orderBy" placeholder="请选择">
          <el-option
            v-for="item in optionsab"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="first">
        <span>轮播图标题：</span>
        <input type="text" v-model="editData.title"/>
      </div>
      <div class="first">
        <span style="letter-spacing: 0.5em">相关ID</span>：
<!--        {{editData.moduleId}}-->
        <input type="text" v-model="editData.moduleId"/>
      </div>
      <div class="first">
        <span>轮播图链接：</span>
        <input type="text" v-model="editData.linkAddress"/>
      </div>
      <div class="first">
        <span style>轮播图描述：</span>
        <input type="text" v-model="editData.remark"/>
      </div>
      <div class="first">
        <span style="letter-spacing: .3em">开始时间</span>：
        <el-date-picker
          v-model="editData.startDate"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <div class="first">
        <span style="letter-spacing: .3em">结束时间</span>：
        <el-date-picker
          v-model="editData.deadline"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <p class="title" style="text-align:center;padding-top:15px;">上传轮播图：</p>
      <p class="title_cs" style="text-align:right;color:#26A3F3;margin-top:-13px;">推荐尺寸：750*220</p>
      <div class="pig upload_pig upload_piqg">
        <el-upload
          :action="dialogImageUrl"
          :file-list="fileList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemovea"
          :data="uploadData"
          :name="name"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrlpre" alt/>
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sucessd">确定</el-button>
        <el-button @click="dialogVisiblec = false">返回</el-button>
      </span>
    </el-dialog>
    <!-- 轮播图添加页面 -->
    <el-dialog
      title="添加轮播图"
      :visible.sync="dialogVisibled"
      width="800px"
      :center="true"
      custom-class="dislog_banner "
      :before-close="handleClosedd"
    >
      <div class="first">
        <span>轮播图位置：</span>
        <el-select v-model="addData.imgType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="padding-left: 26px;">链接模块：</span>
        <el-select v-model="addData.linkModule" placeholder="请选择">
          <el-option
            v-for="item in optionsadd"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="padding-left: 26px;">是否跳转：</span>
        <el-select v-model="addData.isSkip" placeholder="请选择" @change="isSkipListChange()">
          <el-option
            v-for="item in isSkipList"
            :key="item.value"
            :label="item.name"
            :value="item.num"
          ></el-option>
        </el-select>
      </div>
      <div class="first">
        <span>轮播图排序：</span>
        <el-select v-model="orderBya" placeholder="请选择">
          <el-option
            v-for="item in optionsab"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="first">
        <span>轮播图标题：</span>
        <input type="text" v-model="addData.title"/>
      </div>
      <div class="first">
        <span style="letter-spacing: 0.5em">相关ID</span>：
        <input type="text" v-model="addData.moduleId"/>
      </div>
      <div class="first">
        <span>轮播图链接：</span>
        <input type="text" v-model="addData.linkAddress"/>
      </div>
      <div class="first">
        <span>轮播图描述：</span>
        <input type="text" v-model="addData.remark"/>
      </div>
      <div
        style="color:#9a9a9a;margin-bottom:6px;"
      >
        PC端轮播图描述填写对应英文：畜牧圈、畜牧圈详情、畜牧知识、畜牧新闻（banner,right1,right2）畜牧知识详情、畜牧新闻详情（banner,right1,right2,center）畜牧诊疗、严选商城、专家咨询（banner）首页（banner1,banner2）标签列表页（right1，right2）
      </div>
      <div class="first">
        <span style="letter-spacing: 0.3em">开始时间</span>：
        <el-date-picker
          v-model="addData.startDate"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <div class="first">
        <span style="letter-spacing: 0.3em">结束时间</span>：
        <el-date-picker
          v-model="addData.deadline"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </div>
      <div class="mark_content clearfix">
        <p>注：链接模块与模块ID为同一类使用方法，轮播图链接为一类使 用方法两种方式任选其一。</p>
      </div>
      <p class="title" style="text-align:center;padding-top:15px;">上传轮播图：</p>
      <p class="title_cs" style="text-align:right;color:#26A3F3;margin-top:-13px;">推荐尺寸：750*220</p>
      <div :class="[fileListb.length>0?'':'piag','upload_piqg']">
        <el-upload
          :action="dialogImageUrl"
          :file-list="fileListb"
          list-type="picture-card"
          :on-preview="handlePictureCardPreviewb"
          :on-remove="handleRemoveb"
          :data="uploadData"
          :name="name"
          :on-success="handleAvatarSuccessb"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisibleb">
          <img width="100%" :src="dialogImageUrlpreb" alt/>
        </el-dialog>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sucessadd">确定</el-button>
        <el-button @click="dialogVisibled = false">返回</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogpre_aa" custom-class="dialogpre_aa_cc ">
      <img width="100%" v-for="(item,index) in dialogpre_aa_img" :key="index" :src="item" alt/>
    </el-dialog>
  </div>
</template>
<script>
  import paganation from '@/components/paganation'
  import log from '../sys/log'

  export default {
    data () {
      return {
        pageIndex: 1,
        totalPage: 0,
        isSkip: '0',
        isSkipList: [
          {
            name: '不跳转',
            num: 0
          },
          {
            name: '跳转',
            num: 1
          }
        ],
        dialogImageUrl: '',
        dialogImageUrlpre: '',
        dialogImageUrlpreb: '',
        orderBya: '',
        fileList: [],
        fileListb: [],
        uploadData: {
          folderName: 'ycylManage'
        },
        load_boolean: true,
        dialogVisible: false,
        page: 1,
        name: 'fileUpload',
        pageSize: 10,
        tableData: [],
        pages: {},
        dialogVisiblec: false,
        dialogVisibled: false, //第二个dialog对话框(添加图片)
        dialogVisibleb: false, //第二个dialog对话框中的图片预览(添加图片)
        optionsab: [
          {
            value: 1,
            label: '1'
          },
          {
            value: 2,
            label: '2'
          },
          {
            value: 3,
            label: '3'
          },
          {
            value: 4,
            label: '4'
          },
          {
            value: 5,
            label: '5'
          },
          {
            value: 6,
            label: '6'
          }
        ],
        optionsrr: [
          {
            value: 0,
            label: '隐藏'
          },
          {
            value: 1,
            label: '显示'
          }
        ],
        // 6首页  7畜牧诊疗  8养殖咨询 9严选商城 10畜牧新闻  11畜牧知识  12畜牧圈
        // 13严选商城详情 14畜牧新闻详情  15畜牧知识详情 16畜牧圈详情  17标签列表  18 标签详情
        options: [
          {
            value: 1,
            label: '首页'
          },
          {
            value: 2,
            label: '个人中心'
          },
          {
            value: 3,
            label: '畜牧新闻'
          },
          {
            value: 4,
            label: '畜牧知识'
          },
          {
            value: 5,
            label: '商城'
          },
          {
            value: 50,
            label: '学习模块'
          },
          {
            value: 51,
            label: '代金券模块'
          },
          {
            value: 6,
            label: 'PC-首页'
          },
          {
            value: 7,
            label: 'PC-畜牧诊疗'
          },
          {
            value: 8,
            label: 'PC-养殖咨询'
          },
          {
            value: 9,
            label: 'PC-严选商城'
          },
          {
            value: 10,
            label: 'PC-畜牧新闻'
          },
          {
            value: 11,
            label: 'PC-畜牧知识'
          },
          {
            value: 12,
            label: 'PC-畜牧圈'
          },
          {
            value: 13,
            label: 'PC-严选商城详情'
          },
          {
            value: 14,
            label: 'PC-畜牧新闻详情'
          },
          {
            value: 15,
            label: 'PC-畜牧知识详情'
          },
          {
            value: 16,
            label: 'PC-畜牧圈详情'
          },
          {
            value: 17,
            label: 'PC-标签列表'
          },
          {
            value: 30,
            label: 'H5-首页'
          },
          {
            value: 31,
            label: 'H5-医生'
          },
          {
            value: 32,
            label: 'H5-专家'
          },
          {
            value: 33,
            label: 'H5-商城'
          },
          {
            value: 34,
            label: 'H5-新闻'
          },
          {
            value: 35,
            label: 'H5-知识'
          },

        ],
        optionsadd: [
          {
            value: 1,
            label: '医生详情页'
          },
          {
            value: 2,
            label: '专家详情页'
          },
          {
            value: 3,
            label: '商品详情页'
          },
          {
            value: 4,
            label: '畜牧新闻详情页'
          },
          {
            value: 5,
            label: '畜牧知识详情页'
          },
          // {
          //   value: 6,
          //   label: "畜牧行情详情页"
          // },
          {
            value: 7,
            label: '网页'
          },
          {
            value: 8,
            label: '免费课程'
          },
          {
            value: 9,
            label: '精品课程'
          },
          {
            value: 10,
            label: '实战课程'
          },
          {
            value: 11,
            label: '代金券'
          },
        ],
        searchData: {},
        value1: '',
        editData: {}, //正在编辑的
        addData: {}, //轮播图添加数据
        dialogpre_aa: false,
        dialogpre_aa_img: []
      }
    },
    components: {
      paganation
    },

    methods: {
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.searchGoods(this.pageIndex)
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.searchGoods(this.pageIndex)
      },
      isSkipListChange () {
      },
      searchGoods (pageIndex=1) {
        this.searchData.page = pageIndex
        this.searchData.pageSize = this.pageSize
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylappbanner/getPageList'),
          method: 'post',
          data: this.searchData
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.pages = data.page
            this.tableData = data.page.list
            this.totalPage = data.page.totalCount

          } else {
            this.$message.error(data.msg)
          }
        })
      },
      handleClose () {
        this.dialogVisiblec = false
        this.searchGoods()
      },
      handleClosedd () {
        this.dialogVisibled = false
        this.addData = {}
        this.orderBya = ''
        this.fileListb = []
      },

      fn (q) {
        switch (q) {
          case 1:
            return '首页'
            break
          case 2:
            return '个人中心'
            break
          case 3:
            return '畜牧新闻'
            break
          case 4:
            return '畜牧知识'
            break
          case 5:
            return '商城'
            break
          case 50:
            return '学习模块'
            break
          case 51:
            return '代金券模块'
            break
          case 6:
            return 'PC-首页'
            break
          case 7:
            return 'PC-畜牧诊疗'
            break
          case 8:
            return 'PC-养殖咨询'
            break
          case 9:
            return 'PC-严选商城'
            break
          case 10:
            return 'PC-畜牧新闻'
            break
          case 11:
            return 'PC-畜牧知识'
            break
          case 12:
            return 'PC-畜牧圈'
            break
          case 13:
            return 'PC-严选商城详情'
            break
          case 14:
            return 'PC-畜牧新闻详情'
            break
          case 15:
            return 'PC-畜牧知识详情'
            break
          case 16:
            return 'PC-畜牧圈详情'
            break
          case 17:
            return 'PC-标签列表'
            break
          case 30:
            return 'H5-首页'
            break
          case 31:
            return 'H5-医生'
            break
          case 32:
            return 'H5-专家'
            break
          case 33:
            return 'H5-商城'
            break
          case 34:
            return 'H5-新闻'
            break
          case 35:
            return 'H5-知识'
            break
        }
      },
      handleAvatarSuccess (res, file) {
        if (res.code == 0) {
          this.fileList.push({
            url: res.paths[0]
          })
        }
      },
      handleAvatarSuccessb (res, file) {
        if (res.code == 0) {
          this.fileListb.push({
            url: res.paths[0]
          })
        }
      },
      handleRemovea (file) {
        this.fileList.forEach((item, index) => {
          if (item.url == file.url) {
            this.fileList.splice(index, 1)
          }
        })
      },
      handleRemoveb (file) {
        this.fileListb.forEach((item, index) => {
          if (item.url == file.url) {
            this.fileListb.splice(index, 1)
          }
        })
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrlpre = file.url
        this.dialogVisible = true
      },
      handlePictureCardPreviewb (file) {
        this.dialogImageUrlpreb = file.url
        this.dialogVisibleb = true
      },
      sucessd () {//编辑轮播图
        if (this.fileList.length == 0) {
          return this.$message.error('轮播图不能为空')
        }
        if (
          new Date(this.addData.startDate).getTime() >
          new Date(this.addData.deadline).getTime()
        ) {
          return this.$message.error('开始时间不能再结束时间之前')
        }

        let str = ''
        this.fileList.forEach(item => {
          str += ',' + item.url
        })

        str = str.substr(1)
        this.editData.imgUrl = str
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylappbanner/update'),
          method: 'post',
          data: this.editData
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.searchGoods()
            this.dialogVisiblec = false
            this.fileList.length = 0
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      sucessadd () {
        //添加轮播图
        if (
          new Date(this.addData.startDate).getTime() >
          new Date(this.addData.deadline).getTime()
        ) {
          return this.$message.error('开始时间不能再结束时间之前')
        }
        if (this.fileListb.length == 0) {
          return this.$message.error('轮播图不能为空')
        }

        let str = ''
        this.fileListb.forEach(item => {
          str += ',' + item.url
        })

        str = str.substr(1)
        this.addData.imgUrl = str

        // if (!this.addData.linkAddress) {
        //   this.addData.isSkip = 0
        // }
        this.addData.orderBy = this.orderBya
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylappbanner/save'),
          method: 'post',
          data: this.addData
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.getList()
            this.dialogVisibled = false
            this.fileListb.length = 0
            this.addData = {}
            this.$message({
              message: '添加成功',
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      edit (q) {

        q.linkModule= parseInt(q.linkModule)
        this.fileList.splice(0)
        this.editData = q

          this.editData.imgUrl.split(',').forEach(item => {
            this.fileList.push({
              url: item
            })
          })
        this.dialogVisiblec = true
      },
      deleted (q) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylappbanner/delete?bannerId=' + q.bannerId),
          method: 'post',
          data: {}
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message('删除成功')
            this.getList()
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      preivew (q) {
        this.dialogpre_aa_img = q.split(',')
        this.dialogpre_aa = true
      },
      add () {
        this.dialogVisibled = true
        this.editData.isSkip = null
      },
      // sureb (data) {
      //   this.load_boolean = true
      //   this.$http({
      //     url: this.$http.adornUrl('/ycyl/ycylappbanner/getPageList'),
      //     method: 'post',
      //     data
      //   }).then(({data}) => {
      //     if (data && data.code == 0) {
      //       this.load_boolean = false
      //       this.tableData = data.page.list
      //       this.pages = data.page
      //     } else {
      //       this.$message.error(data.msg)
      //     }
      //   })
      // },
      getList () {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylappbanner/getPageList'),
          method: 'post',
          data: {
            page: this.page,
            pageSize: this.pageSize
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.load_boolean = false
            this.pages = data.page
            this.tableData = data.page.list

            this.totalPage = data.page.totalCount
          }
        })
      }
    },
    created () {
      this.dialogImageUrl = this.uploadurl
      this.getList()
    }
  }
</script>
<style lang="scss" scoped>
  .el-form-item{
    margin-bottom: 0px;
  }
  .banner {
    .ycylagentwproductSearch {
      border-radius: 0.2rem;
      padding: 5px 5px;

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

    .banner_btn {
      /*background: #2da5fe;*/
      margin: 10px 0;
    }

    .first {
      height: 38px;

      > input {
        width: 393px;
        height: 30px;
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 6px;
        padding-left: 10px;
      }
    }

    .mark_content {
      height: 38px;
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;

      p {
        padding-left: 90px;
        color: #888;
      }
    }

    .upload_piqg {
      height: 220px;
      overflow: hidden;
    }
  }
</style>
<style lang="scss">
  .banner {
    .dislog_banner {
      border-radius: 10px;

      .el-upload-list--picture-card .el-upload-list__item {
        width: 750px;
        height: 220px;
      }

      .el-upload--picture-card {
        width: 750px;
        height: 220px;
        line-height: 220px;
      }

      .el-input--medium .el-input__icon {
        line-height: 31px;
      }

      .el-dialog__body {
        border-top: 0;
      }
    }

    .dialog-footer {
      display: flex;
      justify-content: space-around;

      .el-button--primary {
        background: rgba(75, 202, 221, 1);
        padding: 8px 30px;
      }

      .el-button--default {
        padding: 8px 30px;
      }
    }

    .piag {
      ul {
        display: none;
      }
    }

    .el-icon-time {
      line-height: 32px;
    }
  }
</style>
