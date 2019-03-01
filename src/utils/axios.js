import axios from 'axios'
import { Toast } from 'vant';

// let baserl='https://www.easy-mock.com/mock/5c6bbc2920c0e8056528cedd/smileVue'
// let baserl="http://localhost:3000/"
// https://www.easy-mock.com/mock/5c6bbc2920c0e8056528cedd/smileVue/index
var common={
    axios(options){
        // let baseApi=baserl+'122';
        // let loading;
        // loading = document.getElementById('ajaxLoading');
        // loading.style.display='block';
        return new Promise(function(resolve,reject){
            axios({
                method: options.method,
                url:options.url,
                data: options.data
              }).then(function(response) {
                  console.log(response)
                // loading = document.getElementById('ajaxLoading');
                // loading.style.display='none';
                if(response.status=='200'){
                    let res=response.data;
                    if(res.recode=='000000'){
                    resolve(res);
                    }else{
                        console.log(res);
                        Toast.fail(res.msg);
                        reject(res)
                    }
                }else{
                    reject('错误');
                }
              });
        })
    }
}

export default common;