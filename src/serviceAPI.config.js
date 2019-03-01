
let baserl='https://www.easy-mock.com/mock/5c6bbc2920c0e8056528cedd/smileVue'
let baserl_mongoose="http://localhost:3000/"
const URL={
    getShoppingMallInfo: baserl+'/index',
    registerUser:baserl+'user/register',
    login:baserl_mongoose+'user/login',  //用户登录接口
    getDetailGoodsInfo:baserl_mongoose+'goods/getDetailGoodsInfo',  //用户登录接口
    getCategoryList:baserl_mongoose+'goods/getCategoryList',  //获取信息类别列表
    getCategorySubList:baserl_mongoose+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubID:baserl_mongoose+'goods/getGoodsListByCategorySubID',   //得到小类信息
}
export default URL;