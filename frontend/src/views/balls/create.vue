<template>
  <div class="app-container">
    <el-form ref="postForm" enctype="multipart/form-data" :model="form" :rules="formRules" label-width="120px">
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
      <el-form-item label="球局地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="价格">
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
      <el-form-item label="球局描述" required prop="content">
        <el-input v-model="form.content" type="textarea" placeholder="please input content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create as createPost } from '@/api/ball'

export default {
  data() {
    return {
      dateValue: [+new Date(), +new Date()],
      fileList: [],
      form: {
        title: '',
        content: '',
        ball_type: undefined,
        share_type: undefined,
        address: '',
        price: 0,
        image_url: '',
        start_time: undefined,
        end_time: undefined,
        longitude: '',
        latitude: '',
        topic_id: '',
        user_id: 'admin'
      },
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
      shareTypeList: [{ id: 1, name: '公开' }, { id: 2, name: '仅自己可见' }, { id: 3, name: '好友可见' }]
    }
  },
  created() {
  },
  methods: {
    async onSubmit() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          this.form.start_time = +this.dateValue[0]
          this.form.end_time = +this.dateValue[1]
          const formData = new FormData()
          Object.keys(this.form).forEach(key => {
            formData.append(key, this.form[key])
          })
          formData.append('imageData', this.$refs.upload.uploadFiles[0].raw)
          const res = await createPost(formData)
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
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

