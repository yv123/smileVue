const Router=require('koa-router');
const mongoose=require('mongoose');
let router=new Router();
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
});
router.post('/register',async(ctx)=>{
    // 取得User
    let User=mongoose.model('User');
    let newUser=new User(ctx.request.body);
    await newUser.save().then(()=>{
        ctx.body={
            recode:'000000',
            msg:'注册成功'
        }            
    }).catch(error=>{
        ctx.body={
            recode:'500',
            msg:'注册失败'
        }
    })

});
router.post('/login',async(ctx)=>{
    let loginUser=ctx.request.body;
    let password=loginUser.password;
    let userName=loginUser.userName;
    // 引入user的model
    const User=mongoose.model('User');
    // 首先去数据库中查询是否有相同的用户名
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        if(result){
            
            // // 有相同的用户名开始比较密码
            let newUser=new User();
            await newUser.comparePassword(password,result.password)
                .then((isMatch)=>{
                    ctx.body={
                        recode:'000000',
                        msg:isMatch
                    }
                })
                .catch(error=>{
                    ctx.body={
                        recode:'111111',
                        msg:error
                    }
                })
        }else{
            ctx.body={
                recode:'111111',
                msg:'用户名不存在'
            }
        }
    }).catch(err=>{
        ctx.body={
            recode:'111111',
            msg:'未知错误'
        }
    })
})
module.exports=router;