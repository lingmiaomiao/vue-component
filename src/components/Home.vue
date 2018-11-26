<template>
<div class="home">
  <!-- header -->
  <el-header>
     <topMenuCom/>
  </el-header>
  <!-- aside -->
  <el-aside class="fl" style="height:100%;width:14%">
      <leftMenuCom/>
  </el-aside>
  <!-- main -->
  <el-main class="fl" style="height:100%;width:86%">
      <router-view/>
  </el-main>
  
   
</div>
</template>

<script >
import leftMenuCom from '../public/leftMenu'
import topMenuCom from '../public/topMenu'
export default {
  name: 'home',
  data(){
    return{

    }
  },
  components:{
    leftMenuCom,
    topMenuCom
  },
  methods:{
  
  }
}
</script>
<style lang="less" scoped>
.home{
  width:100%;
  height:100%;
  background:#f2f2f2;
}

</style>
