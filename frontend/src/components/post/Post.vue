<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    
    <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix" style="">
                        <div class="form-inline">
                            <div>name</div>
                            <div>·</div>
                            <div>time</div>
                        </div>
                    </div>
                    <div>
                        title
                    </div>
                    <div>
                        content
                    </div>
                    <div>
                        img
                    </div>
                    <div class="form-inline" style="margin-top:5px">
                        <i class="el-icon-arrow-up" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">1</div>
                        <div style="width:24px">&nbsp;</div>
                        <i class="el-icon-chat-round" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">1</div>
                    </div>
                </el-card>
                <el-card class="box-card" shadow="hover">
                    <div class="form-inline" style="margin-top:10px">
                      <el-input placeholder="请输入评论" v-model="name" style="width:auto" clearable></el-input>
                      <div class="form-inline" style="">
                          <el-button type="" v-on:click="changeName">发送</el-button>
                      </div>
                    </div>
                </el-card>
                <el-card class="box-card" shadow="hover">
                    <div class="form-inline">
                        <div>name</div>
                        <div>: </div>
                        <div>content</div>
                        <div>-</div>
                        <div style="float:right">time</div>
                    </div>
                    
                </el-card>
            </el-col>
            <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>

  </el-row>
</div>

</div>

</template>

<script>
import { server } from "../../utils/helper";
import Header from "../Header"

import axios from "axios";
import router from "../../router";
export default {
  name: "Post",
  components: {
    Header
  },
  data() {
    return {
      id: 0,
      post: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getPost();
  },
  methods: {
    getPost() {
      axios
        .get(`${server.baseURL}/blog/post/${this.id}`)
        .then(data => (this.post = data.data));
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>