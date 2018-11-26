<template>
<div class="leftMenu">
   <el-row class="tac">
    <el-col :span="12">
        <el-menu
        :default-active="currentRoute"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        v-for="(item,index) in $router.options.routes"
        :key='item.path'
        :index="item.path"
        >
        <el-submenu :index="item.path">
            <template slot="title">
                <i :class="icon[index]"></i>
                <span>{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="(val) in item.children" :key="val.path" :index="val.path">
                <el-menu-item :index="val.path">{{val.name}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        </el-menu>
    </el-col>
    </el-row>
</div>
</template>
<script>
export default {
    name:'leftMenu',
    data(){
        return{
            isCollapse: true,
            icon:["el-icon-location",'el-icon-menu','el-icon-document','el-icon-setting'],
            currentRoute:'',   //当前路由定位
        }
    },
    mounted(){
        this.getCurrentRoute();
    },
    methods:{
        getCurrentRoute(){
          const newRoute = this.$route.path;
          let newRouteOption = {}
          this.$router.options.routes.map(item=>{
               const checkItem = item.children.find(it => it.path === newRoute)
              if(newRoute=== checkItem){
                  newRouteOption = {
                    parentMode: checkItem.parentMode,
                    parentPath: checkItem.parentPath
                  }
              }
          })
           this.currentRoute = this.$route.path
            if (newRouteOption.parentMode) {
              setTimeout(() => {
                this.currentRoute = newRouteOption.parentPath
              }, 0)
            }
        }
    }
    
}
</script>
<style lang="less" scoped>
.leftMenu{
    width:100%;
    height: 100%;
}
</style>
