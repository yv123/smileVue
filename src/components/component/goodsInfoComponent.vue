<template>
    <div>
        <div class="good_info" @click="goGoodsPage">
            <div >
                <img width="90%" v-lazy="goodsImage" alt="">
            </div>
            <div class="textCenter goods_name">{{goodsName}}/瓶</div>
            <div class="textCenter">￥{{goodsPrice|moneyFilter}}</div>
        </div>
    </div>
</template>
<script>
import {toMoney} from '../../filter/moneyFilter'
export default {
  props:['goodsId','goodsImage','goodsPrice','goodsName'],
  data(){
    return{
     
    }
  },
  created(){
    
    
  },
  mounted(){
    
  },
  filters:{
      moneyFilter(money){
          return toMoney(money)
      }
  },
  methods:{
    goGoodsPage(){
      this.$router.push({name:'Goods',query:{goodsId:this.goodsId}})
    }
  }
}
</script>

<style>
  /* 热卖商品 */
  .hot_area{
    font-size: 0.32rem;
  }
  .goods_name{
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .good_info{
    line-height: 0.6rem;
    text-align: center;
  }
</style>


