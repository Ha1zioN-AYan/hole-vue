// import { userTokenStore } from '@/stores/token'
import request from '@/utils/request.js'
import { resultProps } from 'element-plus'

// 文章分类列表查询
export const articleCategoryListService = () => {
  // const tokenStore = userTokenStore()
  // return request.get('/category', {
  //     // 在pinia中定义的响应式数据都不需要.value
  //     headers: { 'Authorization': tokenStore.token }
  // })
  return request.get('/category')
}

// 文章详细信息列表查询
export const articleArticleListService = () => {
  // const tokenStore = userTokenStore()
  // return request.get('/category', {
  //     // 在pinia中定义的响应式数据都不需要.value
  //     headers: { 'Authorization': tokenStore.token }
  // })
  return request.get('/article/articleList')
}

// 文章详细信息查询
export const articleService = (id) => {
  // const tokenStore = userTokenStore()
  // return request.get('/category', {
  //     // 在pinia中定义的响应式数据都不需要.value
  //     headers: { 'Authorization': tokenStore.token }
  // })
  return request.get('/article/detail?id=' + id)
}

//添加文章分类
export const articleCategoryAddService = (categoryDate) => {
  return request.post('/category', categoryDate)
}

//修改文章分类
export const articleCategoryUpdateService = (categoryDate) => {
  return request.put('/category', categoryDate)
}

//删除文章分类
export const articleCategoryDeleteService = (id) => {
  return request.delete('/article?id=' + id)
}

// 文章列表查询
export const articleListService = (params) => {
  return request.get('/article', { params: params })
}

// 文章添加
export const articleAddService = (articleDate) => {
  return request.post('/article', articleDate)
}

// 文章修改
export const articleAlertService = (articleDate) => {
  return request.put('/article', articleDate)
}

// 根据文章获取用户信息
export const articleUserService = (id) => {
  return request.get('/article/user?id=' + id)
}

export const articleDeleteService = (id) => {
  return request.delete('/article/' + id)
}
