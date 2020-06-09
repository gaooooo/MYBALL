<template>
  <div class="app-container">
    <el-form ref="postForm" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="话题名称" required prop="name">
        <el-input v-model="form.name" placeholder="please input name" />
      </el-form-item>
      <el-form-item label="话题描述" required prop="content">
        <el-input v-model="form.content" type="textarea" placeholder="please input content" />
      </el-form-item>
      <el-form-item label="话题类型" required prop="type">
        <el-select v-model="form.type" placeholder="please select type">
          <el-option v-for="type in typeList" :key="type.id" :label="type.name" :value="type.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="话题排序" required prop="order">
        <el-input v-model="form.order" placeholder="please input order" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create as createPost, getItem, putItem } from '@/api/topic'

export default {
  data() {
    return {
      form: {
        name: '',
        content: '',
        order: 99,
        type: 0
      },
      formRules: {
        title: [
          { required: true, message: 'please input title', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'please input content', trigger: 'blur' }
        ]
      },
      typeList: [{
        id: 0,
        name: '无分类'
      }, {
        id: 1,
        name: '球局'
      }, {
        id: 2,
        name: '比赛'
      }]
    }
  },
  async created() {
    // this.getUserList()
    const id = this.$route.query.id
    if (id) {
      const res = await getItem(id)
      if (res.code === 0) {
        this.form = res.data
      }
    }
  },
  methods: {
    // async getUserList() {
    //   const { data } = await getList()
    //   this.typeList = data.items || []
    // },
    async onSubmit() {
      this.$refs.postForm.validate(async valid => {
        if (valid) {
          const id = this.$route.query.id
          console.log(444, this.form)
          const res = !id ? await createPost(this.form) : await putItem(id, this.form)
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
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

