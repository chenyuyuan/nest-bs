<template>
  <el-row>
    <el-col :xs="6" :sm="6" :md="10" :lg="10" :xl="10" style="border:1px solid transparent"><div style="display:none" class="grid-content bg-purple"> </div></el-col>
    <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
		<div class="grid-content bg-purple-light">
			<div style="height:60px"></div>
			<div style="">管理员登录</div>
			<div style="height:40px"></div>
			<el-input style="width:100%" class="center-block" v-model="name" placeholder="请输入用户名"></el-input>
			<el-input style="width:100%" placeholder="请输入密码" v-model="pwd" show-password></el-input>
			<el-button style="width:100%" type="primary" v-on:click="login" plain>登录</el-button>
			<div style="height:5px"></div>
			<el-link :underline="false" type="primary" href="/">普通用户登录</el-link>
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
	name: "AdminHome",
	data() {
		return {
		name: "",
		pwd: "",
		};
	},
	created() {
		this.date_posted = new Date().toLocaleDateString();
	},
	methods: {
		login() {
			let postData = {
				name: this.name,
				pwd: this.pwd,
			};
			this.__submitToServer(postData);
		},
		__submitToServer(data) {
			axios.post(`${server.baseURL}/admin/login`, data).then(data => {
				if(data.data.msg == "admin_login_success") {
					this.$message('登录成功');
					this.$router.push("/admin/device");
				}
				else {
					this.$message('登录失败');
				}
				
			});
		}
	}
};
</script>