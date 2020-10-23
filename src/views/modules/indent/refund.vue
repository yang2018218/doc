<template>
  <div class="refund">
    <div class="refund_btn">
      <el-row>

        <el-button @click="dialogVisibleb = true" type="primary" style="padding: 7px 20px">提现密码管理</el-button>
      </el-row>
    </div>
    <el-table :data="tableData" style="width: 100%" border stripe>

      <el-table-column align="center" label="提现角色">
        <template slot-scope="scope">
          <span>{{fn(scope.row.userType)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="withdrawUserName" label="提现人昵称"></el-table-column>
      <el-table-column align="center" prop="mobile" label="提现人手机号"></el-table-column>
      <el-table-column align="center" prop="withdrawTime" label="提现时间"></el-table-column>
      <el-table-column align="center" prop="withdrawMoney" label="提现金额(元)"></el-table-column>
      <el-table-column align="center" prop="alipayAccount" label="提现支付宝"></el-table-column>
      <el-table-column align="center" prop="truename" label="提现人真实姓名"></el-table-column>
      <el-table-column align="center" prop="disposeName" label="处理人"></el-table-column>
      <el-table-column align="center" prop="disposeTime" label="处理时间"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClickc(scope.row)" type="text" size="small">{{scope.row.status==0?'未处理':'已处理'}}
          </el-button>
          <el-button @click="handleClickd(scope.row)" type="text" size="small">备注</el-button>
          <el-button @click="imgsPopup(scope.row)" type="text" size="small" v-if="scope.row.status==1">查看截图</el-button>
        </template>
      </el-table-column>
    </el-table>
    <paganation :pages="pages" @pagechange="sureb"></paganation>


    <el-dialog
      title="提现密码管理"
      :visible.sync="dialogVisibleb"
      custom-class="dislog_b"
      :center="true"
      width="40%"
    >
      <div class="container_b">
        <span>请输入手机号</span>
        <input type="text" placeholder="请输入手机号" v-model="phone"/>
        <el-button @click="searchd" size="mini " type="primary">搜索</el-button>
      </div>
      <div class="refund_table" v-show="passData.truename">
        <table width="492">
          <tr>
            <td>
              <span>医生ID： {{passData.userId}}</span>
            </td>
            <td>
              <span>姓名：{{passData.truename}}</span>
            </td>
            <td>
              <span>身份证号码：{{passData.idcard}}</span>
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resetPassword">重置提现密码</el-button>
        <el-button @click="dialogVisibleb = false">返回</el-button>
      </span>
    </el-dialog>
    <!-- 操作处理 -->
    <el-dialog
      title="提现处理"
      :visible.sync="dialogVisiblec"
      custom-class="dislog_c"
      :center="true"
      width="38%"
      :before-close="handleClosec"
    >
      <ul class="container_c">
        <li>
          <span>提现ID：</span>
          <span>{{dealwith.withdrawUserId}}</span>
        </li>
        <li>
          <span>提现支付宝：</span>
          <span>{{dealwith.alipayAccount}}</span>
        </li>
        <li>
          <span>提现角色：</span>
          <span>{{ fn(dealwith.userType) }}</span>
        </li>
        <li>
          <span>提现金额：</span>
          <span>{{dealwith.withdrawMoney}}元</span>
        </li>
        <li>
          <span>提现人昵称：</span>
          <span>{{dealwith.nickname}}</span>
        </li>
        <li>
          <span>提现时间：</span>
          <span>{{dealwith.withdrawTime}}</span>
        </li>
        <li>
          <span>提现人手机号：</span>
          <span>{{dealwith.mobile}}</span>
        </li>
      </ul>
      <div class="pig_upload">
        <p>上传处理截图</p>
        <el-upload
          :action="dialogImageUrl"
          list-type="picture-card"
          :file-list="imgs"
          :name="name"
          :data="uploadData"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisiblel">
          <img width="100%" :src="imgs" alt/>
        </el-dialog>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dealwithMoney">确定</el-button>
        <el-button @click="dialogVisiblec = false ">返回</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
   <div style="width: 100%"><img :src="imgPopup" alt="" style="width: 100%"></div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
  </span>
    </el-dialog>
    <!-- 提现手续费设置 -->
    <el-dialog
      title="备注"
      :visible.sync="dialogVisibled"
      custom-class="dislog_d"
      :center="true"
      width="25%"
    >
      <div class="container_d">
        <textarea v-model="remarks" placeholder="请输入备注内容..." id="" cols="30" rows="10"></textarea>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dealwithremark">确 定</el-button>
        <el-button @click="dialogVisibled = false">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import paganation from '@/components/paganation'
  export default {
    data() {
      return {
        imgPopup:'',
        centerDialogVisible:false,//图片弹出框
        money:2,
        dialogImageUrl: '',
        tableData: [],
        page: 1,
        pageSize: 10,
        pages: {},
        toPage: 1,//去第几页
        dialogVisiblea: false, //提现手续费设置
        dialogVisibleb: false, //体现密码管理
        dialogVisiblec: false, //操作处理
        dialogVisibled: false,//备注
        imgs: [], //上传成功的图片
        name: "fileUpload",
        uploadData: {
          folderName: "ycylManage"
        },
        dialogVisiblel: false,
        dealwith: {},//操作处理的某一条数据
        remarkedata: {},//备注某一条数据
        remarks: '',
        phone: '',
        passData: {}

      };
    },
    components: {
      paganation
    },
    methods: {
      imgsPopup(data){
        this.imgPopup = data.url
        this.centerDialogVisible = true
      },
      handleClosec(){
        this.dialogVisiblec=false
        this.imgs=[]
      },
      resetPassword() {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserwallet/update'),
          method: 'post',
          data: {
            userId: this.passData.userId,

          }

        }).then(({data}) => {
          if (data && data.code == 0) {
            this.dialogVisibleb = false
            this.mobile = ''
            this.$message.success('密码重置成功')

          } else {
            this.$message.error(data.msg)
          }
        })
      },
      searchd() {
        if (!/^1\d{10}/.test(this.phone)) {
          return this.$message.error('手机号格式不正确')
        }
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycyluserdoctor/getByphone'),
          method: 'post',
          data: {
            mobile: this.phone
          }
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.passData = data.ycyluserdoctor;
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      sureb(data) {
        this.$http({
          url: this.$http.adornUrl('/ycyl/ycylwithdrawapply/list'),
          method: 'post',
          data
        }).then(({data}) => {
          if (data && data.code == 0) {
            this.tableData = data.page.list
            this.pages = data.page;

          } else {
            this.$message.error(data.msg)
          }
        })
      },
      dealwithremark() {
        this.$http({
          url: this.$http.adornUrl("/ycyl/ycylwithdrawapply/remark"),
          method: "post",
          data: {
            remark: this.remarks,
            applyId: this.remarkedata.applyId,
            // ''：this.img
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('备注成功')
            this. remarks=''
            this.dialogVisibled = false
            this.getList()

          } else {
            this.$message.error(data.msg)
          }
        });

      },

      dealwithMoney() {//提现确定
        let str='';
        this.imgs.forEach(item=> str+=item.url+',' )
         let url=  str.substr(0,str.length-1)
        if (url){
          this.$http({
            url: this.$http.adornUrl("/ycyl/ycylwithdrawapply/update"),
            method: "post",
            data: {
              disposeUserId: sessionStorage.getItem('id'),
              status: 1,
              applyId: this.dealwith.applyId,
              withdrawUserId:this.dealwith.withdrawUserId,
              url: url,
              withdrawMoney:this.dealwith.withdrawMoney
            }
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message.success('修改成功')
              this.handleClosec()
              this.getList()
            } else {
              this.$message.error(data.msg)
            }
          });
        }else {
          this.$message.error('错误提示：请上传图片作为凭证')
        }


      },
      fn(w) {
        switch (w) {
          case '0':
            return "管理员"
            break;
          case '1':
            return "普通用户"
            break;
          case '2':
            return "代理商"
            break;
          case '3':
            return "医助"
            break;
          case '4':
            return "客服"
            break;
          case '5':
            return "医生"
            break;
          case'6':
            return "专家"
            break;
          case '7':
            return "财务"
            break;


        }
      },
      handleAvatarSuccess(res) {
        if (res.code == 0) {
          this.imgs.push({
            url: res.paths[0]
          });
        }

      },
      handleRemove(file) {
        this.imgs.forEach((item, index) => {
          if (item.url == file.url) {
            this.imgs.splice(index, 1);
          }
        });
      },
      getList() {
        this.$http({
          url: this.$http.adornUrl("/ycyl/ycylwithdrawapply/list"),
          method: "post",
          data: {
            page: this.page,
            pageSize: this.pageSize
          }
        }).then(({data}) => {
          if (data && data.code === 0) {

            this.tableData = data.page.list
            this.pages = data.page
          } else {
            this.$message.error(data.msg)
          }
        });
      },
      handleClickc(row) {


        if (row.status == 1) {
          this.$message('该数据已被' + row.disposeName + '处理过')
          return
        }
        this.dialogVisiblec = true;
        this.dealwith = row;
      },
      handleClickd(row) {
        this.dialogVisibled = true;
        this.remarkedata = row;
      }
    },
    created() {
      this.getList();
      this.dialogImageUrl = this.uploadurl
    }
  };
