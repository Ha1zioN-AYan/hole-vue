import request from '@/utils/request.js'
import { resultProps } from 'element-plus'

// 添加评论
export const commentAddService = (comment) => {
    return request.post('/comment', comment)
}

// 根据文章id获取评论
export const commentGetService = (id) => {
    return request.get('/comment/get?id=' + id)
}

// 根据用户名获取评论
export const commentNameService = (name) => {
    return request.get('/comment/name?name=' + name)
}

// 根据评论id删除评论
export const commentDeleteService = (id) => {
    return request.delete('/comment/delete?id=' + id)
}
