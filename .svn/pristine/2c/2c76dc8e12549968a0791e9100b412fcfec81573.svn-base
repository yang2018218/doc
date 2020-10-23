<template>
  <!--  医生信息审核-->
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    title="审核页面 "
    width="600px"
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
          <div class="templone1">姓 &nbsp; &nbsp; &nbsp; 名 : {{item.truename}}</div>
          <div class="templone1">手机 &nbsp; &nbsp;号 : {{item.mobile}}</div>
          <div class="templone1">从业年限 : {{item.yearsNum}}</div>
          <div class="templone1">就职单位 : {{item.company}}</div>
          <div class="templone1">身份证号 : {{item.idcard}}</div>
          <div class="templone1">个人住址 : {{item.address}}</div>
          <div class="templone1">擅长种类 : {{item.adeptKind}}</div>
          <div class="imgBox">
              <img :src="item.headImgUrl" alt="">
          </div>
          <div class="territory templone1 domain" style="overflow:hidden">
            <p style="float:left;line-height: 40px;">擅长领域:</p>
            <ul style="float:left;width:400px" id="oeskfddslsl">
              <li
                style="float:left;width:47%;"
                v-for="(ited ,ind ) in operation"
                :key="ind"
              >{{ited}}</li>
            </ul>
          </div>
          <div class="territory templone1" style="margin-top: 1rem">
            执业经历
            <section :key="ind" v-for="(practice,ind) in GoThrough" class="temploneSection">
              <p>{{practice.startDate}}~{{practice.endDate}}</p>
              <p>就职单位：{{practice.company}}</p>
              <p>工作描述：{{practice.intor}}</p>
            </section>
          </div>
          <div class="doctorIDNumber">
            <p class="templone1">身份证件:</p>
            <ul>
              <Li>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imgData.idcardFrontImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p>身份证正面照</p>
              </Li>
              <Li>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imgData.idcardReverseImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p>身份证反面照</p>
              </Li>
            </ul>
          </div>
          <div class="doctorImg">
            <p class="templone1">医生证件</p>
            <ul>
              <Li>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imgData.certificateCoverImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p style="line-height: 22px">证件封面</p>
              </Li>
              <Li v-if='certificateOneImgUrl'>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imgData.certificateOneImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p style="line-height: 22px">证件封面1</p>
              </Li>
              <Li v-if='imgData.certificateTwoImgUrl'>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="imgData.certificateTwoImgUrl"
                  :preview-src-list="srcList"
                ></el-image>
                <p style="line-height: 22px">证件封面2</p>
              </Li>
            </ul>
          </div>
          <div class="templone1">
            选择分类
            <template>
              <el-radio checked label="1" v-model="item.doctorRandk" style="color: green">一级医生</el-radio>
              <el-radio label="2" v-model="item.doctorRandk" style="color: #0BB2D4">二级医生</el-radio>
            </template>
</div>
<div class="templone1">
    驳回理由：
    <section>
        <el-input style="width: 450px" autosize placeholder="请输入内容" type="textarea" v-model="item.rejecteason"></el-input>
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
                imgData: "",
                GoThrough: "",
                visible: false,
                dataList: [],
                operation: "",
                dataForm: {
                    exaId: 0,
                    userId: "",
                    exaDate: "",
                    videoUrl: "",
                    orderBy: "",
                    createTime: "",
                    dataList: [],
                    pageIndex: 1,
                    pageSize: 10
                },
                dataRule: {},
                srcList: []
            };
        },
        methods: {
            pre(a) {},
            infoBayID(id) {
                this.$http({
                    url: this.$http.adornUrl("/ycyl/ycyluserdoctor/infoById"),
                    method: "post",
                    data: {
                        userId: id
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.imgData = data.ycyluserdoctor;
                        this.operation = data.ycyluserdoctor.adeptTerritory.split(",");
                        this.GoThrough = data.ycyluserdoctor.list;

                        this.totalPage = data;
                        for (let k in this.imgData) {
                            if (
                                k == "idcardFrontImgUrl" ||
                                k == "idcardReverseImgUrl" ||
                                k == "certificateCoverImgUrl" ||
                                k == 'certificateOneImgUrl' ||
                                k == 'certificateTwoImgUrl'
                            ) {
                                this.srcList.push(this.imgData[k]);
                            }
                        }
                    } else {
                        this.totalPage = 0;
                    }
                });
            },
            getEveryDoctor(id) {
                this.infoBayID(id);
                this.dataListLoading = true;
                this.$http({
                    url: this.$http.adornUrl("/ycyl/ycyluserdoctor/list"),
                    method: "post",
                    data: {
                        page: this.pageIndex,
                        pageSize: this.pageSize,
                        key: this.dataForm.key,
                        userId: id
                    }
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.dataList = data.page.list;
                        this.totalPage = data.page.totalCount;
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
                var x = null;
                var y = "";
                var z = "";
                for (var i = 0; i < this.dataList.length; i++) {
                    x = this.dataList[i].doctorRandk;
                    y = this.dataList[i].rejecteason;
                    z = this.dataList[i].doctorId;
                }
                if (x == null) {

                    this.$alert("您没有选择医生的等级", "温馨提示", {
                        confirmButtonText: "确定"
                    });
                } else {

                    this.$http({
                        url: this.$http.adornUrl("/ycyl/ycyluserdoctor/audit/"),
                        method: "post",
                        params: this.$http.adornParams({
                            doctorId: z,
                            doctorRank: x,
                            rejectReason: y,
                            doctorStatus: "1",
                            userId: this.dataList[0].userId
                        })
                    }).then(({
                        data
                    }) => {
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
            },
            dataFor() {
                var x = "";
                var y = "";
                var z = "";
                for (var i = 0; i < this.dataList.length; i++) {
                    x = this.dataList[i].doctorRandk;
                    y = this.dataList[i].rejecteason;
                    z = this.dataList[i].doctorId;
                }
                this.$http({
                    url: this.$http.adornUrl("/ycyl/ycyluserdoctor/audit/"),
                    method: "post",
                    params: this.$http.adornParams({
                        doctorId: z,
                        doctorRank: x,
                        rejectReason: y,
                        doctorStatus: "0",
                        userId: this.dataList[0].userId
                    })
                }).then(({
                    data
                }) => {
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
            .temploneSection {
                margin-top: 0.5rem;
                border: 1px solid #dddddd;
                padding: 0.5rem 1rem;
                width: 80%;
                margin-left: 3rem;
                border-radius: 0.5rem;
            }
        }
        width: 100%;
        font-size: 16px;
        .doctorIDNumber {
            margin-top: 2rem;
            overflow: hidden;
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
                    }
                }
            }
        }
        .doctorImg {
            margin-top: 2rem;
            ul {
                li {
                    width: 21rem;
                    margin: 0 auto;
                    margin-top: 1rem;
                    text-align: center;
                    line-height: 1.5rem;
                    padding-bottom: 1.5rem;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }

    .domain {
        margin: 0.4rem 0;
    }
    .imgBox{
        img{
          position: absolute;
          top: 50px;
          right: 50px;
          width: 120px;
          height: 150px;
        }
    }
</style>
