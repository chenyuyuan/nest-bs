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
            <el-button type="" v-on:click="nowdata">修改昵称</el-button>
        </div>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:5%">邮箱:</div>
        <el-input placeholder="请输入新邮箱" v-model="mail" style="width:150px" clearable></el-input>
        <div class="form-inline" style="">
            <el-button type="" v-on:click="nowdata">获取验证码</el-button>
            <el-input placeholder="请输入验证码" v-model="mail_code" style="width:150px" clearable></el-input>
            <el-button type="" v-on:click="nowdata">修改邮箱</el-button>
        </div>
      </div>
      
      <div class="form-inline" style="margin-top:10px">
        <div style="width:5%">密码:</div>
        <el-input placeholder="请输入密码" v-model="pwd" style="width:150px" clearable></el-input>
        <el-input placeholder="再输入一次" v-model="pwd2" style="width:150px" clearable></el-input>
        <el-button type="" v-on:click="nowdata">修改密码</el-button>
        
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
        name:"yu",
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
    changeName(data) {
      axios.post(`${server.baseURL}/user/change_name`, data).then(data => {
        if(data.data.msg == "device_update_success") {
          this.$message('修改成功');
        }
        
      });
    },
    getMailCode(data) {
      axios.post(`${server.baseURL}/user/change_name`, data).then(data => {
        if(data.data.msg == "device_update_success") {
          this.$message('修改成功');
        }
        
      });
    },
    changeMail(data) {
      axios.post(`${server.baseURL}/user/change_name`, data).then(data => {
        if(data.data.msg == "device_update_success") {
          this.$message('修改成功');
        }
        
      });
    },
    changePwd(data) {
      axios.post(`${server.baseURL}/user/change_name`, data).then(data => {
        if(data.data.msg == "device_update_success") {
          this.$message('修改成功');
        }
        
      });
    }



    
  },
  mounted() {

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