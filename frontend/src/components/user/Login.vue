<template>
  <el-row>
    <el-col :xs="6" :sm="6" :md="10" :lg="10" :xl="10" style="border:1px solid transparent"><div style="display:none" class="grid-content bg-purple"> </div></el-col>
    <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
			<div class="grid-content bg-purple-light">
        <div style="height:60px"></div>
        <div style="">L O G I N</div>
        <div style="height:40px"></div>
        <el-input style="width:100%" class="center-block" v-model="input" placeholder="请输入用户名"></el-input>
        <el-input style="width:100%" placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <el-button style="width:100%" type="primary" plain>登录</el-button>
        <div style="height:5px"></div>
        <el-link :underline="false" type="primary" href="/register">注册</el-link>
        <el-link :underline="false" type="primary" href="/register" style="float:right">忘记密码？</el-link>

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
      title: "",
      description: "",
      body: "",
      author: "",
      date_posted: "",
      input: "",
      pwd: "",
    };
  },
  created() {
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {
    createPost() {
      let postData = {
        title: this.title,
        description: this.description,
        body: this.body,
        author: this.author,
        date_posted: this.date_posted
      };
      this.__submitToServer(postData);
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/blog/post`, data).then(data => {
        router.push({ name: "home" });
      });
    }
  }
};
</script>