<template>
<div class="socket">
    <h3>远程监控，时刻接收返回的数据</h3>
    <div>{{msg}}</div>
    <span>详情在于代码层次</span>
</div>
</template>
<script>
export default {
    name:'socket',
    data(){
        return{
            msg:"接收数据的变量",
            getListView:[],   //接收数据的变量
        }
    },
    mounted(){
        
    },
    created(){
        this.initWebSocket();
    },
    destroyed() {      
        this.websock.close() 
    },
    methods:{
        //初始化weosocket
        initWebSocket(){
            const wsuri = "ws://192.168.31.52:8891/API/V1/webSocketSite";        
            this.websock = new WebSocket(wsuri);        
            this.websock.onmessage = this.websocketonmessage;        
            this.websock.onopen = this.websocketonopen;        
            this.websock.onclose = this.websocketclose;
        },
        //连接建立
        websocketonopen(){
            console.log('建立连接')
        },
        //连接建立失败重连
        websocket(){
            this.initWebSocket();
        },
            //接收数据
        websocketonmessage(e){
            const redata = JSON.parse(e.data);
            let siteId = redata.id
            let updateSite = this.getListView.findIndex(item=>item.id === siteId)  //findIndex返回的是数据的角标
            if(updateSite===-1){
                //推送的数据id不在当前列表则忽略不做处理
            }else{
                this.getListView.splice(updateSite,1,redata) //在当前列表的话就替换掉这条数据
            }
        },
        //关闭连接
        websocketclose(e){
            console.log('断开连接',e);
        },
    }
}
</script>
<style lang="less" scoped>
.socket{
    width:100%;
    height:100%;
    padding:20px;
}
</style>
