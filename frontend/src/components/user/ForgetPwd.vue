<template>
  <el-row>
    <el-col :xs="6" :sm="6" :md="10" :lg="9" :xl="9" style="border:1px solid transparent"><div style="display:none" class="grid-content bg-purple"> </div></el-col>
    <el-col :xs="12" :sm="12" :md="4" :lg="6" :xl="6">
        <div class="grid-content bg-purple-light">
            <div style="height:60px"></div>
            <div style="">忘记密码</div>
            <div style="height:40px"></div>
            <div class="form-inline">
                <el-input style="width:60%" placeholder="请输入邮箱" v-model="mail"></el-input>
                <el-button style="width:40%" type="primary" plain v-on:click="getMailCode">获取验证码</el-button>
            </div>
            <div class="form-inline">
                <el-input placeholder="验证码" v-model="mail_code" style="" clearable></el-input>
            </div>
            <div class="form-inline">
                <el-input placeholder="请输入密码" v-model="pwd" style="" clearable></el-input>
            </div>
            <div class="form-inline">
                <el-input placeholder="再输入一次" v-model="pwd2" style="" clearable></el-input>
            </div>
            <div class="form-inline">
                <el-button style="width:100%" type="primary" v-on:click="changePwd" plain>修改</el-button>
            </div>
            <div style="height:5px"></div>
        </div>
    </el-col>
    <el-col :xs="6" :sm="6" :md="10" :lg="9" :xl="9" style="border:1px solid transparent"><div class="grid-content bg-purple"> </div></el-col>
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
      mail: "",
      mail_code: "",
      pwd: "",
      pwd2: ""

    };
  },
  created() {
    this.date_posted = new Date().toLocaleDateString();
  },
  methods: {

    getMailCode() {
        if(this.mail=="") {
            this.$message('邮箱不能为空');
        }
        axios.get(`${server.baseURL}/user/getmailcode/`+this.mail,).then(data => {
            if(data.data.msg == "mail_send_success") {
                this.$message('验证码已发送');
            }
            
        });
    },
    changePwd() {
        if(this.mail_code == "") {
            this.$message('验证码不能为空');
        }
        else if(this.pwd == "" || this.pwd2 == "") {
            this.$message('密码不能为空');
        }
        else if(this.pwd != this.pwd2) {
            this.$message('两次输入不一致');
        }
        else {
            axios.get(`${server.baseURL}/user/changepwd/`+this.mail+`/`+this.mail_code+`/`+this.pwd, ).then(data => {
                if(data.data.msg == "change_pwd_susscess") {
                    this.$message('修改成功');
                }
                else if(data.data.msg == "wrong_mail_code") {
                    this.$message('验证码错误');
                }
                else if(data.data.msg == "change_pwd_failed") {
                    this.$message('修改失败');
                }
            
            });
        }

    }

  }
};
</script>