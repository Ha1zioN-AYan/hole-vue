import { createRouter, createWebHistory } from 'vue-router'

// 导入组件
import LoginVue from '@/views/Login.vue'
import Layout from '@/views/Layout.vue';

import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
import ArticleDerailsVue from '@/views/article/ArticleDetails.vue'
import UserComment from '@/views/user/UserComment.vue';

// 定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: Layout, redirect: '/article/manage', children: [
            { path: 'article/category', component: ArticleCategoryVue },
            { path: 'article/manage', component: ArticleManageVue },
            { path: 'user/info', component: UserInfoVue },
            { path: 'user/avatar', component: UserAvatarVue },
            { path: 'user/resetPassword', component: UserResetPasswordVue },
            { path: 'user/userComment', component: UserComment },
            { path: 'article/manage/detail', component: ArticleDerailsVue },
            { path: 'article/manage/detail', component: ArticleDerailsVue }
        ]
    }
]

//创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// 导出路由
export default router