import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   total:10,   //页数
   imgId:'',  //上传图片的Id，没有图片的时候默认传null,第一次继承模板图片
   imgURl:'',   //图片地址
   formValidate:{      //调查问卷-模板对象
      bgColor:'#081C77',      //背景颜色
      buttonText:'',
   },
   questionObj:{},   //问卷描述的对象
   questionList:[],   //空白问题的数组
   deleIdListS:[],     //删除的数据组件
   upDState:false,    //组件更新，刷新页面
   newModList:[],     //获取活动配置中模块组合
   qinstanceIds:{},    //活动配置中问卷id及模板id
  },
  mutations: {
    totalS:(state,n)=>{
      state.total = n;
    },
    imgIdS:(state,n)=>{
      state.imgId = n;
    },
    imgURlS:(state,n)=>{
      state.imgURl = n;
    },
    formValidateS:(state,n)=>{
      state.formValidate = n;
    },
    questionObjS:(state,n)=>{
      state.questionObj = n;
    },
    questionListS:(state,n)=>{
      state.questionList = n;
    },
    upDStateS:(state,n)=>{
      state.upDState = n;
    },
    deleIdListS:(state,n)=>{
      state.deleIdList = n;
    },
    newModListS:(state,n)=>{
      state.newModList = n;
    },
    QinstanceIds:(state,n)=>{
      state.qinstanceIds = n;
    },
  },
  actions: {}
})
