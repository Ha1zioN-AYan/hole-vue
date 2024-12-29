<script setup>
import { ref } from 'vue'
import userUserInfoStore from '@/stores/userInfo';
import { commentDeleteService, commentNameService } from '@/api/comment';
import { articleService } from '@/api/article';
import { ElMessage, ElMessageBox } from 'element-plus';
const userInfoStore = userUserInfoStore()
const commentList = ref([
    { id: 1, userName: '用户A', info: '这是一个评论内容！' },
    { id: 2, userName: '用户B', info: '又一个评论！' }
])

const getComment = async () => {
    // console.log(userInfoStore.info.username)
    const username = userInfoStore.info.username
    console.log(username);

    const result = await commentNameService(username)
    console.log(result.data);
    commentList.value = result.data

    for (let index = 0; index < commentList.value.length; index++) {
        let title = await articleService(commentList.value[index].articleId);
        commentList.value[index].title = title.data.title
        // console.log(commentList.value[index]);
    }
}
// 获得评论列表
getComment()

//删除分类
const deleteCategory = (row) => {
    ElMessageBox.confirm(
        '你确认删除该评论吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //用户点击了确认
            console.log(row.id);
            let result = await commentDeleteService(row.id)
            console.log(result);
            // ElMessage.success(result.message ? result.message : '删除成功')
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
            //再次调用getComment，获取所有评论
            getComment()
        })
        .catch(() => {
            //用户点击了取消
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })

}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>删除评论</span>
            </div>
        </template>
        <el-table :data="commentList" style="width: 100%">
            <el-table-column label="文章标题" width="300" prop="title"> </el-table-column>
            <el-table-column label="内容" prop="info"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <!-- <router-link :to="{ path: 'manage/detail', query: { row: row.id } }">删除评论</router-link> -->
                    <!-- <router-link :to="{ path: 'comment/delete', query: { row: row.id } }">删除评论</router-link> -->
                    <el-button @click="deleteCategory(row)">删除评论</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>