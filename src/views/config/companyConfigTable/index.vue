<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>配置管理</el-breadcrumb-item>
            <el-breadcrumb-item>公司配置表</el-breadcrumb-item>
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
                <el-select v-model="searchData.choice" filterable placeholder="请选择是否指定" clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="searchData.security" filterable placeholder="请选择是否安全" clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="searchData.healthy" filterable placeholder="请选择健高方式" clearable>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <div class="input-item-group">
                    <el-input placeholder="请输入报价单号" v-model="searchData.offerNumber" clearable></el-input>
                    <el-input placeholder="请输入渠道" v-model="searchData.channel" clearable></el-input>
                    <el-date-picker v-model="searchData.startTime" type="date" placeholder="选择开始日期"></el-date-picker>
                    <el-date-picker v-model="searchData.endTime" type="date" placeholder="选择结束日期"></el-date-picker>
                </div>

                <div class="btn-button">
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
                    <el-table-column width="120" prop="corporateName" label="产品名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="productType" label="产品类型" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="startTime" label="开始时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="endTime" label="结束时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="bufferDate" label="缓冲期" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="effectiveDate" label="生效日期" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="prepareDate" label="预投保期" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column width="120" prop="prepareDate2" label="是否指定生效日" show-overflow-tooltip>
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
                    <el-form-item label="所属公司ID" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.id" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="所属公司名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.corporateName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="产品类型" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.productType" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="窗口期开始日期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.startTime" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="窗口期结束日期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.endTime" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="缓冲日期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.bufferDate" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="保单生效日期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.effectiveDate" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="预投保期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.prepareDate" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否指定生效日" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.choice" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否保全加入" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.security" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="来源" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.channel" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="合同递送方式" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.contractType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="打折来源" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.discount" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="报价单号" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.offerNumber" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否自动撤单" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.cancelTheOrder" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管理机构是否是浙江" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.mechanism" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="健高方式" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.healthy" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="获取管理机构的方式" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.getMechanism" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="短信发送配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.shortMsg" clearable></el-input>
                        <div style="color: red;"> (多个短信发送配置中间用英文逗号分隔)</div>
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
                    <el-form-item label="所属公司ID" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.id" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="所属公司名称" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.corporateName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="产品类型" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.productType" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="窗口期开始日期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.startTime" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="窗口期结束日期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.endTime" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="缓冲日期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.bufferDate" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="保单生效日期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.effectiveDate" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="预投保期" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.prepareDate" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否指定生效日" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.choice" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否保全加入" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.security" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="来源" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.channel" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="合同递送方式" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.contractType" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="打折来源" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.discount" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="报价单号" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.offerNumber" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="是否自动撤单" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.cancelTheOrder" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管理机构是否是浙江" :label-width="formLabelWidth">
                        <el-select class="lengthWidth" v-model="addInfoData.mechanism" placeholder="请选择" clearable>
                            <el-option label="是" value="shanghai"></el-option>
                            <el-option label="否" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="健高方式" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.healthy" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="获取管理机构的方式" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.getMechanism" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="短信发送配置" :label-width="formLabelWidth">
                        <el-input class="lengthWidth" v-model="addInfoData.shortMsg" clearable></el-input>
                        <div style="color: red;"> (多个短信发送配置中间用英文逗号分隔)</div>
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
                editShowFrame:false,//修改弹框
                formLabelWidth: '140px',
                addInfoData: { //新增数据
                    id:'',
                    corporateName: '',//公司名称
                    productType: '',  //产品类型
                    choice: '',//是否指定
                    security: '',//是否安全
                    healthy: '', //选择健高方式
                    offerNumber: '', //报价单号
                    channel: '', // 渠道
                    startTime: '', //开始时间
                    endTime: '', //结束时间
                    effectiveDate: '',//生效日期
                    bufferDate: '',//缓冲日期
                    prepareDate: '',//预投保期
                    contractType: '',//合同递送方式
                    discount: '',//打折来源
                    cancelTheOrder: '', //是否自动撤单
                    mechanism: '',//管理机构是否浙江
                    getMechanism: '',//获取管理机构方式
                    shortMsg: '',//短信发送配置
                },
                editInfoData: { //新增数据
                    id:'',
                    corporateName: '',//公司名称
                    productType: '',  //产品类型
                    choice: '',//是否指定
                    security: '',//是否安全
                    healthy: '', //选择健高方式
                    offerNumber: '', //报价单号
                    channel: '', // 渠道
                    startTime: '', //开始时间
                    endTime: '', //结束时间
                    effectiveDate: '',//生效日期
                    bufferDate: '',//缓冲日期
                    prepareDate: '',//预投保期
                    contractType: '',//合同递送方式
                    discount: '',//打折来源
                    cancelTheOrder: '', //是否自动撤单
                    mechanism: '',//管理机构是否浙江
                    getMechanism: '',//获取管理机构方式
                    shortMsg: '',//短信发送配置
                },
                searchData:{ //条件查询
                    corporateName:'',
                    productType:'',
                    choice:'',
                    security:'',
                    healthy:'',
                    offerNumber:'',
                    channel:'',
                    startTime: '', //开始时间
                    endTime: '', //结束时间
                },
                tableData: [{ //表单数据
                    id: 1,
                    corporateName: '海参大酒店',
                    productType: '产品类型',
                    bufferDate: '3年',
                    startTime: '2018-06-06',//开始时间
                    endTime: '2020-12-8',//结束时间
                    dateffectiveDatee: '2016-05-02',
                    prepareDate: '是',
                    prepareDate2: '否',
                }],
                options: [{
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
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
            editInfo(userInfo) {
                this.editInfoData = userInfo
                this.editShowFrame = true
            },
            //新增用户信息
            addInfo() {
                this.addShowFrame = true;
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

    .btn-button {
        margin-top: 15px;
    }

    .input-item-group {
        margin-top: 15px;
    }

    /* 弹框输入框长度 */
    .lengthWidth {
        width: 70%;
    }
</style>