<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>保险产品表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='containers'>
            <!-- 查询条件 -->
            <div class="topContent">
                <el-select v-model="searchData.productName" filterable placeholder="请输入产品名称" clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="searchData.productType" filterable placeholder="请选择产品类型" clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="success" icon='el-icon-plus' @click="addLogFormVisible">新增</el-button>
                <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
            </div>
            <!-- 表格数据 -->
            <div class="formData">
                <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type='index' label="产品编码" width="120">
                        <!-- <template slot-scope="scope">{{ scope.row.id }}</template> -->
                    </el-table-column>
                    <el-table-column prop="productName" label="产品名称" width="120">
                    </el-table-column>
                    <el-table-column prop="productType" label="产品类型" width="120">
                    </el-table-column>
                    <el-table-column prop="computedType" label="是否为年会产品风险保额计算类型" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="founder" label="创建人" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="createTime" label="创建时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope='scope'>
                            <el-button type="primary" icon="el-icon-edit" @click="setDialogForm(scope.row)" circle>
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页处理 -->
            <div class="pagination">
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper" :total="100">
                    </el-pagination>
                </div>
            </div>
            <!-- 新增弹出框 -->
            <el-dialog title="新增" :visible.sync="addShowFrame" :close-on-click-modal='false' width='50%'>
                <el-form :model="addInfoData">
                    <el-form-item label="产品类型" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.productType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.productName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="险种类型" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.insuranceType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="风险保额计算类型" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.computedType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否为年金产品" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.yearProduct" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addShowFrame = false">取 消</el-button>
                    <el-button type="primary" @click="addShowFrame = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 修改弹出框 -->
            <el-dialog title="修改" :visible.sync="editShowFrame" :close-on-click-modal='false' width='50%'>
                <el-form :model="editInfoData">
                    <el-form-item label="产品类型" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.productType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.productName" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="险种类型" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.insuranceType" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="风险保额计算类型" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.computedType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否为年金产品" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.yearProduct" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editShowFrame = false">取 消</el-button>
                    <el-button type="primary" @click="editShowFrame = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addShowFrame: false, //新增弹框
                editShowFrame: false,//修改弹框
                addInfoData: { //新增数据
                    productType: '',  //产品类型
                    productName: '', //产品名称
                    insuranceType: '', //险种类型
                    computedType: '', //保额计算类型
                    yearProduct: '', //是否为年金产品
                },
                editInfoData: {//修改弹框数据
                    productType: '',  //产品类型
                    productName: '', //产品名称
                    insuranceType: '', //险种类型
                    computedType: '', //保额计算类型
                    yearProduct: '', //是否为年金产品
                },
                searchData: {
                    productType: '',
                    productName: '',
                },
                formLabelWidth: '140px',
                options: [{
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }],
                tableData: [{
                    id: 1,
                    productName: '商业保险',
                    productType: '终身保险',
                    computedType: 88888,
                    createTime: '2016-05-02',
                    founder: '王小虎',
                }],
                multipleSelection: [],
                currentPage4: 4,
            }
        },
        methods: {
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //修改用户信息
            setDialogForm(userInfo) {
                this.editInfoData = userInfo
                this.editShowFrame = true
            },
            //新增用户信息
            addLogFormVisible() {
                this.addShowFrame = true;
            }
        }
    }
</script>

<style lang="less" scoped>
   
    /* 面板 */
    .containers {
        background-color: #ffffff;
        padding: 20px;
        min-width: 1052px;
        border-radius: 2px;
    }

    .el-select {
        margin-right: 15px;
        width: 195px;
    }
    .topContent {
        margin-top:10px;
    }

    .formData {
        margin-top: 15px;
    }

    .pagination {
        margin-top: 15px;
    }
    .el-input{
        width: 195px;
    }
    /* 弹框输入框长度 */
    .lengthWidth {
        width: 70%;
    }
     /* /deep/.el-form-item__label{
        color:#000000;
    } */
</style>