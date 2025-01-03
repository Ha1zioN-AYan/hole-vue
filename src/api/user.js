// 导入request.js请求工具
import request from '@/utils/request'
import axios from 'axios';
// 提供调用注册接口的函数
export const userRegisterService = (registerDate) => {
    // 借助于URLSearchParams完成传递
    const params = new URLSearchParams()
    for (let key in registerDate) {
        params.append(key, registerDate[key])
    }
    // console.log(params);

    return request.post('/user/register', params);
}

// 提供调用登录接口的函数
export const userLoginService = (loginDate) => {
    // 借助于URLSearchParams完成传递
    const params = new URLSearchParams()
    for (let key in loginDate) {
        params.append(key, loginDate[key])
    }
    return request.post('/user/login', params);
}

// 获取用户详细信息
export const userInfoService = () => {
    return request.get('/user/userInfo')
}

// 修改用户信息
export const userInfoUpdateService = (userInfoData) => {
    return request.put('/user/update', userInfoData)
}

// 修改用户头像
export const userAvatarUpdateService = (avatarUrl) => {
    const params = new URLSearchParams()
    params.append('avatarUrl', avatarUrl)
    return request.patch('/user/updateAvatar', params)
}

// 修改密码
export const sendOldPasswordService = (userPassword, token) => {
    console.log(userPassword);

    return request.post('/user/updatePwd', userPassword, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // 假设你的 token 是这样传递的  
        }
    });
} 