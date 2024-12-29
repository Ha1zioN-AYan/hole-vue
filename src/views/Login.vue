<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false) //true为注册表单，false为登录表单

// 定义数据类型
const registerDate = ref({
    username: '',
    password: '',
    rePassword: ''
})

// 校验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== registerDate.value.password) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }

}

// 定义表单校验规则
const rules = {
    username: [
        { required: true, message: '请输入5-16位的用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符串', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符串', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

// 消息提示
import { ElMessage } from 'element-plus'

// 调用后台接口完成注册
import { userRegisterService } from '@/api/user'
const register = async () => {
    // try {
    // registerDate是一个响应式对象需要使用.value取值 
    let result = await userRegisterService(registerDate.value)
    console.log(result.message);
    // result.message ? result.message : '注册成功'
    if (result.message)
        ElMessage.success('注册成功')
    // } catch (error) {
    //     ElMessage.error("请输入5-16位的用户名和长度为5~16位非空字符串的密码");

    // }
}


// 绑定数据，复用注册表单的数据模型
// 表单数据校验
// 登录函数
import { userLoginService } from '@/api/user'
import { userTokenStore } from '@/stores/token';
import router from '@/router';
const tokenStore = userTokenStore()
const login = async () => {
    // 调用接口，完成登录
    let result = await userLoginService(registerDate.value)

    // alert(result.message ? result.message : '登录成功')
    if (result.message)
        ElMessage.success('登录成功')

    // 把得到的token存储到pinia中
    tokenStore.setToken(result.data)
    router.push('/')
}



</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerDate" :rules='rules'>
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>

                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerDate.username"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerDate.password"></el-input>
                </el-form-item>

                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerDate.rePassword"></el-input>
                </el-form-item>

                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" :model="registerDate" v-else :rules="rules">
                <h1>树洞</h1>
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerDate.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerDate.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background:
            url('@/assets/Hole_Background_new.png') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>