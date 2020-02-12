<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>保险方案配置表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='containers'>
            <!-- 条件搜索 -->
            <div class="topContent">
                <el-input class="input-item" placeholder="请输入内容" v-model="searchUserInfo" clearable></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="success" icon='el-icon-plus' @click="addInfo">新增</el-button>
                <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
            </div>
            <!-- 表格数据 -->
            <div class="formData">
                <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column width="55" type="selection" >
                    </el-table-column>
                    <el-table-column width="100" prop='userRelev' label="关系" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="100" prop='deliverydate' label="续费时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="100" prop="period" label="保险期间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="100" prop="deliveryMode" label="续费方式" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="age" label="年金起领年龄" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="receive" label="年金领取方式" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="100" prop="sex" label="性别" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="company" label="保险期间单位" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="100" prop="configName" label="配置名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="100" prop="founder" label="创建人" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="110" prop="createTime" label="创建时间" show-overflow-tooltip>
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
            <el-dialog title="新增" :visible.sync="addShowFrame" :close-on-click-modal='false' width='50%'>
                <el-form :model="addInfoData">
                    <el-form-item label="与被保险人关系" :label-width="formLabelWidth">
                        <el-radio-group v-model="addInfoData.userRelev">
                            <el-radio :label="3">本人</el-radio>
                            <el-radio :label="6">配偶</el-radio>
                            <el-radio :label="9">子女</el-radio>
                            <el-radio :label="8">父母</el-radio>
                            <el-radio :label="7">配偶父母</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="交费期间" :label-width="formLabelWidth">
                        <el-radio-group v-model="addInfoData.deliverydate">
                            <!-- <el-radio :label="6">请选择</el-radio> -->
                            <el-radio :label="3">趸交</el-radio>
                            <el-radio :label="9">3年交</el-radio>
                            <el-radio :label="8">10年交</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="保险期间" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.period" autocomplete="off"></el-input>
                        <span> (多种保险期间使用英文逗号分隔)</span>
                    </el-form-item>
                    <el-form-item label="保险期间单位" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.company" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.configName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="交费方式" :label-width="formLabelWidth">
                        <el-radio-group v-model="addInfoData.deliveryMode">
                            <el-radio :label="3">月交</el-radio>
                            <el-radio :label="6">季交</el-radio>
                            <el-radio :label="9">半年交</el-radio>
                            <el-radio :label="8">年交</el-radio>
                            <el-radio :label="7">一次性交清</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年金起领年龄" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.age" autocomplete="off"></el-input>
                        <span> (多种年金起领年龄使用英文逗号分隔)</span>
                    </el-form-item>
                    <el-form-item label="年金领取方式" :label-width="formLabelWidth">
                        <el-radio-group v-model="addInfoData.receive">
                            <el-radio :label="1">月领</el-radio>
                            <el-radio :label="2">年领</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-radio-group v-model="addInfoData.sex">
                            <el-radio :label="3">男</el-radio>
                            <el-radio :label="4">女</el-radio>
                        </el-radio-group>
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
                    <el-form-item label="与被保险人关系" :label-width="formLabelWidth">
                        <el-radio-group v-model="editInfoData.userRelev">
                            <el-radio :label="3">本人</el-radio>
                            <el-radio :label="6">配偶</el-radio>
                            <el-radio :label="9">子女</el-radio>
                            <el-radio :label="8">父母</el-radio>
                            <el-radio :label="7">配偶父母</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="交费期间" :label-width="formLabelWidth">
                        <el-radio-group v-model="editInfoData.deliverydate">
                            <!-- <el-radio :label="6">请选择</el-radio> -->
                            <el-radio :label="3">趸交</el-radio>
                            <el-radio :label="9">3年交</el-radio>
                            <el-radio :label="8">10年交</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="保险期间" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.period" autocomplete="off"></el-input>
                        <span> (多种保险期间使用英文逗号分隔)</span>
                    </el-form-item>
                    <el-form-item label="保险期间单位" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.company" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.configName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="交费方式" :label-width="formLabelWidth">
                        <el-radio-group v-model="editInfoData.deliveryMode">
                            <el-radio :label="3">月交</el-radio>
                            <el-radio :label="6">季交</el-radio>
                            <el-radio :label="9">半年交</el-radio>
                            <el-radio :label="8">年交</el-radio>
                            <el-radio :label="7">一次性交清</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年金起领年龄" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="editInfoData.age" autocomplete="off"></el-input>
                        <span> (多种年金起领年龄使用英文逗号分隔)</span>
                    </el-form-item>
                    <el-form-item label="年金领取方式" :label-width="formLabelWidth">
                        <el-radio-group v-model="editInfoData.receive">
                            <el-radio :label="1">月领</el-radio>
                            <el-radio :label="2">年领</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-radio-group v-model="editInfoData.sex">
                            <el-radio :label="3">男</el-radio>
                            <el-radio :label="4">女</el-radio>
                        </el-radio-group>
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
                addShowFrame: false,//新增弹出框
                editShowFrame:false, //修改弹框
                formLabelWidth: '130px',//长度
                searchUserInfo:'', // 搜索框查询

                addInfoData: { //新增弹框数据
                    userRelev: '',//与被保人的关系
                    deliverydate: '',//交费期间
                    configName: '',//配置名称
                    deliveryMode: '',//交付方式
                    age: '', //年金起领年龄
                    receive: '',//年金领取方式
                    company: '',//保险期间单位
                    period: '',//保险期间
                    sex: "",//性别
                },
                editInfoData: { //新增弹框数据
                    userRelev: '',//与被保人的关系
                    deliverydate: '',//交费期间
                    configName: '',//配置名称
                    deliveryMode: '',//交付方式
                    age: '', //年金起领年龄
                    receive: '',//年金领取方式
                    company: '',//保险期间单位
                    period: '',//保险期间
                    sex: "",//性别
                },
                tableData: [{//表格数据
                    deliverydate:'2018-08-21',
                    period:'1年',
                    deliveryMode:'全款',
                    age:80,
                    receive: '线上发送',
                    userRelev: '父母',
                    sex: '男',
                    company: '海景公司',
                    configName:'ahweoigh',
                    founder:'颜高',
                    createTime:'2200-08-20'
                }],
                multipleSelection: [],
                currentPage4: 4,//当前显示第几页
                checked: false, //复选框
            }
        },
        methods: {
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);//每页显示几条数据
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);//当前第几页
            },
            //新增用户信息
            addInfo() {
                this.addShowFrame = true;
            },
            //修改信息
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

    /* .el-input{
        width: 217px;
    } */
    .input-item {
        width: 195px;
        margin-right: 10px;
    }

    .el-input {
        width: 50%;
        width: 195px;
    }

    .el-form-item__label {
        color: #000000;
    }

    /* 弹框输入框长度 */
    .lengthWidth {
        width: 52%;
    }
</style>