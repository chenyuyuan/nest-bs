<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    <el-col :span="1" style="border:1px solid transparent">
      <div style="display:none" class="grid-content bg-purple">1</div>
    </el-col>
    <el-col :span="10">
      <div style="margin-top:10px;margin-bottom:10px">修改设备</div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">产品号:</div>
        <div >{{device.ocproduct_id}}</div>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">设备号:</div>
        <div >{{device.ocdevice_id}}</div>
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
        <el-button type="" v-on:click="nowdata">查看设备数据</el-button>
      </div>
      <!-- <div class="form-inline" style="margin-top:10px">
        <el-button type="" v-on:click="historydata">查看设备历史数据</el-button>
      </div> -->
    </el-col>
    <el-col :span="10" style="border:1px solid transparent">
      <div style="margin-top:10px;margin-bottom:10px">
        预警值设置
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">大于</div>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">预警值:</div>
        <el-input placeholder="请输入预警值" v-model="alarm_value_0.up.value" style="width:150px" clearable></el-input>
        <div style="width:10px"></div>
        <el-switch v-model="alarm_value_0.up.mail" active-text="发邮箱" inactive-text=""></el-switch>
        <div style="width:10px"></div>
        <el-switch v-model="alarm_value_0.up.message" active-text="发消息" inactive-text=""></el-switch>
        <div style="width:10px"></div>
        <el-button type="" v-on:click="up_update">确定</el-button>
      </div>
      <div style="height:40px"></div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">小于</div>
      </div>
      <div class="form-inline" style="margin-top:10px">
        <div style="width:10%">预警值:</div>
        <el-input placeholder="请输入预警值" v-model="alarm_value_0.down.value" style="width:150px" clearable></el-input>
        <div style="width:10px"></div>
        <el-switch v-model="alarm_value_0.down.mail" active-text="发邮箱" inactive-text=""></el-switch>
        <div style="width:10px"></div>
        <el-switch v-model="alarm_value_0.down.message" active-text="发消息" inactive-text=""></el-switch>
        <div style="width:10px"></div>
        <el-button type="" v-on:click="down_update">确定</el-button>
      </div>
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
	name: "Device",
	components: {
		Header
	},
	data() {
		
		return {
			device:{
				id: '',
				name: '',
				ocdevice_id: '',
				ocproduct_id: '',
				imei: '',
				imsi:'',
				reg_time: '',
				status: '',
			},
			alarm_value_0:{
				down:{
					id:'',
					value:'',
					device_id:'',
					datatype_id:'',
					mail:false,
					message:false,
				},
				up:{
					id:'',
					value:'',
					device_id:'',
					datatype_id:'',
					mail:false,
					message:false,
				}
			},
			alarm_value_1: {

			}
		}
	},
	methods: {
		nowdata() {
			this.$router.push({path:'/data', query:{id: this.device.id}})
		},
		up_update() {
			var send_mail=this.alarm_value_0.up.mail==false?0:1;
			var send_message=this.alarm_value_0.up.message==false?0:1;
			var set_value_up ={
				value:this.alarm_value_0.up.value,
				device_id:this.device.id,
				datatype_id:this.alarm_value_0.up.datatype_id,
				up_down:1,
				send_mail:send_mail,
				send_message:send_message
			}
			if(this.alarm_value_0.up.value<=this.alarm_value_0.down.value){
				this.$message('上限值应该大于下限值');
			}
			else {
				axios.post(`${server.baseURL}/device/setalarmvalue`, set_value_up).then(data => {
					if(data.data.msg == "set_alarmvalue_success") {
						this.$message('修改成功');
					}
				});
			}
			
		},
		down_update() {
			var send_mail=this.alarm_value_0.down.mail==false?0:1;
			var send_message=this.alarm_value_0.down.message==false?0:1;
			var set_value_down ={
				value:this.alarm_value_0.down.value,
				device_id:this.device.id,
				datatype_id:this.alarm_value_0.down.datatype_id,
				up_down:1,
				send_mail:send_mail,
				send_message:send_message
			}
			if(this.alarm_value_0.up.value<=this.alarm_value_0.down.value){
				this.$message('下限值应该大于小限值');
			}else {
				axios.post(`${server.baseURL}/device/setalarmvalue`, set_value_down ).then(data => {
					if(data.data.msg == "set_alarmvalue_success") {
						this.$message('修改成功');
					}
					
				});
			}
			
		},

		
		update() {
			let updatedata = {
				device_id: this.device.id,
				name: this.device.name,
				imei: this.device.imei,
				imsi: this.device.imsi
			};
			console.log("selected " + this.device.name)
			this.__update(updatedata);
		},
		__update(data) {
			axios.post(`${server.baseURL}/device/update`, data).then(data => {
				if(data.data.msg == "device_update_success") {
					this.$message('修改成功');
				}
				
			});
		}


	},
	mounted() {
		console.log(this.$route)
		axios.get(`${server.baseURL}/device/device/`+this.$route.query.ocdevice_id, ).then(data => {
			//console.log(data.data)
			this.device = data.data.device
			console.log(this.device.id)
			axios.get(`${server.baseURL}/device/getalarmvalue/`+this.device.id, ).then(data => {
				console.log(data.data)
				var av = data.data.datatype
				this.alarm_value = av
				if(av[0].up !=null) {
					this.alarm_value_0.up.id = av[0].up.id;
					this.alarm_value_0.up.value = av[0].up.value;
					this.alarm_value_0.up.device_id = av[0].up.device_id;
					this.alarm_value_0.up.datatype_id = av[0].up.datatype_id;
					this.alarm_value_0.up.mail = av[0].up.send_mail==1?true:false;
					this.alarm_value_0.up.message = av[0].up.send_message_in_website==1?true:false;

				}
				if(av[0].down !=null) {
					this.alarm_value_0.down.id = av[0].down.id;
					this.alarm_value_0.down.value = av[0].down.value;
					this.alarm_value_0.down.device_id = av[0].down.device_id;
					this.alarm_value_0.down.datatype_id = av[0].down.datatype_id;
					this.alarm_value_0.down.sms = av[0].down.send_mail==1?true:false;
					this.alarm_value_0.down.message = av[0].down.send_message_in_website==1?true:false;
				}

			
			});
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