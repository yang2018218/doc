<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="visible"
    center
    title="专家详情页"
    width="700px">
    <div class="doctorCount">
      <div class="doctorTop">
        <div class="doctorTopInfo">
          <ul>
            <li><span>姓名<i></i></span>： {{usernumber.truename}}</li>
            <li><span>电话<i></i></span>：{{usernumber.mobile}}</li>
            <li><span>就职单位<i></i></span>：{{usernumber.company}}</li>
            <li><span>身份证号<i></i></span>：{{usernumber.idcard}}</li>
            <li><span>从业年限<i></i></span>：{{usernumber.yearsNum}}</li>
            <li><span>个人地址<i></i></span>：{{usernumber.address}}</li>
            <li><span>擅长种类<i></i></span>：{{usernumber.adeptKind}}</li>
          </ul>
          <div class="rightImg">
              <el-image
     :src="usernumber.headImgUrl"></el-image>
          </div>
        </div>
         <div class="territory templone1 " style="overflow:hidden">
            <p >擅长领域:</p>
            <ul id="oeskfddslsl">
              <li  v-for="(ited ,ind ) in doctorDomain" :key="ind">{{ited}}</li>
            </ul>
          </div>
        <ul class="doctorConter">
          <p class="littleTitle"><span>职业经历 <i></i></span>：</p>
          <li :key="index" v-for="(doctorsee,index) in usernumber.list" style="margin-bottom: 10px;">
            <section class="experience">
              <div>开始时间：{{doctorsee.startDate}}-结束时间：{{doctorsee.endDate}} </div>
              <div>就职单位：{{doctorsee.company}}</div>
              <div>经历描述：{{doctorsee.intor}}</div>
            </section>
          </li>
        </ul>
        <p class="videoTitle">视频案例</p>
        <div class="doctorVideo" style="padding-left: 2rem;">
          <section v-for="(ited,ind) in videoUrlList" :key="ind" style="width: 30%;margin-left: 1rem;">
            <video :src="ited.videoUrl" controls="controls"></video>
          </section>
        </div>
        <div>身份证件</div>
        <div id="idCounter">
          <section>
            <el-image
                  style="width: 100px; height: 100px"
                :src="usernumber.idcardFrontImgUrl"
                    :preview-src-list="srcList">
                </el-image>
                <p>身份证正面照</p>
          </section>
          <section>
             <el-image
                  style="width: 100px; height: 100px"
               :src="usernumber.idcardReverseImgUrl"
                    :preview-src-list="srcList">
                </el-image>
                <p>身份证反面照</p>
            </section>
        </div>
        <div>从业执照</div>
        <div class="ZCounter">
          <section v-if="usernumber.certificateImgUrl">

              <el-image
                  style="width: 100px; height: 100px"
               :src="usernumber.certificateImgUrl"
                    :preview-src-list="srcList" >
                </el-image>
                <p style="line-height: 22px">职称证照片</p>
          </section>
          <section v-if="usernumber.takeFficeImgUrl">

            <el-image
                style="width: 100px; height: 100px"
             :src="usernumber.takeFficeImgUrl"
                  :preview-src-list="srcList" >
              </el-image>
              <p style="line-height: 22px">任职书</p>
        </section>
        <section v-if="usernumber.empCardImgUrl">

            <el-image
                style="width: 100px; height: 100px"
             :src="usernumber.empCardImgUrl"
                  :preview-src-list="srcList" >
              </el-image>
              <p style="line-height: 22px">工作证照片</p>
        </section>

        </div>
      </div>
    </div>
    <div class="doctorBottom">
      <ul>
        <li></li>
      </ul>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="visible = false">返回</el-button>
    </span>
  </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                videoUrlList: '',
                doctorDomain: '',
                usernumber: '',
                visible: false,
                dataForm: {
                    expId: 0,
                    userId: '',
                    startDate: '',
                    endDate: '',
                    company: '',
                    intor: '',
                    createTime: '',
                },
                dataRule: {},
                srcList: [],
            }
        },
        methods: {
            init(id) {
                this.visible = true
                this.$http({
                    url: this.$http.adornUrl('/ycyl/ycyluserexpert/infoById'),
                    method: 'post',
                    data: ({
                        'page': this.pageIndex,
                        'pageSize': this.pageSize,
                        'key': this.dataForm.key,
                        'userId': id
                    })
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.usernumber = data.ycyluserdoctor
                        this.doctorDomain = data.ycyluserdoctor.adeptTerritory.split(',')
                        for (let k in this.usernumber) {
                            if (k == 'idcardFrontImgUrl' || k == 'idcardReverseImgUrl' || k == 'certificateCoverImgUrl' || k == 'empCardImgUrl' || k == 'certificateImgUrl' || k == 'takeFficeImgUrl') {
                                this.srcList.push(this.usernumber[k])
                            }
                        }
                        this.videoUrlList = data.ycyluserdoctor.listexample

                    } else {
                        this.dataList = []
                        this.totalPage = 0
                    }
                })
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl(`/ycyl/ycyluserdoctorexperience/${!this.dataForm.expId ? 'save' : 'update'}`),
                            method: 'post',
                            data: this.$http.adornData({
                                'expId': this.dataForm.expId || undefined,
                                'userId': this.dataForm.userId,
                                'startDate': this.dataForm.startDate,
                                'endDate': this.dataForm.endDate,
                                'company': this.dataForm.company,
                                'intor': this.dataForm.intor,
                                'createTime': this.dataForm.createTime
                            })
                        }).then(({
                            data
                        }) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('refreshDataList')
                                    }
                                })
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .doctorCount {
        font-size: 16px;
        padding-left: 2rem;
        .doctorTopInfo {
            display: flex;
            justify-content: space-between;
            li {
                // line-height: 25px;
                // width: 25rem;
                span {
                    width: 4.5rem;
                    display: inline-block;
                    text-align: justify;
                    line-height: 0;
                    i {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .rightImg {
            text-indent: 0;
            width: 150px;
            height: 200px;
            img {
                width: 100%;
            }
        }
    }
    .doctorConter {
        .littleTitle {
            margin: 0.5rem 0;
        }
        span {
            width: 4.5rem;
            display: inline-block;
            text-align: justify;
            line-height: 0;
            i {
                display: inline-block;
                width: 100%;


            }
        }
    }

    #idCounter {
        margin: 1rem 0;
        display: flex;
        justify-content: space-evenly;
        text-indent: 0rem;
        overflow: hidden;
        section {
            width: 16rem;
            height: 12rem;
            text-align: center;
            line-height: 1.5rem;
            img {
                width: 100%;
                height: 100%;

            }
        }
    }

    .experience {
        margin-left: 2rem;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 0.2rem 1rem;
        div {
            line-height: 30px;
        }
    }

    .ZCounter {
        section {
            width: 18rem;
            height: 13rem;
            /* border: 1px solid red; */
            margin: 2rem auto;
            text-indent: 0;
            line-height: 1.5rem;
            text-align: center;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .domain {
        margin-left: 2rem;
        section {
            border: 1px solid #ddd;
            border-radius: 6px;
            display: inline-block;
            padding: 0.3rem 0.5em;
            color: #666;
            font-size: 14px;
            margin: 0.5rem 0.5rem;
        }
    }

    .videoTitle {
        margin: 0.5rem 0;
        color: #333;
    }

    .doctorVideo {
        section {
            width: 30%;
            display: inline-block;
            margin-left: 1rem;
            video {
                width: 100%;
                height: 100%;
            }
        }
    }
    #oeskfddslsl {
  li {
    border: 1px solid #bababa;
    margin-right: 0.5rem;
    line-height: 25px;
    width: 16rem;
    margin-top: 1rem;
    padding: 0.5rem 0;
    text-align: center;
    border-radius: 0.3rem;
  }
}
</style>
