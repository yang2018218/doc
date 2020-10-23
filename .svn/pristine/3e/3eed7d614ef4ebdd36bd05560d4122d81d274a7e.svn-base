<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="仓库表中id" prop="mainId">
      <el-input v-model="dataForm.mainId" placeholder="仓库表中id"></el-input>
    </el-form-item>
    <el-form-item label="产品名称" prop="productName">
      <el-input v-model="dataForm.productName" placeholder="产品名称"></el-input>
    </el-form-item>
    <el-form-item label="产品标题1" prop="titleOne">
      <el-input v-model="dataForm.titleOne" placeholder="产品标题1"></el-input>
    </el-form-item>
    <el-form-item label="" prop="titleTwo">
      <el-input v-model="dataForm.titleTwo" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="titleThree">
      <el-input v-model="dataForm.titleThree" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="产品种类 字典表中id" prop="productType">
      <el-input v-model="dataForm.productType" placeholder="产品种类 字典表中id"></el-input>
    </el-form-item>
    <el-form-item label="产品状态0隐藏 1显示" prop="status">
      <el-input v-model="dataForm.status" placeholder="产品状态0隐藏 1显示"></el-input>
    </el-form-item>
    <el-form-item label="产品主图多张逗号分隔" prop="mainImages">
      <el-input v-model="dataForm.mainImages" placeholder="产品主图多张逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="产品详细介绍 图片逗号分隔" prop="content">
      <el-input v-model="dataForm.content" placeholder="产品详细介绍 图片逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="适用种类 字典表id逗号分隔" prop="fitKind">
      <el-input v-model="dataForm.fitKind" placeholder="适用种类 字典表id逗号分隔"></el-input>
    </el-form-item>
    <el-form-item label="是否推荐0否1是" prop="isRecommend">
      <el-input v-model="dataForm.isRecommend" placeholder="是否推荐0否1是"></el-input>
    </el-form-item>
    <el-form-item label="显示app端的价格 只是让用户看的" prop="showPrice">
      <el-input v-model="dataForm.showPrice" placeholder="显示app端的价格 只是让用户看的"></el-input>
    </el-form-item>
    <el-form-item label="市场价 只用于前端显示做为参考" prop="showMarketPrice">
      <el-input v-model="dataForm.showMarketPrice" placeholder="市场价 只用于前端显示做为参考"></el-input>
    </el-form-item>
    <el-form-item label="创建人" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item label="已销售数量" prop="sellNum">
      <el-input v-model="dataForm.sellNum" placeholder="已销售数量"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          productId: 0,
          mainId: '',
          productName: '',
          titleOne: '',
          titleTwo: '',
          titleThree: '',
          productType: '',
          status: '',
          mainImages: '',
          content: '',
          fitKind: '',
          isRecommend: '',
          showPrice: '',
          showMarketPrice: '',
          userId: '',
          sellNum: '',
          createTime: ''
        },
        dataRule: {
          mainId: [
            { required: true, message: '仓库表中id不能为空', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '产品名称不能为空', trigger: 'blur' }
          ],
          titleOne: [
            { required: true, message: '产品标题1不能为空', trigger: 'blur' }
          ],
          titleTwo: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          titleThree: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          productType: [
            { required: true, message: '产品种类 字典表中id不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '产品状态0隐藏 1显示不能为空', trigger: 'blur' }
          ],
          mainImages: [
            { required: true, message: '产品主图多张逗号分隔不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '产品详细介绍 图片逗号分隔不能为空', trigger: 'blur' }
          ],
          fitKind: [
            { required: true, message: '适用种类 字典表id逗号分隔不能为空', trigger: 'blur' }
          ],
          isRecommend: [
            { required: true, message: '是否推荐0否1是不能为空', trigger: 'blur' }
          ],
          showPrice: [
            { required: true, message: '显示app端的价格 只是让用户看的不能为空', trigger: 'blur' }
          ],
          showMarketPrice: [
            { required: true, message: '市场价 只用于前端显示做为参考不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '创建人不能为空', trigger: 'blur' }
          ],
          sellNum: [
            { required: true, message: '已销售数量不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.productId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.productId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylproduct/info/${this.dataForm.productId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.mainId = data.ycylproduct.mainId
                this.dataForm.productName = data.ycylproduct.productName
                this.dataForm.titleOne = data.ycylproduct.titleOne
                this.dataForm.titleTwo = data.ycylproduct.titleTwo
                this.dataForm.titleThree = data.ycylproduct.titleThree
                this.dataForm.productType = data.ycylproduct.productType
                this.dataForm.status = data.ycylproduct.status
                this.dataForm.mainImages = data.ycylproduct.mainImages
                this.dataForm.content = data.ycylproduct.content
                this.dataForm.fitKind = data.ycylproduct.fitKind
                this.dataForm.isRecommend = data.ycylproduct.isRecommend
                this.dataForm.showPrice = data.ycylproduct.showPrice
                this.dataForm.showMarketPrice = data.ycylproduct.showMarketPrice
                this.dataForm.userId = data.ycylproduct.userId
                this.dataForm.sellNum = data.ycylproduct.sellNum
                this.dataForm.createTime = data.ycylproduct.createTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/ycylproduct/${!this.dataForm.productId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'productId': this.dataForm.productId || undefined,
                'mainId': this.dataForm.mainId,
                'productName': this.dataForm.productName,
                'titleOne': this.dataForm.titleOne,
                'titleTwo': this.dataForm.titleTwo,
                'titleThree': this.dataForm.titleThree,
                'productType': this.dataForm.productType,
                'status': this.dataForm.status,
                'mainImages': this.dataForm.mainImages,
                'content': this.dataForm.content,
                'fitKind': this.dataForm.fitKind,
                'isRecommend': this.dataForm.isRecommend,
                'showPrice': this.dataForm.showPrice,
                'showMarketPrice': this.dataForm.showMarketPrice,
                'userId': this.dataForm.userId,
                'sellNum': this.dataForm.sellNum,
                'createTime': this.dataForm.createTime
              })
            }).then(({data}) => {
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
