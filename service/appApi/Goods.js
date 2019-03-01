const mongoose=require('mongoose');
const Router=require('koa-router');
let router=new Router();
let fs=require('fs');
router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
        let data1=JSON.parse(data);
        let Goods=mongoose.model('Goods');
        let saveCount=0;
        data1.map(function(value,index){
            let newGoods=new Goods(value);
            newGoods.save().then(()=>{
                saveCount++;
                console.log('成功'+saveCount)
            }).catch((err)=>{
                console.log(err);
            })
        })
    })
    ctx.body='正在导入数据'
});
router.get('/insertAllCatetory',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        data=JSON.parse(data);
        let category=mongoose.model('Category');
        let saveCount=0
        data.RECORDS.map((value,index)=>{
            let newCategory=new category(value);
            newCategory.save().then(()=>{
                saveCount++;
                console.log('成功'+saveCount);
                if(index+1==data.RECORDS.length){
                    console.log('导入完成')
                }
            }).catch(err=>{
                console.log(err)
            })
        })
    })
    ctx.body='开始导入'
});
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('插入成功:'+saveCount)
            }).catch(error=>{
                console.log('插入失败:'+error)
            })
        })

    })
    ctx.body="开始导入数据....."
});
//***获取商品详细信息的接口
router.post('/getDetailGoodsInfo',async(ctx)=>{
    try{
        let goodsId=ctx.request.body.goodsId;
        const Goods=mongoose.model('Goods');
        let result =await Goods.findOne({ID:goodsId}).exec();
        ctx.body={
            recode:'000000',
            msg:result
        }
    }catch(err){
        ctx.body={code:500,msg:'获取数据失败'}
    }
});
// 获取商品分类
router.post('/getCategoryList',async(ctx)=>{
    try{
        const Category=mongoose.model('Category');
        let result=await Category.find({}).exec();
        ctx.body={
            recode:'000000',
            msg:result
        }
    }catch(err){
        ctx.body={
            recode:'000000',
            msg:'数据获取失败'
        }
    }
})
router.post('/getCategorySubList',async(ctx)=>{
    try{
        let categoryId = ctx.request.body.categoryId;
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec();
        ctx.body={recode:'000000',msg:result}
    }catch(err){
        ctx.body={recode:500,msg:err}
    }
})
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
        let categorySubId = ctx.request.body.categorySubId 
        const Goods = mongoose.model('Goods')
        let page=ctx.request.body.page;
        let num=10;
        let start=(page-1)*10;
        let result = await Goods.find({SUB_ID:categorySubId})
        .skip(start).limit(num).exec()
        ctx.body={recode:'000000',msg:result}
    }catch(err){
        ctx.body={recode:500,msg:err}
    }
})
module.exports=router;