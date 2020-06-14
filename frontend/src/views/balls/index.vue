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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>

      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.image_url" />
        </template>
      </el-table-column>
      <el-table-column label="球局地址">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="球局名称">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="球局状态">
        <template slot-scope="scope">{{ scope.row.status === 0 ? '报名中' : '报名已结束' }}</template>
      </el-table-column>
      <el-table-column label="球局类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ getBallType(scope.row.ball_type) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="start_time" label="开始时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.start_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.end_time }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="signUpBall(scope.row.id)"
          >报名</el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="signUpList(scope.row.id)"
          >查看报名列表</el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editBall(scope.row.id)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deletePost(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-bind="pageOptions"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getList, destroy } from '@/api/ball'

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
      listLoading: true,
      pageOptions: {
        pageSizes: [10, 50, 100, 200, 300, 400],
        pageSize: 10,
        currentPage: 1,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { data } = await getList({
        pageSize: this.pageOptions.pageSize,
        currentPage: this.pageOptions.currentPage
      })
      this.list = data.items
      this.pageOptions.total = data.count
      this.listLoading = false
    },
    signUpBall(id) {
      this.$router.push({ path: '/balls/sign-up', query: { id }})
    },
    signUpList(id) {
      this.$router.push({ path: '/balls/sign-list', query: { id }})
    },
    editBall(id) {
      this.$router.push({ path: '/balls/create', query: { id }})
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
    },
    getBallType(type) {
      switch (type) {
        case 1:
          return '4x4'
        case 2:
          return '3x3'
        case 3:
          return '5x5'
      }
    },
    handleCurrentChange(val) {
      this.pageOptions.currentPage = val
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageOptions.pageSize = val
      this.fetchData()
    }
  }
}
</script>
