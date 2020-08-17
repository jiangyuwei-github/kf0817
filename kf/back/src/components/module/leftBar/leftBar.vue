<template>
    <div class="left-bar">
        <Menu :theme="'dark'" :active-name="active" :open-names="openName" style="width: 100%" @on-select="toLink" accordion ref="menus">
            <!-- <MenuItem name="banner">banner管理</MenuItem> -->
            <MenuItem name="new">新闻管理</MenuItem>
            <!-- <MenuItem name="video">视频管理</MenuItem> -->
        </Menu>
    </div>
</template>

<script>

export default {
    name: 'leftBar',
    props: {
        active: {
            type: String
        },
        openName: {
            type: Array
        }
    },
    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {
        toLink: function(_name) {
            this.$router.push({name: _name});
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../common/stylus/resetView.styl';

.left-bar
    position: fixed
    top: 64px
    bottom: 0
    left: 0
    width: 150px
    z-index: 11 !important
    background-color: #464C5B
    overflow-x: hidden
    overflow-y: scroll
    font-weight: bold
    .out-active.ivu-menu-item-active
        background: #3A9CFC
        color: #FFF
    .ivu-menu-dark.ivu-menu-vertical
        li.ivu-menu-item-selected
            background: #3A9CFC !important
            color: #FFF !important
.left-bar::-webkit-scrollbar
    width: 0px;
    height: 0px
.left-bar > ul:last-of-type
    border: none
</style>
