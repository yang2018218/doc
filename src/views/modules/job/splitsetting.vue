<template>
   <div class="splitSetting">
        <el-table :data="tableData" style="width: 100%" border stripe class="split_table" v-loading="load_boolean" >
         <el-table-column align="center" prop="productId"  label="商品ID"> </el-table-column>
        <!-- <el-table-column align="center" prop="productType" label="适用种类"></el-table-column>
      <el-table-column align="center" prop="nickname" label="功能类目"></el-table-column> -->
      <el-table-column align="center" prop="productName" label="产品名称"></el-table-column>
      <el-table-column width="135" align="center" prop="firstLevelAgent" label="一级代理商正常分成">
         <template slot-scope="q" v-if="q.row.firstLevelAgent">
          <div>
            {{q.row.firstLevelAgent+'‰'}}
          </div>
        </template>
      </el-table-column>

      <el-table-column width="135" align="center" prop="firstLevelAgentStockout" label="一级代理商缺货分成">
          <template slot-scope="q" v-if="q.row.firstLevelAgentStockout">
          <div>
            {{q.row.firstLevelAgentStockout+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="135" align="center" prop="secondLevelAgent" label="二级代理商正常分成">
          <template slot-scope="q" v-if="q.row.secondLevelAgent">
          <div>
            {{q.row.secondLevelAgent+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="135" align="center" prop="secondLevelAgentStockout" label="二级代理商缺货分成">
          <template slot-scope="q" v-if="q.row.secondLevelAgentStockout">
          <div>
            {{q.row.secondLevelAgentStockout+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="firstLevel"  label="一级医生 分成">
           <template slot-scope="q" v-if="q.row.firstLevel">
          <div>
            {{q.row.firstLevel+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="secondLevel" label="二级医生分成">
           <template slot-scope="q" v-if="q.row.secondLevel">
          <div>
            {{q.row.secondLevel+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="firstAudit" label="医生审核费">
         <template slot-scope="q" v-if="q.row.firstAudit">
          <div>
            {{q.row.firstAudit+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="expert" label="专家分成">
          <template slot-scope="q" v-if="q.row.expert">
          <div>
            {{q.row.expert+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="客服分成">
          <template slot-scope="q" v-if="q.row.service">
          <div>
            {{q.row.service+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="医助分成">
        <template slot-scope="q" v-if="q.row.assistant">
          <div>
            {{q.row.assistant+'‰'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="操作">
        <template slot-scope="q">
          <el-button class="split_te" @click="edit(q.row)" type="text" size="small" >编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
     <!-- 分成设置编辑 -->
    <el-dialog title="分成设置编辑" :visible.sync="dialogVisiblec" width="729px" :center="true"  custom-class="dislogmian_cc ">
    <div class="container_split">

      <el-row :gutter="20">
        <el-col :span="5"><div class=""><p> 商品信息：</p><span></span></div></el-col>
        <el-col :span="9"><div class=""><span>商品ID：{{editData.productNo}}</span><span></span> </div></el-col>
        <el-col :span="10"><div  style="overflow: hidden;text-overflow:ellipsis;white-space:nowrap;"><span>商品名称：{{editData.productName}}</span><span></span></div></el-col>
        <!-- <el-col :span="6"><div class=""><span>功能类目：{{editData.productId}}</span><span></span> </div></el-col>
        <el-col :span="6"><div class=""><span>适用种类：{{editData.productId}}</span><span></span></div></el-col> -->
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5"><div class=""><span>一级代理分成</span> </div></el-col>
        <el-col :span="9"><div class="row"><span>正常分成设置：</span> <input v-model="editData.firstLevelAgent" type="text"> ‰ </div></el-col>
        <el-col :span="10"><div class="row"><span>缺货分成设置：</span> <input v-model="editData.firstLevelAgentStockout" type="text"> ‰ </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5"><div class=""><span>二级代理分成</span> </div></el-col>
        <el-col :span="9"><div class="row"><span>正常分成设置：</span> <input v-model="editData.secondLevelAgent"  type="text"> ‰ </div></el-col>
        <el-col :span="10"><div class="row"><span>缺货分成设置：</span> <input v-model="editData.secondLevelAgentStockout"  type="text"> ‰ </div></el-col>
      </el-row>
        <el-row :gutter="20">
        <el-col :span="5"><div class=""><span>一级医生分成</span> </div></el-col>
        <el-col :span="10"><div class="row"><span>正常分成设置：</span> <input v-model="editData.firstLevel" type="text"> ‰ </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5"><div class=""><span>二级医生分成</span> </div></el-col>
        <el-col :span="10"><div class="row"><span>正常分成设置：</span> <input v-model="editData.secondLevel" type="text"> ‰ </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5"><div class=""><span>医生审核费</span> </div></el-col>
        <el-col :span="10"><div class="row"><span>正常分成设置：</span> <input v-model="editData.firstAudit" type="text"> ‰ </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5"><div class=""><span>专家分成</span> </div></el-col>
        <el-col :span="10"><div class="row"><span>正常分成设置：</span> <input v-model="editData.expert" type="text"> ‰ </div></el-col>
      </el-row>
       <el-row :gutter="20">
        <el-col :span="5"><div class=""><span>客服分成</span> </div></el-col>
        <el-col :span="10"><div class="row"><span>正常分成设置：</span> <input v-model="editData.service" type="text"> ‰ </div></el-col>
      </el-row>
        <el-row :gutter="20">
        <el-col :span="5"><div class=""><span>医助分成</span> </div></el-col>
        <el-col :span="10"><div class="row"><span>正常分成设置：</span> <input v-model="editData.assistant" type="text"> ‰ </div></el-col>
      </el-row>

    </div>


      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sucessd">确定</el-button>
        <el-button @click="dialogVisiblec = false">返回</el-button>
      </span>
    </el-dialog>
        <paganation :pages="pages" @pagechange="sureb"/>

   </div>
</template>

<script>

import paganation from "@/components/paganation";
  export default {
    data () {
      return {
        page:1,
        pageSize:10,
        tableData:[],
         pages: {},
         editData:{},//正在编辑的这条数据

         sendData:{},//发送给后台的数据
         dialogVisiblec:false,
         firstLevelAgent:'',
          firstLevelAgentStockout:'',
         secondLevelAgent:'',
          secondLevelAgentStockout:'',
          load_boolean:true,
          firstLevel:'',
          secondLevel:'',
          firstAudit:'',
          expert:'',
          service:'',
          assistant:'',


      }
    },
     components: {paganation

    },

    methods: {

      sucessd(){
             this.$http({
        url: this.$http.adornUrl('/ycyl/ycyldeductrate/save'),
        method: 'post',
        data: this.editData
    }).then(({ data }) => {
        if (data && data.code === 0) {
            this.$message.success('编辑成功')
           this.dialogVisiblec=false;
           this.getList();
        }
    })
      },
      edit(q){
        this.editData= JSON.parse(JSON.stringify(q));
        this.dialogVisiblec=true;
      },
      getList(){
               this.$http({
        url: this.$http.adornUrl('/ycyl/ycyldeductrate/getPageList'),
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
       sureb(data) {
       this.load_boolean=true
        this.$http({
        url: this.$http.adornUrl("/ycyl/ycyldeductrate/getPageList"),
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

    },
    created() {
      this.getList()
    },
  }
</script>
<style lang="scss" scoped>
  .splitSetting{
    .dislogmian_cc{
      .container_split{
        .el-row{
            height: 34px;
        }
        .row{
          input{
            width:100px;
           height: 26px;
            border:1px solid rgba(221,221,221,1);
            padding-left: 10px;
          }
        }

     }
    }

  }
</style>
<style lang="scss">
  .splitSetting{
    .split_te{
      span{
        border-bottom: 1px solid #26A3F3;
        color:rgba(38,163,243,1);
      }
    }

  }
</style>
<style lang="scss" >
.splitSetting{
    .dislogmian_cc{
      border-radius: 10px;
       .el-button--primary {
      /*background: #45c8dc;*/
    }
    .el-button--medium {
      padding: 8px 30px;
    }
    .el-dialog__body {
      border-top: 2px solid rgba(221,221,221,1);

    margin: 0 48px;

    padding:10px 0;
  }
  }


  .dialog-footer{
    display: flex;
     justify-content: space-around;
  }
}

</style>
