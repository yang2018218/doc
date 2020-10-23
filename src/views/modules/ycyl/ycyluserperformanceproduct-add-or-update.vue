<template>
  <!--  专家信息审核-->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    title=" 审核页面 "
    width="700px"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
      ref="dataForm"
    >
      <div class="dorcount">
        <div :key="index" class="templone" v-for="(item,index) in dataList">
          <div class="templone1">姓 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名 ： {{item.truename}}</div>
          <div class="templone1">手&nbsp;&nbsp;机&nbsp;&nbsp;号 ：{{item.mobile}}</div>

          <div class="templone1">从业年限 ：{{item.yearsNum}}</div>
          <div class="templone1">就职单位 ：{{item.company}}</div>
          <div class="templone1">身份证号 ：{{item.idcard}}</div>
          <div class="templone1">个人住址 ：{{item.address}}</div>
          <div class="templone1">擅长种类 ：{{item.adeptKind}}</div>

          <div class="territory templone1 domain" style="overflow:hidden">
            <p style="float:left;line-height: 40px;">擅长领域:</p>
            <ul style="float:left;width:400px" id="oeskfddslsl">
              <li
                style="float:left;width:47%;"
                v-for="(ited ,ind ) in item.adeptTerritory.split(',')"
                :key="ind"
              >{{ited}}</li>
            </ul>

            <div class="rightImg">
              <img :src="item.headImgUrl" alt=''  />
            </div>
          </div>
          <div class="territory templone1" style="overflow:hidden;">
            <p style>执业经历：&nbsp;</p>
            <section
              :key="ind"
              v-for="(practice,ind) in item.list"
              style="margin-left: 5rem;width: 78%;
    border: 1px solid #ddd;padding:10px 20px;border-radius:5px;margin-bottom: 1rem;font-size: 14px;color: #666; "
            >
              <p style="font-size: 16px;">开始时间：{{practice.startDate}}</p>
              <p style="font-size: 16px;">就职单位：{{practice.company}}</p>
              <p style="font-size: 16px;">经历描述：{{practice.intor}}</p>
            </section>
          </div>
          <div class="doctorIDNumber">
            <p class="templone1">身份证件：</p>
            <ul>
              <Li>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.idcardFrontImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p>身份证正面照</p>
              </Li>
              <Li>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.idcardReverseImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p>身份证反面照</p>
              </Li>
            </ul>
          </div>
          <div class="doctorImg" style="margin-bottom: 2rem;">
            <p class="templone1">专家证件</p>
            <ul>
              <Li v-if="item.certificateImgUrl">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.certificateImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p style="line-height: 22px">职称证</p>
              </Li>

              <Li v-if="item.empCardImgUrl">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.empCardImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p style="line-height: 22px">工作证</p>
              </Li>
              <Li v-if="item.takeFficeImgUrl">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.takeFficeImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p style="line-height: 22px">任职书</p>
              </Li>
            </ul>
          </div>

          <div class="templone1">
            驳回理由
            <section>
              <el-input
                autosize
                placeholder="请输入内容"
                type="textarea"
                v-model="item.rejecteason"
                style="width: 25rem;margin-left: 7rem;"
              ></el-input>
            </section>
          </div>
        </div>
      </div>
    </el-form>
    <span class="dialog-footer" slot="footer">
      <el-button @click=" dataForcount()" type="primary">通过</el-button>
      <el-button @click=" dataFor()" type="primary">驳回</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      srcList: [],
      dataList: [],
      dataForm: {
        exaId: 0,
        userId: "",
        exaDate: "",
        videoUrl: "",
        orderBy: "",
        createTime: "",
        pageSize: 10,
        pageIndex: 1
      },
      dataRule: {}
    };
  },
  methods: {
    getEveryDoctor(id) {
      this.dataList = [];
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyluserexpert/infoById"),
        method: "post",
        data: this.$http.adornData({
          page: this.pageIndex,

          pageSize: this.pageSize,
          key: this.dataForm.key,
          userId: id
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList.push(data.ycyluserdoctor);
          for (let k in data.ycyluserdoctor) {
            if (
              k == "idcardFrontImgUrl" ||
              k == "idcardReverseImgUrl" ||
              k == "empCardImgUrl" ||
              k == "takeFficeImgUrl"
            ) {
              this.srcList.push(data.ycyluserdoctor[k]);
            }
          }
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    init(id) {
      this.visible = true;
    },
    //提交数据
    dataForcount() {
      var x = "";
      var y = "";
      var z = "";
      for (var i = 0; i < this.dataList.length; i++) {
        x = this.dataList[i].userId;
        y = this.dataList[i].rejecteason;
        z = this.dataList[i].expId;
      }
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyluserexpert/audit/"),
        method: "post",
        data: this.$http.adornParams({
          expId: z,
          userId: x,
          rejectReason: y,
          doctorStatus: "1"
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshDataList");
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    dataFor() {
      var x = "";
      var y = "";
      var z = "";
      var userId = "";
      for (var i = 0; i < this.dataList.length; i++) {
        x = this.dataList[i].doctorRandk;
        y = this.dataList[i].rejecteason;
        z = this.dataList[i].expId;
        userId = this.dataList[i].userId;
      }
      this.$http({
        url: this.$http.adornUrl("/ycyl/ycyluserexpert/audit/"),
        method: "post",
        data: {
          expId: z,
          doctorRank: x,
          rejectReason: y,
          doctorStatus: "0",
          userId
        }
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.visible = false;
              this.$emit("refreshDataList");
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.dorcount {
  .templone1 {
    text-indent: 1.5em;
  }
  width: 100%;
  font-size: 16px;
  .doctorIDNumber {
    margin-top: 2rem;
    ul {
      display: flex;
      justify-content: space-evenly;
      li {
        width: 15rem;
        height: 11.5rem;
        text-align: center;
        padding-bottom: 1.5rem;
        line-height: 1.5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .doctorImg {
    margin-top: 2rem;
    ul {
      li {
        width: 21rem;
        height: 7.5rem;
        margin: 0 auto;
        margin-top: 1rem;
        text-align: center;
        line-height: 1.5rem;
        padding-bottom: 1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      display: flex;
    }
  }
}
.rightImg{

    img{
        position: absolute;
        top: 50px;
        right: 70px;
        width: 120px;
        height: 150px;
    }
}
</style>
