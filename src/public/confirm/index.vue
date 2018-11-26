<template>
   <div class="confirm" v-show="show">
        <div :class="{'pop':show}"></div>
        <div :class="{'pop-up':show,'show':show}" >
            <div class="popup-mask" v-if="hasMark"></div>
            <transition name="bottom">
                <div class="popup-note bottom">
                    <div :class="{'pop-content':show}">
                        <div class="pop-tit">
                            <!-- <v-icon color="red">info</v-icon> -->
                            {{title}}
                        </div>
                        <p class="pop-note hasTitle" style="margin:0">
                            <span class="msg" v-html="msg">{{msg}}</span>
                        </p>
                        <div class="btn-wrapper" v-if="type == 'alert'" @click.stop="alertClick">
                            <span class="btn btn-block yes-btn">{{alertBtnText}}</span>
                        </div>
                        <div class="btn-wrapper" v-if="type == 'confirm'">
                            <button @touchstart.prevent="noClick" @click="noClick" class="default">{{noBtnText}}</button>
                            <button @touchstart.prevent="yesClick" @click="yesClick" class="sure">{{yesBtnText}}</button>
                           
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        
   </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
   name:'confirm',
   props: {
        title: {
            type: String,
            default: '提示'
        },
        msg: {
            type: String,
            default: '未保存的配置信息将会丢失！要离开此页吗？'
        },
        type: {
            type: String,
            default: 'alert'
        },
        alertBtnText: {
            type: String,
            default: ''
        },
        yesBtnText: {
            type: String,
            default: '确定'
        },
        noBtnText: {
            type: String,
            default: '取消'
        },
        hasMark: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            promiseStatus: null,
            show: false
        }
    },
    methods: {
        confirm() {
            let _this = this;
            this.show = true;
            return new Promise(function (resolve, reject) {
                _this.promiseStatus = {resolve, reject};
            });
        },
        noClick() {
            this.show = false;
            this.promiseStatus && this.promiseStatus.reject();
            
        },
        yesClick() {
            this.show = false;
            this.promiseStatus && this.promiseStatus.resolve();
            
        },
        alertClick() {
            this.show = false;
            this.promiseStatus && this.promiseStatus.resolve();
        }
    }
}


</script>

<style lang='less' type="text/less" scoped>
.confirm{ 
    height:100%;
    width:100%;
    display:inline-block;
    position: absolute; 
    top:0;
    left:0;  
    .pop{
        background:#000;
        opacity: .3;
        width: 100%;
        height: 100%;
        opacity:.3;
        position: relative;
        
    }
    .pop-up{
            position:absolute;
            background:#fff;
            max-width:290px;
            height:170;
            top:40%;
            left:40%;

        }
    .pop-tit{
        padding:16px;
        // border-bottom: 1px solid #aaa;
        font-size: 24px;
        font-weight: 400;
        
    }
   .pop-note{
       padding:16px;
       font-size:14px;
       font-family: Roboto,sans-serif;
       line-height: 1.5;
       color: #000;
      
   }
   .btn-wrapper{
        padding:10px 20px;
        float:right;
   }
   .default{
       width:88px;
       height:30px;
       text-align: center;
       color:red;
       border:none;
   }
   .default:active{
       background: #ccc;
       border:1px solid #fff;

   }
   .sure{
       width:88px;
       height:30px;
       text-align: center;
       color:#fff;
       background:#2d69ea
   }
   
  
  
}
 
</style>
