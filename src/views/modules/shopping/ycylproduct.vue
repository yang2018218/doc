<template>
  <div class="ycylproduct">
    <el-form :inline="true" :model="searchData" class="top">
      <el-form-item label="商品编号：" prop="productNo">
        <el-input v-model="searchData.productNo" placeholder="请输入商品编号" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品名称：" prop="productName">
        <el-input v-model="searchData.productName" placeholder="请输入商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="功能类目：" prop="productName">
         <el-select v-model="searchData.productType" placeholder="请选择功能类目" clearable>
           <el-option v-for="(item,index) in fitKindArr" :key="index" :label="item.dictName" :value="item.dataId"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="适用种类：" prop="fitKind">
         <el-select v-model="searchData.fitKind" placeholder="请选择适用种类" clearable>
           <el-option v-for="(item,index) in enterpriseList" :key="index" :label="item.dictName" :value="item.dataId"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
         <el-select v-model="searchData.status" placeholder="请选择状态" clearable>
           <el-option v-for="(item,index) in statusArr" :key="index" :label="item.name" :value="item.id"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPageList(1)" size="small" style="padding: 8px 20px">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 下方表格 -->
    <el-table :data="list" border style="winth:100%" v-loading="listLoading">
      <el-table-column align="center" header-align="center" label="商品编号" prop="productNo"></el-table-column>
      <el-table-column align="center" header-align="center" label="适用种类" prop="fitKind" width="60"></el-table-column>
      <el-table-column align="center" header-align="center" label="功能类目" prop="productType"></el-table-column>
      <el-table-column align="center" header-align="center" label="产品名称" prop="productName"></el-table-column>
      <el-table-column align="center" header-align="center" label="副名称一" prop="titleOne"></el-table-column>
      <el-table-column align="center" header-align="center" label="副名称二" prop="titleTwo"></el-table-column>
      <el-table-column align="center" header-align="center" label="副名称三" prop="titleThree"></el-table-column>
      <el-table-column align="center" header-align="center" label="规格一" width="60">
        <template slot-scope="scope">{{scope.row.list[0]?scope.row.list[0].count:'无'}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格二" width="60">
        <template slot-scope="scope">{{scope.row.list[1]?scope.row.list[1].count:"无"}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格三" width="60">
        <template slot-scope="scope">{{scope.row.list[2]?scope.row.list[2].count:"无"}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格四" width="60">
        <template slot-scope="scope">{{scope.row.list[3]?scope.row.list[3].count:"无"}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格五" width="60">
        <template slot-scope="scope">{{scope.row.list[4]?scope.row.list[4].count:"无"}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格六" width="60">
        <template slot-scope="scope">{{scope.row.list[5]?scope.row.list[5].count:"无"}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格七" width="60">
        <template slot-scope="scope">{{scope.row.list[6]?scope.row.list[6].count:"无"}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格八" width="60">
        <template slot-scope="scope">{{scope.row.list[7]?scope.row.list[7].count:"无"}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="规格九" width="60">
        <template slot-scope="scope">{{scope.row.list[8]?scope.row.list[8].count:"无"}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="销售金额(元)" width="60">
        <template slot-scope="scope">{{scope.row.sumPrice || 0}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="已售数" width="60">
        <template slot-scope="scope">{{scope.row.sellNum || 0}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="修改销量" width="60">
        <template slot-scope="scope">{{scope.row.JiaSellNum || 0}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="状态">
        <template slot-scope="scope">{{scope.row.status=='1'&& scope.row.isRecommend=='1'?'上架并推荐':scope.row.status=='1'?'上架':'下架'}}</template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="edit(scope.row.productId)">编辑</el-button>
            <el-button type="text" @click="fakeNumber(scope.row.productId)">修改</el-button>
          </div>
          <el-dropdown @command="handleCommand(scope.row,scope.row.productId,$event)" trigger="click">
            <span
              class="el-dropdown-link"
              style="display:inline-block;margin-top:7px;text-decoration: underline;"
            >状态管理</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="3">上架并推荐</el-dropdown-item>
              <el-dropdown-item command="1">上架</el-dropdown-item>
              <el-dropdown-item command="0">下架</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10,20,50,100]"
    :total="totalCount"
    @current-change="currentChangeHandle"
    @size-change="sizeChangeHandle"
    layout="total,sizes,prev,pager,next,jumper"
    ></el-pagination>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="centerDialogVisible1" width="300px" center>
      <div>
        修改已售数量：
        <el-input v-model="sellNum" placeholder="请输入内容"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="xiugai()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog style="width:100%;" custom-class="productd_dialog_a" title="商城商品编辑" :visible.sync="Visible" width="768px" :before-close="handleClose">
      <header>
        <span style="color:#888;letter-spacing:.1em;">产品ID:</span>
        <span style="color:#333;">{{editGoods.productNo}}</span>
        <el-button @click="editl" class="btn_news" type="primary" style="float:right;">刷新信息</el-button>
      </header>
      <div class="container">
        <div class="container_first">
          <span>产品名称：</span>
          <span style="color:#888;">{{editGoods.productName}}</span>
          <div class="right">
            <span>副名称一：</span>
            <input v-model="editGoods.titleOne" type="text" placeholder="请输入名称" />
          </div>
        </div>
        <div class="container_first">
          <span>副名称二：</span>
          <input v-model="editGoods.titleTwo" type="text" placeholder="请输入名称" />
          <div class="right">
            <span>副名称三：</span>
            <input v-model="editGoods.titleThree" type="text" placeholder="请输入名称" />
          </div>
        </div>
        <div class="container_first container_price">
          <span>产品售价：¥&nbsp;</span>
          <input v-model="showPrice" type="text" placeholder />
          <div class="right">
            <span>市场售价：¥&nbsp;</span>
            <input v-model="showMarketPrice" type="text" placeholder />
          </div>
        </div>
        <div style="margin-top:10px;">
          <span>是否能用代金券：</span>
              <el-select v-model="editGoods.isVoucher" placeholder="请选择">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
        </div>
        <!--  -->
        <p style="font-size:14px;color:#999;padding-top:10px;">（注：填写参照以下所有规格内产品售价和市场售价最低数据）</p>

        <div class="drugEmployBox" style="height: 100px;line-height: 100px;margin-bottom: 5px">
          用法用量：
          <el-input
            style="display: inline-block;width: 561px;"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入内容"
            resize="none"
            v-model="editGoods.usage"
          ></el-input>
        </div>
        <table class="product_table">
          <tr v-for="(item,index) in editGoods.list" :key="item.modelId">
            <td>{{item.modelName}}</td>
            <td>{{item.units}}</td>
            <td>
              <span>产品售价：¥</span>
              <input v-model="item.price" type="text" placeholder="68" />
            </td>
            <td>
              <span>市场售价：¥</span>
              <input v-model="item.marketPrice" type="text" placeholder="68" />
            </td>
            <td>
              <span v-if="item.theSmall=='0'">普通规格</span>
              <span v-if="item.theSmall=='1'">最小规格</span>
            </td>
            <td>
              <button @click="statuSelect(item.modelId)">{{item.status==1?'关':'开' }}</button>
              <button @click="settingPrice(index)" v-if="item.theDefault=='0'">设置默认规格</button>
              <button
                @click="cancelPrice(index)"
                v-if="item.theDefault=='1'"
                style="color: #ff4d51"
              >取消默认规格</button>
            </td>
          </tr>
        </table>
        <div class="upload clearfix">
          <span class="left">视频封面</span>
          <section style="display: flex;">
            <div class="pig upload_pig" style="width: 190px;height: 150px;overflow: hidden">
              <el-upload
                :action="dialogImageUrl"
                :file-list="fileListVideoImg"
                list-type="picture-card"
                :on-preview="handlePictureCardPreviewVideoImg"
                :on-remove="handleRemoveaVideoImg"
                :data="uploadData"
                :name="name"
                accept=".jpeg, .jpg, .gif, .png"
                :on-success="handleAvatarSuccessVideoImg"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImage" alt />
              </el-dialog>
            </div>
            <div style="width: 50px;height: 150px"></div>
            <div class="pig upload_pig" style="width: 190px;height: 150px;overflow: hidden">
              <el-upload
                :action="$http.adornUrl('/sys/oss/uploadAll')"
                :file-list="fileListVideo"
                list-type="picture-card"
                :on-preview="handlePictureCardPreviewVideo"
                :on-remove="handleRemoveaVideo"
                :data="uploadData"
                :name="name"
                accept=".mp4"
                :on-success="handleAvatarSuccessVideo"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImage" alt />
              </el-dialog>
            </div>
          </section>
        </div>
        <div class="upload clearfix">
          <span class="left">产品主图</span>
          <div class="pig upload_pig">
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
              <img width="100%" :src="dialogImage" alt />
            </el-dialog>
          </div>
        </div>
        <p class="pro_title">（注：请按照顺序上传，图片规格为180*180 最多上传3张）</p>
        <div class="upload">
          <span class="left">分享图片</span>
          <div class="pig upload_pig"  style="margin-bottom:10px;">
            <el-upload
            class="el-upload el-upload--picture-card share-img"
            :action="dialogImageUrl"
            :show-file-list="false"
            :data="uploadData"
            :name="name"
            :on-success="shareImgSuccess">
            <img style="width:100%;height:148px;" v-if="shareImgUrl" :src="shareImgUrl">
            <i v-else class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
        <div class="upload detail_product clearfix">
          <span class="left">产品详情页</span>
          <div class="pig pisg" style="width:456px;">
            <el-upload
              :action="dialogImageUrl"
              :file-list="fileListb"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemoveb"
              :data="uploadData"
              :name="name"
              :on-success="handleAvatarSuccess_detail"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImage" alt />
            </el-dialog>
            <div class="p_text">（注：请按照顺序上传，图片规格为180*180 最多上传3张）</div>
          </div>
        </div>
      </div>
      <!-- 底部预览按钮 -->
      <div class="product_footer">
        <div class="product_box">
          <span @click="sureToLoad">确定</span>
          <span @click="preview" class="product_pre">预览</span>
          <span @click="back">返回</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import paganation from "@/components/paganation";
export default {
  data() {
    return {
      videoUrl: "", //video视频图片
      videoImgurl: "", //videoImg封面图片url
      fileListVideo: [],
      fileListVideoImg: [],
      fakeNumberId: "",
      sellNum: "", //数亮
      centerDialogVisible1: false, //假数据
      showMarketPrice: "",
      showPrice: "",
      dialogImageUrl: "",
      Visible: false,
      uploadApi: "",
      uploadData: {
        folderName: "ycylManage",
      },
      name: "fileUpload",
      imgs: [], //存储所有上传成功的图片地址
      imgs_detail: [], ////存储所有上传成功的详情页 图片地址
      dialogVisible: false,
      list: [], //后台返回商品数据,
      listLoading:false, //表格loading,
      goodId: "", //编辑商品的id
      dialogImage: "",
      shareImgUrl: "",
      editGoods: {},
      fileList: [],
      fileListb: [], //详细图片
      totalCount: 0, //数据条数信息
      pageSize: 10, //每页条数
      pageIndex: 1, //第几页
      dataForm: {
        key: "",
      },
      fitKindArr: [], //后台返回功能类目集合
      enterpriseList: [], //试用种类
      statusArr: [
        {
          name: "全部",
          id: "",
        },
        {
          name: "上架",
          id: "1",
        },
        {
          name: "下架",
          id: "0",
        },
      ],

      productType: "",
      fitKind: "",
      status: "",
      searchData: {},
      keybloo: false,
    };
  },
  components: {
    paganation,
  },

  activated() {
    this.dialogImageUrl = this.uploadurl;
    if (sessionStorage.getItem("timered") == "s2hyhf7") {
      this.Visible = true;
      this.editGoods = JSON.parse(sessionStorage.getItem("preivew"));
      sessionStorage.removeItem("timered");
      this.editGoods.mainImages.split(",").forEach((item) => {
        this.fileList.push({
          url: item,
        });
      });
      this.editGoods.content.split(",").forEach((item) => {
        this.fileListb.push({
          url: item,
        });
      });
      return;
    }
    //获取功能类目
    this.getPageList();
    this.$http({
      url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
      method: "post",
      data: {
        dictValue: "sys_drug",
        pageSize: "30",
      },
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.fitKindArr = data.page.list;
        this.fitKindArr.unshift({
          dictName: "全部",
        });
        this.productType = this.fitKindArr[0].dataId;
      }
    });
    // 获取动物种类数据
    this.$http({
      url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
      method: "post",
      data: {
        dictValue: "animal_type",
        pageSize: "30",
      },
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.enterpriseList = data.page.list;
        this.enterpriseList.unshift({
          dictName: "全部",
        });
        this.fitKind = this.enterpriseList[0].dataId;
      }
    });
  },

  methods: {
    shareImgSuccess(res,file){
        this.shareImgUrl=res.paths[0];
      },
    videoBeforeUpload(file) {
      // const self = this
      // const isSize = new Promise(function(resolve, reject) {
      //   let _URL = window.URL || window.webkitURL;
      //   let url = URL.createObjectURL(file);
      //   let videoElement = document.createElement('video')
      //   // // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。 元数据包括：时长、尺寸（仅视频）以及文本轨道。
      //   videoElement.addEventListener("loadedmetadata", function (_event) {
      //     let width = videoElement.videoWidth
      //     let height = videoElement.videoHeight
      //     // if ( ){
      //     //
      //     // }else {
      //     //   self.$message.error("上传视频的格式不正确，请确保上传视频为5:4")
      //     //   return
      //     // }
      //     let valid = width / height ==1.25
      //     valid ? resolve() : reject();
      //   })
      //   videoElement.src = _URL.createObjectURL(file)
      // }).then(() => {
      //   return file;
      // },() => {
      //   self.$message.error('上传视频的格式不正确，请确保上传视频为5:4')
      //   return Promise.reject();
      // });
      // return isSize ;
    },
    handlePictureCardPreviewVideo(file) {
      //
    },
    handleRemoveaVideo(file) {
      this.videoUrl = "  ";
    },
    handleAvatarSuccessVideo(res, file, fileListVideoImg) {
      if (res.code == 0) {
        this.videoUrl = res.paths[0];
      }
    },
    handleRemoveaVideoImg(file) {
      this.videoImgurl = "  ";
      // this.fileList.forEach((item, index) => {
      //   if (item.url == file.url) {
      //     this.fileList.splice(index, 1)
      //   }
      // })
    },
    handleAvatarSuccessVideoImg(res, file, fileListVideoImg) {
      if (res.code == 0) {
        this.videoImgurl = res.paths[0];
      }
    },
    handlePictureCardPreviewVideoImg(file) {
      //
    },
    xiugai() {
      this.centerDialogVisible1 = false;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylproduct/update"),
        method: "post",
        data: {
          sellNum: this.sellNum,
          productId: this.fakeNumberId,
        },
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message.success("修改成功");
          this.sellNum = "";
          this.getPageList();
        } else {
          this.$message.error(data.error);
        }
      });
    },
    fakeNumber(id) {
      //假数据
      this.fakeNumberId = id;
      this.centerDialogVisible1 = true;
    },

    cancelPrice(index) {
      //取消设置
      this.editGoods.list[index].theDefault = "0";
    },
    settingPrice(index) {
      //设置默认规格
      let setting = true;
      this.editGoods.list.forEach((e) => {
        if (e.theDefault === "1") {
          setting = false;
        }
      });
      if (setting) {
        this.editGoods.list[index].theDefault = "1";
        this.$message.success("默认规格设置成功");
      } else {
        this.$message.error("已经有一个默认规格了！");
      }
    },
    // 每页数
    sizeChangeHandle(val){
      this.pageSize=val;
      this.pageIndex=1;
      this.getPageList()
    },
    // 当前页
    currentChangeHandle(val){
      this.pageIndex=val;
      this.getPageList()
    },
    back() {
      this.fileList.length = 0;
      this.fileListb = [];
      this.Visible = false;
      this.getPageList();
    },
    preview() {
      //预览页面
      let str = "";
      this.fileList.forEach((item) => {
        str += "," + item.url;
      });
      str = str.substr(1);
      let strb = "";
      this.fileListb.forEach((item) => {
        strb += "," + item.url;
      });
      strb = strb.substr(1);

      this.editGoods.mainImages = str;
      this.editGoods.content = strb;
      sessionStorage.setItem("preivew", JSON.stringify(this.editGoods));
    },

    sureToLoad() {
      var theDefaultStatus = false;
      if (this.fileList.length < 1 || this.fileListb.length < 1) {
        return this.$message.error("图片没有上传");
      }
      let str = "";
      this.fileList.forEach((item) => {
        str += "," + item.url;
      });
      str = str.substr(1);
      let strb = "";
      this.fileListb.forEach((item) => {
        strb += "," + item.url;
      });
      strb = strb.substr(1);
      this.editGoods.mainImages = str;
      this.editGoods.content = strb;
      // let raw = this.editGoods.list.filter(item => {
      //   item.price = parseInt(100 * item.price)
      //   item.marketPrice = parseInt(100 * item.marketPrice)
      //   delete item.units
      //   return item.status == 1
      // })
      delete this.editGoods.fitKind;
      delete this.editGoods.productType;
      delete this.editGoods.sellNum;
      let raw = this.editGoods.list;
      if (!raw.length) {
        return this.$message.error("至少上线一个规格");
      }
      if (this.videoImgurl && this.videoUrl) {
        this.editGoods.videoImageUrl = this.videoImgurl;
        this.editGoods.videoUrl = this.videoUrl;
      } else {
        this.editGoods.videoImageUrl = "  ";
        this.editGoods.videoUrl = "  ";
      }
      this.editGoods.showPrice = this.showPrice;
      this.editGoods.shareImg = this.shareImgUrl;
      this.editGoods.showMarketPrice = this.showMarketPrice;
      this.editGoods.list.forEach((e) => {
          e.isVoucher=this.editGoods.isVoucher
        if (e.theDefault == "1") {
          theDefaultStatus = true;
        }
      });
      if (theDefaultStatus) {
        this.$http({
          url: this.$http.adornUrl("/ycyl/ycylproduct/editor"),
          method: "post",
          data: this.editGoods,
        }).then(({ data }) => {
          if (data && data.code == 0) {
            this.getPageList();
            this.fileListb.length = 0;
            this.fileList = [];
            this.$message({
              message: "编辑成功",
              type: "success",
              duration: 1500,
            });
            this.Visible = false;
          } else {
            this.$message.error(data.msg);
          }
        });
      } else {
        this.$message.error("您没有设置默认规格");
      }
    },
    statuSelect(id) {
      this.editGoods.list.some((item) => {
        if (item.modelId == id) {
          item.status = item.status == "1" ? "0" : "1";
        }
      });
    },
    edit(id) {
      this.fileListVideoImg = [];
      this.fileListVideo = [];
      this.fileList.splice(0);
      this.fileListb.splice(0);
      this.Visible = true;
      this.goodId = id;
      this.list.some((item) => {
        if (item.productId == id) {
          this.editGoods = item;
          this.showMarketPrice = this.editGoods.showMarketPrice;
          this.showPrice = this.editGoods.showPrice;
          return true;
        }
      });
      this.videoImgurl = this.editGoods.videoImageUrl;
      this.videoUrl = this.editGoods.videoUrl;
      this.shareImgUrl = this.editGoods.shareImg;
      if (this.editGoods.videoImageUrl) {
        this.fileListVideoImg.push({ url: this.editGoods.videoImageUrl });
      }
      if (this.editGoods.videoUrl) {
        this.fileListVideo.push({ url: this.editGoods.videoUrl });
      }
      let arr = this.editGoods.mainImages.split(",");
      let arrb = this.editGoods.content.split(",");
      arr.forEach((item) => {
        this.fileList.push({
          url: item,
        });
      });
      arrb.forEach((item) => {
        this.fileListb.push({
          url: item,
        });
      });
    },
    editl() {
      this.fileListb.length = 0;
      this.fileList.length = 0;

      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylproduct/infoById"),
        method: "post",
        data: {
          productId: this.editGoods.productId,
        },
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.showMarketPrice = data.page.showMarketPrice;
          this.showPrice = data.page.showPrice;
          this.editGoods = data.page;
          let arr = this.editGoods.mainImages.split(",");
          let arrb = this.editGoods.content.split(",");

          arr.forEach((item) => {
            this.fileList.push({
              url: item,
            });
          });
          arrb.forEach((item) => {
            this.fileListb.push({
              url: item,
            });
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //获取默认展示商品
    getPageList(val=0) {
      val?this.pageIndex=val:''
      this.listLoading=true
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylproduct/getPageList"),
        method: "post",
        data: {
          page: this.pageIndex,
          pageSize: this.pageSize,
          ...this.searchData
        },
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.list = data.page.list;
          this.totalCount = data.page.totalCount;
        } else {
          this.$message.error(data.msg);
        }
        this.listLoading=false;
      });
    },
    fn(item, same, bsame) {
      let str = 0;

      item.forEach((items) => {
        if (items.modelName == same || items.modelName == bsame) {
          str = "售价" + items.marketPrice;
        }
      });
      return str;
    },
    handleCommand(select, productId, command) {
      if (select.status == command && command == 0 && select.isRecommend == 0) {
        this.$message("该商品已下架,勿重复修改");
        return;
      }
      if (select.status == command && command == 1 && select.isRecommend == 0) {
        this.$message("该商品已上架,勿重复修改");
        return;
      }
      if (command == 3 && select.isRecommend == 1) {
        this.$message("该商品已上架并推荐,勿重复修改");
        return;
      }
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylproduct/update"),
        method: "post",
        data:
          command == "3"
            ? {
                productId,
                isRecommend: 1,
                status: 1,
              }
            : {
                status: command,
                isRecommend: 0,
                productId,
              },
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.getPageList();
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    selecta() {
      let select = document.querySelector(".first_select");
      let index = select.selectedIndex;
      let text = select.options[index].text;
      let value = select.options[index].value;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleRemovea(file) {
      this.fileList.forEach((item, index) => {
        if (item.url == file.url) {
          this.fileList.splice(index, 1);
        }
      });
    },
    handleRemoveb(file) {
      this.fileListb.forEach((item, index) => {
        if (item.url == file.url) {
          this.fileListb.splice(index, 1);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImage = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.code == 0) {
        this.fileList.push({
          url: res.paths[0],
        });
      }
    },
    handleAvatarSuccess_detail(res, file) {
      if (res.code == 0) {
        this.fileListb.push({
          url: res.paths[0],
        });
      }
    },
  },
};
</script>
<style>
.share-img{
  line-height: 0 !important;
}
  .share-img .el-upload{
  overflow: hidden;
    width: 100%;
    height: 100%;
    line-height: 0;
  }
  .share-img  .el-upload .el-icon-plus{
    margin-top: 40px;
  }
</style>
<style scoped>
.top {
  padding: 10px 10px 0;
  border-radius:6px;
  margin-bottom: 16px;
  background-color: #eeeeee;
}
/* 下拉框样式*/
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
<style lang="scss">
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

//  编辑页面样式
.productd_dialog_a {
  border-radius: 10px;

  .el-dialog__header {
    text-align: center;
  }

  .el-dialog__headerbtn {
    display: none;
  }

  .el-dialog__body {
    border-top: 0;
    padding: 0;
    padding-top: 15px;
  }

  .pisg {
    .el-upload--picture-card {
      i.el-icon-plus {
        position: relative;
      }

      .el-icon-plus:before {
        position: absolute;
        top: -53px;
        left: -48px;
      }
    }
  }

  header {
    padding: 0 45px;
    height: 43px;
    border-bottom: 2px solid rgba(238, 238, 238, 1);

    .btn_news {
      width: 80px;
      height: 30px;
      background: rgba(75, 202, 221, 1);
      border-radius: 6px;
      text-align: center;
      line-height: 30px;
      padding: 0;
    }
  }

  .container {
    padding: 12px 45px 0;

    .container_first {
      margin-top: 12px;

      .right {
        float: right;
      }

      input {
        padding-left: 8px;
        width: 200px;
        height: 30px;
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 6px;
      }
    }

    .container_price {
      input {
        width: 188px;
        height: 30px;
        border: 1px solid rgba(221, 221, 221, 1);
        border-radius: 6px;
      }
    }

    .product_table {
      width: 100%;

      tr {
        td:first-of-type {
          color: rgba(51, 51, 51, 1);
        }

        td:nth-of-type(2) {
          color: rgba(102, 102, 102, 1);
        }

        td:nth-of-type(3),
        td:nth-of-type(4) {
          color: #333;

          input {
            width: 50px;
            height: 30px;
            border: 1px solid rgba(221, 221, 221, 1);
            border-radius: 6px;
            padding-left: 10px;
            margin-left: 4px;
          }
        }

        td:nth-of-type(6) {
          text-align: right;

          button {
            text-decoration: underline;
            color: rgba(45, 142, 226, 1);
            background: transparent;
            border: 0;
            cursor: pointer;
          }
        }
      }
    }

    // 图片上传部分样式
    .upload {
      padding-top: 20px;

      .left {
        width: 80px;
        float: left;
        line-height: 15px;
      }

      .pig {
        width: 560px;
        float: left;
      }

      .upload_pig {
        overflow: hidden;
        height: 148px;
      }

      .el-icon-plus:before {
        font-size: 60px;
      }

      .el-upload--picture-card {
        line-height: 175px;
      }
    }

    .pro_title {
      padding-left: 72px;
      padding-top: 10px;
      color: #888;
    }

    // 产品详情页图片上传
    .detail_product {
      height: auto;
      .left {
        width: 104px !important;
      }

      .el-upload-list--picture-card .el-upload-list__item,
      .el-upload--picture-card {
        width: 456px;
        height: auto;
        border-radius: 10px;
        line-height: 350px;
      }

      .el-upload--picture-card {
        background: rgba(238, 238, 238, 1);
      }

      .p_text {
        padding-left: 30px;
        padding-top: 19px;
        color: #888;
        padding-bottom: 25px;
      }

      // .el-upload--picture-card i{
      //     font-size: 100px;
      // }
      .el-icon-plus:before {
        font-size: 100px;
      }
    }

    i {
      background: transparent;
      height: auto;
      width: auto;
    }
  }

  .product_footer {
    border-top: 2px solid rgba(238, 238, 238, 1);
    padding: 18px 0 20px;

    .product_box {
      width: 456px;
      margin-left: 152px;

      span {
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        display: inline-block;
        border-radius: 6px;
        margin-right: 105px;
      }

      span:first-of-type {
        width: 92px;
        height: 30px;
        background: rgba(75, 202, 221, 1);
        color: rgba(255, 255, 255, 1);
      }

      span:nth-of-type(n + 2) {
        width: 72px;
        height: 30px;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(221, 221, 221, 1);
        color: rgba(102, 102, 102, 1);
      }

      span:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
