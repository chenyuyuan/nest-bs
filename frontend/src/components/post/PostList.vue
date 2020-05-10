<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="动态">
            <el-col :span="1" style="border:1px solid transparent">
            <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
            <el-col :span="22">
            
            </el-col>
        </el-tab-pane>
        <el-tab-pane label="我的动态">
            <el-col :span="1" style="border:1px solid transparent">
            <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
            <el-col :span="22">
            
            </el-col>
            <el-col :span="1" style="border:1px solid transparent">
            <div style="display:none" class="grid-content bg-purple">1</div>
            </el-col>
        </el-tab-pane>
        <el-tab-pane label="专业文章">
          角色管理
        </el-tab-pane>
        <el-tab-pane label="帮助文档">
          角色管理
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

    }
  },
  methods: {
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
    axios.get(`${server.baseURL}/device/my_device`, ).then(data => {
      console.log(data)
      this.tableData = data.data.devices
      
    });
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