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
      <el-table-column label="用户id">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="用户昵称">
        <template slot-scope="scope">{{ scope.row.nick_name }}</template>
      </el-table-column>
      <el-table-column label="openid" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.openid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="注册时间" width="200">
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

    <el-pagination
      v-bind="pageOptions"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getList, destroy } from '@/api/user'

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
