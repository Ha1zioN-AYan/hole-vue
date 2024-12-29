<script setup>
import { ref } from 'vue'
import { userTokenStore } from '@/stores/token'
const tokenStore = userTokenStore()
const userPassword = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})
// 修改个人信息
import { sendOldPasswordService } from '@/api/user';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import userUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = userUserInfoStore()
const router = useRouter()
const changePassword = async () => {
    try {
        await sendOldPasswordService(userPassword.value, tokenStore.token);
        ElMessage.success('修改成功');
        // 1.清空pinia中存储的token和个人信息
        tokenStore.removeToken()

        userInfoStore.removeInfo()

        // 2.跳转到登录页面
        router.push('/login')
        ElMessage.success('请重新登录');

    } catch (error) {
        ElMessage.error('修改失败: ' + error.message);
    }
}
// console.log(tokenStore.token);

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userPassword" label-width="100px" size="large">

                    <el-form-item label="旧密码">
                        <el-input type="password" v-model="userPassword.old_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password" v-model="userPassword.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码">
                        <el-input type="password" v-model="userPassword.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changePassword()">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>