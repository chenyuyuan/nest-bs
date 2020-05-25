import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginUserDTO } from './dto/admin-login-user.dto';
import { DeviceService } from 'src/device/device.service';
import { MessageService } from 'src/message/message.service';
import { AddMessageDTO } from 'src/message/dto/add-message.dto';
import { ArticleService } from 'src/article/article.service';
import { AddArticleDTO } from './dto/add-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { UserService } from 'src/user/user.service';
import { UpdateArticleDTO } from './dto/updateArticleDTO';
const fs = require('fs');

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService, private readonly deviceService: DeviceService,private readonly messageService: MessageService,
		private readonly articleService: ArticleService, private readonly userService: UserService) { }


	@Post('/login') 
	async login(@Res() res, @Body() adminLoginUserDTO: AdminLoginUserDTO, @Request() request) {

		//session
		request.session.adminname = adminLoginUserDTO.name;
		const admin = await this.adminService.findById(adminLoginUserDTO.name);
		request.session.admin_id = admin.admin_id;

		
		console.log("用户登录："+adminLoginUserDTO.name + request.session.user_id)
		if (!admin) throw new NotFoundException('Admin does not exist!');
		return res.status(HttpStatus.OK).json({msg:"admin_login_success",tip:"管理员登录成功"});
	}

	@Get('/all')
	async findAll(@Res() res): Promise<string> {
		console.log("[user/all]: got data--------");


		var nodeCmd = require('node-cmd');

		var a;
		// 'python ../utils/ocapi/testapi.py'
		nodeCmd.get(
		'python ./src/utils/ocapi/get_token.py',
		function(err, data, stderr){
			console.log("cmd: python ./src/utils/ocapi/get_token.py")
			console.log(data)
			console.log(err)
		}
		);
		
		// var xauthtoken = await this.cacheService.get("xauthtoken")
		// console.log(xauthtoken)

		return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
	}

	
	@Get('/getalldevice') // correct ✔
	async getAllDevice(@Res() res,@Param() param): Promise<string> {
		var devices = await this.deviceService.getAllDevice()
		var products = await this.deviceService.findAllProduct()
		return res.status(HttpStatus.OK).json({msg:"success",tip:"成功",device:devices, product:products});
	}

	@Get('/regdevice/:imei/:product_id') // correct ✔
	async regDevice(@Res() res,@Param() param): Promise<string> {
		var imei = param.imei;
		var product_id:number = param.product_id
		var nodeCmd = require('node-cmd');
		var product = await this.deviceService.getProductById(product_id)
		var ocproduct_id = product['ocproduct_id']
		if(product==null) {
			return res.status(HttpStatus.OK).json({msg:"product_not_exists",tip:"产品不存在"});
		}
		var model = product['octype'];;
		var deviceType = product['ocdeviceType'];
		// 'python ../utils/ocapi/testapi.py'
		nodeCmd.get(
		'python ./src/utils/ocapi/oc_reg_device.py '+imei+' '+model+" "+deviceType+" "+ocproduct_id,
			function(err, data, stderr){
				console.log('cmd: python ./src/utils/ocapi/oc_reg_device.py '+imei+' '+model+" "+deviceType)
				console.log(data)
				console.log(err)
				return data
			}
		);
		return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
	}

	@Get('/deldevice/:ocdevice_id') // correct ✔
	async delDevice(@Res() res,@Param() param): Promise<string> {
		var nodeCmd = require('node-cmd');
		var ocdevice_id = param.ocdevice_id
		var device = await this.deviceService.findDevice(ocdevice_id)
		// if(device == null) {
		// 	return res.status(HttpStatus.OK).json({msg:"device_not_exists",tip:"设备不存在"});
		// }

		nodeCmd.get(
		'python ./src/utils/ocapi/oc_del_device.py '+ocdevice_id,
			function(err, data, stderr){
				console.log('cmd: python ./src/utils/ocapi/oc_reg_device.py '+ocdevice_id)
				console.log(data)
				console.log(err)
				return data
			}
		);
		
		return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
	}
	@Get('/getallmessage') // correct ✔ AddMessageDTO
	async getAllMessage(@Res() res,@Param() param): Promise<string> {
		var messages = await this.messageService.findMessageByUserId(0)
		return res.status(HttpStatus.OK).json({msg:"success",tip:"成功",message:messages});
	}

	@Post('/addmessage') 
	async addMessage(@Res() res, @Body() addMessageDTO: AddMessageDTO, @Request() request) {
		await this.messageService.addMessage(0, 4, addMessageDTO.content);
		return res.status(HttpStatus.OK).json({msg:"send_message_success",tip:"发送消息成功"});
	}

	@Get('/delmessage/:message_id')
    async deleteMessage(@Res() res, @Param() param,@Request() request): Promise<string> {
        var message_id = param.message_id;

        if(await this.messageService.deleteMessageAdmin(message_id)!=null){
            return res.status(HttpStatus.OK).json({msg:"message_delete_success",tip:"消息删除成功"});
        }
        else {
            console.log("delete message: delete return null")
        }
    }




	@Post('/addarticle') 
    async addArticle(@Res() res, @Request() request, @Body() addArticleDTO:AddArticleDTO) { // correct
        var article = await this.articleService.addArticle(4, addArticleDTO.title, addArticleDTO.content, addArticleDTO.img, 2);
        if (article != null) {
            return res.status(HttpStatus.OK).json({msg:"add_article_success",tip:"添加文章成功"});
        }
        return res.status(HttpStatus.OK).json({msg:"add_article_failed",tip:"添加文章失败"});
	}
	@Get('/delarticle/:article_id') 
    async delArticle(@Res() res, @Request() request, @Param() param) { // correct
        var article = await this.articleService.deleteArticle(4, param.article_id);
        return res.status(HttpStatus.OK).json({msg:"delete_article_success",tip:"删除文章成功"});
	}
	@Get('/passarticle/:ifpass/:article_id') 
	async passArticle(@Res() res, @Request() request, @Param() param) { // correct
		var article = await this.articleService.getArticle(param.article_id)
		var user_id = article['author_id']
		if(param.ifpass == 1) {
			var sendcontent = '文章 '+article['title']+' 已通过审核';
			await this.articleService.passArticle(param.article_id, 1);
			await this.messageService.addMessage(user_id,3,sendcontent);
        	return res.status(HttpStatus.OK).json({msg:"pass_article_success",tip:"审核文章成功"});
		}
		else {
			var sendcontent = '文章 '+article['title']+' 未通过审核';
			await this.articleService.passArticle(param.article_id, 0);
			await this.messageService.addMessage(user_id,3,sendcontent);
			return res.status(HttpStatus.OK).json({msg:"article_not_pass",tip:"文章未通过成功"});
		}
	}
	@Get('/myarticle/:article_id') 
    async getArticleMy(@Res() res, @Param() param, @Request() request) {

        var user_id = 4;
        var article = await this.articleService.getArticleMy(param.article_id, user_id);
        var user = await this.userService.findById(article['author_id'])
        var name = "";
        if(user!=null) {
            name = user['name']
        }
        return res.status(HttpStatus.OK).json({msg:"get_article_success", tip:"获取文章成功", article:article, name: name});
	}
	@Post('/update') 
    async updateArticle(@Res() res, @Request() request, @Body() updateArticleDTO:UpdateArticleDTO) { //correct
        var user_id = 4;
        var article = await this.articleService.updateArticle(
            updateArticleDTO.article_id, user_id, updateArticleDTO.title, updateArticleDTO.content, updateArticleDTO.img, 2);
        if (article != null) {
            return res.status(HttpStatus.OK).json({msg:"update_article_success",tip:"修改文章成功"});
        }
        return res.status(HttpStatus.OK).json({msg:"add_article_failed",tip:"修改文章失败"});
    }
	

	@Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file, @Request() request): Promise<string> {
        console.log(file);
        var user_id = 4;
        // user_id = 1;
        var dir = join(__dirname, '..','../public/upload', '/', user_id.toString())
        if(fs.existsSync(dir) == false) {
            fs.mkdirSync(dir);
            console.log(fs.existsSync(join(__dirname, '..','../public/upload', '/', user_id.toString())))
        }
        const writeImage = createWriteStream(join(__dirname, '..','../public/upload/', user_id.toString(), `${file.originalname}`))
        writeImage.write(file.buffer)
        return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
    }



}
