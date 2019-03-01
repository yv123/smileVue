const Koa = require('koa')
const Router=require('koa-router');
const app = new Koa()
const {initSchemas,connect} = require('./database/init.js')
const user=require('./appApi/user.js');
const goods=require('./appApi/goods.js');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
const cors = require('koa2-cors')
app.use(cors())
let router=new Router();
router.use('/user',user.routes())
router.use('/goods',goods.routes())
app.use(router.routes());
app.use(router.allowedMethods());
//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
})()
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})