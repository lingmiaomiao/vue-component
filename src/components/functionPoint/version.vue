<template>
<div class="version">
    <h3>项目兼容浏览器版本校验</h3>
    <div>代码地址：my-project/public/index.html</div>
    <div>检测工具之一：<a href="http://browsershots.org/" target="_Blank">http://browsershots.org/</a></div>
    <div>提示：将项目在线地址输入input框，但每天仅仅能校验一次</div>
    <div>检验的浏览器：IE,Chrom,Firefox,Safari,Opera</div>
    <div>基于vue2.0版本，及其安装的依赖综合圈定其版本</div>
</div>
</template>
<script>
export default {
    name:'version',
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.version{
    width:100%;
    height:100%;
    padding:20px;
}
</style>