</script>
<style lang="scss" scoped>
  .refund {
    .refund_btn {
      padding-bottom: 15px;

      /*.el-button--primary {*/
      /*  background: #2da5fe;*/
      /*}*/
    }

    .refund_table {
      //   width:567px;
      margin-top: 20px;
      height: 99px;
      background: rgba(241, 241, 241, 1);
      padding: 15px 20px;
    }

    .dislog_a {
      .el-dialog--center .el-dialog__body {
        padding: 25px 143px 30px;
      }
    }

  }
</style>
<style lang="scss">
  .refund {
    .el-dialog__header {
      text-align: center;
    }

    .el-dialog__body {
      border-top: 0;
    }

    .dislog_a {
      border-radius: 10px;

      .el-dialog__body {
        padding-left: 70px;
      }

      .el-button--primary {
        /*background: #45c8dc;*/
      }

      .el-button--medium {
        padding: 8px 30px;
      }

    }

    .dislog_b {
      border-radius: 10px;

      .container_b {
        > input {
          width: 566px;
          height: 30px;
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 6px;
          padding-left: 10px;
        }
      }

      .el-button--primary {
        /*background: #45c8dc;*/
      }

      .el-button--medium {
        padding: 8px 30px;
      }
    }

    .dislog_c {
      border-radius: 10px;

      .el-button--primary {
        /*background: #45c8dc;*/
      }

      .el-button--medium {
        padding: 8px 30px;
      }

      .container_c {
        overflow: hidden;

        li {
          float: left;
          width: 50%;
        }
      }

      .pig_upload {
        margin-top: 30px;
        padding-bottom: 15px;
        border: 1px solid rgba(221, 221, 221, 1);

        > div {
          width: 148px;
          margin: 0 auto;
        }

        > p {
          text-align: center;
          height: 40px;
          line-height: 40px;
        }
      }

    }

    .dislog_d {
      border-radius: 10px;

      textarea {
        padding: 10px;
        width: 100%;
        border: 1px solid rgba(238, 238, 238, 1);
        resize: none;
        color: #555;
        line-height: 24px;
      }
    }
  }
</style>
