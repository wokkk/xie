<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>支付配置表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class='containers'>
            <!-- 条件搜索 -->
            <div class="topContent">
                <el-select v-model="searchData.paySigning" filterable placeholder="请选择是否支付签约" clearable>
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                </el-select>
                <el-select v-model="searchData.payBankCard" filterable placeholder="请选择信息页收集银行" clearable>
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                </el-select>
                <el-select v-model="searchData.continueCard" filterable placeholder="请选择是否收集续集卡" clearable>
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                </el-select>
                <el-select v-model="searchData.payConfig" filterable placeholder="请选择支付配置" clearable>
                    <el-option label="趸交" value="shanghai"></el-option>
                    <el-option label="季交" value="beijing"></el-option>
                </el-select>
                <el-select v-model="searchData.payMerge" filterable placeholder="请选择是否合并" clearable>
                    <el-option label="是" value="shanghai"></el-option>
                    <el-option label="否" value="beijing"></el-option>
                </el-select>

                <div class="input-item-group">
                    <el-select v-model="searchData.payMethod" filterable placeholder="请选择支付方式" clearable>
                        <el-option label="半年" value="shanghai"></el-option>
                        <el-option label="一年" value="beijing"></el-option>
                    </el-select>
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
                    <el-table-column width="120" prop="confitName" label="配置名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="140" prop="payMerge" label="是否合并支付" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="130" prop="payMethod" label="支付方式" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="150" prop="paySigning" label="是否需要支付签约" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="150" prop="paySigning" label="是否需要收集续集卡" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="150" prop="payBankCard" label="信息页收集银行卡" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="payConfig" label="支付配置" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="payCompany" label="公司支付" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="payCompanyScale" label="公司支付比例" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" label="操作">
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
                <el-form :model="addInfoData" ref='getdatatoBtn'>
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.confitName" placeholder="配置名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="支付方式" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.payMethod" filterable clearable>
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信息页收集银行卡" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.payBankCard" filterable clearable>
                            <el-option label="是" value="3"></el-option>
                            <el-option label="否" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付配置" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.payConfig" filterable clearable>
                            <el-option label="是" value="5"></el-option>
                            <el-option label="否" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司支付" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.payCompany" placeholder="公司支付">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="公司支付比例" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.payCompanyScale"
                            placeholder="公司支付比例"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="addInfoData.remarks" placeholder="备注">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否合并支付" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.payMerge" filterable clearable>
                            <el-option label="是" value="7"></el-option>
                            <el-option label="否" value="8"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否需要支付签约" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.paySigning" filterable clearable>
                            <el-option label="是" value="9"></el-option>
                            <el-option label="否" value="10"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否收集续期卡号" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.continueCard" filterable clearable>
                            <el-option label="是" value="11"></el-option>
                            <el-option label="否" value="12"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addShowFrame = false">取 消</el-button>
                    <el-button type="primary" @click="addInfoBtn">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 修改弹出框 -->
            <el-dialog title="修改" :visible.sync="editShowFrame" :close-on-click-modal='false' width="50%">
                <el-form :model="editInfoData" ref='getdatatoBtn'>
                    <el-form-item label="配置名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.confitName" placeholder="配置名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="支付方式" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.payMethod" filterable clearable>
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="信息页收集银行卡" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.payBankCard" filterable clearable>
                            <el-option label="是" value="3"></el-option>
                            <el-option label="否" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付配置" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.payConfig" filterable clearable>
                            <el-option label="是" value="5"></el-option>
                            <el-option label="否" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司支付" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.payCompany" placeholder="公司支付">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="公司支付比例" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.payCompanyScale"
                            placeholder="公司支付比例"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" clearable v-model="editInfoData.remarks" placeholder="备注">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否合并支付" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.payMerge" filterable clearable>
                            <el-option label="是" value="7"></el-option>
                            <el-option label="否" value="8"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否需要支付签约" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.paySigning" filterable clearable>
                            <el-option label="是" value="9"></el-option>
                            <el-option label="否" value="10"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否收集续期卡号" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="editInfoData.continueCard" filterable clearable>
                            <el-option label="是" value="11"></el-option>
                            <el-option label="否" value="12"></el-option>
                        </el-select>
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
                addInfoData: { //增加信息数据
                    confitName: '',
                    payCompany: '',
                    payCompanyScale: '',
                    remarks: '',
                    payMethod: '',
                    payBankCard: '',
                    payConfig: '',
                    paySigning: '',
                    continueCard: '',
                },
                editInfoData: { //修改信息数据
                    confitName: '',
                    payCompany: '',
                    payCompanyScale: '',
                    remarks: '',
                    payMethod: '',
                    payBankCard: '',
                    payConfig: '',
                    paySigning: '',
                    continueCard: '',
                },
                searchData: {//查询条件
                    paySigning: '',
                    payBankCard: '',
                    continueCard: '', //续集卡
                    payConfig: '',
                    payMerge: '',
                    payMethod: '',
                    confitName: '',
                },
                formLabelWidth: '140px',//弹框lable文字长度
                tableData: [{ //表格数据
                    confitName: '年终奖',//配置名称
                    payMerge: '否', //是否合并支付
                    payMethod: '年付',//支付方式
                    continueCard: '是',
                    paySigning: '是',//是否需要支付签约
                    payBankCard: '信息', //信息页收集银行卡
                    payConfig: '支付配置', //支付配置
                    payCompany: '公司付', //公司支付
                    payCompanyScale: '公司支付比例', //公司支付比例 
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
            //修改信息
            editInfo(userInfo) {
                this.editShowFrame = true;
                this.editInfoData = userInfo;
            },
            //新增弹框 确定按钮
            addInfoBtn() {
                console.log(this.addInfoData)
                this.addShowFrame = false
                this.addInfoData = {}
            },
            //编辑 确定按钮
            editInfoBtn() {
                console.log(545454);
            }
        }
    }
</script>

<style lang="less" scoped>
    .containers {
        background-color: #ffffff;
        padding: 20px;
        min-width: 1052px;
        border-radius: 2px;
    }

    /* 面包屑 */
    .el-breadcrumb {
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 16px;
    }

    .el-select {
        margin-right: 15px;
        width: 195px;
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