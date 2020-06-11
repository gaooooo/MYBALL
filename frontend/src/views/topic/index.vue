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
      <el-table-column label="背景图">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.image_url" />
        </template>
      </el-table-column>
      <el-table-column label="name">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="发布者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.openid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布时间" width="200">
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
            @click.native.prevent="edit(scope.row.id)"
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
import { getList, destroy } from '@/api/topic'

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
    edit(id) {
      this.$router.push({ path: '/speaking/create-topic', query: { id }})
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
