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
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1" @click="toAddDevice">
          <i class="el-icon-menu"></i>
          <span slot="title">添加设备</span>
        </el-menu-item>
        <el-menu-item index="2">
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
    <el-col :span="19">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="name"
            label="设备名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="device_id"
            label="设备id"
            width="120">
        </el-table-column>
        <el-table-column
            prop="product_id"
            label="产品id">
        </el-table-column>
        <el-table-column
            prop="imei"
            label="imei">
        </el-table-column>
        <el-table-column
            prop="imsi"
            label="imsi">
        </el-table-column>
        <el-table-column
            prop="reg_time"
            label="注册时间">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
          </template>
       </el-table-column> 
      </el-table>
    </el-col>
    <el-col :span="1" style="border:1px solid transparent">
      <div style="display:none" class="grid-content bg-purple">1</div>
    </el-col>
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
  name: "ManageDevice",
  components: {
    Header
  },
  data() {

    return {
      tableData: [{
        id: '',
        name: '',
        device_id: '',
        product_id: '',
        imei: '',
        imsi:'',
        reg_time: '',
        status: '',
      }],

    }
  },
  methods: {
    toAddDevice(){
      this.$router.push({path:'/adddevice'})
    },
    editRow(row) {
      console.log(row);
      
    },
    deleteRow(row) {
      console.log(row);
      
    }
  },
  mounted() {
    axios.get(`${server.baseURL}/device/my_device`, ).then(data => {
      console.log(data.data)
      this.tableData = data.data
        
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