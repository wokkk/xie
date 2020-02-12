<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>配置关联功能</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='containers'>
            <!-- 条件搜索 -->
            <div class="topContent">
                <el-select v-model="searchData.corporateName" filterable placeholder="请选择公司名称" clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="searchData.productType" filterable placeholder="请选择产品类型" clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-input placeholder="请输入公司备注" v-model="searchData.companyRemarks" clearable></el-input>
                <el-input placeholder="请输入产品名称" v-model="searchData.productName" clearable></el-input>
                <el-input placeholder="请输入方案页面配置名称" v-model="searchData.planPageConfigName" clearable></el-input>
                <div class="input-item-group">
                    <el-input placeholder="请输入前端页面配置名称" v-model="searchData.h5PageConfigName" clearable></el-input>
                    <el-input placeholder="请输入系统来源配置名称" v-model="searchData.system" clearable></el-input>
                    <el-input placeholder="请输入支付配置名称" v-model="searchData.payConfigName" clearable></el-input>
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button type="success" icon='el-icon-plus' @click="addInfo">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
                </div>
            </div>
            <!-- 表单数据 -->
            <div class="formData">
                <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column width="100" label="公司ID" type='index' show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="corporateName" label="公司名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="productName" label="产品名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="planPageConfigName" label="方案页配置名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="h5PageConfigName" label="前端页配置名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="payConfigName" label="支付配置名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="140" prop="system" label="系统来源配置名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="companyRemarks" label="公司备注" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="founder" label="创建人" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="createTime" label="创建时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope='scope'>
                            <el-button type="primary" icon="el-icon-edit" @click="editInfo(scope.row)" circle>
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
            <el-dialog title="新增" :visible.sync="addShowFrame" :close-on-click-modal='false' @close="closeAddData"
                width="50%">
                <el-form :model="addInfoData">
                    <el-form-item label="公司配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.companyConfig" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="方案页面配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.planPageConfigName" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="前端页面配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.h5PageConfigName" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="支付相关配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.payConfigName" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="系统来源配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.system" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addShowFrame = false">取 消</el-button>
                    <el-button type="primary" @click="addInfoBtn">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 修改弹出框 -->
            <el-dialog title="修改" :visible.sync="editShowFrame" :close-on-click-modal='false' @close="closeEditData" width="50%">
                <el-form :model="editInfoData">
                    <el-form-item label="公司配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.companyConfig" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="方案页面配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.planPageConfigName" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="前端页面配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.h5PageConfigName" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="支付相关配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.payConfigName" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                    <el-form-item label="系统来源配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.system" clearable></el-input>
                        <el-button type="primary">请选择</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editShowFrame = false">取 消</el-button>
                    <el-button type="primary" @click="editInfoBtn">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addShowFrame: false,//增加弹框
                editShowFrame: false,//修改弹框
                formLabelWidth: '140px',
                searchData: { //条件搜索
                    corporateName: '',//公司名称
                    productType: '', //产品类型
                    companyRemarks: '',//公司备注
                    productName: '',//产品名称
                    planPageConfigName: '',//方案页面配置名称
                    h5PageConfigName: '',//前端页面配置
                    system: '',//系统来源
                    payConfigName: '',//支付配置
                },
                tableData: [{
                    id: 1,
                    corporateName: '上海南翔',
                    productName: '人寿',
                    planPageConfigName: '1方案',
                    h5PageConfigName: '前度配置',
                    payConfigName: '显示支付',
                    system: '系统',
                    companyRemarks: '公司备注',
                    founder: '王小虎',
                    createTime: '2016-05-02',
                }],
                addInfoData: { //增加信息数据
                    companyConfig: '',
                    planPageConfigName: '',
                    h5PageConfigName: '',//前端页面配置
                    system: '',//系统来源
                    payConfigName: '',//支付配置
                },
                editInfoData: {
                    companyConfig: '',
                    planPageConfigName: '',
                    h5PageConfigName: '',//前端页面配置
                    system: '',//系统来源
                    payConfigName: '',//支付配置
                },
                options: [{
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }],
                rowInfoData:{},//当前行的数据
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
            //新增用户信息
            addInfo() {
                this.addShowFrame = true;
            },
            //增加确定按钮
            addInfoBtn() {
                console.log("增加成功")
                this.addShowFrame = false;
                this.addInfoData = {}
            },
            //监听增加弹框关闭事件
            closeAddData() {
                this.addInfoData = {} //把数据清空
            },
            //修改用户信息
            editInfo(userInfo) {
                this.rowInfoData = userInfo
                this.editShowFrame = true;
                this.editInfoData = userInfo
            },
            // 修改确定按钮
            editInfoBtn() {
                console.log("修改成功")
                this.editShowFrame = false;
                this.editInfoData = {}
            },
            //监听修改弹框关闭事件
            closeEditData(){
                console.log(2545454)
                this.editInfoData = this.rowInfoData
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-select {
        margin-right: 15px;
        width: 195px;
    }

    /* 面板 */
    .containers {
        background-color: #ffffff;
        padding: 20px;
        min-width: 1052px;
        border-radius: 2px;
    }

    .topContent {
        margin-top: 10px;
    }

    .formData {
        margin-top: 15px;
    }

    .pagination {
        margin-top: 15px;
    }

    .el-input {
        width: 195px;
        margin-right: 15px;
    }

    .input-item-group {
        margin-top: 15px;
    }

    /* 弹框输入框长度 */
    .lengthWidth {
        width: 70%;
    }
</style>