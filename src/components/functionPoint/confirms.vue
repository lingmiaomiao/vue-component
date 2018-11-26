<template>
<div class="confirms">
    <h3>功能1</h3>
    <div>编写关型模态框,打开模态框后进行中的数据停用，关闭模态框后数据继续；</div>
    <div>技术点：使用promise调用，使用beforerouterlevae钩子函数</div>
    <div>适用于：检测用户离开本页面时候数据修改后是否保存，若是保存，则路由跳转离开，否则路由默认本页面</div>
    <br/>
    <v-layout align-left wrap>
        <v-flex xs12 sm6>
          <v-select
            v-model="value"
            :items="items"
            attach
            chips
            label="Chips"
            multiple
            @focus="selectChange"
          ></v-select>
        </v-flex>
    </v-layout>
     <v-layout align-left wrap>
         <v-flex xs12 sm6>
           <v-text-field
            v-model="name"
            :counter="10"
            label="Name"
            data-vv-name="name"
            required
            @click="textChange"
            ></v-text-field>
        </v-flex>
    </v-layout>
</div>
</template>
<script>
export default {
    name:'confirms',
    data(){
        return{
            items: ['foo', 'bar', 'fizz', 'buzz'],
            value: ['foo', 'bar', 'fizz', 'buzz'],
            name:'',
            inputState:0
        }
    },
    mounted(){

    },
    beforeRouteLeave (to, from, next){ 
        console.log(this.inputState,"inputState")
        if(this.inputState == 1){
            this.$confirm({
                title: '提示',
                msg: '未保存的配置信息将会丢失！要离开此页吗？',
            }).then(() => {
                next();
            }).catch(() => {
                next(false);
            });
        }else{
            next();
        }
       
    },
    methods:{
        selectChange(){
            this.inputState = 1;
        },
        textChange(){
            this.inputState = 1;
        }
    }
}
</script>
<style lang="less" scoped>
.confirms{
    width:100%;
    height:100%;
    padding:20px;
}
</style>
