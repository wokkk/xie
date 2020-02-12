<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统来源表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='containers'>
            <!-- 条件搜索 -->
            <div class="topContent">
                <el-input placeholder="请输入支付通知的Code" v-model="searchData.payNotice" clearable></el-input>
                <el-input placeholder="请输入请求的Code" v-model="searchData.requestCode" clearable></el-input>
                <el-input placeholder="请输入承保人Code" v-model="searchData.accepCode" clearable></el-input>
                <el-input placeholder="请输入配置名称" v-model="searchData.confitName" clearable></el-input>
                <div class="input-item-group">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    <el-button type="success" icon='el-icon-plus' @click="addInfo">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
                </div>
            </div>
            <!-- 表单数据 -->
            <div class="formData">
                <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column width="140" prop="requestCode" label="请求code" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="140" prop="accepCode" label="承保code" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="140" prop="trialCode" label="试算code" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="140" prop="payNotice" label="支付通知code" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="140" prop="confitName" label="配置名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="130" prop="founder" label="创建人" show-overflow-tooltip>
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
                        :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper" :total="100">
                    </el-pagination>
                </div>
            </div>
            <!-- 新增弹出框 -->
            <el-dialog title="新增" :visible.sync="addShowFrame" :close-on-click-modal='false' width="50%">
                <el-form :model="addInfoData">
                    <el-form-item label="请求的code" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.requestCode" placeholder="请求的code">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="承保code" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.accepCode" placeholder="承保code">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="试算code" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.trialCode" placeholder="试算code">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="支付通知code" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.payNotice" placeholder="支付通知code">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.confitName" placeholder="配置名称">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addShowFrame = false">取 消</el-button>
                    <el-button type="primary" @click="addShowFrame = false">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 修改弹出框 -->
            <el-dialog title="修改" :visible.sync="editShowFrame" :close-on-click-modal='false' width="50%">
                <el-form :model="addInfoData">
                    <el-form-item label="请求的code" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.requestCode"
                            placeholder="请求的code">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="承保code" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.accepCode" placeholder="承保code">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="试算code" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.trialCode" placeholder="试算code">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="支付通知code" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.payNotice" placeholder="支付通知code">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.confitName" placeholder="配置名称">
                        </el-input>
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
                editShowFrame: false,//修改弹框
                addInfoData: { //增加信息数据
                    requestCode: '',
                    accepCode: '',
                    trialCode: '',
                    payNotice: '',
                    confitName: '',
                },
                editInfoData: { //修改信息数据
                    requestCode: '',
                    accepCode: '',
                    trialCode: '',
                    payNotice: '',
                    confitName: '',
                },
                searchData: { //查询条件
                    payNotice: '',
                    confitName: '',
                    requestCode: '',
                    accepCode: '',
                },
                formLabelWidth: '140px',//弹框lable文字长度
                tableData: [{ //表格数据
                    requestCode: 1225, //请求code
                    accepCode: 8888, //承保code
                    trialCode: 156333, //试算code
                    payNotice: '到了', //支付通知
                    confitName: '配置名称',//配置名称
                    founder: '王翔', //创建人
                    createTime: '2016-05-02',//创建时间
                }],
                multipleSelection: [],
                currentPage: 4, //当前第几页
            }
        },
        methods: {
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
            // 修改
            setDialogForm(tableInfo) {
                this.editInfoData = tableInfo;
                this.editShowFrame = true;
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-select {
        margin-right: 15px;
        /* width: 203px; */
    }

    /* 面板 */
    .containers {
        background-color: #ffffff;
        padding: 20px;
        min-width: 1052px;
        border-radius: 2px;
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

    .el-input {
        width: 195px;
        margin-right: 15px;
    }

    .input-item-group {
        margin-top: 15px;
    }

    .lengthWidth {
        width: 70%;
    }
</style>