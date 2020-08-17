<template>
    <div class="top-bar">
        <div class="top-content">
            <div class="top-title">管理系统</div>
        </div>
        <div class="top-avatar" @mouseover="showList" @mouseout="hideList" v-if="userName">
            <div class="avatar-center" :title='userName'>{{userName}}</div>
            <div class="avatar-list" v-show="showListFlag">
                <ul>
                    <li @click="Logout">退出</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

import VueCookie from 'vue-cookie';
import { logout } from '../../../api/index.js';

export default {
    data() {
        return {
            showListFlag: false,
            userName: '',
            account: '1111111111',
            isListFlag: false
        };
    },
    mounted() {
      this.userName = VueCookie.get('comfyakInfor');
      if( !this.userName || this.userName == ''){
            this.$router.push({
                path: '/account/login'
            });
      }
    },
    computed: {},
    methods: {
        showList: function() {
            this.showListFlag = true;
        },
        hideList: function() {
            this.showListFlag = false;
        },
        Logout: function() {
            let _this = this;
            this.$Modal.confirm({
                title: '确认退出?',
                loading: true,
                onOk: () => {
                    _this.$Modal.remove();

                    logout({}).then(res => {
                        _this.$Modal.remove();

                        if (res.code == '200') {
                            VueCookie.delete('comfyakInfor');
                            VueCookie.delete('comfyak');
                            _this.$Message.success({
                                content: '操作成功，正在跳转...',
                                duration: 1.5,
                                onClose: function() {
                                    _this.$router.push({
                                        path: '/account/login'
                                    });
                                }
                            });
                          
                        } else {
                            _this.$Message.error({content: res.msg, duration: 3});
                        }
                    });
                }
            });
        },

    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.top-bar
    min-width: 1000px
    background-color: #464C5B
    height: 64px
    line-height: 64px
    width: 100%
    left: 0
    top: 0
    position: fixed
    z-index: 999 !important
    font-size: 0px
    display: flex

.top-content
    flex: 1
    padding: 0 10px 0 20px
    overflow: hidden
    .top-title
        color: #fff
        font-size: 20px
.top-avatar
    flex: 0 0 180px
    width: 180px
    position: relative
    color: #fff
    .avatar-center
        padding: 0px 10px
        cursor: pointer
        text-align: center
        font-size: 16px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        border-left: 1px solid rgba(232,234,236, 0.2)
    .avatar-list
        position: absolute
        top: 64px
        left: 0px
        width: 100%
        text-align: center
        font-size: 14px
        li
            background-color: #464C5B
            cursor: pointer
            height: 50px
            line-height: 50px
            border-top: 1px solid rgba(232,234,236, 0.2)
            &:hover
                background-color: #363E4F
</style>
