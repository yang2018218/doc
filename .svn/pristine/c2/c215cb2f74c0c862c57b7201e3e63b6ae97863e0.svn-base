<template>
  <div class="get-ticket-manage">
    <el-form :inline="true" :model="searchForm" :rules="searchRules" class="search-box"
             @keyup.enter.native="getDataList(1)">
      <el-form-item label="获取方式：">
        <el-select v-model="searchForm.getWay" placeholder="获取方式" clearable>
          <el-option v-for="item in getWay" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchForm.status" placeholder="状态" clearable>
          <el-option v-for="item in stateList" :key="item.val" :label="item.message" :value="item.val"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效时间:">
        <el-date-picker
          style="width:200px"
          v-model="searchForm.beginTime"
          type="datetime"
          placeholder="选择开始时间"
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        -
        <el-date-picker
          style="width:200px"
          v-model="searchForm.endTime"
          type="datetime"
          placeholder="选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="领取张数:" prop="startIssuedSheets">
        <el-input
          class="num-box"
          v-model.number.trim="searchForm.startIssuedSheets"
          placeholder="起始范围"
          clearable
        ></el-input>
        -
      </el-form-item>
      <el-form-item prop="endIssuedSheets">
        <el-input
          class="num-box"
          v-model.number.trim="searchForm.endIssuedSheets"
          placeholder="结束范围"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="使用张数:" prop="startUseSheets">
        <el-input
          class="num-box"
          v-model.number="searchForm.startUseSheets"
          placeholder="起始范围"
          clearable
        ></el-input>
        -
      </el-form-item>
      <el-form-item prop="endUseSheets">
        <el-input
          class="num-box"
          v-model.number="searchForm.endUseSheets"
          placeholder="结束范围"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="券包名称:" prop="packageName">
        <el-input v-model.trim="searchForm.packageName" placeholder="请输入券包名称" clearable style="width:134px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="padding:8px 20px" @click="getDataList(1)">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="line">
      <el-button v-if="isAuth('ycyl:voucherget:save')" type="primary" style="padding:8px 20px" @click="addOrUpdate()">
        新增获取
      </el-button>
    </div>
    <el-table :data="dataList" border v-loading="dataListLoading">
      <el-table-column align="center" header-align="center" prop="getWay" label="获取方式"></el-table-column>
      <el-table-column align="center" header-align="center" prop="packageName" label="券包名称"></el-table-column>
      <el-table-column align="center" header-align="center" label="发放时间">
        <template slot-scope="scope">
          {{scope.row.isPerpetual?'永久':scope.row.beginTime+'-'+scope.row.endTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" prop="packageIssuedSheets" label="发放张数/个"></el-table-column>
      <el-table-column align="center" header-align="center" prop="issuedCount" label="发放个数/日">
        <div slot-scope="scope">
          <span>{{!scope.row.issuedCount? '无限制':`${scope.row.issuedCount}`}}</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" prop="getCount" label="可获取次数/人/日">
        <div slot-scope="scope">
          <span v-if="scope.row.getWayId=='0025f5583096496cb6503db768735008'">
            无限制
          </span>
          <span v-else>{{scope.row.getCount}}</span>
        </div>
      </el-table-column>
      <el-table-column align="center" header-align="center" prop="issuedMoney" label="总发放金额"></el-table-column>
      <el-table-column align="center" header-align="center" prop="issuedSheets" label="已发放个数"></el-table-column>
      <el-table-column align="center" header-align="center" prop="useSheets" label="使用张数"></el-table-column>
      <el-table-column align="center" header-align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.status?'success':''">{{scope.row.status?'开启':'关闭'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="isAuth('ycyl:voucherget:info')" type="text" size="small"
                     @click="addOrUpdate(scope.row.getId)">查看详情
          </el-button>
          <el-popconfirm :title="scope.row.status?'您确定关闭吗？':'您确定开启吗？'"
                         @onConfirm="close(scope.row.getId,scope.row.status, scope.row.getWayId)">
            <el-button v-if="isAuth('ycyl:voucherget:shutDown')" slot="reference" type="text" size="small">
              {{scope.row.status?'关闭':'开启'}}
            </el-button>
          </el-popconfirm>
          <el-button v-if="isAuth('ycyl:voucheruserrecord:list')" type="text" size="small"
                     @click="getLogs(scope.row.getId)">获取记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10,20,50,100]" :total="totalPage"
                   @current-change="currentChangeHandle"
                   @size-change="sizeChangeHandle"
                   layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 新增获取弹窗 -->
    <el-dialog :title="!AddOrUpdateForm.getId?'新增获取':'查看详情'" :visible="dialogNewAddVisiable" center
               custom-class="my-dialog" :show-close="true" :before-close="handleClose" :close-on-click-modal="true"
               @close="handleClose">
      <el-form :inline="true" :model="AddOrUpdateForm" ref="AddOrUpdateForm" :rules="AddOrUpdateFormRoles"
               class="new-add-form" label-width="140px" label-position="right">
        <div>
          <el-form-item label="获取方式：" prop="getWay">
            <el-select v-model="AddOrUpdateForm.getWay" placeholder="获取方式" @change="selectType"
                       :disabled="AddOrUpdateForm.getId?true:false">
              <el-option v-for="item in getWay" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="this.AddOrUpdateForm.getWay=='0023c2ae29724d76a3efb98a1bb0df99'">
          <el-form-item label="分享方式：">
            <el-select v-model="AddOrUpdateForm.shareWay" :disabled="AddOrUpdateForm.getId?true:false">
              <el-option v-for="item in shareWay" :key="item.dictId" :label="item.name"
                         :value="item.dictId"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="this.AddOrUpdateForm.getWay=='002c58b5d11f42ceba824e9668cdabac'">
          <el-form-item label="评论方式：">
            <el-select v-model="AddOrUpdateForm.commentWay" :disabled="AddOrUpdateForm.getId?true:false">
              <el-option v-for="item in commentWay" :key="item.dictId" :label="item.name"
                         :value="item.dictId"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="this.AddOrUpdateForm.getWay=='0025f5583096496cb6503db768735008'">
          <el-form-item label="购物返券最小金额：">
            <el-input v-model="AddOrUpdateForm.orderMinMoney" placeholder="请输入购物返券最小订单金额"
                      :disabled="AddOrUpdateForm.getId?true:false"></el-input>
          </el-form-item>
        </div>
        <div v-if="this.AddOrUpdateForm.getWay=='00289e640e1c4075a6b2884c59f10123'">
          <el-form-item label="每日抢券开始时间：">
            <el-time-picker value-format="HH:mm:ss" v-model="AddOrUpdateForm.dayBeginTime" placeholder="每日抢券开始时间"
                            :disabled="AddOrUpdateForm.getId?true:false"></el-time-picker>
          </el-form-item>
          <el-form-item label="每日抢券结束时间：">
            <el-time-picker value-format="HH:mm:ss" v-model="AddOrUpdateForm.dayEndTime" placeholder="每日抢券结束时间"
                            :disabled="AddOrUpdateForm.getId?true:false"></el-time-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="永久领取：" prop="isPerpetual">
            <el-select v-model="AddOrUpdateForm.isPerpetual" :disabled="AddOrUpdateForm.getId?true:false">
              <el-option v-for="item in forEverGet" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="AddOrUpdateForm.isPerpetual==0">
            <el-date-picker
              v-model="AddOrUpdateForm.beginTime"
              type="datetime"
              clearable
              placeholder="开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="AddOrUpdateForm.getId?true:false"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-if="AddOrUpdateForm.isPerpetual==0">
            —&nbsp;&nbsp;&nbsp;
            <el-date-picker
              v-model="AddOrUpdateForm.endTime"
              type="datetime"
              clearable
              placeholder="结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="AddOrUpdateForm.getId?true:false"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="券包名称：" prop="packageName">
            <el-input v-model.trim="AddOrUpdateForm.packageName" placeholder="请输入券包名称" clearable
                      :disabled="AddOrUpdateForm.getId?true:false"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="发放个数/日：" v-if="this.AddOrUpdateForm.getWay=='00289e640e1c4075a6b2884c59f10123'">
            <el-input v-model="AddOrUpdateForm.issuedCount" placeholder="不填写默认不限制"
                      :disabled="AddOrUpdateForm.getId?true:false"></el-input>
          </el-form-item>
          <el-form-item label="发放次数/人/日：" v-if="this.AddOrUpdateForm.getWay!='0025f5583096496cb6503db768735008'">
            <el-input v-model="AddOrUpdateForm.getCount" placeholder="不填写默认不限制"
                      :disabled="AddOrUpdateForm.getId?true:false"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="规则描述：">
                        <el-input v-model="AddOrUpdateForm.desc" type="textarea" autosize style="width:550px" ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="选择代金券：">
            <el-select v-model="coupons" placeholder="请选择代金券" @change="selectCoupons">
              <el-option v-for="item in voucherList" :key="item.voucherId" :label="item.voucherName"
                         :value="JSON.stringify(item)"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 设置代金券有效期 -->
        <el-dialog :title="currentCoupon.voucherName+' ID:'+currentCoupon.voucherId" width="40%" center
                   :visible="innerCouponDialog" :show-close="false" append-to-body>
          <el-form :model="currentCoupon" ref="innerCouponDialog" :rules="currentCouponRoles" :inline="true">
            <el-form-item prop="useType">
              <el-select v-model="currentCoupon.useType" placeholder="有效期设置">
                <el-option label="按领取日起天数" value="2"></el-option>
                <el-option label="按起始日期" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="currentCoupon.useType=='2'">
              <el-input v-model.number="currentCoupon.useDays" placeholder="请输入天数"></el-input>
            </el-form-item>
            <el-form-item v-else>
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="currentCoupon.beginTime"
                              placeholder="开始日期"></el-date-picker>
              -
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="currentCoupon.endTime"
                              placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="innerDialogBack">取消</el-button>
            <el-button @click="editCoupon">确定</el-button>
          </span>
        </el-dialog>
        <div class="coupons-list">
          <div class="item" v-for="(item,index) in voucherIssuedDetails" :key="index">
            <h4>代金券{{index+1}} ID:{{item.voucherId}}</h4>
            <div class="row">
              <span class="span">代金券名称：{{item.voucherName}}</span>
              <span class="span">代金券金额：会员{{item.memberMinAvailMoney}} 非会员{{item.commonMinAvailMoney}}</span>
              <span v-if="AddOrUpdateForm.getId">使用张数：{{item.use}}</span>
              <el-button type="text" class="underline-btn" @click="couponDetails(item)">查看详情</el-button>
              <el-popconfirm :title="'您确定要删除'+item.voucherName+'吗'" @onConfirm="deleteCoupon(index)">
                <el-button slot="reference" type="text" size="small" class="underline-btn">删除</el-button>
              </el-popconfirm>
              <el-popconfirm :title="'您确定要中止'+item.voucherName+'吗'" @onConfirm="stopCoupon(item.detailId,index)">
                <el-button v-if="AddOrUpdateForm.getId" slot="reference" type="text" size="small" class="underline-btn"
                           :disabled="item.status===0?true:false">{{item.status===0?'已中止':'中止'}}
                </el-button>
              </el-popconfirm>
            </div>
          </div>
        </div>
      </el-form>
      <!-- 代金券详情 -->
      <el-dialog :visible="couponDetailsDialog" append-to-body title="代金券详情" center :show-close="false" width="30%">
        <div>代金券类型：{{currentLookCouponDeatails.voucherType==1?'代金券':'打折券'}}</div>
        <div>代金券名称：{{currentLookCouponDeatails.voucherName}}</div>
        <div v-if="currentLookCouponDeatails.useType==2">有效期：{{currentLookCouponDeatails.useDays}}天</div>
        <div v-else>有效期：{{currentLookCouponDeatails.beginTime}}————{{currentLookCouponDeatails.endTime}}</div>
        <div>
          <span>会员使用条件：{{currentLookCouponDeatails.memberMinAvailMoney}} 元</span>
          <span style="margin-left:20px;">非会员使用条件：{{currentLookCouponDeatails.commonMinAvailMoney}} 元</span></div>
        <div>
          <span>会员代金券面额：{{currentLookCouponDeatails.memberMinimum}} 元~{{currentLookCouponDeatails.memberMaximum}} 元</span>
          <span style="margin-left:20px;">非会员代金券面额：{{currentLookCouponDeatails.commonMinimum}} 元~{{currentLookCouponDeatails.commonMaximum}} 元</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="couponDetailsDialog=false">返回</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">返回</el-button>
        <el-button v-if="!AddOrUpdateForm.getId" type="primary" @click="addOrUptateSubmit">保存</el-button>
        <el-button v-if="isAuth('ycyl:voucherget:editor')&&AddOrUpdateForm.getId" type="primary"
                   @click="addOrUptateSubmit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import consoleVue from '../../ycyl/console.vue'

  export default {
    data () {
      return {
        stateList: [
          {
            val: '1',
            message: '开启'
          },
          {
            val: '0',
            message: '关闭'
          },
        ],
        searchForm: {},
        searchRules: {
          startIssuedSheets: [
            {type: 'number', message: '请输入数字', trigger: 'blur'},
          ],
          endIssuedSheets: [
            {type: 'number', message: '请输入数字', trigger: 'blur'},
          ],
          startUseSheets: [
            {type: 'number', message: '请输入数字', trigger: 'blur'},
          ],
          endUseSheets: [
            {type: 'number', message: '请输入数字', trigger: 'blur'},
          ],
        },
        dataList: [],
        dataListLoading: false,
        // 翻页
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        AddOrUpdateForm: {},
        AddOrUpdateFormRoles: {
          packageName: [
            {required: true, message: '券包名称不能为空', trigger: 'blur'}
          ],
          getWay: [
            {required: true, message: '请选择获取方式', trigger: 'change'}
          ],
          isPerpetual: [
            {required: true, message: '请选择永久领取', trigger: 'change'}
          ],
          everyDayDurationTime: [
            {type: 'number', message: '抢券持续时间整数', trigger: 'blur'}
          ]
        },
        //永久领取
        forEverGet: [
          {label: '是', value: 1},
          {label: '否', value: 0}
        ],
        dialogNewAddVisiable: false,
        shareWay: [],
        getWay: [],
        commentWay: [],
        // 选择代金券
        coupons: '',
        innerCouponDialog: false,
        currentCoupon: {},
        currentCouponRoles: {
          useType: [
            {required: true, message: '请选择有效期设置', trigger: 'change'},
          ],
        },
        // 请求的可选代金券列表
        voucherList: [],
        // 选择的代金券列表
        voucherIssuedDetails: [],
        // 当前查看的代金券详情
        currentLookCouponDeatails: {},
        // 代金券详情弹窗
        couponDetailsDialog: false,
      }
    },
    watch: {
      AddOrUpdateForm (val, newval) {

      }
    },
    created () {
      // 请求获取方式
      this.$http({
        url: this.$http.adornUrl('/voucherdict/lists'),
        method: 'post',
        data: {group_name: 'hqfs'}
      }).then(data => {
        if (data && data.data.code === 0) {
          this.getWay = data.data.list
        } else {
          this.$message.error(data.data.msg)
        }
      })
      // 请求分享方式
      this.$http({
        url: this.$http.adornUrl('/voucherdict/lists'),
        method: 'post',
        data: {group_name: 'fxfs'}
      }).then(data => {
        if (data && data.data.code === 0) {
          this.shareWay = data.data.list
        } else {
          this.$message.error(data.data.msg)
        }
      })
      // 请求评论方式
      this.$http({
        url: this.$http.adornUrl('/voucherdict/lists'),
        method: 'post',
        data: {group_name: 'plfs'}
      }).then(data => {
        if (data && data.data.code === 0) {
          this.commentWay = data.data.list
        } else {
          this.$message.error(data.data.msg)
        }
      })
      // 请求代金券列表
      this.getTicket()
      // 获取数据
      this.getDataList()
    },
    methods: {
      //获取代金券列表
      getTicket () {
        this.$http({
          url: this.$http.adornUrl('/voucherinfo/list'),
          method: 'post',
          data: {pageSize: 1000}
        }).then(data => {
          if (data && data.data.code === 0) {
            this.voucherList = data.data.page.list
          } else {
            this.$message.error(data.data.msg)
          }
        })
      },

      // 获取数据
      getDataList (page) {
        this.dataListLoading = true
        this.searchForm.page = page || this.pageIndex
        this.searchForm.pageSize = this.pageSize
        this.$http({
          url: this.$http.adornUrl('/voucherget/list'),
          method: 'post',
          data: this.searchForm
        }).then(data => {
          if (data && data.data.code === 0) {
            this.dataList = data.data.page.list
            this.totalPage = data.data.page.totalCount
          } else {
            this.$message.error(data.data.msg)
          }
          this.dataListLoading = false
        })
      },
      // 新增或查看详情
      addOrUpdate (id) {
        this.getTicket()
        this.dialogNewAddVisiable = true
        setTimeout(() => {
          this.$refs.AddOrUpdateForm.clearValidate()
        }, 0)
        this.$set(this.AddOrUpdateForm, 'getId', id)
        if (!id) {
        } else {
          this.$http({
            url: this.$http.adornUrl('/voucherget/info/' + id),
            method: 'post',
            data: {}
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.coupons = ''
              this.AddOrUpdateForm = data.voucherGet
              this.voucherIssuedDetails = data.voucherIssuedDetail
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      },
      // 关闭活动
      close (id, status, getWay) {
        this.$http({
          url: this.$http.adornUrl('/voucherget/shutDown'),
          method: 'post',
          data: {getId: id, status: status ? 0 : 1, getWay: getWay}
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({type: 'success', message: '操作成功', duration: 1500})
            this.getDataList()
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 获取记录
      getLogs (id) {
        this.$router.push({path: '/getTicketLog', query: {id: id}})
      },
      // 新增获取提交
      addOrUptateSubmit () {
        if (this.AddOrUpdateForm.getWay == '00289e640e1c4075a6b2884c59f10123') {
          if (this.AddOrUpdateForm.dayBeginTime && this.AddOrUpdateForm.dayEndTime) {
          } else {
            return this.$message.error('请检查时间是否输入')
          }
        }
        console.log(this.AddOrUpdateForm.isPerpetual)
        if (!this.AddOrUpdateForm.isPerpetual) {
          if (this.AddOrUpdateForm.beginTime && this.AddOrUpdateForm.endTime) {
          } else {
            return this.$message.error('请检查日期是否输入')
          }
        }
        this.AddOrUpdateForm.voucherIssuedDetails = this.voucherIssuedDetails
        this.$refs.AddOrUpdateForm.validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/voucherget/' + (this.AddOrUpdateForm.getId ? 'editor' : 'save')),
              method: 'post',
              data: this.AddOrUpdateForm
            }).then(data => {
              if (data && data.data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.dialogNewAddVisiable = false
                    this.getDataList()
                  }
                })
              } else {
                this.$message.error(data.data.msg)
              }
            })
          }
        })
      },
      // 1、选择获取方式
      selectType (val) {
        this.AddOrUpdateForm = {}
        this.$set(this.AddOrUpdateForm, 'getWay', val)
      },
      // 选择代金券
      selectCoupons (val) {
        var val = JSON.parse(val)
        var obj = this.voucherIssuedDetails.find(v => v.voucherId == val.voucherId)
        if (obj) {
          this.$message({type: 'warning', message: '您已选择过该代金券', duration: 1000})
          return
        }
        this.currentCoupon = val
        this.innerCouponDialog = true
        setTimeout(() => {
          this.$refs.innerCouponDialog.clearValidate()
        }, 0)
      },
      // 选择代金券弹窗关闭
      innerDialogBack () {
        this.currentCoupon = {}
        this.innerCouponDialog = false
      },
      // 选择代金券确认
      editCoupon () {
        if (!this.currentCoupon.useType) {
          this.$message({type: 'warning', message: '请选择有效期设置', duration: 1000})
        } else {
          if ((this.currentCoupon.useType == 2 && !this.currentCoupon.useDays) ||
            (this.currentCoupon.useType == 1 && !this.currentCoupon.beginTime) ||
            (this.currentCoupon.useType == 1 && !this.currentCoupon.endTime)) {
            this.$message({type: 'warning', message: '请设置时间', duration: 1000})
          } else {
            this.voucherIssuedDetails.push(this.currentCoupon)
            this.innerCouponDialog = false
            this.coupons = ''
          }
        }
      },
      // 代金券列表查看详情
      couponDetails (item) {
        this.couponDetailsDialog = true
        this.currentLookCouponDeatails = item
      },
      // 删除代金券
      deleteCoupon (i) {
        if (this.AddOrUpdateForm.status == 1) {
          this.$message({message: '温馨提示：活动开启中代金券不可删除', duration: 2000, type: 'warning'})
          return
        }
        if (this.voucherIssuedDetails.length > 1) {
          this.voucherIssuedDetails.splice(i, 1)
        } else {
          this.$message({message: '温馨提示：请至少保留一个代金券', duration: 2000, type: 'info'})
        }
      },
      //停止代金券
      stopCoupon (id, i) {
        this.$http({
          url: this.$http.adornUrl('/voucherissueddetail/shutDown'),
          method: 'post',
          data: {detailId: id, status: 0}
        }).then(data => {
          if (data && data.data.code === 0) {
            this.$message({type: 'success', message: '操作成功', duration: 1500})
            this.$set(this.voucherIssuedDetails[i], 'status', 0)
          } else {
            this.$message.error(data.data.msg)
          }
        })
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      handleClose () {
        this.dialogNewAddVisiable = false
        this.AddOrUpdateForm = {}
        this.voucherIssuedDetails = []
      }
    },
  }
</script>
<style>
  .get-ticket-manage .search-box {
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 10px;
    background-color: #eeeeee;
  }

  .get-ticket-manage .search-box .num-box {
    width: 90px;
  }

  .new-add-form .el-input {
    width: 180px;
  }
</style>
<style lang="scss" scoped>
  .line {
    margin-bottom: 10px;
  }

  .underline-btn {
    text-decoration: underline;
  }

  .coupons-list {
    .item {
      .row {
        width: 100%;
        box-sizing: border-box;

        .span {
          display: inline-block;
          width: 245px;
          overflow: hidden;;
        }

        .underline-btn {
          margin-left: 20px;
        }
      }
    }
  }
</style>
