<template>
  <div>
    <van-nav-bar title="登陆" left-text="返回"  left-arrow @click-left="goBack"/>
    <div class="register_pannel">
      <van-cell-group>
      <van-field
        v-model="username" required clearable label="用户名" placeholder="请输入用户名" @click-right-icon="username=''" :error-message="usernameErrorMsg" />
      <van-field  v-model="password" type="password"  label="密码" placeholder="请输入密码" required @click-right-icon="password=''" :error-message="passwordErrorMsg" />
    </van-cell-group>
    <div class="register_button">
        <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登陆</van-button>
    </div>
    </div>

  </div>
</template>
<script>
import common from '../../utils/axios'
import URL from '../../serviceAPI.config.js'
import { Toast } from 'vant';
export default {
 components: {
  },
  data () {
    return {
      username: '',
      password: '',
      openLoading:false,
      usernameErrorMsg:'',
      passwordErrorMsg:''
    }
  },
  computed:{

  },
  created(){
      // if(localStorage.userInfo){
      //   Toast.success('您已经登录')
      //       this.$router.push('/')
      // }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    axiosLoginUser(){
      var _this=this;
      _this.openLoading=true;
      common.axios({
        method:"post",
        url:URL.login,
        data:{
          userName:this.username,
          password:this.password
        }
      }).then((data)=>{
        if(data.msg){
          // 存储用户名到本地
          new Promise((resolve,reject)=>{
              localStorage.userInfo={
                userName:this.username
              }
              setTimeout(function(){
                  resolve();
              },500)
          }).then((result)=>{
            Toast('登陆成功');
            this.$router.push('/');
          }).catch(err=>{
            Toast('登陆保存失败');
            console.log(err);
          })
        }else{
          Toast('密码不正确请重新输入');
          this.openLoading=false
        }
         
      }).catch(error=>{
          this.openLoading=false
      })
    },
    checkForm(){
       let isOk = true
        if(this.username.length<5){
            this.usernameErrorMsg = "用户名不能少于5位"
            isOk=false
        }else{
            this.usernameErrorMsg = ''
        } 
        if(this.password.length<6){
            this.passwordErrorMsg = '密码不能少于6位'
            isOk = false
        }else{
            this.passwordErrorMsg = ''
        }

        return isOk
    },
    loginAction(){
      if(this.checkForm()){
          this.axiosLoginUser();
      }
    }
  }
}
</script>
<style scoped>
  .register_pannel{
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    /* padding-bottom: 80px; */
  }
  .register_button{
    padding-bottom: 20px
  }
</style>
