<template>
<div>
  <el-container>
    <AdminHeader></AdminHeader>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    
    <el-tabs :tab-position="tabPosition" style="">
      <el-tab-pane label="设备管理">
        <el-col :span="1" style="border:1px solid transparent">
          <div style="display:none" class="grid-content bg-purple">1</div>
        </el-col>
        <el-col :span="22">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="设备名" width="120">
            </el-table-column>
            <el-table-column
                prop="ocdevice_id"
                label="设备id"
                width="120">
            </el-table-column>
            <el-table-column
                prop="ocproduct_id"
                label="产品service_id">
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
            <!-- <el-table-column
                prop="status"
                label="状态">
            </el-table-column> -->
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
      <el-tab-pane label="添加设备">
        <el-col :span="1" style="border:1px solid transparent">
          <div style="display:none" class="grid-content bg-purple">1</div>
        </el-col>
        <el-col :span="22">
          <div style="margin-top:10px;margin-bottom:10px">添加设备</div>
          <div class="form-inline">
            <el-select v-model="value" placeholder="请选择产品" style="margin-right:full">
				<el-option
					v-for="item in options"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
            </el-select>
          </div>
          <div class="form-inline" style="margin-top:10px">
            <el-input placeholder="请输入imei号" v-model="imei" style="width:222px" clearable></el-input>
          </div>
          <div class="form-inline" style="margin-top:10px">
            <el-button type="primary" v-on:click="add">确认</el-button>
          </div>
        </el-col>
        <el-col :span="1" style="border:1px solid transparent">
          <div style="display:none" class="grid-content bg-purple">1</div>
        </el-col>
      </el-tab-pane>
      <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane> -->
    </el-tabs>

  </el-row>
</div>

</div>

</template>
<script>
import axios from "axios";

import AdminHeader from "./AdminHeader"
import router from "../../router";
import { server } from "../../utils/helper";


export default {
	name: "AdminDevice",
	components: {
		AdminHeader
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
		imei:"",
		options: [{
			value: '',
			label: ''
		},],

		}
	},
	methods: {
		deleteRow(row) {
			console.log(row);
			axios.get(`${server.baseURL}/admin/deldevice/`+row.ocdevice_id, ).then(data => {
				console.log(data)
				this.$message('设备删除成功');
				axios.get(`${server.baseURL}/admin/getalldevice`, ).then(data => {
					console.log(data)
					this.tableData = data.data.device
				});
			});
		},
		add(data) {
		axios.get(`${server.baseURL}/admin/regdevice/`+this.imei+`/`+this.value, data).then(data => {
			if(data.data.msg == "product_not_exists") {
				this.$message('产品不存在');
			}
			else if(data.data.msg == "success") {
				this.$message('添加成功');
			}
		});
		}
	},
	mounted() {
		axios.get(`${server.baseURL}/admin/getalldevice`, ).then(data => {
			console.log(data)
			this.tableData = data.data.device
			this.options = data.data.product
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