<template>
<div>
  <el-container>
    <Header></Header>
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
                label="设备号"
                width="120">
            </el-table-column>
            <el-table-column
                prop="product_name"
                label="产品名">
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
              width="160">
				<template slot-scope="scope">
					<el-button @click="toDataRow(scope.row)" type="text" size="small">查看数据</el-button>
					<el-button @click="editRow(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click="deleteRow(scope.row)" type="text" size="small">解绑</el-button>
				</template>
			</el-table-column> 
			</el-table>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="绑定设备">
        <el-col :span="1" style="border:1px solid transparent">
          <div style="display:none" class="grid-content bg-purple">1</div>
        </el-col>
        <el-col :span="22">
          <div style="margin-top:10px;margin-bottom:10px">绑定设备</div>
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
            <el-input placeholder="请输入设备号" v-model="device_id" style="width:222px" clearable></el-input>
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
			ocdevice_id: '',
			ocproduct_id: '',
			imei: '',
			imsi:'',
			reg_time: '',
			status: '',
			product_name: '',
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
		toDataRow(row) {
			console.log(row);
			this.$router.push({path:"/data",query:{id:row.id}});
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
				if(data.data.msg == "without_login") {
					this.$message('请先登录');
				}
				else if(data.data.msg == "add_device_success") {
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
			console.log(data.data)
			this.tableData = data.data.devices
			axios.get(`${server.baseURL}/device/products`, ).then(data => {
				console.log(data.data.products)
				this.options = data.data.products
				for(var i = 0;i<this.tableData.length;++i) {
					var time = this.tableData[i]["reg_time"];
					this.tableData[i]["reg_time"] = time.substring(0,10)+" "+time.substring(11,19);
					for(var j = 0;j<this.options.length;++j) {
						console.log(this.options[j]['name'])
						if(this.tableData[i]['ocproduct_id'] == this.options[j]['ocproduct_id']) {
							this.tableData[i]['product_name']=this.options[j]['name'];
						}
					}
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