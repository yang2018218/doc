<template>
  <div style="z-index: 1">
    <script :id="ueditorId" type="text/plain"></script>
  </div>

</template>

<script>
  import '../../../static/ueditor/ueditor.config.js'
  import '../../../static/ueditor/ueditor.all.js'
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js'
  import '../../../static/ueditor/jquery-2.2.3.min.js'
  import eventBus from "@/utils/eventBus.js"
  export default {
    name: "UEditor",
    props: {
      id: {
        type: String
      },
      ueditorId:{
        type:String,
        default:"editor"
      },
      config: {
        type: Object
      }
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
      const _this = this;
      this.editor = UE.delEditor(this.ueditorId);
      this.editor = UE.getEditor(this.ueditorId,_this.config);
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      getUEContent: function(){
        return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      }
    }
  }
</script>
