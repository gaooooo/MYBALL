<template>
  <div class="app-container">
    <h2>球局名称: {{ ballInfo.title }}</h2>
    <el-form ref="signUpForm" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="真实姓名" required prop="real_name">
        <el-input v-model="form.real_name" placeholder="please input real_name" />
      </el-form-item>
      <el-form-item label="手机号" required prop="mobile_phone">
        <el-input v-model="form.mobile_phone" placeholder="please input mobile_phone" />
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">同意免责声明</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary submit" @click.stop="onSubmit">{{ !ballInfo.isFull ? '报名' : '等待' }}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserByOpenid } from '@/api/user'
import { signUp as signUpPost, getItem } from '@/api/ball'
// import { getToken } from '@/utils/auth' // get token from cookie
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      checked: true,
      form: {
        real_name: '',
        mobile_phone: ''
      },
      formRules: {
        real_name: [
          { required: true, message: 'please input real_name', trigger: 'blur' }
        ],
        mobile_phone: [
          { required: true, message: 'please input mobile_phone', trigger: 'blur' }
        ]
      },
      ballInfo: {
        title: '',
        isFull: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'openid',
      'userRealName',
      'userMobilePhone'
    ])
  },
  async created() {
    Promise.all([await this.initUsersInfo(), await this.getBallInfo()])
  },
  methods: {
    async getBallInfo() {
      const ballId = this.$route.query.id
      if (!ballId) {
        console.error('没有传id')
        return
      }
      const res = await getItem(ballId)
      const ball = res.data
      this.ballInfo.title = ball.title
      if (ball.people_num === ball.listUser.length) {
        this.ballInfo.isFull = true
      }
    },
    async initUsersInfo() {
      Object.assign(this.form, {
        real_name: this.userRealName,
        mobile_phone: this.userMobilePhone
      })
      // 报名信息留存
      if (!this.form.real_name || !this.form.mobile_phone) {
        const res = await getUserByOpenid({ openid: this.openid })
        const { real_name, mobile_phone } = res.data
        console.log(real_name, mobile_phone)
        Object.assign(this.form, {
          real_name, mobile_phone
        })

        // TODO 写入内存，有个问题是代报名
        this.$store.commit('SET_USER_REAL_NAME', real_name)
        this.$store.commit('SET_USER_MOBILE', mobile_phone)
      }
    },
    async onSubmit() {
      // TODO 无法代报名
      const ballId = this.$route.query.id
      if (!ballId) {
        console.error('没有传id')
        return
      }
      this.$refs.signUpForm.validate(async valid => {
        if (valid) {
          await signUpPost({
            ball_id: ballId,
            sign_status: !this.ballInfo.isFull ? 1 : 0,
            ...this.form
          })

          this.$message({
            message: '报名成功',
            type: 'success'
          })

          this.$refs.signUpForm.resetFields()
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

