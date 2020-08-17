<template>
    <div>
        <div class="loingBox">
            <div class="login">登录</div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="user" >
                    <Input size="large" type="text" v-model.trim="formInline.user" placeholder="账号">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input size="large" type="password" v-model.trim="formInline.password" placeholder="密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem style="text-align: center;padding-top:50px">
                    <div class="loginBtn"  @click="handleSubmit('formInline')">
                        <span v-if="!isDisable" style="font-size:18px;">登录</span>
                        <span v-else>登录中...</span>
                    </div>
                </FormItem>
            </Form>
        </div>

    </div>
</template>

<script>

import { Login} from '../../api/index.js';
import VueCookie from 'vue-cookie';
export default {
    data() {
        return {
            img: require('@/common/images/logoLogin.png'),
            isDisable: false, // 表单重复提交
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    components: {},
    created: function() {
          VueCookie.delete('comfyakInfor');
          VueCookie.delete('comfyak');
    },
    methods: {
        toLink: function(el) {
            let _url = el.currentTarget.getAttribute('data-url');
            this.$router.push({ path: _url });
        },
        handleSubmit: function(name) {
            let _this = this;

            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.isDisable = true; // 开始可以点击

                    Login({
                        loginName: this.formInline.user,
                        pwd: this.formInline.password
                    }).then(res => {
                        this.isDisable = false; // 执行请求后就不能点击了
                        if (res.code == '200') {
                            VueCookie.set('comfyakInfor', res.data.nickname, {
                                expires: 7
                            });
                            this.$Message.success({
                                content: '登录成功，正在跳转...',
                                duration: 1,
                                onClose: function() {
                                    _this.$router.push({
                                        path: '/project/new'
                                    });
                                }
                            });
                        } else {
                            this.$Message.error({content: res.msg, duration: 3});
                        }
                    }, err => {
                        this.isDisable = false;
                    });
                }
            });
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login{
    text-align:center;
    font-size:30px;
    padding:30px 0
}
.loginBtn
    width:140px
    height 40px
    line-height 40px
    color:#fff
    text-align:center
    background :#f00
    border-radius:6px
    margin:0 auto
    font-size:14px
    cursor:pointer
.loingBox
    width:400px
    height:450px
    padding:40px 40px 30px
    position :absolute
    top:0
    left:0
    right:0
    bottom:0
    margin:auto
    -webkit-box-shadow: 0 0 3px #c5c8ce
    box-shadow: 0 0 3px #c5c8ce
    .logoImg
        width: 62%
        padding: 10px 0 50px 0
        margin: 0 auto
        img
            width:100%
.forget-password
    line-height: 32px
    font-size: 12px
    margin-bottom: 24px
    margin-top:-20px
    vertical-align: top
    text-align: right
    color :#2d8cf0
    text-decoration: underline
    span
        cursor: pointer
        display: inline-block
</style>
