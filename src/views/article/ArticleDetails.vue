<script setup>
import { articleService, articleUserService } from '@/api/article'
import { computed, onMounted, ref } from 'vue'
// import { userInfoService } from '@/api/user.js'
import userUserInfoStore from '@/stores/userInfo.js'
// 文章详细信息查询
const row = ref(null);
let userName = ref(null);
const articleList = ref({
    "id": 2,
    "title": "Test",
    "content": "Test",
    "state": "Test",
    "categoryId": 11,
    "createUser": 3,
    "createTime": "2024-08-17T16:51:53",
    "updateTime": "2024-08-17T16:51:53"
})
onMounted(async () => {
    // 从路由查询参数中获取row值  
    row.value = window.location.search.includes('?row=') ? new URLSearchParams(window.location.search).get('row') : null;
    console.log(row.value);

    // 或者，如果在使用vue-router，可以这样获取：  
    // import { useRoute } from 'vue-router';  
    // const route = useRoute();  
    // row.value = route.query.row;  

    // 使用row值来获取文章详情  
    if (row.value) {
        try {
            const result = await articleService(row.value);
            articleList.value = result.data; // result.data是一个文章详细信息
            console.log(articleList.value.title); //为什么这里可以正常输出
            // row = articleList.value
            // console.log(row);

        } catch (error) {
            console.error('Failed to fetch article details:', error);
        }
    }

    // 获取用户详细信息 
    // console.log(articleList.value.createUser);
    // alert(articleList.value.createUser);
    userName.value = await articleUserService(articleList.value.createUser)
    // console.log(userName.value.data.username);
    userName.value = userName.value.data.username


});

const formattedDate = computed(() => {
    if (articleList.value && articleList.value.createTime) {
        const date = new Date(articleList.value.createTime);
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

import Comments from '@/components/Comments.vue'

</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <h1 style="text-align: center;">{{ articleList.title }}</h1>
            </el-header>
            <el-main>
                <p>发布时间: {{ formattedDate }}</p>
                <p> 发布人: {{ userName }}</p>
                <div class="articleImg" style="width: 100%;">
                    <img :src="articleList.coverImg" alt="图片加载错误">
                </div>
                <div>
                    <p class="article">{{ articleList.content }}</p>
                </div>
            </el-main>
        </el-container>
        <Comments />
    </div>
</template>

<style>
.articleImg {
    text-align: center;
    /* 这对于图片来说不是必需的，但如果是文本或其他行内内容则有用 */
    height: 500px;
    line-height: 500px;
    /* 如果需要垂直居中文本内容，但不是图片 */
    overflow: hidden;
    /* 防止内容溢出 */
}

.articleImg img {
    display: block;
    /* 去除图片下方的默认空白 */
    margin: 0 auto;
    /* 使图片水平居中 */
    max-width: 90%;
    /* 保持图片宽度不超过容器宽度 */
    height: 90%;
    /* 保持图片宽高比 */
}
</style>
