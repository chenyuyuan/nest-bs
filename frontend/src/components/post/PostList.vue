<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    
    <el-tabs :tab-position="tabPosition" style="">
        <el-tab-pane label="动态">
            <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card" shadow="hover" v-on:click="toPost" v-for="p1 in postList1" :key="p1.id">
                    <div slot="header" class="clearfix" style="">
                        <div class="form-inline">
                            <div>name</div>
                            <div>·</div>
                            <div>{{p1.time}}</div>
                        </div>
                    </div>
                    <div>
                        {{p1.title}}
                    </div>
                    <div>
                        {{p1.content}}
                    </div>
                    
                    <el-image style="height:auto;width:300px" :fit="fill" v-if="p1.img != null" :src="p1.img"></el-image>
                    <div class="form-inline" style="margin-top:5px" v-on:click="toPost">
                        <i class="el-icon-arrow-up" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">{{p1.like}}</div>
                        <div style="width:24px">&nbsp;</div>
                        <i class="el-icon-chat-round" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">{{p1.comment}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
        </el-tab-pane>
        <el-tab-pane label="我的动态">
            <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card" shadow="hover" v-on:click="toPost">
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
                    <div class="form-inline" style="margin-top:5px" v-on:click="toPost">
                        <i class="el-icon-arrow-up" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">1</div>
                        <div style="width:24px">&nbsp;</div>
                        <i class="el-icon-chat-round" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">1</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
        </el-tab-pane>
        <el-tab-pane label="专业文章">
          <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card" shadow="hover" v-on:click="toPost">
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
                    <img :src="item"/>
                    <div class="form-inline" style="margin-top:5px" v-on:click="toPost">
                        <i class="el-icon-arrow-up" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">1</div>
                        <div style="width:24px">&nbsp;</div>
                        <i class="el-icon-chat-round" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">1</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
        </el-tab-pane>
        <el-tab-pane label="帮助文档">
          <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card" shadow="hover" v-on:click="toPost">
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
                    <div class="form-inline" style="margin-top:5px" v-on:click="toPost">
                        <i class="el-icon-arrow-up" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">1</div>
                        <div style="width:24px">&nbsp;</div>
                        <i class="el-icon-chat-round" style="color:blue;font-size:22px"></i>
                        <div style="width:8px">&nbsp;</div>
                        <div style="color:blue;font-size:15px">1</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4" style="border:1px solid transparent">
                <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
        </el-tab-pane>
    </el-tabs>

  </el-row>
</div>

</div>

</template>
<script>
import axios from "axios";

import Header from "../Header"
import router from "../../router";
import { server } from "../../utils/helper";


export default {
  name: "PostList",
  components: {
    Header
  },
  data() {

    return {
      tableData: [{
        id: '',
        name: '',
        ocdevice_id: '',
        ocproduct_id: '',
        imei: '',
        imsi:'',
        reg_time: '',
        status: '',
      }],
      tabPosition: 'left',
      value:"",
      device_id:"",
      options: [{
        value: '',
        label: ''
      },],
      postList1:[],
      postList2:[],
      postList3:[],
      postList4:[],

    }
  },
  methods: {
      toPost() {
          console.log("post")
          this.$router.push({path:'/post/1'})
      },
    editRow(row) {
      console.log(row);
      this.$router.push({path:"/device",query:{ocdevice_id:row.ocdevice_id}});
      
    },
    deleteRow(row) {
      console.log(row);
      axios.get(`${server.baseURL}/device/delete/`+row.id, ).then(data => {
      console.log(data)
      this.$message('设备解除绑定成功');
      axios.get(`${server.baseURL}/device/my_device`, ).then(data => {
        console.log(data)
        this.tableData = data.data.devices
          
      });
    });
    },
  },
  mounted() {
    axios.get(`${server.baseURL}/article/articlelist/0`, ).then(data => {
      if(data.data.msg == "get_article_success") {
        this.postList1 = data.data.articles
        var pLen = this.postList1.length;
        for (var i = 0;i < pLen; ++i) {
          console.log(this.postList1[i]["img"])
          if(this.postList1[i]["img"] == null || this.postList1[i]["img"] == "") {
            this.postList1[i]["img"] == null
          }
          else {
            this.postList1[i]["img"] = server.baseURL+"/public/upload/"+this.postList1[i]["author_id"]+"/"+this.postList1[i]["img"]
            console.log(this.postList1[i]["img"])
            console.log("            ")
          }

        }

      }
      
    });
    axios.get(`${server.baseURL}/article/myarticlelist`, ).then(data => {
      if(data.data.msg == "get_article_success") {
        this.postList2 = data.data.articles
      }
      
    });
    axios.get(`${server.baseURL}/article/articlelist/2`, ).then(data => {
      if(data.data.msg == "get_article_success") {
        this.postList3 = data.data.articles
      }
      
    });
    axios.get(`${server.baseURL}/article/articlelist/3`, ).then(data => {
      if(data.data.msg == "get_article_success") {
        this.postList4 = data.data.articles
      }
      
    });

  }
  
 
};
</script>

<style>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 600px;
  }
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