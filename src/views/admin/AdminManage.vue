<script setup lang="js">
import { articleArticleListService,articleDeleteService } from '@/api/article'
import { computed, onMounted, ref } from 'vue'
import {Delete} from '@element-plus/icons-vue'
// import { userInfoService } from '@/api/user.js'
import userUserInfoStore from '@/stores/userInfo.js'
import { ElMessage } from 'element-plus';
// 文章详细信息查询
const list = ref([]);
let userName = ref(null);
const total = ref(20) //总条数
const categorys = ref([]) //分类列表


import { articleAddService, articleAlertService, articleCategoryDeleteService, articleCategoryListService, articleListService, articleService } from '@/api/article';
import router from '@/router';
const articleCategoryList = async () => {
    let result = await articleCategoryListService();
    categorys.value = result.data
    console.log(categorys.value);

}
articleCategoryList()


const articleList = async () => {



const result = await articleArticleListService()
  // 渲染视图
  total.value = result.data
  list.value = result.data

  // 处理数据，给数据模型扩展一个属性artType
  for (let i = 0; i < list.value.length; i++) {
    let article = list.value[i]
    for (let j = 0; j < categorys.value.length; j++) {
      if (article.categoryId === categorys.value[j].id) {
        article.artType = categorys.value[j].artType
      }
    }
    const date = new Date(article.createTime)
    article.createTime = date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }
}
articleList()

const formattedDate = computed(() => {
    if (articles.value && articles.value.createTime) {
        const date = new Date(articles.value.createTime);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    return ''; // 如果没有有效的时间，返回一个空字符串或默认值
});

const requestDelete = async (record) => {
    try {

        await articleDeleteService(record.id);
        list.value = list.value.filter(item => item.id !== record.id);
        ElMessage.success('删除成功');
        router.push('/admin/manage');
    } catch (error) {
        ElMessage.error('删除失败');
    }
}
</script>
<template>
  <div class="common-layout">
    <el-card class="page-container">
      <template #header>
        <div class="header">
          <span>文章管理</span>
        </div>
      </template>
      <el-table :data="list" style="width: 100%">
        <el-table-column
          label="文章标题"
          width="400"
          prop="title"
        ></el-table-column>
        <el-table-column label="分类" prop="artType"></el-table-column>
        <el-table-column label="发表时间" prop="createTime"> </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button
              :icon="Delete"
              circle
              plain
              type="danger"
              @click="requestDelete(row)"
            ></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="没有数据" />
        </template>
      </el-table>
    </el-card>

  </div>
</template>
