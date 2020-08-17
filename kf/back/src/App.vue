<template>
    <div id="app" class="app hasTopbar hasSidebar">
        <router-view></router-view>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.hasTopbar
    padding-top:64px
.hasSidebar
    padding-left: 150px
</style>
