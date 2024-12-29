<script setup>
import { commentAddService, commentGetService } from '@/api/comment';
import { userInfoService } from '@/api/user';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
// import { commentMapStore } from '@/stores/comment';
// const mapState = commentMapStore()
const comment = ref({
    info: '123',
    userName: 'a',
    articleId: '1'
})

const newComment = ref('')

// const getUserInfo = async () => {
//     let result = await userInfoService()
//     console.log(result.data);
//     comment.value.userName = result.data.username
//     console.log(comment.value.userName);
// }

const commentList = ref([
    { id: 1, userName: '用户A', info: '这是一个评论内容！' },
    { id: 2, userName: '用户B', info: '又一个评论！' }
])

// addComment()
const showComment = async () => {
    let id = window.location.search.includes('?row=') ? new URLSearchParams(window.location.search).get('row') : null;
    // console.log(id);
    const result = await commentGetService(id)
    // console.log(result.data);
    commentList.value = result.data
}

showComment()

const addComment = async () => {
    comment.value.articleId = window.location.search.includes('?row=') ? new URLSearchParams(window.location.search).get('row') : null;
    console.log(comment.value.articleId);
    // comment.value.userName
    // getUserInfo()
    let result = await userInfoService()
    // console.log(result.data);
    comment.value.userName = result.data.username
    comment.value.info = newComment
    // console.log(comment.value.userName);
    // console.log(comment.value);
    // 添加评论
    result = await commentAddService(comment.value)
    // console.log(result);
    ElMessage.success(result.data)

    // mapState.setMap(newComment.value, comment.value.userName)
    showComment()
    // console.log(mapState.data);
    // console.log(1);
    newComment.value = ''
}
// console.log(mapState.data);

</script>

<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>评论区</span>
            </div>
            <div v-for="comment in commentList" :key="comment.id" class="text item">
                <div style="background-color:pink;">
                    <p>{{ comment.info }}</p>
                    <span class="demo-text-color">—— 用户名：{{ comment.userName }}</span>
                </div>
            </div>
            <el-input v-model="newComment" placeholder="请输入评论内容" class="input-with-select"
                @keyup.enter.native="addComment">
            </el-input>
            <el-button type="primary" @click="addComment">发表评论</el-button>
        </el-card>
    </div>
</template>

<style scoped>
.item {
    margin-bottom: 20px;
}

.input-with-select {
    margin-bottom: 15px;
    margin-right: 100px;
}
</style>