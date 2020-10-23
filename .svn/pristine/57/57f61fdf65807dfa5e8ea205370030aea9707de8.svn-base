<!--<template>-->
<!--  <div id="app">-->
<!--    <div>-->
<!--      <div>-->
<!--        <label class="titBig" for="tit">-->
<!--          标题：-->
<!--          <el-input-->
<!--            id="tit"-->
<!--            maxlength="20"-->
<!--            placeholder="请输入内容"-->
<!--            show-word-limit-->
<!--            style="width: 20rem"-->
<!--            type="text"-->
<!--            v-model="title"-->
<!--          >-->
<!--          </el-input>-->
<!--        </label>-->
<!--      </div>-->
<!--      <div>-->
<!--        <div class="animal">-->
<!--          分类：-->
<!--          <el-checkbox-group style="width: 20rem" v-model="checkboxGroup1">-->
<!--            <el-checkbox-button :key="index" :label="item.dictName" v-for="(item,index) in animal_type">-->
<!--              {{item.dictName}}-->
<!--            </el-checkbox-button>-->
<!--          </el-checkbox-group>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="counter">-->
<!--        &lt;!&ndash;       图片上传&ndash;&gt;-->
<!--        <div class="name">-->
<!--          <el-upload-->
<!--            :action="$http.adornUrl('/sys/oss/uploadAll')"-->
<!--            :data="folderName"-->
<!--            :on-preview="handlePictureCardPreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :on-success="handSuccess"-->
<!--            accept="image/jpeg, image/jpg, image/gif, image/png"-->
<!--            list-type="picture-card"-->
<!--            name="fileUpload">-->
<!--            <p style="font-size: 20px; ">封面图片</p>-->

<!--          </el-upload>-->
<!--          <el-dialog :visible.sync="dialogVisible1">-->
<!--            <img :src="dialogImageUrl1" alt="" width="100%">-->
<!--          </el-dialog>-->
<!--        </div>-->
<!--        &lt;!&ndash;        视频上传&ndash;&gt;-->
<!--        <div>-->
<!--          <el-upload-->
<!--            :action="$http.adornUrl('/sys/oss/uploadAll')"-->
<!--            :data="video"-->
<!--            :on-preview="handlePictureCardPreview2"-->
<!--            :on-remove="handleRemove2"-->
<!--            :on-success="handSuccess2"-->
<!--            accept="image/jpeg, image/jpg, image/gif, image/png"-->
<!--            list-type="picture-card"-->
<!--            name="fileUpload">-->
<!--            <p style="font-size: 20px">上传视频</p>-->
<!--          </el-upload>-->
<!--          <el-dialog :visible.sync="dialogVisible2">-->
<!--            <img :src="dialogImageUrl2" alt="" width="100%">-->
<!--          </el-dialog>-->
<!--        </div>-->
<!--      </div>-->
<!--      <button @click="getContent" icon="plus" size="primary" type="info">获取内容</button>-->
<!--      <UEditor :config=config ref="ueditor"></UEditor>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import UEditor from '@/components/ueditor/ueditor.vue'-->

