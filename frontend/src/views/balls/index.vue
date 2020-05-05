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
      <el-table-column label="球局名称">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="球局内容">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="封面">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="100" fit="fill" :src="scope.row.image_url" />
        </template>
      </el-table-column>
      <el-table-column label="球局类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ getBallType(scope.row.ball_type) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operation" width="120">
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
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const { data } = await getList()
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
    getBallType(type) {
      switch (type) {
        case 1:
          return '4x4'
        case 2:
          return '3x3'
        case 3:
          return '5x5'
      }
    }
  }
}
</script>
