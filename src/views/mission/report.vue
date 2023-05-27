<template>
    <div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" align="center" label="姓名" width="120"></el-table-column>
        <el-table-column prop="contact" align="center" label="联系方式" width="150"></el-table-column>
        <el-table-column prop="location" align="center" label="故障位置" width="150"></el-table-column>
        <el-table-column prop="repair" align="center" label="维修类型" width="120"></el-table-column>
        <el-table-column prop="note" align="center" label="备注"></el-table-column>
        <el-table-column prop="createtime" align="center" label="日期" sortable width="180">
          <template slot-scope="scope">
            <div>{{  scope.row.createtime.split("T")[0] + "  " + scope.row.createtime.split("T")[1].split('.')[0] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import { getList } from '@/api/mission'
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
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList('1').then(response => {
      
        this.list = response.data
        this.listLoading = false
      
      })
    },
},

}
</script>

<style scoped>
.el-main {
  padding: 24px;
}

.el-footer {
  text-align: right;
  padding: 12px 24px;
}
</style>