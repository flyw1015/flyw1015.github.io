<template>
    <el-container>
      <el-main>
        <el-table :data="list" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="title" align="center" label="标题" sortable width="200"></el-table-column>
          <el-table-column prop="content" align="center" label="内容" show-overflow-tooltip width="300"></el-table-column>
          <el-table-column prop="createtime" align="center" label="日期" sortable width="200">
            <template slot-scope="scope">
              <div>{{  scope.row.createtime.split("T")[0] + "  " + scope.row.createtime.split("T")[1].split('.')[0] }}</div>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="180" align="center">
            <template #default="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-button type="primary" @click="openPublishDialog = true">发布通知公告</el-button>
      </el-footer>
  
      <el-dialog :visible.sync="openPublishDialog" title="发布通知" width="80%">
          <el-form @submit.native.prevent="addNotice" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="newContent.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="newContent.content" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <div class="block">
              <el-date-picker v-model="newContent.createtime" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker>
            </div>
          </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addNotice">发布通知公告</el-button>
              <el-button @click="openPublishDialog = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="editDialogVisible" title="编辑通知公告" width="80%" @close="resetForm">
      <el-form :model="editedNotice" label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="editedNotice.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="editedNotice.content"></el-input>
        </el-form-item>
        <el-form-item label="日期">
            <div class="block">
              <el-date-picker v-model="editedNotice.createtime" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker>
            </div>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdate">确认</el-button>
      </span>
    </el-dialog>
    </el-container>
  </template>
  
  <script>
  import { getList,updateNotice, deleteNotice, addNotice } from '@/api/notice'
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
        openPublishDialog:false,
        publishDialogVisible: false,
        editDialogVisible: false,
        newContent: {
          title: '',
          content: '',
          createtime:""
        },
        editedNotice: {
          title: '',
          content: '',
          createtime:""
      },
      };
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data
          this.listLoading = false
        })
      },
      addNotice() {//新增
      addNotice(this.newContent).then(() => {
        this.openPublishDialog = false;
        this.newContent = {
          title: '',
          content: '',
          createtime:""
        };
        this.fetchData(); // 重新获取数据以更新表格
      });
    },
    handleDelete(id) {//删除
   
   deleteNotice(id.id).then(() => {
     this.fetchData(); // 重新获取数据以更新表格
   });
  },
  handleEdit(row) {
   this.editedNotice = row;
   this.editDialogVisible = true;
  },
  handleUpdate() {
   updateNotice(this.editedNotice).then(() => {
     this.editDialogVisible = false;
     this.resetForm();
     this.fetchData(); // 重新获取数据以更新表格
   });
  },
  resetForm() {
   this.editedNotice= {
      title: '',
      content: '',
      createtime:""
   };
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
  