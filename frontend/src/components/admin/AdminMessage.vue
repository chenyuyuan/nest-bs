<template>
<div>
  <el-container>
    <AdminHeader></AdminHeader>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="已发消息">
        <el-col :span="1" style="border:1px solid transparent">
            <div style="display:none" class="grid-content bg-purple">1</div>
        </el-col>
        <el-col :span="22">
            <el-table :data="tableData" style="width: 100%">
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
      <el-tab-pane label="推送消息">
        
        <div class="form-inline" style="margin-top:10px">
            <el-col :span="22">
            <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 12}"
            placeholder="请输入消息内容"
            v-model="content">
            </el-input>
        </el-col>
        </div>
        <div class="form-inline" style="margin-top:10px">
            <el-button type="primary" v-on:click="add">发送</el-button>
        </div>
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
	name: "AdminMessage",
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
            content:""

		}
	},
	methods: {
		deleteRow(row) {
			console.log(row);
			axios.get(`${server.baseURL}/admin/delmessage/`+row.id, ).then(data => {
                if(data.data.msg == "message_delete_success") {
                    console.log(data)
                    this.$message('删除成功');
                    axios.get(`${server.baseURL}/admin/getallmessage`, ).then(data => {
                        this.tableData = data.data.message
                    });
                }
			});
		},
		add(data) {
            data= {
                content:this.content
            }
            axios.post(`${server.baseURL}/admin/addmessage`, data).then(data => {
                if(data.data.msg == "send_message_success") {
                    this.$message('发送成功');
                    axios.get(`${server.baseURL}/admin/getallmessage`, ).then(data => {
                        console.log(data)
                        this.tableData = data.data.message
                    });
                }
            });
		}
	},
	mounted() {
		axios.get(`${server.baseURL}/admin/getallmessage`, ).then(data => {
			console.log(data)
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