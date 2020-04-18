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
        default-active="1"
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
      <div style="margin-top:10px;margin-bottom:10px">添加设备</div>
      <div class="form-inline">
        <el-select v-model="value" placeholder="请选择产品" style="margin-right:full">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.ocproduct_id">
          </el-option>
        </el-select>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <el-input placeholder="请输入设备号" v-model="device_id" style="width:250px" clearable></el-input>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <el-button type="primary" v-on:click="add">确认</el-button>
      </div>
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
  name: "AddDevice",
  components: {
    Header
  },
  data() {
    
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        },],
        value: '',
        device_id: ''
    }
  },
  methods: {
    toManageDevice(){
      this.$router.push({path:'/managedevice'})
    },
    add() {
      let adddata = {
        ocproduct_id: this.value,
        ocdevice_id: this.device_id,
      };
      console.log("selected " + this.value)
      this.__add(adddata);
    },
    __add(data) {
      axios.post(`${server.baseURL}/device/adddevice`, data).then(data => {
        if(data.data.msg == "add_device_success") {
          this.$message('添加成功');
        }
        else if(data.data.msg == "user_device_exists") {
          this.$message('设备已存在，请到管理设备查看');
        }
        else if(data.data.msg == "device_not_exists") {
          this.$message('设备不存在');
        }
        
      });
    }
  },
  mounted() {
    axios.get(`${server.baseURL}/device/products`, ).then(data => {
      console.log(data.data.products)
      this.options = data.data.products
      
        
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