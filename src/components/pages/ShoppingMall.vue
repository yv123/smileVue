<template>
  <div>
    <!-- 顶部导航栏 -->
    <div class="sesarch_bar">
        <van-row>
          <van-col span="3">
            <img :src="locationIcon" class="location_icon">
          </van-col>
          <van-col span="16" >
            <input type="text" class="search_input">
          </van-col>
          <van-col span="5">
            <van-button type="default" size="mini">查找</van-button>
          </van-col>
        </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swiper_area">
        <van-swipe :autoplay="3000" style="max-height:4.2rem">
          <van-swipe-item v-for="(image, index) in bannerPicArray" :key="index">
            <img v-lazy="image.image" width="100%"/>
          </van-swipe-item>
        </van-swipe>
    </div>
    <!-- catagery -->
    <div class="catagery_area">
      <div class="catagery_area_div_container" v-for="(item,index) in category" :key="index">
        <img :src="item.image"><br>
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <!-- ad-banner -->
    <div class="ad_banner">
      <img :src="PICTURE_ADDRESS">
    </div>
    <!-- recommond -->
    <div class="recommod_area">
      <div class="recommod_area_title">商品推荐</div>
      <div class="recommod_goods">
          <swiper :options="swiperOption" ref="mySwiper" style='text-align:center'>
            <swiper-slide v-for="(item,index) in recommondGoods" :key="index">
              <div class="recommend_item">
                <img v-lazy="item.image" style="width:80%">
                <div class="recommod_goodsName">{{item.goodsName}}</div>
                <div class="recommod_price">￥{{item.price |moneyFilter}}(￥{{item.mallPrice |moneyFilter}})</div>
              </div>
            </swiper-slide>
          </swiper>
      </div>
    </div>
    <floor-component :floorData='floor1' :floorTitle='floorName.floor1'></floor-component>
    <floor-component :floorData='floor2' :floorTitle='floorName.floor2'></floor-component>
    <floor-component :floorData='floor3' :floorTitle='floorName.floor3'></floor-component>
    <!-- 热卖商品 -->
    <div class="hot_area">
        <div class="floor_title">热卖商品</div>
        <div class="hot_goods">
            <van-list>
                <van-row gutter="20">
                <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                    <goods-Info :goodsId='item.goodsId' :goodsImage='item.image'
                     :goodsPrice='item.price' :goodsName='item.name'>
                      
                    </goods-Info>
                </van-col>
              </van-row>
            </van-list>
        </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponnet'
import goodsInfo from '../component/goodsInfoComponent'
import { toMoney } from '../../filter/moneyFilter.js'
import common from '../../utils/axios'
import URL from '../../serviceAPI.config.js'
export default {
 components: {
    swiper,swiperSlide,floorComponent,goodsInfo
  },
  data () {
    return {
      msg: 'Shopping Mall',
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray:[],
      category:[],
      PICTURE_ADDRESS:'',
      swiperOption: {
          slidesPerView:3
        },
      recommondGoods:[],
      floor1:[],
      floor2:[],
      floor3:[],
      floorName:{},
      hotGoods:[]
    }
  },
  computed:{
    swiper() {
            return this.$refs.mySwiper.swiper
    }
  },
  filters:{
    moneyFilter(money){
      return toMoney(money);
    }
  },
  created(){
    var _this=this;
    common.axios({
      method:"get",
      url:URL.getShoppingMallInfo,
      data:{}
    }).then((res)=>{
      let data=res.data
      _this.category=data.category;
      _this.bannerPicArray=data.slides;
      _this.PICTURE_ADDRESS=data.advertesPicture.PICTURE_ADDRESS;
      _this.recommondGoods=data.recommend;
      _this.floor1=data.floor1;
      _this.floor2=data.floor2;
      _this.floor3=data.floor3;
      _this.floorName=data.floorName;
      _this.hotGoods=data.hotGoods;
    })
  }
}
</script>
<style scoped>
  .sesarch_bar{
    height: 0.8rem;
    background-color: #e5017d;
    line-height: 0.8rem;
    font-size: 0.32rem;
    text-align: center
  }
  .location_icon{
    width:80%;
    vertical-align: middle;
  }
  .search_input{
    height: 0.6rem;
    width: 100%;
    border: none;
    margin: auto;
    border-bottom: 1px solid #fff;
    color: #fff;
    background: none;
  }
  .swiper_area{
      width:100%;
      clear:both;
  }
  .van-swipe__indicators{
    bottom: 20px
  }
  /* catagery_area */
  .catagery_area{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 5px 5px;
  }
  .catagery_area_div_container{
    flex: 1;
    font-size: 0.28rem;
    text-align: center;
    padding: 0.1rem;
  }
  .catagery_area_div_container span{
    margin-top: 5px
  }
  .catagery_area_div_container img{
    width: 80%
  }
  .ad_banner{
    background: rgb(241, 241, 241);
    text-align: center
  }
  .ad_banner img{
    width: 100%;
  }
  .recommod_area_title{
    font-size: 0.32rem;
    padding: 5px 10px;
    color: #e5017d;
    border-bottom: 1px solid #eee
  }
  .recommod_goods{
    font-size: 0.32rem
  }
  .recommend_item{
    border-right: 1px solid #eee;
  }
</style>
