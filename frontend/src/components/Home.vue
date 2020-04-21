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
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">添加设备</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toManageDevice">
          <i class="el-icon-setting"></i>
          <span slot="title">管理设备</span>
        </el-menu-item>
        <!-- <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">删除设备</span>
        </el-menu-item> -->
      </el-menu>
    </el-col>
    <el-col :span="1" style="border:1px solid transparent">
      <div style="display:none" class="grid-content bg-purple">1</div>
    </el-col>
    <el-col :span="20">
      
    </el-col>
  </el-row>
</div>

</div>

</template>
<script>
import axios from "axios";

import Header from "./Header"



export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods:{
    toManageDevice(){
      this.$router.push({path:'/managedevice'})
    },
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