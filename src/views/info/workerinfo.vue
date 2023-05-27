<template>
    <div class="user">
      <div class="header">
        <h1 class="title">维修人员信息管理</h1>
        <el-button type="primary" @click="showAddUserDialog = true">添加维修人员信息</el-button>
      </div>
      <el-table :data="list" border style="width: 100%" >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" align="center" label="姓名" width="180"></el-table-column>
        <el-table-column prop="sex" align="center" label="性别" width="180"></el-table-column>
        <el-table-column prop="category" align="center" label="工作领域" width="180"></el-table-column>
        <el-table-column prop="num" align="center" label="人员编号" width="180"></el-table-column>
        <el-table-column align="center" label="操作" width="180">
        <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
      <el-dialog :visible.sync="showAddUserDialog" title="添加用户" width="50%">
        <el-form @submit.native.prevent="addUser" label-width="120px">
          <el-form-item label="姓名：">
            <el-input v-model="newUser.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-input v-model="newUser.sex" clearable></el-input>
          </el-form-item>
          <el-form-item label="工作领域：">
            <el-input v-model="newUser.category" clearable></el-input>
          </el-form-item>

          <el-form-item label="人员编号：">
            <el-input v-model="newUser.num" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">添加</el-button>
            <el-button @click="showAddUserDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="editDialogVisible" title="编辑维修人员信息" width="50%" @close="resetForm">
    <el-form :model="editedWorker" label-width="120px">
      <el-form-item label="姓名：">
        <el-input v-model="editedWorker.name"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-input v-model="editedWorker.sex"></el-input>
      </el-form-item>
      <el-form-item label="工作领域：">
        <el-input v-model="editedWorker.category"></el-input>
      </el-form-item>
      <el-form-item label="人员编号：">
        <el-input v-model="editedWorker.num"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleUpdate">确认</el-button>
    </span>
  </el-dialog>
    </div>
  </template>
  
<script>

import { getList,addUser,deleteUser,updateUser } from '@/api/worker'

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
      newUser: {
        id:"",
        name: "",
        sex:"",
        category:"",
        num: "",
        },
    showAddUserDialog: false,
    editDialogVisible: false,
    editedWorker: {
      id: "",
      name: "",
      sex: "",
      category:"",
      num: "",
    },
    }
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
    addUser() {//新增
    addUser(this.newUser).then(() => {
      this.showAddUserDialog = false;
      this.newUser = {
        id: "",
        name: "",
        sex: "",
        category:"",
        num: "",
      };
      this.fetchData(); // 重新获取数据以更新表格
    });
  },
  handleDelete(id) {//删除
 
    deleteUser(id.id).then(() => {
      this.fetchData(); // 重新获取数据以更新表格
    });
  },
  handleEdit(row) {
    this.editedWorker = row;
    this.editDialogVisible = true;
  },
  handleUpdate() {
    updateUser(this.editedWorker).then(() => {
      this.editDialogVisible = false;
      this.resetForm();
      this.fetchData(); // 重新获取数据以更新表格
    });
  },
  resetForm() {
    this.editedWorker = {
      id: "",
      name: "",
      sex: "",
      category:"",
      num: "",
    };
  },
}
}
  </script>

  <style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  
  .title {
    margin: 0;
  }
  </style>