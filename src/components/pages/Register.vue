<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回"  left-arrow @click-left="goBack"/>
    <div class="register_pannel">
      <van-cell-group>
      <van-field
        v-model="username" required clearable label="用户名" placeholder="请输入用户名" @click-right-icon="username=''" :error-message="usernameErrorMsg" />
      <van-field  v-model="password" type="password"  label="密码" placeholder="请输入密码" required @click-right-icon="password=''" :error-message="passwordErrorMsg"
      />
    </van-cell-group>
    <div class="register_button">
        <van-button type="primary" size="large" @click="RegisterAction" :loading="openLoading">马上注册</van-button>
        <!-- axiosRegisterUser -->
    </div>
    </div>

  </div>
</template>
<script>
import common from '../../utils/axios'
import URL from '../../serviceAPI.config.js'
import { Toast } from 'vant';
import { error } from 'util';
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
    
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    axiosRegisterUser(){
      var _this=this;
      _this.openLoading=true;
      common.axios({
        method:"post",
        url:URL.registerUser,
        data:{
          userName:this.username,
          password:this.password
        }
      }).then((data)=>{
          Toast.success('注册成功')
          _this.$router.push('/');
      }).catch(error=>{
        _this.openLoading=false;
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
    RegisterAction(){
      let userOk=true;
      if(this.checkForm()){
          this.axiosRegisterUser();
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
