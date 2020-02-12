<template>
    <div class="container">
        <div class="login-box">
            <h2>kevin 后台系统</h2>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名：">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div class="btn">
                <el-button type="primary" @click="toLogin">登录</el-button>
                <el-button type="success">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '登录',
                input: '',
                form: {
                    password: '',
                    name: '',
                },
                token: '25645559788',
            }
        },
        methods: {
            toLogin() {
                if (!this.form.name || !this.form.password) {
                    return this.$message.error('用户名 密码不能为空');
                } else {
                    let userName = this.form.name
                    window.localStorage.setItem('token', this.token)
                    localStorage.setItem('userName', userName)
                    this.$router.push('/home')
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });

                }
            }
        }
    }
</script>

<style lang="less" scope>
    .container {
        height: 100vh;
        width: 100%;
        background: url('../../assets/img/xu.jpg') no-repeat center;
        background-size: 100% 100%;
        position: absolute;
    }

    .login-box {
        width: 500px;
        height: 300px;
        background: rgba(170, 179, 179, 0.2);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }

    h2 {
        text-align: center;
        font-size: 22px;
        color: #ccc;
        margin-top: 26px;
    }

    .el-form {
        margin-top: 30px;
        margin-left: 27px;
    }

    .el-input {
        width: 300px;
        color: #ccc;
    }

    .el-form-item__label {
        color: #ccc;
        font-size: 16px;
    }

    .btn {
        text-align: center;
        margin-top: 34px;
    }
</style>