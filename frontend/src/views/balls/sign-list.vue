<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="真实姓名">
        <template slot-scope="scope">{{ scope.row.real_name }}</template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">{{ scope.row.nick_name }}</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.mobile_phone }}</template>
      </el-table-column>

      <el-table-column label="报名状态" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ball_sign && scope.row.ball_sign.sign_status === 1 ? '报名成功' : '等待中' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="报名时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deletePost(scope.row.id)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { destroy } from '@/api/ball-sign'
import { getItem } from '@/api/ball'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true

      const ballId = this.$route.query.id
      if (!ballId) {
        console.error('没有传id')
        return
      }
      const res = await getItem(ballId)
      this.list = res.data.listUser
      this.listLoading = false
    },
    async deletePost(id) {
      const res = await destroy(id)
      if (res.code === 0) {
        this.$message({
          message: 'Delete success',
          type: 'success'
        })

        this.fetchData()
      }
    }
  }
}
</script>
