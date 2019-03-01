<template>
  <div>
      <div class="navbar-div">
        <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="card_title">
          <van-button size="small" type="danger" @click="clearCart" plain>
              清空购物车</van-button>
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
        <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
            <div class="pang-img"><img :src="item.image" width="100%" /></div>
            <div class="pang-text">
                <div class="pang-goods-name">{{item.Name}}</div>
                    <div class="pang-control">
                    <van-stepper v-model="item.count" />
                </div>
            </div>
            <div class="pang-goods-price">
                <div>￥{{item.price |moneyFilter}}</div>
                <div>x{{item.count}}</div>
                <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
            </div>
        </div>
    </div>
    <div class="totalMoney">
        商品总价:￥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>
<script>
import { toMoney } from '../../filter/moneyFilter.js'
import common from '../../utils/axios'
import URL from '../../serviceAPI.config.js'
export default {
  data () {
    return {
        cartInfo:[],
        isEmpty:true,
    }
  },
  created(){
      this.getCartInfo()
  },
  computed:{
      totalMoney(){
          let allMoney=0;
          this.cartInfo.forEach((item,index)=>{
              allMoney+=item.price*item.count;
          });
          localStorage.cartInfo=JSON.stringify(this.cartInfo);
          console.log(allMoney);
          
          return allMoney;
      }
  },
  filters:{
      moneyFilter(money){
               return toMoney(money)
      }
  },
  methods:{
    onClickLeft(){
        this.$router.go(-1);
    },
    getCartInfo(){
        if(localStorage.cartInfo){
            this.cartInfo=JSON.parse(localStorage.cartInfo);
        }
        this.isEmpty=this.cartInfo.length>0?false:true;
    },
    clearCart(){
      localStorage.removeItem('cartInfo');
      this.cartInfo=[];
    }
  }
}
</script>
<style scoped>
  .card_title{
    height: 0.8rem; 
    background: #fff;
    border-bottom: 1px solid #E4E7ED;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .cart-list{
        background-color: #fff;
    }
    .pang-row{
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:5px;
        font-size:0.32rem;
        border-bottom:1px solid #E4E7ED;
    }
    .pang-img{
        flex:6;
    }
    .pang-text{
        flex:14;
        padding-left:10px;
    }
    .pang-control{
        padding-top: 10px;
    }
    .pang-goods-price{
        flex:4;
        text-align: right;
    }
    .allPrice{
        color:red;
    }   
    .totalMoney{
    text-align: right;
    background-color: #fff;
     border-bottom:1px solid #E4E7ED;
     padding: 5px;
     font-size: 0.32rem;
    }
</style>
