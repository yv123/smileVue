<template>
  <div class="category_container">
       <div class="navbar-div">
             <van-nav-bar   title="类别列表" /> 
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul >
                            <!-- :class="{categoryActice:categoryIndex==index}" -->
                            <li v-for="(item,index) in category" :key="index" :class="{categoryActive:categoryIndex==index}" @click="clickCategory(index,item.ID)">{{item.MALL_CATEGORY_NAME}}</li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME" >
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list_div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                                <div class="list-item" v-for="(item,index) in categorySubIdList" @click="goGoodsInfo(item.ID)" :key="index">
                                    <div class="list-item-img">
                                        <img v-lazy="item.IMAGE1" width="100%">
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>                                    
                                        <div>￥{{item.ORI_PRICE | moneyFilter}}</div>                                    
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
  </div>
</template>
<script>
import { toMoney } from '../../filter/moneyFilter.js'
import common from '../../utils/axios'
import URL from '../../serviceAPI.config.js'
import axios from 'axios'
export default {
  data () {
    return {
        category:[],
        categoryIndex:0,
        categoryId:'',
        active:0,
        categorySub:[],
        list: [],
        loading: false,
        finished: false,
        isRefresh:false,
        categorySubId:'',
        page:1,
        categorySubIdList:[]
    }
  },
  created(){
    this.getCategoryList();
  },
  filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    },
  mounted(){
    let winHeight = document.documentElement.clientHeight
    document.getElementById("leftNav").style.height= winHeight-46 +'px'
    document.getElementById('list_div').style.height=winHeight-90 +'px'
  },  
  methods:{
    goGoodsInfo(id){
        console.log(id);
        this.$router.push({name:'Goods',params:{goodsId:id}})
    },
    onClickCategorySub(index, title){
        console.log(index);
        console.log(title);
        this.categorySubId=this.categorySub[index].ID;
        this.categorySubIdList=[];
        this.finished=false;
        this.page=1;
        this.onLoad();
        
    },
    clickCategory(index,id){
        this.categoryIndex=index
        console.log(this.categoryIndex);
        this.categoryId=id;
        console.log(id);
        
        this.page=1;
        this.finished=false;
        this.categorySubIdList=[];
        this.getCategorySubList(this.categoryId);
        
    },
    onRefresh(){
        setTimeout(() => {
            this.isRefresh = false;
            this.finished = false;
            this.categorySubIdList=[];
            this.page=1
            this.onLoad()
        }, 1000);
    },
     onLoad() {
         console.log('----');
         var _this=this;
        setTimeout(() => {
            _this.categorySubId = _this.categorySubId?_this.categorySubId:_this.categorySub[0].ID;
            _this.getGoodList()
        }, 1000);
    },
     getCategoryList(){
         var _this=this;
         common.axios({
                method:"post",
                url:URL.getCategoryList,
                data:{}
            }).then((res)=>{
                _this.category=res.msg;
                _this.getCategorySubList(this.category[0].ID);
            })
     },
     getCategorySubList(categoryId){
          var _this=this;
          common.axios({
            method:"post",
            url:URL.getCategorySubList,
            data:{categoryId:categoryId}
          }).then((res)=>{
              _this.categorySub=res.msg;
              _this.categorySubId=_this.categorySub[0].ID;
              _this.onLoad()

          })
     },
     getGoodList(){
        var _this=this;
        common.axios({
        method:"post",
        url:URL.getGoodsListByCategorySubID,
        data:{
            categorySubId:this.categorySubId,
            page:this.page
            }
        }).then((res)=>{
            console.log(res.msg.length);
            if(res.msg.length){
                _this.page++;
                _this.categorySubIdList=_this.categorySubIdList.concat(res.msg)
            }else{
                 _this.finished = true
            }
            _this.loading = false
             
        })
     }
  }
}
</script>
<style scoped>
  .category_container{
      font-size: 0.32rem
  }
  #leftNav{
      background: aliceblue
  }
  #leftNav ul li{
      border-bottom:1px solid #E4E7ED;
      padding: 5px;
      text-align: center;
      line-height: 1rem
  }
  .categoryActive{
    background-color: #fff;
  }
   #list_div{
        overflow: scroll;
        font-size: 0.32rem
   }
   .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
        font-size: 0.32rem
    }
</style>
