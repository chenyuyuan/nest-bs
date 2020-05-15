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
                    action="http://localhost:3000/article/upload"
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
                        <div>申请成为专业文章</div>
                      <el-switch
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch> 
                        <div style="width:20px"></div>
                        <el-button type="" v-on:click="sendPost" style="float:right">发布</el-button>
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
    name: "CreatePost",
    components: {
        Header
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
        getPost() {
        axios
            .get(`${server.baseURL}/blog/post/${this.id}`)
            .then(data => (this.post = data.data));
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
                img: this.fileName,
                title: this.title,
                content: this.content,
                verify_code: verify
            }
            axios.post(`${server.baseURL}/article/add`, postdata).then(data => {
				if(data.data.msg == "add_comment_success") {
					this.$message('发布成功');
				}
					
			});
        }
    },
    mounted() {

    }
};
</script>