<template>
  <div class="app-container">
    <el-form ref="postForm" method="POST" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="球局标题" required prop="title">
        <el-input v-model="form.title" placeholder="please input title" />
      </el-form-item>
      <el-form-item label="球局封面" required>
        <el-upload
          ref="upload"
          action=""
          class="upload-demo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="dateValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="球局地址" required>
        <el-input v-model="form.address" />
        <div>
          <label>关键词：<input v-model="keyword"></label>
          <label>地区：<input v-model="location"></label>
          <baidu-map>
            <bm-view class="map" />
            <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" @infohtmlset="handleClick" />
          </baidu-map>
        </div>
      </el-form-item>
      <el-form-item label="是否限制人数">
        <el-switch
          v-model="isLimitPeople"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <el-form-item v-show="isLimitPeople" label="人数">
        <el-input v-model.number="form.people_num" />
      </el-form-item>
      <el-form-item label="价格" required>
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="球局类型" required prop="ball_type">
        <el-select v-model="form.ball_type" placeholder="please select author">
          <el-option v-for="user in ballTypeList" :key="user.id" :label="user.name" :value="user.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="球局共享" required>
        <el-select v-model="form.share_type" placeholder="please select type">
          <el-option v-for="user in shareTypeList" :key="user.id" :label="user.name" :value="user.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="球局服务">
        <el-select
          v-model="form.services"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择本场球局服务"
        >
          <el-option
            v-for="item in servicesData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select></el-form-item>
      <el-form-item label="选择球话" required prop="topic_id">
        <el-select v-model="form.topic_id" placeholder="please select topic">
          <el-option v-for="topic in topicList" :key="topic.id" :label="topic.name" :value="topic.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="球局描述" required prop="content">
        <el-input v-model="form.content" type="textarea" placeholder="please input content" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary submit" @click.stop="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create as createPost, getItem, putItem } from '@/api/ball'

export default {
  data() {
    return {
      location: '北京',
      keyword: '百度',
      dateValue: [+new Date(), +new Date()],
      fileList: [],
      isLimitPeople: false,
      form: {
        title: '',
        content: '',
        ball_type: 1,
        share_type: 1,
        country: '',
        province: '',
        city: '',
        address: '',
        price: 0,
        image_url: '',
        start_time: undefined,
        end_time: undefined,
        longitude: 0,
        latitude: 0,
        user_id: 'admin',
        people_num: 0,
        services: [],
        status: 0,
        topic_id: '396db878-2aad-4edb-bf82-58d001bfd666'
      },
      servicesData: [{
        value: 1,
        label: '组织者带球'
      }, {
        value: 2,
        label: '停车场'
      }, {
        value: 3,
        label: '卫生间'
      }, {
        value: 4,
        label: '提供饮用水'
      }, {
        value: 5,
        label: '24小时可退'
      }, {
        value: 6,
        label: '充电器'
      }, {
        value: 7,
        label: '更衣室'
      }],
      formRules: {
        title: [
          { required: true, message: 'please input title', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'please input content', trigger: 'blur' }
        ],
        ball_type: [
          { required: true, message: 'please select author', trigger: 'blur' }
        ]
      },
      ballTypeList: [{ id: 1, name: '4x4' }, { id: 2, name: '3x3' }, { id: 3, name: '5x5' }],
      shareTypeList: [{ id: 1, name: '公开' }, { id: 2, name: '仅自己可见' }, { id: 3, name: '好友可见' }],
      topicList: [{ id: '396db878-2aad-4edb-bf82-58d001bfd666', name: '东边球局集合' }, { id: '2', name: '装备圈' }, { id: '3', name: '哪挡得了我们' }]
    }
  },
  async created() {
    const id = this.$route.query.id
    if (id) {
      const res = await getItem(id)
      if (res.code === 0) {
        this.form = res.data
        const imageUrl = this.form.image_url
        if (imageUrl) {
          this.fileList = [{ name: imageUrl.slice(imageUrl.lastIndexOf('/') + 1), url: imageUrl }]
        }
        if (this.form.is_limit_num === 1) {
          this.isLimitPeople = true
        }
      }
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      if (this.fileList.length === 0 && this.$refs.upload.uploadFiles.length === 0) {
        this.$message.warning(`请选择封面图！`)
        return
      }
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.form.start_time = +new Date(this.dateValue[0])
          this.form.end_time = +new Date(this.dateValue[1])
          this.form.is_limit_num = Number(this.isLimitPeople)
          const formData = new FormData()
          Object.keys(this.form).forEach(key => {
            formData.append(key, this.form[key])
          })
          if (this.$refs.upload.uploadFiles.length > 0) {
            formData.append('imageData', this.$refs.upload.uploadFiles[0].raw)
          }
          const id = this.$route.query.id
          const res = !id ? await createPost(formData) : await putItem(id, formData)
          if (res.code === 0) {
            this.$message({
              message: 'Create success',
              type: 'success'
            })

            this.$refs.postForm.resetFields()
          }
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleClick(poi) {
      console.log('poi', poi)
      this.form.latitude = poi.point.lat
      this.form.longitude = poi.point.lng
      this.form.country = 'CN'
      this.form.province = poi.province
      this.form.city = poi.city
      this.form.address = poi.address
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

