<template>
  <div class="console">
    <!--操作日志页面 -->
     <div class="box">
       <div class="first">
      <span>手机号：</span>
      <input  v-model="searchData.mobile" class="search" type="text" placeholder="手机号" />
    </div>
    <div class="first">
      <span>姓名：</span>
      <input  v-model="searchData.truename" class="search" type="text" placeholder="姓名" />
    </div>
     <div class="first">
            <span>操作时间：</span>
             <el-date-picker
                v-model="searchData.startCreateTime"
                value-format='yyyy-MM-dd HH:mm:ss'
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
            <span class="line">
                <i></i>
            </span>
             <el-date-picker
                v-model="searchData.endCreateTime"
                value-format='yyyy-MM-dd HH:mm:ss'
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>

     </div>
     <el-button style="margin-left:20px;padding: 8px 20px;" @click="searchGoods" type="primary" class="mian_out">搜 索</el-button>
     </div>


      <el-table :data="tableData" style="width: 100%" border  v-loading="load_boolean" >
        <el-table-column align="center" prop="mobile" label="手机号"></el-table-column>
        <el-table-column align="center" prop="module" label="系统模块"></el-table-column>

      <el-table-column align="center" prop="nickname" label="操作类型">
        <template slot-scope="scope">
          <span>{{fn(scope.row.optType)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="truename" label="操作人员"></el-table-column>

      <el-table-column align="center" prop="ip" label="操作地址"> </el-table-column>

      <el-table-column align="center" prop="content" label="操作内容"></el-table-column>
      <el-table-column align="center" prop="createTime" label="操作时间"></el-table-column>
    </el-table>
     <paganation :pages="pages" @pagechange="sureb"/>
  </div>
</template>

<script>
 import paganation from "@/components/paganation";
  export default {
    data () {
      return {
        searchData:{},
        value:'',
        options:[],
        page:1,
       pageSize:10,
       pages: {},
       tableData:[],
        load_boolean:true,

      }
    },
    components: {paganation

    },
    methods: {
      getList(){
             this.$http({
        url: this.$http.adornUrl('/ycyl/ycyloperationlog/getPageList'),
        method: 'post',
        data: {
          page:this.page,
          pageSize:this.pageSize

        }
    }).then(({ data }) => {
        if (data && data.code === 0) {
         this.load_boolean=false
            this.pages = data.page;
           this.tableData=data.page.list
        }
    })

       },
       searchGoods(){
          this.load_boolean=true
          this.searchData.page=this.page
      this.searchData.pageSize=this.pageSize
           this.$http({
       url:this.$http.adornUrl('/ycyl/ycyloperationlog/getPageList'),
       method: 'post',
      data:this.searchData
    }).then(({data})=>{
      if(data && data.code==0){
        this.load_boolean=false
           for(let k in this.searchData){
              this.searchData[k]=''
            }
         this.tableData=data.page.list
         this.pages=data.page;

      }else{
        this.$message.error(data.msg)
      }
    })

       },
        sureb(data) {
          this.load_boolean=true
        this.$http({
        url: this.$http.adornUrl("/ycyl/ycyloperationlog/getPageList"),
        method: "post",
        data
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.load_boolean=false
          this.tableData = data.page.list;
          this.pages = data.page;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
       fn(a){
         switch(a){
           case 1:
             return '添加'
             break;
           case 2:
             return '修改'
             break;
            case 3:
              return '删除'
              break;
            case 4:
              return '查询'
              break;
            case 5:
              return '登录'
              break;


         }
       }

    },
    created() {
      this.getList()
    },
  }
</script>

<style lang="scss" >
  .console{
     .el-input--medium .el-input__icon {
    line-height: 32px;
}
  }
</style>
<style lang="scss" scoped >
// 头部样式
.console{
  .box{
    margin-bottom: 20px;
  }

     select,
  input,
  button {
    outline: none;
  }
   i {
    font-style: normal;
    width: 30px;
    height: 2px;
    background: rgba(153, 153, 153, 1);
  }
  .line {
    position: relative;
    display: inline-block;
    width: 30px;
    i {
      position: absolute;
      top: -7px;
      left: 0;
    }
  }
  select {
    border: 1px solid rgba(221, 221, 221, 1);
    border-radius: 6px;
    color: #666;
  }
       .first {
    display: inline-block;
    span {
      color: #333;
    }
    .search {
      width: 206px;
      height: 30px;
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 6px;
      padding-left: 10px;
      margin-right: 18px;
    }
    .first_select {
      width: 108px;
      height: 30px;
      margin-right: 18px;
    }
    .second_select {
      width: 65px;
      height: 30px;
      margin-right: 18px;
    }
    .three_select {
      width: 94px;
      height: 30px;
    }
    input {
      width: 66px;
      height: 30px;
      border: 2px solid rgba(221, 221, 221, 1);
      border-radius: 6px;
      padding-left: 5px;
    }
  }
}

</style>
