<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    title="修改文章"
    width="686px">
    <div class="content">
      <p class="pageTitle"><span>文章ID</span> ：{{dataList.marketId}}</p>
      <p class="pageTitle" style="white-space:nowrap;"><span>关系分类</span> ：
        <el-checkbox-group v-model="checkList" style="display: inline-block" @change="messaage()">
          <el-checkbox v-for="(item,index) in animal_type" :key="index" :label="item.dataId">
            {{item.dictName}}
          </el-checkbox>
        </el-checkbox-group>
      </p>
      <p class="pageTitle"><span>文章标题</span> ：<input type="text" v-model="title" :placeholder="dataList.title"
                                                     style="width: 450px"/>
      </p>
      <p class="pageTitle"><span>文章标签</span> ：<input type="text" v-model="keyword" :placeholder="dataList.keyword"/></p>
      <p class="pageTitle"><span>网页标题</span> ：<input type="text" v-model="pageTitle" :placeholder="dataList.pageTitle"/>
      </p>
      <div style="width: 100%;height: 20px"></div>
      <div class="imgBox">

        <section class="imgBox_sec">
          <p>封面图片</p>
          <footer>
            <el-upload
              :file-list="fileList"
              name="fileUpload"
              :data="folderName"
              :action="$http.adornUrl('/sys/oss/uploadAll')"
              :on-success="imgSuccess"
              list-type="picture-card"
              accept=".jpeg, .jpg, .gif, .png"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus" style='font-size: 12px'> </i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </footer>

        </section>
        <section style="width: 150px;display: inline-block"></section>
        <section class="imgBox_sec">
          <p>封面视频</p>
          <footer>
            <el-upload
              :file-list="fileListVideo"
              name="fileUpload"
              :data="folderName"
              :action="$http.adornUrl('/sys/oss/uploadAll')"
              :on-success="imgSuccessVideo"
              list-type="picture-card"
              accept=".mp4"
              :on-preview="handlePictureCardPreviewVideo"
              :on-remove="handleRemoveVideo">
              <i class="el-icon-plus" style='font-size: 12px'> </i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </footer>
        </section>
      </div>
      <UEditor :config="config" ref="ueditor"></UEditor>
      <!--      <p style="margin-top: 10px;" @change="">-->
      <!--        <span>免责声明：</span>-->
      <!--        <el-radio v-model="radio" :label="item.label" v-for="(item,index) in dutyList" :key="index"-->
      <!--                  style="display: block;margin-left: 50px;line-height: 30px">{{item.name}}-->
      <!--        </el-radio>-->
      <!--      </p>-->
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">返回</el-button>
      <el-button @click="recomposePage()" type="primary">确认修改</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import UEditor from '@/components/ueditor/ueditor.vue'

  export default {
    data () {
      return {
        animalType: '',
        keyword: '',
        // dutyList: [
        //   {name: '文章系畜牧堂原创，如需转载请注明出处！', label: '1'},
        //   {name: '图文来源于网络，如有侵权请联系我们删除！', label: '2'}
        // ],
        html:
          '<html lang="en">\n' +
          '<head>\n' +
          '    <meta charset="UTF-8">\n' +
          '    <meta name="viewport"\n' +
          '          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n' +
          '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
          '    <title>Document</title>\n' +
          '</head>\n' +
          '<body>',
        htmlBottom: '</body>\n' + '</html>',
        radio: '1',
        pageTitle: '',//文章标题
        title: '',//标题
        coverImg: '',//图片
        videoUrl: '',//视频
        fileListVideo: [],
        fileList: [],
        folderName: {
          folderName: 'ycylManage'
        },
        dialogImageUrl: '',
        dialogVisible: false,
        config: {
          autoHeightEnabled: false,
          autoFloatEnabled: true,
          initialContent: '请输入内容', //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },
        checkList: [],
        animal_type: '',//动物种类
        dataList: '',
        visible: false,
        cId: '',
        dataForm: {
          key: ''
        },
      }
    },
    components: {
      UEditor
    },
    methods: {

      imgSuccessVideo (path) {

        if (path.code == 0) {
          this.videoUrl = path.paths[0]
        }
      },
      handleRemoveVideo (file, fileList) {
        this.videoUrl = ''
      },
      handlePictureCardPreviewVideo (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      imgSuccess (path) {

        if (path.code == 0) {
          this.coverImg = path.paths[0]
        }

      },
      handleRemove (file, fileList) {
        this.coverImg = ''
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      messaage () {

      },
      init (id, animal_type) {
        this.fileListVideo = [],
        this.fileList = [],
        this.checkList = []
        this.animal_type = animal_type
        var than = this
        this.cId = id
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylmarketdynamic/infoById'),
          method: 'post',
          data: ({
            'marketId': this.cId,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            var conretWile = data.ycylMarketDynamic.content.split('<body>')[1].split('</body>')[0]
            var ue = UE.getEditor('editor')
            ue.ready(function () {
              ue.setContent(conretWile, false)
            })
            if (data.ycylMarketDynamic.coverImg) {
              this.fileList.push({url: data.ycylMarketDynamic.coverImg})
              this.coverImg = data.ycylMarketDynamic.coverImg
            }
            this.dataList = data.ycylMarketDynamic
            this.title = this.dataList.title
            this.keyword = this.dataList.keyword
            this.pageTitle = this.dataList.pageTitle
            if (data.ycylMarketDynamic.videoUrl) {
              this.fileListVideo.push({url: data.ycylMarketDynamic.videoUrl})
              this.videoUrl = data.ycylMarketDynamic.videoUrl
            }
            var animalb = []
            if (data.ycylMarketDynamic.poultryType) {
              animalb = data.ycylMarketDynamic.poultryType.split(',')
            }

            animalb.forEach(animal => {

              animal_type.forEach((e) => {

                if (e.dataId == animal) {
                  this.checkList.push(e.dataId)

                }

              })
            })

          }
        })

      },
      recomposePage () {
        if (this.checkList.length > 0) {
          this.animalType = this.checkList.join(',')

        } else {
          return this.$alert('至少选择一种动物种类', '错误提示', {
            confirmButtonText: '确定'
          })
        }

        if (this.coverImg) {

        }else {
          return this.$alert('图片不能为空', '错误提示', {
            confirmButtonText: '确定'
          })
        }
        if (this.title == '' || this.checkbox) {
          return this.$alert('分类和标题不能为空', '错误提示', {
            confirmButtonText: '确定'
          })
        }
        let content = this.$refs.ueditor.getUEContent()
        if (!content) {
          return this.$alert('文章内容不能为空', '错误提示', {
            confirmButtonText: '确定'
          })
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylmarketdynamic/update'),
          method: 'post',
          data: {
            marketId:this.cId,
            content: this.html + '' + content +"" + this.htmlBottom,
            articleType: 2,
            poultryType: this.animalType,
            title: this.title,
            keyword: this.keyword,
            pageTitle: this.pageTitle,
            coverImg: this.coverImg,
            videoUrl: this.videoUrl
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success("文章修改成功")
            this.visible = false
            this.$emit("refreshDataList")
          }else {
            this.$message.error(data.msg)
          }
        })
      }
    },
  }

</script>
<style lang="scss" scoped>
  .el-checkbox {
    margin-right: 10px;
    margin-left: 10px;
  }

  .content {
    border: 1px solid #a6a6a6;
    font-size: 16px;
    width: 100%;

    .pageTitle {
      /*width: 500px;*/
      /*margin: 0 auto;*/
      margin-left: 35px;

      span {
        display: inline-block;
        /*line-height: 16px;*/
        /*height: 100%;*/
        width: 70px;
        text-align: justify;
        vertical-align: top;

        &::after {
          display: inline-block;
          width: 100%;
          content: '';
          height: 0;
        }
      }

      input {
        height: 30px;
        display: inline-block;
        width: 450px;
        padding: 5px 0;
        border-radius: 3px;
        border: 1px solid #d8d8d8;
      }
    }

    .imgBox {
      padding: 0px 45px;
      margin-bottom: 25px;


      .imgBox_sec {
        display: inline-block;

        footer {
          width: 170px;
          height: 150px;
          display: inline-block;
          overflow: hidden;

        }

        p {
          color: #333;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>


