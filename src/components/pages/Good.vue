<template>
  <div>
      <div class="navbar-div">
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="goods_img">
        <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="goods_name">{{goodsInfo.NAME}}</div>
    <div class="goods_price">价格：￥{{goodsInfo.PRESENT_PRICE|moneyFilter}}元</div>
    <van-tabs swipeable sticky>
        <van-tab title="商品详情">
            <div id="detail" v-html="goodsInfo.DETAIL">      
            </div>
        </van-tab>
        <van-tab title="评价">
            正在制作中
        </van-tab>
    </van-tabs>
    <div class="goods_bottom">
        <div>
            <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
        </div>
        <div>
            <van-button size="large" type="danger">直接购买</van-button>
        </div>
    </div>
  </div>
</template>
<script>
import { toMoney } from '../../filter/moneyFilter.js'
import common from '../../utils/axios'
import URL from '../../serviceAPI.config.js'
import { Toast } from 'vant';
export default {
  data () {
    return {
      goodsId:'',
      goodsInfo:{}
    }
  },
  created(){
      this.goodsId=this.$route.query.goodsId?this.$route.query.goodsId:this.$route.params.goodsId;
      console.log(this.$route.params);
      
      this.getInfo();
  },
  filters:{
      moneyFilter(money){
          return toMoney(money)
      }
  },
  methods:{
      onClickLeft(){
          this.$router.go(-1)
      },
      getInfo(){
        var _this=this;
        common.axios({
            method:"post",
            url:URL.getDetailGoodsInfo,
            data:{goodsId:this.goodsId}
        }).then((res)=>{
            this.goodsInfo= res.msg;
            
        })
      },
      addGoodsToCart(){
         let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) :[]
         let isHaveGoods=cartInfo.find((item,index)=>{return item.goodsId==this.goodsId});
        //   若购物车中没有商品，那就添加到购物车
          if(!isHaveGoods){
              let newGoodInfo={
                  goodsId:this.goodsInfo.ID,
                  Name:this.goodsInfo.NAME,
                  price:this.goodsInfo.PRESENT_PRICE,
                  image:this.goodsInfo.IMAGE1,
                  count:1
              }
              cartInfo.push(newGoodInfo);
              localStorage.cartInfo=JSON.stringify(cartInfo);
              Toast.success('添加成功')

          }else{
              Toast.success('已有此商品')
          }
          this.$router.push({name:'Cart'})
      }
  }
}
</script>
<style scoped>
  #detail {
      font-size: 0
  }
  .goods_img img{
      display: block
  }
  .goods_name{
      background: #fff;
      font-size: 0.32rem;
      padding-left: 10px
  }
  .goods_price{
      background:#fff;
      font-size: 0.32rem;
      padding-left: 10px;
      padding-top:5px;
      padding-bottom: 10px
  }
  .goods_bottom{
      position: fixed;
      bottom:0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: row;
      flex-flow: nowrap
  }
  .goods_bottom>div{
      flex: 1;
      padding: 5px;
  }
</style>