<!--  export default {-->
<!--    name: 'hello',-->
<!--    components: {UEditor},-->
<!--    computed: {},-->
<!--    data() {-->
<!--      return {-->
<!--        videoPaths: [],-->
<!--        video: {folderName: 'viedo'},-->
<!--        photoPaths: [],-->
<!--        folderName: {folderName: 'ycylManage'},-->
<!--        dialogImageUrl1: '',-->
<!--        dialogVisible1: false,-->
<!--        checkboxGroup1: [],-->
<!--        dialogImageUrl2: '',-->
<!--        dialogVisible2: false,-->
<!--        checkboxGroup2: [],-->
<!--        animal_type: [],-->
<!--        title: '',-->
<!--        config: {-->
<!--          //可以在此处定义工具栏的内容-->
<!--          // toolbars: [-->
<!--          //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',-->
<!--          //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',-->
<!--          //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']-->
<!--          // ],-->
<!--          autoHeightEnabled: false,-->
<!--          autoFloatEnabled: true,-->
<!--          initialContent: '请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子-->
<!--          autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了-->
<!--          initialFrameWidth: null,-->
<!--          initialFrameHeight: 450,-->
<!--          BaseUrl: '',-->
<!--          UEDITOR_HOME_URL: 'static/ueditor/'-->
<!--        },-->
<!--        addFormVisible: false-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      handleRemove(file, fileList) {-->
<!--        console.log(file, fileList);-->
<!--      },-->
<!--      handlePictureCardPreview(file) {-->
<!--        this.dialogImageUrl1 = file.url;-->
<!--        this.dialogVisible1 = true;-->
<!--      },-->
<!--      handSuccess(file) {-->
<!--        console.log(file.paths);-->
<!--        this.photoPaths = file.paths.toString()-->

<!--      },-->
<!--      handleRemove2(file, fileList) {-->
<!--        console.log(file, fileList);-->
<!--      },-->
<!--      handlePictureCardPreview2(file) {-->
<!--        this.dialogImageUrl1 = file.url;-->
<!--        this.dialogVisible1 = true;-->
<!--      },-->
<!--      handSuccess2(file) {-->
<!--        console.log(file.paths);-->
<!--        this.videoPaths = file.paths.toString()-->
<!--      },-->

<!--      //上传-->
<!--      getContent: function () {-->
<!--        let content = this.$refs.ueditor.getUEContent();-->
<!--        console.log(this.photoPaths);-->
<!--        this.$http({-->
<!--          url: this.$http.adornUrl('/ycyl/ycylmarketdynamic/save'),-->
<!--          method: 'post',-->
<!--          params: this.$http.adornParams({-->
<!--            "content": content,-->
<!--            'articleType': 1,-->
<!--            'title': this.title,-->
<!--            'coverImg': this.photoPaths,-->
<!--            'poultryType': this.checkboxGroup1.toString(),-->
<!--            'videoUrl': this.videoPaths,-->
<!--          })-->
<!--        }).then(({data}) => {-->
<!--          if (data && data.code === 0) {-->
<!--            alert('上传成功');-->
<!--          }-->
<!--        })-->
<!--      },-->
<!--      //获取动物数据-->
<!--      variety() {-->
<!--        this.dataListLoading = true;-->
<!--        this.$http({-->
<!--          url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),-->
<!--          method: 'post',-->
<!--          data: ({-->
<!--            'dictValue': 'animal_type'-->
<!--          })-->
<!--        }).then(({data}) => {-->
<!--          if (data && data.code === 0) {-->
<!--            console.log(data.page.list);-->
<!--            this.animal_type = data.page.list-->
<!--          } else {-->
<!--          }-->
<!--        })-->
<!--      },-->

<!--    },-->

<!--    beforeMount() {-->
<!--      this.variety()-->

<!--    }-->
<!--  }-->

<!--</script>-->
<!--<style lang="scss" scoped>-->
<!--  #app {-->
<!--    .titBig {-->
<!--      display: flex;-->
<!--      justify-content: center;-->
<!--      font-size: 20px;-->
<!--      margin-top: 3rem;-->
<!--    }-->

<!--    width: 80%;-->
<!--    margin: 0 auto;-->
<!--    border: 1px solid #a6a6a6;-->
<!--    border-radius: 0.2rem;-->

<!--    .animal {-->
<!--      font-size: 18px;-->
<!--      display: flex;-->
<!--      align-items: center;-->
<!--      justify-content: center;-->
<!--      margin: 1rem 0;-->
<!--    }-->

<!--    .counter {-->
<!--      div {-->
<!--        display: inline-block;-->
<!--        width: 148px;-->
<!--        height: 148px;-->
<!--        overflow: hidden;-->
<!--      }-->

<!--      .name {-->
<!--        margin-left: 30rem;-->
<!--      }-->


<!--    }-->
<!--  }-->
<!--</style>-->