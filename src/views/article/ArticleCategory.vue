<script setup>
import articleDetails from '@/views/article/ArticleDetails.vue'
import {
    Check,
    Delete,
    Edit,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([])
const articleList = ref([])

// 文章详细信息列表查询
import { articleCategoryAddService, articleCategoryDeleteService, articleArticleListService, articleCategoryUpdateService } from '@/api/article'
const articleCategoryList = async () => {
    let result = await articleArticleListService();
    articleList.value = result.data.filter(article => article.state === '已发布');
    // articleList.value.
    // console.log(result.data);
}

// 调用方法显示文章分类
articleCategoryList()

//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    artType: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    artType: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ]
}

// 调用接口，添加表单
import { ElMessage, ElMessageBox } from 'element-plus';

const addCategory = async () => {
    // 调用接口
    let result = await articleCategoryAddService(categoryModel.value)
    ElMessage.success(result.message ? result.message : '添加成功')

    // 刷新文章分类
    articleCategoryList()

    // 关闭界面
    dialogVisible.value = false
}

// 定义变量，控制添加分类弹窗标题的内容
const title = ref('')

// 展示编辑弹窗
const showDialog = (row) => {
    dialogVisible.value = true
    title.value = '编辑分类'
    // 数据拷贝
    categoryModel.value.artType = row.artType

    // 扩招id属性，将来需要传递给后台，完成分类的修改
    categoryModel.value.id = row.id;
}

// 编辑分类
const updateCategory = async () => {
    // 调用接口
    let result = await articleCategoryUpdateService(categoryModel.value)
    ElMessage.success(result.message ? result.message : '修改成功')

    articleCategoryList()
    dialogVisible.value = false
}

// 清空模型的数据
const clearDate = () => {
    categoryModel.value.artType = ''
}

// //删除分类
// const deleteCategory = (row) => {
//     ElMessageBox.confirm(
//         '你确认删除该分类信息吗？',
//         '温馨提示',
//         {
//             confirmButtonText: '确认',
//             cancelButtonText: '取消',
//             type: 'warning',
//         }
//     )
//         .then(async () => {
//             //用户点击了确认
//             console.log(row.id);
//             let result = await articleCategoryDeleteService(row.id)
//             console.log(result);
//             // ElMessage.success(result.message ? result.message : '删除成功')
//             ElMessage({
//                 type: 'success',
//                 message: '删除成功'
//             })
//             //再次调用articleCategoryList，获取所有文章分类
//             articleCategoryList()
//         })
//         .catch(() => {
//             //用户点击了取消
//             ElMessage({
//                 type: 'info',
//                 message: '取消删除',
//             })
//         })

// }
</script>


<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章列表</span>
                <!-- <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true; title = '添加分类'">添加分类</el-button>
                </div> -->
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column label="序号" width="400" type="index"> </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <!-- <articleDetails :row=row> </articleDetails> -->
                    <router-link :to="{ path: 'manage/detail', query: { row: row.id } }">查看</router-link>
                    <!-- <a href="manage/Details">查看</a> -->
                    <!-- <el-button type="success" :icon="Check" circle /> -->
                    <!-- <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button> -->
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <!-- <el-dialog v-model="dialogVisible" :title=title width="30%" @close="clearDate()">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="artType">
                    <el-input v-model="categoryModel.artType" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title === '添加分类' ? addCategory() : updateCategory()"> 确认
                    </el-button>
                </span>
            </template>
        </el-dialog> -->
    </el-card>

</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>