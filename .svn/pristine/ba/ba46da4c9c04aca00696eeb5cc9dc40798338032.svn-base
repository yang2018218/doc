<template>
  <div class="shop_product">
    <div class="w">
      <div class="show_x_x" :style="{height:height_bool?'90px':  (95+list.length*24)+'px'}"
           :class="['input',main_bool?'input_border':'']">
        <header>上架商品</header>
        <div>
          <span>搜索产品名称：</span>
          <div class="show">
            <input v-model="sproductName" type="text" style="padding-left:10px;" @change="searchProduct"/>
            <ul v-show="bool" class="uu_show">
              <li @click="select(item.productName,item.goodsId,item.productNo)" v-for="(item,index) in list"
                  :key="index">{{item.productName}}
              </li>
            </ul>
          </div>
          <el-button type="primary" @click="searchProduct()" style="padding:8px 18px">搜索产品信息</el-button>

        </div>
      </div>
      <div class="ww" v-if="main_bool">
        <div class="product">
          <ul class="left">
            <li>
              <span>产品ID：</span>
              <span>{{showData.productNo}}</span>
            </li>
            <li>
              <span>产品名称：</span>
              <span>{{showData.productName}}</span>
            </li>
            <li>
              <span>副名称一：</span>
              <input v-model="titleOne" class="pro_d_title" type="text" :placeholder="showData.titleOne">
            </li>
            <li>
              <span>副名称二：</span>
              <input v-model="titleTwo" class="pro_d_title" type="text" :placeholder="showData.titleTwo">
            </li>
            <li>
              <span>副名称三：</span>
              <input v-model="titleThree" class="pro_d_title" type="text" :placeholder="showData.titleThree">
            </li>
            <li>
              <span>是否能用代金券：</span>
              <el-select v-model="showData.isVoucher" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </li>
          </ul>
          <div></div>
          <div class="right">
            <li>
              <span>产品售价：¥</span>
              <input type="text" placeholder="" v-model="showPrice"/>
            </li>
            <li>
              <span>市场售价：¥</span>
              <input type="text" placeholder="" v-model="showMarketPrice"/>
            </li>
            <p>（注：填写参照以下所有规格内产品售价和市场售价最低数据）</p>
          </div>
        </div>
        <div class="explain">
          <span>用法用量：</span>
          <el-input
              v-model="usage"
              :autosize="{minRows:2,maxRows:4}"
              class="pro_d_title"
              type="textarea"
              placeholder="请输入用法用量"
              clearable
            ></el-input>
        </div>
        <table class="product_table" width="720">
          <tr v-for="(item,index) in showData.list" :key="item.mianId">
            <td>{{item.modelName}}</td>
            <td>{{item.units}}</td>
            <td>
              <span>产品售价：¥</span>
              <input type="text" v-model="item.price"/>
            </td>
            <td>
              <span>市场售价：¥</span>
              <input type="text" v-model="item.marketPrice"/>
            </td>
            <td v-if="item.theSmall==='1'">最小规格</td>
            <td v-if="item.theSmall==='0'">普通规格</td>
            <td>
              <button @click="stateChage(item.modelId)" style="margin-right: 10px">{{item.status==1?'关':'开' }}</button>
              <button @click="settingPrice(index)" v-if="item.theDefault=='0'" style="color: #ff4d51">设置默认规格</button>
              <button @click="cancelPrice(index)" v-if="item.theDefault=='1'">取消默认规格</button>
            </td>
          </tr>
        </table>
        <div class="upload">
          <span class="left">产品视频</span>
          <div class="pig upload_pig" style="display: flex">
            <section style="display: inline-block;overflow: hidden; width: 170px;height: 120px">
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
                <span class="" style="font-size: 16px">视频主图</span>
              </el-upload>

            </section>

            <section style="display: inline-block;width:32px; overflow: hidden; width: 170px;height: 120px"></section>
                        <div style="display: inline-block;">
                          <el-upload
                            :before-upload="videoBeforeUpload"
                            accept=".mp4"
                            :action="dialogImageUrl"
                            :file-list="fileListVideo"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreviewVideo"
                            :on-remove="handleRemoveaVideo"
                            :data="uploadData"
                            :name="name"
                            :on-success="handleAvatarSuccessVideo">
                            <span class="" style="font-size: 16px">上传视频</span>
                          </el-upload>
                        </div>
          </div>
          <p class="pro_title">（注：请按照顺序上传，图片规格为180*180 最多上传3张）</p>
        </div>
        <div class="upload">
          <span class="left">产品主图</span>
          <div class="pig upload_pig">
            <el-upload
              dialogImageUrl
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
          <p class="pro_title">（注：请按照顺序上传，图片规格为180*180 最多上传3张）</p>
        </div>
        <div class="upload">
          <span class="left">分享图片</span>
          <div class="pig upload_pig share-img">
            <el-upload
            class="el-upload el-upload--picture-card"
            :action="dialogImageUrl"
            :show-file-list="false"
            :data="uploadData"
            :name="name"
            :on-success="shareImgSuccess">
            <img style="width:100%;height:120px;" v-if="shareImgUrl" :src="shareImgUrl">
            <i v-else class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
        <div class="upload detail_product clearfix">
          <span class="left">产品详情页</span>
          <div class="pig" style="width:456px;">
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
              <img width="100%" :src="dialogImageUrlpre" alt/>
            </el-dialog>
            <div class="p_text">（注：请按照顺序上传，图片规格为180*180 最多上传3张）</div>
          </div>
        </div>

      </div>
      <!-- 底部预览按钮 -->
      <footer v-if="main_bool">
        <div class="box">
          <el-button @click="sendToData" :disabled="isDisable" class="footerBtn" type="success">商品上架</el-button>
