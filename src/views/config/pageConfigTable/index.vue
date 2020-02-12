<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>前端页面配置表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='containers'>
            <!-- 条件搜索 -->
            <div class="topContent">
                <el-select v-model="searchData.openAredress" filterable placeholder="请选择是否展示招商信诺全部地址" clearable>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                </el-select>
                <el-select v-model="searchData.openShare " filterable placeholder="请选择是否展示案例分享" clearable>
                    <el-option label="是" value="3"></el-option>
                    <el-option label="否" value="4"></el-option>
                </el-select>
                <el-select v-model="searchData.imgYzm" filterable placeholder="请选择是否需要图形验证" clearable>
                    <el-option label="是" value="5"></el-option>
                    <el-option label="否" value="6"></el-option>
                </el-select>
                <el-select v-model="searchData.openInsuranceDate" filterable placeholder="请选择是否展示保险期" clearable>
                    <el-option label="是" value="7"></el-option>
                    <el-option label="否" value="8"></el-option>
                </el-select>
                <el-select v-model="searchData.openProduct" filterable placeholder="请选择是否展示产品概览" clearable>
                    <el-option label="是" value="9"></el-option>
                    <el-option label="否" value="10"></el-option>
                </el-select>
                <div class="input-item-group">
                    <el-input placeholder="请输入配置名称" v-model="searchData.confitName" clearable></el-input>
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
                    <el-table-column prop="imgYzm" label="是否需要图形验证码" width="160">
                    </el-table-column>
                    <el-table-column width="190" prop="openAredress" label="是否展示招商信诺全部地址" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="openInsuranceDate" label="是否展示保险期" width="120">
                    </el-table-column>
                    <el-table-column width="150" prop="openProduct" label="是否展示产品概览" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="150" prop="openShare" label="是否展示案例分享" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="130" prop="color" label="颜色" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="130" prop="founder" label="创建人" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="createTime" label="创建时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="confitName" label="配置名称" show-overflow-tooltip>
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
            <el-dialog title="新增" :visible.sync="addShowFrame" :close-on-click-modal='false' width="50%">
                <el-form :model="addInfoData">
                    <el-form-item label="是否需要图形验证码" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.imgYzm" filterable clearable>
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示招商信诺的全部地址" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.openAredress " filterable clearable>
                            <el-option label="是" value="3"></el-option>
                            <el-option label="否" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示保险期间" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.openInsuranceDate" filterable clearable>
                            <el-option label="是" value="5"></el-option>
                            <el-option label="否" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示产品概览" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.openProduct" filterable clearable>
                            <el-option label="是" value="7"></el-option>
                            <el-option label="否" value="8"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示案例分享" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.openShare" filterable clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.confitName" placeholder="配置名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="颜色" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.color" placeholder="颜色"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addShowFrame = false">取 消</el-button>
                    <el-button type="primary" @click="addShowFrame = false">确 定</el-button>
                </div>
            </el-dialog>
             <!-- 修改弹出框 -->
             <el-dialog title="新增" :visible.sync="editShowFrame" :close-on-click-modal='false' width="50%">
                <el-form :model="editInfoData">
                    <el-form-item label="是否需要图形验证码" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.imgYzm" filterable clearable>
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示招商信诺的全部地址" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.openAredress " filterable clearable>
                            <el-option label="是" value="3"></el-option>
                            <el-option label="否" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示保险期间" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.openInsuranceDate" filterable clearable>
                            <el-option label="是" value="5"></el-option>
                            <el-option label="否" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示产品概览" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.openProduct" filterable clearable>
                            <el-option label="是" value="7"></el-option>
                            <el-option label="否" value="8"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否展示案例分享" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.openShare" filterable clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.confitName" placeholder="配置名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="颜色" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.color" placeholder="颜色"></el-input>
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
                addShowFrame: false,//增加弹框
                editShowFrame:false,//修改弹出框
                addInfoData: { //增加信息数据
                    color: '',
                    confitName: '',//配置名称
                    imgYzm: '',//图形验证码
                    openAredress: '',//展示地址
                    openInsuranceDate: '',// 是否展示保险期间
                    openProduct: '',//是否展示产品
                    openShare: ''//是否展示案例分享
                },
                editInfoData: { //修改信息数据
                    color: '',
                    confitName: '',//配置名称
                    imgYzm: '',//图形验证码
                    openAredress: '',//展示地址
                    openInsuranceDate: '',// 是否展示保险期间
                    openProduct: '',//是否展示产品
                    openShare: ''//是否展示案例分享
                },
                searchData: {//查询条件
                    imgYzm: '',//图形验证码
                    openAredress: '',//展示地址
                    openInsuranceDate: '',// 是否展示保险期间
                    openProduct: '',//是否展示产品
                    openShare: ''//是否展示案例分享
                },
                formLabelWidth: '200px',//弹框lable文字长度
                tableData: [{ //表格数据
                    color: '绿色',
                    confitName: '配置名称',//配置名称
                    imgYzm: '15862',//图形验证码
                    openAredress: '康佳研发大厦',//展示地址
                    openInsuranceDate: '是',// 是否展示保险期间
                    openProduct: '否',//是否展示产品
                    openShare: '是',//是否展示案例分享
                    founder:'王晓晨',
                    createTime:'2019-05-12',
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
            //新增用户信息
            addInfo() {
                this.addShowFrame = true;
            },
            //修改
            editInfo(userInfo){
                this.editShowFrame = true;
                this.editInfoData = userInfo
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-select {
        margin-right: 15px;
        width: 195px;
    }

    .containers {
        background-color: #ffffff;
        padding: 20px;
        min-width: 1052px;
        border-radius: 2px;
    }

    .el-breadcrumb {
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 16px;
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

    /* 弹框输入框长度 */
    .lengthWidth {
        width: 70%;
    }

    .input-item-group {
        margin-top: 15px;
    }
</style>