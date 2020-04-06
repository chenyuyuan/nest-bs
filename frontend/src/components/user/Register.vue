<template>
  <el-row>
    <el-col :xs="6" :sm="6" :md="10" :lg="10" :xl="10" style="border:1px solid transparent"><div style="display:none" class="grid-content bg-purple"> </div></el-col>
    <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
			<div class="grid-content bg-purple-light">
        <div style="height:60px"></div>
        <div style="">R E G I S T E R</div>
        <div style="height:40px"></div>
        <el-input style="width:100%" class="center-block" v-model="name" v-on:blur="checkUserName" placeholder="用户名"></el-input>
        <el-input style="width:100%" placeholder="邮箱" v-model="mail"></el-input>
        <el-input style="width:100%" placeholder="手机号" v-model="phone"></el-input>
        <el-input style="width:100%" placeholder="密码" v-model="pwd" show-password></el-input>
        <el-input style="width:100%" placeholder="再次输入密码" v-model="pwd2" v-on:blur="checkTwoPwd" show-password></el-input>
        <div class="form-inline">
          <el-input style="width:60%" placeholder="验证码" v-model="code"></el-input>
          <el-button style="width:40%" type="primary" plain v-on:click="getmailcode">获取验证码</el-button>
        </div>
        <div style="height:24px"></div>
        <el-button style="width:100%" type="primary" v-on:click="registerUser" plain>注册</el-button>
        <div style="height:5px"></div>
        <el-link :underline="false" type="primary" href="/login">登录</el-link>

			</div>
		</el-col>
    <el-col :xs="6" :sm="6" :md="10" :lg="10" :xl="10" style="border:1px solid transparent"><div class="grid-content bg-purple"> </div></el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import { server } from "../../utils/helper";
import router from "../../router";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      mail: "",
      pwd: "",
      pwd2: "",
      phone: "",
      code: ""
    };
  },
  created() {
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {
    registerUser() {
      let postData = {
        name: this.name,
        mail: this.mail,
        phone: this.phone,
        pwd: this.pwd,
        mail_code: this.code,

      };
      this.__submitToServer(postData);
    },
    getmailcode() {
      axios.get(`${server.baseURL}/user/getmailcode/` + this.mail).then(data => {
        this.$message('验证码已发送');
      });
      console.log(this.mail)
    },
    checkUserName() {
      axios.get(`${server.baseURL}/user/ifusernameexists/` + this.name).then(data => {
        if(data.data.msg == "exists") {
          this.$message('用户名已存在');
        }
        else{
          console.log("用户名可用")
        }
        
      });
      console.log(this.name)
    },
    checkTwoPwd() {
      if(this.pwd!==this.pwd2) {
        this.$message('两次输入密码不一致');
      }
    },

    __submitToServer(data) {
      axios.post(`${server.baseURL}/user/register`, data).then(data => {
        if(data.data.msg == "register_success") {
          this.$message('注册成功');
        }
        else if(data.data.msg == "wrong_mail_code") {
          this.$message('验证码错误');
        }
        else if(data.data.msg == "user_exists") {
          this.$message('用户已存在');
        }
        else {
          this.$message('注册失败');
        }
        //router.push({ name: "login" });
      });
    },

  }
};
</script>