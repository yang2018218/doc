<template>
  <div id="agencypages">
    <div>
      <div class="animal"  style="z-index:9999">
        分类：
<!--        {{animal_type}}-->
        <el-select v-model="dictId" placeholder="请选择"  @change="dainji" style="z-index:9999">
          <el-option
            v-for="item in animal_type"
            :key="item.dictName"
            :label="item.dictName"
            :value="item.dictName" style="z-index:9999">
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <div>
        <label class="titBig" for="tit">
          标题：
          <el-input
            id="tit"
            maxlength="20"
            placeholder="请输入内容"
            show-word-limit
            style="width: 20rem"
            type="text"
            v-model="title"
          >
          </el-input>
        </label>
      </div>
      <div class="counter">
        <div class="name">
        </div>
        <div>
        </div>
      </div>
      <UEditor :config=config ref="ueditor"></UEditor>
      <div style="display: flex;justify-content: center">
        <el-button type="primary" plain @click="getPublish" style="width: 5rem; margin: 1rem auto;">发布</el-button>
      </div>
    </div>
  </div>
</template>
<script>
    import UEditor from '@/components/ueditor/ueditor.vue'

    export default {
        name: 'hello',
        components: {
            UEditor
        },
        computed: {},
        data() {
            return {
                dictId: '',
                html: '<html lang="en">\n' +
                    '<head>\n' +
                    '    <meta charset="UTF-8">\n' +
                    '    <meta name="viewport"\n' +
                    '          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n' +
                    '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
                    '    <title>Document</title>\n' +
                    '</head>\n' +
                    '<body>',
                htmlBottom: '</body>\n' +
                    '</html>',
                value: '',
                animal_type: '',
                title: '',
                config: {
                    //可以在此处定义工具栏的内容
                    // toolbars: [
                    //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
                    //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
                    //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
                    // ],
                    autoHeightEnabled: false,
                    autoFloatEnabled: true,
                    initialContent: '请输入内容', //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: null,
                    initialFrameHeight: 450,
                    BaseUrl: '',
                    UEDITOR_HOME_URL: 'static/ueditor/'
                },
                addFormVisible: false
            }
        },
        methods: {
            dainji() {
            },
            //获取类目数据
            variety() {
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyldictdata/list'),
                    method: 'post',
                    data: ({
                        'dictValue': 'agencyHelp',
                        "pageSize": '30',
                    })
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.animal_type = data.page.list
                    } else {}
                })
            },
            // 发布信息
            getPublish() {
                let content = this.$refs.ueditor.getUEContent();
                let userID = sessionStorage.getItem('userId');
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycylhelp/save'),
                    method: 'post',
                    data: {
                        'helpType': 2,
                        'helpTitle': this.title,
                        'helpContent': content,
                        'userId': userID,
                        'type': this.dictId
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.$router.push({
                            path: '/agency-agencypages'
                        })

                    } else {}
                })
            },
            logonUserId() {
                this.$http({
                    url: this.$http.adornUrl("/sys/user/info"),
                    method: "get",
                    async: true,
                    params: this.$http.adornParams()
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.userId = data.user.userId;
                        sessionStorage.setItem('infoUserId', data.user.userId)

                    }
                });
            }
        },
        activated() {
            this.logonUserId()
        },
        beforeMount() {
            this.variety()
        },

    }
</script>
<style lang="scss" scoped>
    #agencypages {
        width: 80%;
        margin: 0 auto;
        border: 1px solid #a6a6a6;
        border-radius: 0.2rem;
        font-size: 16px;
        div {
            margin-top: 1rem;
        }
        .titBig {}
        .animal {
            z-index: 9999;
        }
    }
</style>
