const mongoose=require('mongoose');
const db='mongodb://127.0.0.1:27017/simple-db';
const glob=require('glob');
const {resolve} =require('path');
exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require);
}
exports.connect=()=>{
    // 连接数据库
    mongoose.connect(db,{useNewUrlParser:true});
    let maxConnectTimes=0;
    return new Promise((resolve,reject)=>{
            // 增加数据库连接事件的监听
        mongoose.connection.on('disconnected',()=>{
            console.log('-----------------数据库断开------------');
            // 失去连接的时候重新连接
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
        })
        // 数据库出现错误的时候
        mongoose.connection.on('error',(err)=>{
            if(maxConnectTimes<3){
                maxConnectTimes++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
        })
        // 连接打开的时候
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!');
            resolve();
        })
        mongoose.connection.on('connected', function () {  
            console.log('Mongoose connection open to ' + db);  
        });  
    });
}

