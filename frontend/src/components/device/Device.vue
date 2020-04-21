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
      <div style="margin-top:10px;margin-bottom:10px">修改设备</div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">产品号</div>
        <div >{{device.ocproduct_id}}</div>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">设备号:</div>
        <div >{{device.imei}}</div>
      </div>
      <div class="form-inline" style="margin-top:10px">
          <div style="width:10%">设备名:</div>
            <el-input placeholder="请输入设备名" v-model="device.name" style="width:250px" clearable></el-input>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">imei:</div>
        <el-input placeholder="请输入imei号" v-model="device.imei" style="width:250px" clearable></el-input>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">imsi:</div>
        <el-input placeholder="请输入imsi号" v-model="device.imsi" style="width:250px" clearable></el-input>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">注册时间:</div>
        <div >{{device.reg_time}}</div>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <el-button type="" v-on:click="update">修改</el-button>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <el-button type="" v-on:click="nowdata">查看设备实时数据</el-button>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <el-button type="" v-on:click="historydata">查看设备历史数据</el-button>
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
  name: "Device",
  components: {
    Header
  },
  data() {
    
    return {
        device:{id: '',
            name: '',
            ocdevice_id: '',
            ocproduct_id: '',
            imei: '1',
            imsi:'2',
            reg_time: '',
            status: '',}
    }
  },
  methods: {
    toManageDevice(){
      this.$router.push({path:'/managedevice'})
    },
    toDataTime(){
      this.$router.push({path:'/managedevice'})
    },
    nowdata() {
      this.$router.push({path:'/data'})
    },
    historydata(){
      this.$router.push({path:'/historydata'})
    },
    
    update() {
      let updatedata = {
        name: this.device.name,
        imei: this.device.imei,
        imsi: this.device.imsi
      };
      console.log("selected " + this.device.name)
      this.__update(updatedata);
    },
    __update(data) {
      axios.post(`${server.baseURL}/device/update`, data).then(data => {
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
      console.log(this.$route)
    axios.get(`${server.baseURL}/device/device/`+this.$route.query.ocdevice_id, ).then(data => {
      console.log(data.data)
      this.device = data.data.device
      
        
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