<template>
<div>
	<el-container>
		<Header></Header>
	</el-container>

<div>
	<div style="height:1px"></div>
	<el-row class="tac">
		
		<el-col :span="4" style="border:1px solid transparent">
			<div style="display:none" class="grid-content bg-purple">1</div>
		</el-col>
		<el-col :span="16">
			<el-card class="box-card" shadow="hover">
				<div slot="header" class="clearfix" style="">
					<div class="form-inline">
						<div>{{post.name}}</div>
						<div>·</div>
						<div>{{post.time}}</div>
					</div>
				</div>
				<div>
					{{post.title}}
				</div>
				<div>
					{{post.content}}
				</div>
				<el-image style="height:auto;width:300px" :fit="fill" v-if="post.img != null" :src="post.img"></el-image>
				<div class="form-inline" style="margin-top:5px">
					<i class="el-icon-arrow-up" style="color:blue;font-size:22px"></i>
					<div style="width:8px">&nbsp;</div>
					<div style="color:blue;font-size:15px">{{post.like}}</div>
					<div style="width:24px">&nbsp;</div>
					<i class="el-icon-chat-round" style="color:blue;font-size:22px"></i>
					<div style="width:8px">&nbsp;</div>
					<div style="color:blue;font-size:15px">{{post.comment}}</div>
				</div>
			</el-card>
			<el-card class="box-card" shadow="hover">
				<div class="form-inline" style="margin-top:10px">
					<el-input placeholder="请输入评论" v-model="commentsend" style="width:auto" clearable></el-input>
					<div class="form-inline" style="">
						<el-button type="" v-on:click="addComment">发送</el-button>
					</div>
				</div>
			</el-card>
			<el-card class="box-card" shadow="hover" v-for="c in comments" :key="c.id">
				<div class="form-inline">
					<div>{{c.username}}</div>
					<div>: </div>
					<div>{{c.content}}</div>
					<div>-</div>
					<div style="float:right">{{c.time}}</div>
					<div style="float:right;color:red" v-if="myuser_id==c.user_id" v-on:click="delComment(c)">删除</div>
				</div>
					
			</el-card>
		</el-col>
		<el-col :span="4" style="border:1px solid transparent">
				<div style="display:none" class="grid-content bg-purple">1</div>
		</el-col>

	</el-row>
</div>

</div>

</template>

<script>
import { server } from "../../utils/helper";
import Header from "../Header"

import axios from "axios";
import router from "../../router";
export default {
	name: "Post",
	components: {
		Header
	},
	data() {
		return {
			id: 0,
			post: {},
			comments: [],
			commentsend:"",
			myuser_id:"",
			addpost: {
				textarea1: '',
				textarea2: '',
				value: false,
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				fileList:[],
				fileName:'',
			}
		};
	},
	created() {
		this.id = this.$route.params.id;
		this.getPost();
	},
	methods: {
		navigate() {
			router.go(-1);
		},
		addComment() {
			var postdata = {
				content: this.commentsend,
				article_id: this.post.id,
				to_user_id: 0,
			}
			axios.post(`${server.baseURL}/article/addcomment`, postdata).then(data => {
				if(data.data.msg == "add_comment_success") {
					this.$message('评论成功');
					axios.get(`${server.baseURL}/article/article/` + this.$route.query.id, ).then(data => {
						if(data.data.msg == "get_article_success") {
							this.comments = data.data.comments
							
						}
					
					});
				}
					
			});
		},
		delComment(c) {
			console.log(c)
			axios.get(`${server.baseURL}/article/delcomment/`+c.id).then(data => {
				if(data.data.msg == "delete_comment_success") {
					this.$message('删除成功');
					axios.get(`${server.baseURL}/article/article/` + this.$route.query.id, ).then(data => {
						if(data.data.msg == "get_article_success") {
							this.comments = data.data.comments
							
						}
					
					});
				}
					
			});
		}
	},
	mounted() {
        axios.get(`${server.baseURL}/article/article/` + this.$route.query.id, ).then(data => {
			if(data.data.msg == "get_article_success") {
				this.post = data.data.article
				this.post["name"] = data.data.name
				if(this.post["img"] == null || this.post["img"] == "") {
					this.post["img"] = null
				}else {
					this.post["img"] = server.baseURL+"/public/upload/"+this.post["author_id"]+"/"+this.post["img"]
				}
				this.comments = data.data.comments
				
			}
        
		});
		axios.get(`${server.baseURL}/article/getmyuser_id`, ).then(data => {
			if(data.data.msg == "get_success") {
				this.myuser_id = data.data.user_id;
			}
        
		});
		if(this.myuser_id == this.comments[0]["user_id"]){
			console.log(11111)
		}
		console.log(this.myuser_id == this.comments[0]["user_id"])
	},
};
</script>