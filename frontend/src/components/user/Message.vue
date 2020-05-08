<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="用户消息">
        <el-col :span="1" style="border:1px solid transparent">
          <div style="display:none" class="grid-content bg-purple">1</div>
        </el-col>
        <el-col :span="22">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
                prop="sender_name"
                label="发送者"
                width="120">
            </el-table-column>
            <el-table-column
                prop="content"
                label="消息">
            </el-table-column>
            <el-table-column
                prop="time"
                label="时间"
                width="250">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
              </template>
          </el-table-column> 
          </el-table>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="系统消息">
        
      </el-tab-pane>
      <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
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
  name: "Device",
  components: {
    Header
  },
  data() {
    
    return {
        tableData: [{
        sender_id:"",
        sender_name:"",
        content:"",
        send_time:""
      }],
      tabPosition: 'left',

    }
  },
  methods: {
    deleteRow(row) {
        axios.get(`${server.baseURL}/message/delete/`+row.id, ).then(data => {
            if(data.data.msg == "message_delete_success") {
              this.$message('删除成功成功');
              axios.get(`${server.baseURL}/message/get`, ).then(data => {
                console.log(data.data)
                this.tableData = data.data.message
                
              });
            }
        
        });
    }


  },
  mounted() {
    
    axios.get(`${server.baseURL}/message/get`, ).then(data => {
      console.log(data.data)
      this.tableData = data.data.message
      
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