<!--          <span @click="preview">预览</span>-->
                    <el-button @click="$message.error('该功能暂未开放，感谢您的使用')" class="footerBtn" >预览</el-button>
          <el-button @click="back" class="footerBtn" type="info">返回</el-button>
        </div>
      </footer>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        isDisable:false,
        fileListVideo: [],
        fileListVideoImg: [],
        word: true,
        dialogImageUrl: '',
        dialogVisible: false,
        uploadApi: '',
        uploadData: {
          folderName: 'ycylManage'
        },
        shareImgUrl:'',
        dialogImageUrlpre: '',
        name: 'fileUpload',
        imgs: [],//存储所有上传成功的图片地址
        imgs_detail: [],////存储所有上传成功的详情页 图片地址
        bool: false,//搜索内容展示否
        sproductName: '',//搜索内容
        list: [],//后台返回搜索数据
        showData: {},//用户选中要添加的这条数据
        main_bool: false,
        goodsId: '',//产品id
        productName: '',//产品名称
        sendData: {},//发送给后台的数据,
        titleOne: '',
        titleTwo: '',
        titleThree: '',
        usage: "",
        str: '',//临时
        showPrice: '',
        showMarketPrice: '',
        price: '',
        marketPrice: '',
        height_bool: true,
        arr: [],//所有规格数据存储在这里
        fileListb: [],
        fileList: [],
      }
    },
    created () {
      this.dialogImageUrl = this.uploadurl
      if (sessionStorage.getItem('timered') == 's2hyhf7') {
        this.main_bool = true
        this.showData = JSON.parse(sessionStorage.getItem('preivew'))
        sessionStorage.removeItem('timered')
        this.showPrice = this.showData.showPrice * 100
        this.showMarketPrice = this.showData.showMarketPrice * 100
        this.showData.mainImages.split(',').forEach(item => {
          this.fileList.push({
            url: item
          })
        })
        this.showData.content.split(',').forEach(item => {
          this.fileListb.push({
            url: item
          })
        })

      }

    },
    methods: {
      shareImgSuccess(res,file){
        this.shareImgUrl=res.paths[0];
      },
      videoBeforeUpload(file){
        // const self = this
        // const isSize = new Promise(function(resolve, reject) {
        //   let _URL = window.URL || window.webkitURL;
        //   let url = URL.createObjectURL(file);
        //   let videoElement = document.createElement('video')
        //   // // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。 元数据包括：时长、尺寸（仅视频）以及文本轨道。
        //   videoElement.addEventListener("loadedmetadata", function (_event) {
        //     let width = videoElement.videoWidth
        //     let height = videoElement.videoHeight
        //     let valid = width / height == 1.25
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
      handleAvatarSuccessVideo (res, file) {
        // this.fileListVideo =  res.paths[0]
        if (res.code == 0) {
          this.fileListVideo.push({
            url: res.paths[0]
          })
        }

      },
      handleRemoveaVideo (file) {
        this.fileListVideo.forEach((item, index) => {
          if (item.url == file.url) {
            this.fileList.splice(index, 1)
          }
        })

      },
      handlePictureCardPreviewVideo (file) {
        this.dialogImageUrlpre = file.url
        this.dialogVisible = false
      },
      handleAvatarSuccessVideoImg (res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        if (res.code == 0) {
          this.fileListVideoImg.push({
            url: res.paths[0]
          })
        }
      },
      handleRemoveaVideoImg (file) {
        this.fileList.forEach((item, index) => {
          if (item.url == file.url) {
            this.fileList.splice(index, 1)
          }
        })

      },
      handlePictureCardPreviewVideoImg (file) {
        this.dialogImageUrlpre = file.url
        this.dialogVisible = false
      },
      cancelPrice (index) {
        this.showData.list[index].theDefault = '0'
      },
      settingPrice (index) {
        let setting = true
        this.showData.list.forEach(e => {
          if (e.theDefault === '1') {
            setting = false
          }
        })
        if (setting) {
          this.showData.list[index].theDefault = '1'
          this.$message.success('已经成功设置默认规格')
        } else {
          this.$message.error('只可以设置1个默认规格')
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

      back () {//往哪里返;

      },
      preview () {//预览页面
        let arr = []
        let str = ''
        this.fileList.forEach(item => {
          str += ',' + item.url
        })
        str = str.substr(1)
        let strb = ''
        this.fileListb.forEach(item => {
          strb += ',' + item.url
        })
        strb = strb.substr(1)
        this.sendData = {
          goodsId: this.goodsId,
          mainId: this.showData.mainId,
          productName: this.productName,
          titleOne: this.titleOne,
          titleTwo: this.titleTwo,
          titleThree: this.titleThree,
          mainImages: str,
          content: strb,
          shareImg: this.shareImgUrl,
          showPrice: this.showPrice,
          showMarketPrice: this.showMarketPrice,
          productType: this.showData.productType,
          fitKind: this.showData.fitKind,
          list: this.showData.list,
          addproduct: 'addproduct',
        }
        arr = [{
          mainModelId: this.showData.mainId,
          productId: this.goodsId,
          modelId: '',//字表id
        }]
        sessionStorage.setItem('preivew', JSON.stringify(this.sendData))
        this.$router.push('/ycyl/ycyldictdata')
      },
      stateChage (id) {
        this.showData.list.forEach(item => {
          if (item.modelId == id) {
            item.status = item.status == 1 ? 0 : 1
          }
        })
      },
      //上架商品
      sendToData () {
        this.isDisable = true
        setTimeout( ()=> {
          this.isDisable = false
        },2000)
        var defaultStatus = false
        if (!this.showPrice) {
          return this.$message.error('请输入产品售价')
        }
        if (!this.showMarketPrice) {
          return this.$message.error('请输入市场售价')
        }
        if (!this.word) {
          return
        }
        if (this.fileList.length < 1 || this.fileListb.length < 1) {
          return this.$message.error('图片没有上传')
        }
        if (!this.showData.isVoucher) {
          return this.$message.error('请选择是否能用代金券')
        }
        if (!this.shareImgUrl) {
          return this.$message.error('请上传分享图片')
        }
        let arr = []
        let str = ''
        this.fileList.forEach(item => {
          str += ',' + item.url
        })
        str = str.substr(1)
        let strb = ''
        this.fileListb.forEach(item => {
          strb += ',' + item.url
        })
        strb = strb.substr(1)
        this.showData.list.map(item => {
          item.mainModelId = item.modelId
          item.isVoucher=this.showData.isVoucher
          // delete item.modelId
        })
        this.showData.showPrice = this.showData.showPrice
        this.showData.showMarketPrice = this.showData.showMarketPrice
        // let raw = this.showData.list.filter(item => {
        //   item.price = parseInt( item.price)
        //   item.marketPrice = parseInt( item.marketPrice)
        //   return item.status == 1
        // })
        let raw = this.showData.list
        if (!raw.length) {
          return this.$message.error('至少上线一个规格')
        }
        var VideoImg=''
        if (this.fileListVideoImg[0]){
           VideoImg = this.fileListVideoImg[0].url
        }else {
           VideoImg = ''
        }
        var VideoUrlNum = ''
        if(this.fileListVideo[0]){
          VideoUrlNum = this.fileListVideo[0].url
        }else {
          VideoUrlNum=''
        }
        this.sendData = {
          productId: this.goodsId || this.showData.goodsId,
          mainId: this.showData.mainId,
          productName: this.productName || this.showData.productName,
          titleOne: this.titleOne || this.showData.titleOne,
          titleTwo: this.titleTwo || this.showData.titleTwo,
          titleThree: this.titleThree || this.showData.titleThree,
          usage: this.usage || "",
          mainImages: str,
          content: strb,
           shareImg: this.shareImgUrl,
          showPrice: this.showPrice || this.showData.showPrice,
          showMarketPrice: this.showMarketPrice || this.showData.showMarketPrice,
          productType: this.showData.productType,
          fitKind: this.showData.fitKind,
          list: this.showData.list,
          videoImageUrl: VideoImg,
          videoUrl: VideoUrlNum,
          isVoucher:this.showData.isVoucher
        }
        let timer = false
        this.sendData.list.some(item => {
          if (item.theDefault === '1') {
            defaultStatus = true
          }
          if (!item.price) {
            timer = true
            return 1
          }
          if (!item.marketPrice) {
            timer = true
            return 1
          }

        })
        if (timer) {
          return this.$message.error('请输入产品价格')
        }
        arr = [{
          mainModelId: this.showData.mainId,
          productId: this.goodsId,
          modelId: '',//字表id
        }]
        delete this.sendData.fitKind
        delete this.sendData.productType

        // this.word = false
        if (defaultStatus) {
          this.$http({
            url: this.$http.adornUrl('/ycyl/ycylproduct/save'),
            method: 'post',
            data: this.sendData
          }).then(({data}) => {
            if (data && data.code == 0) {
              this.word = true
              this.init()
              this.main_bool = false
              this.$message({
                message: '上架成功',
                type: 'success',
                duration: 1500,

              })
            } else {
              this.$message.error(data.msg)
            }
          })
        } else {
          this.$message.error('您没有设置默认规格')

        }
      },
      init () {
        //初始化
        this.titleOne = ''
        this.titleTwo = ''
        this.titleThree = ''
        this.showPrice = ''
        this.showMarketPrice = ''
        this.fileList = []
        this.fileListb = []
        this.showData = {}

        //   初始化结束
      },
      select (name, id, iq) {

        this.sproductName = ''
        this.init()
        this.height_bool = true
        this.productName = name
        this.bool = false
        this.main_bool = true
        this.goodsId = id
        this.list.some(item => {

          if (item.productNo == iq) {

            this.showData = item
            return 1

          }
        })
        this.arr = this.showData.list
        this.arr.forEach(item => {
          item.price = ''
          item.marketPrice = ''
          item.mainModelId = this.showData.mainId
          item.productId = this.goodsId

        })

      },
      searchProduct () {
        this.height_bool = false
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylmainproduct/getByName'),
          method: 'get',
          params: {
            productName: this.sproductName
          }
        }).then(({data}) => {
          if (data && data.code == 0) {
            var array = []
            if (data.YcylMainProductRes.length == 0) {
              this.$message('查询不到该商品')
            }
            data.YcylMainProductRes.forEach(e => {
              if (e.list.length > 0) {
                e.list.map(i => {
                  i.theDefault = '0'
                })
              }
            })
            this.list = data.YcylMainProductRes
            this.bool = true
          } else {
            this.$message.error(data.msg)
          }
        })

      },
      handleRemove (file, fileList) {
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrlpre = file.url
        this.dialogVisible = true
      },
      handleAvatarSuccess (res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        if (res.code == 0) {
          this.fileList.push({
            url: res.paths[0]
          })
        }

      },
      handleAvatarSuccess_detail (res, file) {
        if (res.code == 0) {
          this.fileListb.push({
            url: res.paths[0]
          })
        }
      },

    }
  }
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
<style lang="scss" scoped>
.explain:before { content:"."; clear: both; height: 0; overflow: hidden; visibility: hidden; display: block; }
.explain {
  zoom: 1;
  span{
    display: block;
    margin: 6px 0;
  }
}
  .shop_product {

    font-size: 16px;

    input,
    button {
      outline: none;
    }

    header {
      height: 36px;

      text-align: center;
      font-weight: 700;
      color: #333;
      font-size: 20px;
    }

    .w {
      padding-top: 28px;
      width: 900px;
      margin: 0 auto;
      border: 2px solid #ddd;
      border-radius: 10px;

      .input_border {
        border-bottom: 2px solid #ddd;
      }

      .input {
        text-align: center;

        height: 55px;

        .show {
          display: inline-block;
          width: 403px;
          // min-height: 30px;
          position: relative;

          .uu_show {
            position: absolute;
            padding-top: 17px;
            width: 403px;
            background: #fff;
            text-align: left;

            li {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: 24px;
              padding-left: 10px;
              line-height: 24px;
              color: #888;
              // border-bottom: 1px solid #ccc;
              cursor: pointer;
            }

            li:hover {
              background: #eee;
            }

          }
        }

        span {
          color: rgba(51, 51, 51, 1);
        }

        input {
          width: 403px;
          height: 30px;
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 6px;
        }

        button {
          width: 113px;
          height: 29px;
          // background: rgba(75, 202, 221, 1);
          // border-radius: 6px;
          color: rgba(255, 255, 255, 1);
          border: none;
          // margin-left: 13px;
          cursor: pointer;
        }
      }

      .ww {
        width: 640px;
        margin: 0 auto;

        .product {
          padding-top: 24px;

          .left {
            float: left;
            width: 350px;

            li {
              height: 30px;

              span:first-of-type {
                color: #333;
              }

              span:last-of-type {
                color: #888;
              }
            }

            .pro_d_title {
              margin-left: 4px;
              width: 186px;
              height: 26px;
              padding-left: 10px;
              border: 1px solid #dddddd;
              border-radius: 6px;
            }
          }

          .right {
            float: right;
            width: 284px;

            p {
              width: 100%;
              word-break: break-all;
              color: #888;
            }

            li {
              height: 47px;

              span {
                color: #333;
              }

              input {
                margin-left: 4px;
                width: 186px;
                height: 30px;
                padding-left: 10px;
                border: 1px solid rgba(221, 221, 221, 1);
                border-radius: 6px;
              }
            }
          }
        }

        .product_table {
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
                width: 80px;
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

        .upload {
          padding-top: 20px;

          .left {
            width: 80px;
            float: left;
          }

          .pig {
            width: 560px;
            float: left;


          }

          .upload_pig {
            overflow: hidden;
            height: 132px;
          }

          .pro_title {
            padding-left: 72px;
          }
        }
      }
    }

    footer {
      height: 71px;
      border-top: 2px solid rgba(221, 221, 221, 1);
      padding-top: 20px;

      .box {
        width: 456px;
        margin-left: 233px;
        .footerBtn{
          padding: 8px 20px;
          margin:0 20px;
        }

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

        span:nth-of-type(n+2) {
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

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
</style>
<style lang="scss">

  .upload {
    .el-upload-list--picture-card .el-upload-list__item,
    .el-upload--picture-card {
      width: 170px;
      height: 120px;
      line-height: 120px;
      border-radius: 10px;
      margin-right: 24px;
    }

    .el-upload-list--picture-card li:nth-of-type(3) {
      margin-right: 0;
    }

    .el-upload--picture-card {

      margin-right: 0px;
    }

    .el-upload-list--picture-card {
      width: 100%;
    }
  }

  // 产品详情页图片上传
  .detail_product {
    height: auto;

    .pig {
      // min-height: 300px;

    }

    .left {
      width: 104px !important;
    }

    .el-upload-list--picture-card .el-upload-list__item,
    .el-upload--picture-card {
      width: 456px;
      height: 300px;
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

    .el-upload--picture-card i {
      font-size: 100px;
    }
  }
</style>
