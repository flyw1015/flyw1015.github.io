<template>
  <el-container>
    <el-main>
      <el-table :data="list" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" align="center" label="标题" sortable width="200"></el-table-column>
        <el-table-column prop="des" align="center" label="概述" show-overflow-tooltip sortable width="300"></el-table-column>
        <el-table-column prop="image" align="center" label="图片链接" width="180">
          <template slot-scope="scope">
            <el-image style="width: 150px; height: 150px;" fit="scale-down" :src="scope.row.image"></el-image>
          </template>
        </el-table-column>
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
      <el-button type="primary" @click="openPublishDialog = true">发布新闻资讯</el-button>
    </el-footer>

    <el-dialog :visible.sync="openPublishDialog" title="发布新闻" width="80%">
        <el-form @submit.native.prevent="addNews" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="newContent.title"></el-input>
        </el-form-item>
        <el-form-item label="概述">
          <el-input v-model="newContent.des"></el-input>
        </el-form-item>
        <el-form-item label="图片链接">
          <el-input v-model="newContent.image"></el-input>
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
            <el-button type="primary" @click="addNews">发布新闻</el-button>
            <el-button @click="openPublishDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="editDialogVisible" title="编辑资讯" width="80%" @close="resetForm">
    <el-form :model="editedNews" label-width="120px">
      <el-form-item label="标题：">
        <el-input v-model="editedNews.title"></el-input>
      </el-form-item>
      <el-form-item label="概述：">
        <el-input v-model="editedNews.des"></el-input>
      </el-form-item>
      <el-form-item label="图片链接：">
        <el-input v-model="editedNews.image"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <el-input v-model="editedNews.content"></el-input>
      </el-form-item>
      <el-form-item label="日期">
          <div class="block">
            <el-date-picker v-model="editedNews.createtime" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker>
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
import { getList,addNews,deleteNews,updateNews } from '@/api/news'
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
      newsList: [], // 从数据库获取的新闻列表
      list: null,
      listLoading: true,
      openPublishDialog:false,
      publishDialogVisible: false,
      editDialogVisible: false,
      newContent: {
        title: '',
        des: '',
        image: '',
        content: '',
        createtime:""
      },
      editedNews: {
        title: '',
        des: '',
        image: '',
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
        console.log(response.data)
      
      })
    },
    addNews() {//新增
    addNews(this.newContent).then(() => {
      this.openPublishDialog = false;
      this.newContent = {
        title: '',
        des: '',
        image: '',
        content: '',
        createtime:""
      };
      this.fetchData(); // 重新获取数据以更新表格
    });
  },
  handleDelete(id) {//删除
 
 deleteNews(id.id).then(() => {
   this.fetchData(); // 重新获取数据以更新表格
 });
},
handleEdit(row) {
 this.editedNews = row;
 this.editDialogVisible = true;
},
handleUpdate() {
 updateNews(this.editedNews).then(() => {
   this.editDialogVisible = false;
   this.resetForm();
   this.fetchData(); // 重新获取数据以更新表格
 });
},
resetForm() {
 this.editedNews = {
    title: '',
    des: '',
    image: '',
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
