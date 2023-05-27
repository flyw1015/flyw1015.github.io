<template>
    <div class="user">
      <div class="header">
        <h1 class="title">学生信息管理</h1>
        <el-button type="primary" @click="showAddUserDialog = true">添加学生用户</el-button>
      </div>
      <el-table :data="list" border style="width: 100%" >
        <!-- <el-table-column prop="id" align="center" label="ID" width="180"></el-table-column> -->
        <el-table-column
      type="index"
      width="50">
    </el-table-column>
        <el-table-column prop="name" align="center" label="姓名" width="180"></el-table-column>
        <el-table-column prop="sex" align="center" label="性别" width="180"></el-table-column>
        <el-table-column prop="college" align="center" label="学院" width="180"></el-table-column>
        <el-table-column prop="classInfo" align="center" label="班级" width="180"></el-table-column>
        <el-table-column prop="num" align="center" label="学号" width="180"></el-table-column>
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
          <el-form-item label="学院：">
            <el-input v-model="newUser.college" clearable></el-input>
          </el-form-item>
          <el-form-item label="班级：">
            <el-input v-model="newUser.classInfo" clearable></el-input>
          </el-form-item>
          <el-form-item label="学号：">
            <el-input v-model="newUser.num" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">添加</el-button>
            <el-button @click="showAddUserDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="editDialogVisible" title="编辑学生信息" width="50%" @close="resetForm">
    <el-form :model="editedStudent" label-width="120px">
      <el-form-item label="姓名：">
        <el-input v-model="editedStudent.name"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-input v-model="editedStudent.sex"></el-input>
      </el-form-item>
      <el-form-item label="学院：">
        <el-input v-model="editedStudent.college"></el-input>
      </el-form-item>
      <el-form-item label="班级：">
        <el-input v-model="editedStudent.classInfo"></el-input>
      </el-form-item>
      <el-form-item label="学号：">
        <el-input v-model="editedStudent.num"></el-input>
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

import { getList,addUser,deleteUser,updateUser } from '@/api/table'

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
        college: "",
        classInfo: "",
        num: "",
        },
    showAddUserDialog: false,
    editDialogVisible: false,
    editedStudent: {
      id: "",
      name: "",
      sex: "",
      college: "",
      classInfo: "",
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
        college: "",
        classInfo: "",
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
    this.editedStudent = row;
    this.editDialogVisible = true;
  },
  handleUpdate() {
    updateUser(this.editedStudent).then(() => {
      this.editDialogVisible = false;
      this.resetForm();
      this.fetchData(); // 重新获取数据以更新表格
    });
  },
  resetForm() {
    this.editedStudent = {
      id: "",
      name: "",
      sex: "",
      college: "",
      classInfo: "",
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