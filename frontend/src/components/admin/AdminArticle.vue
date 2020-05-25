<template>
<div>
    <el-container>
        <AdminHeader></AdminHeader>
    </el-container>
<div>
    <div style="height:1px"></div>
    <el-row class="tac">
        <el-tabs :tab-position="tabPosition" style="">
            <el-tab-pane label="文章列表">
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
                <el-col :span="16">
                    <el-card class="box-card" shadow="hover" v-on:click="toPost(p)" v-for="p in postList2" :key="p.id">
                        <div slot="header" class="clearfix" style="">
                            <div class="form-inline">
                                <div class="form-inline" style="font-size:18px;font-family:PingFang SC">
                                    {{p.title}}
                                </div>
                                <div style="width:10px"></div>
                                <div>{{p.name}}</div>
                                <div>·</div>
                                <div>{{p.time}}</div>
                                <i class="el-icon-edit-outline" style="color:#409EFF;font-size:22px" v-on:click="toUpdatePost(p)"></i>
                                <div style="color:#409EFF;font-size:15px" v-on:click="toUpdatePost(p)">修改</div>
                                <i class="el-icon-delete" style="color:#F56C6C;font-size:22px" v-on:click="toUpdatePost(p)"></i>
                                <div style="color:#F56C6C;font-size:15px" v-on:click="delArticle(p)">删除</div>
                            </div>
                        </div>
                        <div v-on:click="toPost(p)">
                            {{p.content}}
                        </div>
                        <el-image style="height:auto;width:300px" :fit="fill" v-if="p.img != null" :src="p.img" v-on:click="toPost(p)"></el-image>
                    </el-card>
                </el-col>
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="发布文章">
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
                <el-col :span="16">
                    <el-card class="box-card" shadow="hover">
                        <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入标题"
                        v-model="title">
                        </el-input>
                        <div style="margin: 20px 0;"></div>
                        <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 12}"
                        placeholder="请输入内容"
                        v-model="content">
                        </el-input>
                    </el-card>
                    <el-card class="box-card" shadow="hover">
                        <!-- action="http://localhost:3000/article/upload" -->
                        <el-upload
                        class="upload-demo"
                        action="http://localhost:3000/admin/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :limit="1"
                        :on-success="setFileName"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-card>
                    <el-card class="box-card" shadow="hover">
                        <div class="form-inline" style="margin-top:10px">
                            <el-button type="" v-on:click="sendPost" style="float:right">发布</el-button>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="审核文章">
                <el-col :span="4" style="border:1px solid transparent">
                    <div style="display:none" class="grid-content bg-purple">1</div>
                </el-col>
                <el-col :span="16">
                    <el-card class="box-card" shadow="hover" v-on:click="toPost(p)" v-for="p in postList1" :key="p.id">
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

import AdminHeader from "./AdminHeader"
import router from "../../router";
import { server } from "../../utils/helper";


export default {
	name: "AdminArticle",
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
			options: [{
				value: '',
				label: ''
			},],
            postList1:[],
            postList2:[],

            id: 0,
            post: {},
            title: '',
            content: '',
            value: false,
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            fileList:[],
            fileName:'',

		}
	},
	methods: {
		toUpDatePost(p) {
			console.log(p)
			this.$router.push({path:'/post', query:{id: p.id}})
        },
        delArticle() {
            this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        setFileName(response, file, fileList) {
            console.log(response, file, fileList);
            console.log(file.name)
            this.fileName = file.name
        },
        sendPost() {
            console.log("the upload picture url: ")
            console.log(this.fileList)
            var postdata = {
                img: this.fileName,
                title: this.title,
                content: this.content,
            }
            axios.post(`${server.baseURL}/admin/addarticle`, postdata).then(data => {
				if(data.data.msg == "add_article_success") {
					this.$message('发布成功');
                }
                else if(data.data.msg == "add_article_failed") {
					this.$message('发布失败');
				}
					
			});
        }
	},
	mounted() {
		axios.get(`${server.baseURL}/article/articlelist/1`, ).then(data => {
			if(data.data.msg == "get_article_success") {
				this.postList1 = data.data.articles
                var pLen = this.postList1.length;
                console.log(this.postList1)
				for (var i = 0;i < pLen; ++i) {
                    var time = this.postList1[i]["time"];
                    this.postList1[i]["time"] = time.substring(0,10)+" "+time.substring(11,19)
					if(this.postList1[i]["img"] == null || this.postList1[i]["img"] == "") {
						this.postList1[i]["img"] == null
					}
					else {
						this.postList1[i]["img"] = server.baseURL+"/public/upload/"+this.postList1[i]["author_id"]+"/"+this.postList1[i]["img"]
					}
				}
			}
        });
        axios.get(`${server.baseURL}/article/articlelist/2`, ).then(data => {
			if(data.data.msg == "get_article_success") {
				this.postList2 = data.data.articles
                var pLen = this.postList2.length;
                console.log(this.postList2)
				for (var i = 0;i < pLen; ++i) {
                    var time = this.postList2[i]["time"];
                    this.postList2[i]["time"] = time.substring(0,10)+" "+time.substring(11,19)
					if(this.postList2[i]["img"] == null || this.postList2[i]["img"] == "") {
						this.postList2[i]["img"] == null
					}
					else {
						this.postList2[i]["img"] = server.baseURL+"/public/upload/"+this.postList2[i]["author_id"]+"/"+this.postList2[i]["img"]
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