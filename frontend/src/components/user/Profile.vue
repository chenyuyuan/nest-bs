<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu
        default-active=""
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1" @click="toProfile">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="1" style="border:1px solid transparent">
      <div style="display:none" class="grid-content bg-purple">1</div>
    </el-col>
    <el-col :span="20">
      <div style="margin-top:10px;margin-bottom:10px">个人信息</div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:5%;">昵称:</div>
        <el-input placeholder="请输入新昵称" v-model="name" style="width:150px" clearable></el-input>
        <div class="form-inline" style="">
            <el-button type="" v-on:click="changeName">修改昵称</el-button>
        </div>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:5%">邮箱:</div>
        <el-input placeholder="请输入新邮箱" v-model="mail" style="width:200px" clearable></el-input>
        <div class="form-inline" style="">
            <el-button type="" v-on:click="getMailCode">获取验证码</el-button>
            <el-input placeholder="请输入验证码" v-model="mail_code" style="width:150px" clearable></el-input>
            <el-button type="" v-on:click="changeMail">修改邮箱</el-button>
        </div>
      </div>
      
      <div class="form-inline" style="margin-top:10px">
        <div style="width:5%">密码:</div>
        <el-input placeholder="请输入密码" v-model="pwd" style="width:150px" clearable></el-input>
        <el-input placeholder="再输入一次" v-model="pwd2" style="width:150px" clearable></el-input>
        <el-button type="" v-on:click="changePwd">修改密码</el-button>
        
      </div>

    </el-col>
  </el-row>
</div>

</div>

</template>
<script>
import axios from "axios";

import Header from "../Header"
import { server } from "../../utils/helper";



export default {
  name: "Profile",
  components: {
    Header
  },
  data() {
    return {
        name:"",
        mail:"",
        mail_code:"",
        pwd:"",
        pwd2:""
    }
  },
  methods:{
    toProfile(){
      this.$router.push({path:'/profile'})
    },
    changeName() { 
      if(this.name == null || this.name == '') {
        this.$message('昵称不能为空');
      }
      axios.get(`${server.baseURL}/user/changename/`+this.name).then(data => {
        if(data.data.msg == "change_name_success") {
          this.$message('昵称修改成功');
        }
        else if(data.data.msg == "user_name_exists") {
          this.$message('用户名已存在');
        }
        
      });
    },
    getMailCode() {
      axios.get(`${server.baseURL}/user/getmailcode/`+this.mail,).then(data => {
        if(data.data.msg == "mail_send_success") {
          this.$message('验证码已发送');
        }
        
      });
    },
    changeMail() {
      axios.get(`${server.baseURL}/user/changemail/`+this.mail+`/`+this.mail_code,).then(data => {
        if(data.data.msg == "wrong_mail_code") {
          this.$message('验证码错误');
        }
        if(data.data.msg == "change_mail_susscess") {
          this.$message('邮箱修改成功');
        }
        
      });
    },
    changePwd() {
      if(this.pwd != this.pwd2) {
        this.$message('两次输入不一致');
      }
      else {
        axios.get(`${server.baseURL}/user/changepwdnomailcode/`+this.pwd, ).then(data => {
          if(data.data.msg == "change_pwd_susscess") {
            this.$message('修改成功');
          }
          
        });
      }

    }



    
  },
  mounted() {
    axios.get(`${server.baseURL}/user/user`).then(data => {
      if(data.data.msg == "get_user_success") {
        this.name=data.data.user.name
        this.mail=data.data.user.mail
      }
      
    });
}
  
 
};
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>