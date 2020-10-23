<template>
  <div id="app">
    <div class="aa">
      <div>
        <label class="titBig" >
          标题：
          <el-input
            id="tit"
            maxlength="20"
            placeholder="请输入内容"
            show-word-limit
            style="width: 20rem"
            type="text"
            v-model="title"
          ></el-input>
        </label>
        <label class="titBig" >
          标签：
          <el-input placeholder="请输入关键词用|分割" style="width: 20rem" type="text" v-model="keyword"></el-input>
        </label>
        <label class="titBig" >
          网页标题：
          <el-input
            maxlength="20"
            placeholder="请输入网页标题"
            show-word-limit
            style="width: 20rem"
            type="text"
            v-model="pageTitle"
          ></el-input>
        </label>
      </div>
      <div>
        <div class="animal">
          分类：
          <el-checkbox-group style="width: 350px" v-model="checkboxGroup1">
            <el-checkbox-button
              :key="index"
              :label="item.dataId"
              v-for="(item,index) in animal_type"
            >{{item.dictName}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <div class="counter">
        <!--       图片上传-->
        <div class="name">
          <el-upload
            :action="$http.adornUrl('/sys/oss/uploadAll')"
            :data="folderName"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :on-success="handSuccess"
            accept=".jpeg, .jpg, .gif, .png"
            list-type="picture-card"
            name="fileUpload"
          >
            <p style="font-size: 20px; ">封面图片</p>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible1">
            <img :src="dialogImageUrl1" alt width="100%" />
          </el-dialog>
        </div>
        <!--        视频上传-->
        <div>
          <el-upload
            :action="$http.adornUrl('/sys/oss/uploadAll')"
            :data="video"
            :on-preview="handlePictureCardPreview2"
            :on-remove="handleRemove2"
            :on-success="handSuccess2"
            accept=".mp4, .flv, .3gp, .rmvb, .rm, .avi, .wmv"
            list-type="picture-card"
            name="fileUpload"
          >
            <p style="font-size: 20px">上传视频</p>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible2">
            <img :src="dialogImageUrl2" alt width="100%" />
          </el-dialog>
        </div>
      </div>

      <UEditor :config="config" ref="ueditor"></UEditor>
      <p style="margin-top: 32px;" >
        <span>免责声明：</span>
        <el-radio v-model="radio" :label="item.label" v-for="(item,index) in dutyList" :key="index" style="display: block;margin-left: 50px;line-height: 30px">{{item.name}}</el-radio>
      </p>
      <div style="display: flex;justify-content: center">
        <el-button
          :disabled="isdisabled"
          type="primary"
          plain
          @click="getContent"
          style="width: 5rem; margin: 1rem auto;"
        >发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import UEditor from "@/components/ueditor/ueditor.vue";

export default {
  name: "hello",
  components: {
    UEditor
  },
  computed: {},
  data() {
    return {
      isdisabled:false,
      dutyList: [
        {name: '文章系畜牧堂原创，如需转载请注明出处！',label:"1"},
        {name: '图文来源于网络，如有侵权请联系我们删除！',label:"2"}
      ],
      radio: '1',
      html:
        '<html lang="en">\n' +
        "<head>\n" +
        '    <meta charset="UTF-8">\n' +
        '    <meta name="viewport"\n' +
        '          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n' +
        '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
        "    <title>Document</title>\n" +
        "</head>\n" +
        "<body>",
      htmlBottom: "</body>\n" + "</html>",
      videoPaths: [],
      video: {
        folderName: "viedo"
      },
      photoPaths: [],
      folderName: {
        folderName: "ycylManage"
      },
      dialogImageUrl1: "",
      dialogVisible1: false,
      checkboxGroup1: [],
      dialogImageUrl2: "",
      dialogVisible2: false,
      checkboxGroup2: [],
      animal_type: [],
      title: "",
      keyword: "",
      pageTitle: "",
      config: {
        //可以在此处定义工具栏的内容
        // toolbars: [
        //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
        //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
        //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
        // ],
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        initialContent: "请输入内容", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: null,
        initialFrameHeight: 450,
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/ueditor/"
      },
      addFormVisible: false
    };
  },
  methods: {
    beforeAvatarUpload(file) {},
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    handSuccess(file) {
      if (
        /(mp4|flv|3gp|rmvb|rm|avi|wmv)$/.test(
          file.paths[0].split("?")[0].split(".")[3]
        )
      ) {
        this.$message.error("只能上传图片");
        setTimeout(() => {
          this.$router.go(0);
        }, 150);
      }

      this.photoPaths = file.paths.toString();
    },
    handleRemove2(file, fileList) {
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    handSuccess2(file) {
      if (
        /(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(
          file.paths[0].split("?")[0].split(".")[3]
        )
      ) {
        this.$message.error("只能上传视频");
        setTimeout(() => {
          this.$router.go(0);
        }, 150);
      }

      this.videoPaths = file.paths.toString();
    },

    //上传
    getContent: function() {
      this.isdisabled = true
      setTimeout(()=>{
        this.isdisabled = false
      })
      let author
      if (this.radio == '1') {
        author = '（文章系畜牧堂原创，如需转载请注明出处！）'
      } else {
        author = '（图文来源于网络，如有侵权请联系我们删除！）'
      }

      if (this.title == "" || this.checkboxGroup1.length == 0)
        return this.$alert("分类和标题不能为空", "错误提示", {
          confirmButtonText: "确定"
        });
      if (this.photoPaths.length == 0)
        return this.$alert("图片不能为空", "错误提示", {
          confirmButtonText: "确定"
        });

      let content = this.$refs.ueditor.getUEContent();
      if (!content)
        return this.$alert("文章内容不能为空", "错误提示", {
          confirmButtonText: "确定"
        });

      this.$http({
        url: this.$http.adornUrl("/ycyl/ycylmarketdynamic/save"),
        method: "post",
        data: {
          content: this.html + '' + content + '<br>'+'<br>'+'<p style="text-align: center;font-size: 14px">'+ '<i>' + author+'<\i>' +'<\p>' + this.htmlBottom,
          articleType: 2,
          poultryType: this.checkboxGroup1.toString(),
          keyword: this.keyword,
          title: this.title,
          pageTitle: this.pageTitle,
          coverImg: this.photoPaths.toString(),
          videoUrl: this.videoPaths.toString()
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$router.push({
            path: "/richText-ycylmarketdynamic"
          });
        }
      });
    },
    //获取动物数据
    variety() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyldictdata/list"),
        method: "post",
        data: {
          dictValue: "animal_type",
          pageSize: "30"
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.animal_type = data.page.list;
        } else {
        }
      });
    }
  },
  beforeMount() {
    this.variety();
  }
};
</script>
<style lang="scss">
.el-message-box {
  position: absolute;
  top: 100px;
  z-index: 999 !important;
}
</style>
<style lang="scss" scoped>
#app {
  .titBig {
    display: flex;
    justify-content: center;
    font-size: 20px;
    margin-top: 10px;
  }
  width: 80%;
  margin: 0 auto;
  border: 1px solid #a6a6a6;
  border-radius: 0.2rem;
  .animal {
    white-space: nowrap;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
  }
  .counter {
    div {
      display: inline-block;
      width: 148px;
      height: 148px;
      overflow: hidden;
    }
    .name {
      margin-left: 30rem;
    }
  }
}
</style>
