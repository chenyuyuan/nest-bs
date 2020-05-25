<template>
<div>
  <el-container>
    <AdminHeader></AdminHeader>
  </el-container>
<div>
  <div style="height:1px"></div>
  <el-row class="tac">
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
            <el-image style="height:auto;width:300px" :fit="fill" v-if="post.img != null" :src="post.img"></el-image>
        </el-card>
        <el-card class="box-card" shadow="hover">
            <!-- action="http://localhost:3000/article/upload" -->
            <el-upload
            class="upload-demo"
            action="http://localhost:3000/admin/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="setFileName"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">重新上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-card>
        <el-card class="box-card" shadow="hover">
            <div class="form-inline" style="margin-top:10px">
                <div style="width:20px"></div>
                <el-button type="" v-on:click="sendPost" style="float:right">修改</el-button>
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
import AdminHeader from "./AdminHeader"

import axios from "axios";
import router from "../../router";
export default {
    name: "AdminArticleUpdate",
    components: {
        AdminHeader
    },
    data() {
        return {
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
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.getPost();
    },
    methods: {
        setFileName(response, file, fileList) {
            console.log(response, file, fileList);
            console.log(file.name)
            this.fileName = file.name
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        navigate() {
            router.go(-1);
        },
        sendPost() {
            console.log("the upload picture url: ")
            console.log(this.fileList)
            var verify = 0;
            if(this.value == true) {
                verify = 1;
            }
            var postdata = {
                article_id: this.id,
                img: this.fileName,
                title: this.title,
                content: this.content,
            }
            axios.post(`${server.baseURL}/admin/update`, postdata).then(data => {
				if(data.data.msg == "update_article_success") {
                    this.$message('修改成功');
                    this.$router.go(0);
				}
					
			});
        }
    },
    mounted() {
        axios.get(`${server.baseURL}/admin/myarticle/` + this.$route.query.id, ).then(data => {
			if(data.data.msg == "get_article_success") {
                console.log(data.data.article)
                this.fileName = data.data.article.img
				this.post = data.data.article
				this.post["name"] = data.data.name
				if(this.post["img"] == null || this.post["img"] == "") {
					this.post["img"] = null
				}else {
					this.post["img"] = server.baseURL+"/public/upload/"+this.post["author_id"]+"/"+this.post["img"]
                }

                this.id = data.data.article.id
                this.title = data.data.article.title
                this.content = data.data.article.content
                console.log(this.fileName)
				
			}
        
		});
    }
};
</script>