import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request,Header } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginUserDTO } from './dto/admin-login-user.dto';
import { DeviceService } from 'src/device/device.service';
import { MessageService } from 'src/message/message.service';
import { AddMessageDTO } from 'src/message/dto/add-message.dto';
import { ArticleService } from 'src/article/article.service';
import { AddArticleDTO } from './dto/add-article.dto';


@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService, private readonly deviceService: DeviceService,private readonly messageService: MessageService,
		private readonly articleService: ArticleService) { }


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
		var messages = await this.messageService.findMessageByUserId(4)
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
        
        var article = await this.articleService.addArticle(4, addArticleDTO.title, addArticleDTO.content, addArticleDTO.img, 3);
        if (article != null) {
            return res.status(HttpStatus.OK).json({msg:"add_article_success",tip:"添加文章成功"});
        }
        return res.status(HttpStatus.OK).json({msg:"add_article_failed",tip:"添加文章失败"});
      
    }



}
