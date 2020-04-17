import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request } from '@nestjs/common';
import { DeviceService } from './device.service';

import 'axios';
import { sys_config } from '../utils/sys_config'
import { async } from 'rxjs/internal/scheduler/async';

@Controller('device')
export class DeviceController {
    constructor(private readonly userService: DeviceService) { }

    @Get('/a')
    async findAll(@Res() res): Promise<string> {
        console.log("[device/a]: got data--------");
        return res.status(HttpStatus.OK).json({msg:"success",tip:"成功"});
    }

}
