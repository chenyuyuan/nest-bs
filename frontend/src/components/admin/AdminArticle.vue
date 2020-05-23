<template>
<div>
    <el-container>
        <AdminHeader></AdminHeader>
    </el-container>
<div>
    <div style="height:1px"></div>
    <el-row class="tac">
        <el-tabs :tab-position="tabPosition" style="">
            <el-tab-pane label="发布文章">
                
            </el-tab-pane>
            <el-tab-pane label="">
                
            </el-tab-pane>
            <el-tab-pane label="审核文章">
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
                <el-col :span="16">
                    <el-card class="box-card" shadow="hover" v-on:click="toPost(p)" v-for="p in postList3" :key="p.id">
                        <div slot="header" class="clearfix" style="">
                            <div class="form-inline">
                                <div class="form-inline" style="font-size:18px;font-family:PingFang SC">
                                    {{p.title}}
                                </div>
                                <div style="width:10px"></div>
                                <div>{{p.name}}</div>
                                <div>·</div>
                                <div>{{p.time}}</div>
                            </div>
                        </div>
                        <div v-on:click="toPost(p)">
                            {{p.content}}
                        </div>
                        
                        <el-image style="height:auto;width:300px" :fit="fill" v-if="p.img != null" :src="p.img" v-on:click="toPost(p)"></el-image>
                        <div class="form-inline" style="margin-top:5px" v-on:click="toPost(p)">
                            <i class="el-icon-arrow-up" style="color:#5CB6FF;font-size:22px"></i>
                            <div style="width:8px">&nbsp;</div>
                            <div style="color:#5CB6FF;font-size:15px">{{p.like}}</div>
                            <div style="width:24px">&nbsp;</div>
                            <i class="el-icon-chat-round" style="color:#5CB6FF;font-size:22px"></i>
                            <div style="width:8px">&nbsp;</div>
                            <div style="color:#5CB6FF;font-size:15px">{{p.comment}}</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="帮助文档">
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
                <el-col :span="16">
                    <el-card class="box-card" shadow="hover" v-on:click="toPost(p)" v-for="p in postList4" :key="p.id">
                        <div slot="header" class="clearfix" style="">
                            <div class="form-inline">
                                <div class="form-inline" style="font-size:18px;font-family:PingFang SC">
                                    {{p.title}}
                                </div>
                                <div style="width:10px">&nbsp;</div>
                                <div>{{p.name}}</div>
                                <div>·</div>
                                <div>{{p.time}}</div>
                            </div>
                        </div>
                        <div v-on:click="toPost(p)">
                            {{p.content}}
                        </div>
                        
                        <el-image style="height:auto;width:300px" :fit="fill" v-if="p.img != null" :src="p.img" v-on:click="toPost(p)"></el-image>
                        <div class="form-inline" style="margin-top:5px" v-on:click="toPost(p)">
                            <i class="el-icon-arrow-up" style="color:#5CB6FF;font-size:22px"></i>
                            <div style="width:8px">&nbsp;</div>
                            <div style="color:#5CB6FF;font-size:15px">{{p.like}}</div>
                            <div style="width:24px">&nbsp;</div>
                            <i class="el-icon-chat-round" style="color:#5CB6FF;font-size:22px"></i>
                            <div style="width:8px">&nbsp;</div>
                            <div style="color:#5CB6FF;font-size:15px">{{p.comment}}</div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
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
			postList1:[],
			postList2:[],
			postList3:[],
			postList4:[],

		}
	},



	methods: {
		toPost(p) {
			console.log(p)
			this.$router.push({path:'/post', query:{id: p.id}})
        },
        toUpdatePost(p) {
			console.log(p)
			this.$router.push({path:'/updatepost', query:{id: p.id}})
		},
		toCreatePost() {
			this.$router.push({path:'/createpost'})
		}
	},
	mounted() {
		axios.get(`${server.baseURL}/article/articlelist/0`, ).then(data => {
			if(data.data.msg == "get_article_success") {
				this.postList1 = data.data.articles
                var pLen = this.postList1.length;
                console.log(this.postList1)
				for (var i = 0;i < pLen; ++i) {
					if(this.postList1[i]["img"] == null || this.postList1[i]["img"] == "") {
						this.postList1[i]["img"] == null
					}
					else {
						this.postList1[i]["img"] = server.baseURL+"/public/upload/"+this.postList1[i]["author_id"]+"/"+this.postList1[i]["img"]
					}
				}
			}
		});
		axios.get(`${server.baseURL}/article/myarticlelist`, ).then(data => {
			if(data.data.msg == "get_article_success") {
				this.postList2 = data.data.articles
				var pLen = this.postList2.length;
				for (var i = 0;i < pLen; ++i) {
					if(this.postList2[i]["img"] == null || this.postList2[i]["img"] == "") {
						this.postList2[i]["img"] == null
					}
					else {
						this.postList2[i]["img"] = server.baseURL+"/public/upload/"+this.postList2[i]["author_id"]+"/"+this.postList2[i]["img"]
					}
				}
			}
		
		});
		axios.get(`${server.baseURL}/article/articlelist/2`, ).then(data => {
			if(data.data.msg == "get_article_success") {
				this.postList3 = data.data.articles
				var pLen = this.postList3.length;
				for (var i = 0;i < pLen; ++i) {
					if(this.postList3[i]["img"] == null || this.postList3[i]["img"] == "") {
						this.postList3[i]["img"] == null
					}
					else {
						this.postList3[i]["img"] = server.baseURL+"/public/upload/"+this.postList3[i]["author_id"]+"/"+this.postList3[i]["img"]
					}
				}
			}
		
		});
		axios.get(`${server.baseURL}/article/articlelist/3`, ).then(data => {
			if(data.data.msg == "get_article_success") {
				this.postList4 = data.data.articles
				var pLen = this.postList4.length;
				for (var i = 0;i < pLen; ++i) {
					if(this.postList4[i]["img"] == null || this.postList4[i]["img"] == "") {
						this.postList4[i]["img"] == null
					}
					else {
						this.postList4[i]["img"] = server.baseURL+"/public/upload/"+this.postList4[i]["author_id"]+"/"+this.postList4[i]["img"]
					}
				}
			}
		
		});

	}
  
 
};
</script>

<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 600px;
}
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