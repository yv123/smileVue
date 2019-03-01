<template>
    <div>
         <div class="floor">
            <div class="floor_title">{{floorTitle}}</div>
            <div class="floor_anomaly">
            <div class="floor_one">
                <img :src="floorData0.image" width="100%">
            </div>
            <div class="floor_two">
                <div class="floor_two_firstChild"> <img :src="floorData1.image" width="100%"></div>
                <div><img :src="floorData2.image" width="100%"></div>
            </div>
            </div>
            <div class="floor_bottom">
                    <div class="floor_bottom_firstChild"  v-for="(item,index) in  floorData.slice(3,5)" :key="index">
                      <img  :src="item.image" width="100%">
                    </div>
                    <!-- <div class="floor_bottom_lastChild"><img :src="floorData.slice(4,5)[0].image" width="100%"></div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props:['floorData','floorTitle'],
  data(){
    return{
     floorData0:{},
     floorData1:{},
     floorData2:{}
    }
  },
  created(){
    
    
  },
  mounted(){

  },
  watch:{
      floorData:function(val){
        // 备注arr.slice(start,end) 该方法是对数组进行截取，并且返回一个数组副本，并且不改变原数组。start是截取数组的开始索引,
        // end参数表示你要取的最后一位加1var a=[1,2,3,4,5,6];
        // var b=a.slice(0,3);      //[1,2,3]
        // var c=a.slice(3);       //[4,5,6]
        this.floorData0 = this.floorData[0]
        this.floorData1 = this.floorData[1]
        this.floorData2 = this.floorData[2]
      }
  }
}
</script>

<style>
  .floor_title{
    text-align: center;
    font-size: 0.32rem;
    padding: 5px 0;
    background: rgb(241, 241, 241)
  }
  .floor_anomaly{
    background: #fff;
    display: flex;
  }
  .floor_anomaly div{
    flex: 1
  }
  .floor_one{
    border-right:1px solid #ddd;
  }
  .floor_two_firstChild{
    border-bottom:1px solid #ddd;
    
  }
  .floor_bottom_firstChild{
    border-right:1px solid #ddd;
  }
  .floor_bottom_firstChild img{
    display: block;
  }
  .floor_bottom{
    width: 100%;
    border-bottom:1px solid #ddd;
  }
  .floor_bottom div{
    border-right:1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .floor_bottom{
    border-top:1px solid #ddd;
    display: flex
  }
</style>

