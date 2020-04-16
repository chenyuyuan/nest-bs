import { Controller, Get, Post, HttpStatus, Res, Param, Body, NotFoundException,Req,Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import {CacheService} from '../utils/cache.service'
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import 'axios';
import { sys_config } from '../utils/sys_config'


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,private readonly cacheService: CacheService) { }

  // @Get('/all')
  // async findAll(@Res() res): Promise<User[]> {
  //   console.log("[user/all]: got data~~~~~~");
  //   var project_id = '063c924f96800fb72f78c012471a0813'
  //   var product_id = '5e909ca3c87cd606b9bd9e57'
  //   var device_id = '4a943d42-d698-43ce-a865-10a605ddddbb'
  //   var xauthtoken = 'MIIXjQYJKoZIhvcNAQcCoIIXfjCCF3oCAQExDTALBglghkgBZQMEAgEwghWfBgkqhkiG9w0BBwGgghWQBIIVjHsidG9rZW4iOnsiZXhwaXJlc19hdCI6IjIwMjAtMDQtMTZUMTQ6MTk6NTQuOTQyMDAwWiIsIm1ldGhvZHMiOlsicGFzc3dvcmQiXSwiY2F0YWxvZyI6W10sInJvbGVzIjpbeyJuYW1lIjoidGVfYWRtaW4iLCJpZCI6IjAifSx7Im5hbWUiOiJ0ZV9hZ2VuY3kiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9laXBfaXB2NiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3YyeCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19zcG90X2luc3RhbmNlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaXZhc192Y3JfdmNhIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVmX25vZGVncm91cCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NjaV9tb3VudG9ic3Bvc2l4IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2FzY2VuZF9rYWkxIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGJzX3JpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYm1zX2hwY19oMmxhcmdlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX2Vzc2QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pb2RwcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2JhdGNoX2Vjc19jbHVzdGVyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2dwdV92MTAwIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JzX3FpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZHdzX3BvYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX21lZXRpbmdfZW5kcG9pbnRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfc2lzX3Nhc3JfZW4iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9WSVNfSW50bCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19ncHVfcDJzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3ZvbHVtZV9yZWN5Y2xlX2JpbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZjYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZjcCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2RwcCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29jc21hcnRjYW1wdXMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ia3MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9tZWV0aW5nX2hhcmRhY2NvdW50X2J1eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX211bHRpX2JpbmQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ubHBfbXQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9laXBfcG9vbCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2llZl9mdW5jdGlvbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfYXAtc291dGhlYXN0LTNkIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcHJvamVjdF9kZWwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9tNm10IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3JldHlwZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FhZF9mcmVlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWxiX2d1YXJhbnRlZWQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2NuLXNvdXRod2VzdC0yYiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Nmc3R1cmJvIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX3R1cmJvIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaHZfdmVuZG9yIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tbm9ydGgtNGQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9JRUMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF90YXMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zaXNfYXNzZXNzX211bHRpbW9kZWwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jY2VfbWNwX3RoYWkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ubHBfbGdfdGciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zZXJ2aWNlc3RhZ2VfbWdyX2R0bSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tbm9ydGgtNGYiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jcGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9Nb2RlbEFydHNBc2NlbmQ5MTAiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9tZWV0aW5nX2hpc3RvcnlfY3VzdG9tX2J1eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3dzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2dwdV9nNXIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lbGJfbWlncmF0ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NjaV9rdW5wZW5nIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcmlfZHdzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaW90ZWRnZV9jYW1wdXMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF92Z3ZhcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZwY19mbG93X2xvZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29wX2dhdGVkX2ljcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FhZF9iZXRhX2lkYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzYnNfcmVwX2FjY2VsZXJhdGlvbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2llZl9lZGdlbWVzaCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Fpc19hcGlfaW1hZ2VfYW50aV9hZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Rzc19tb250aCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19jNngiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zaXNfYXNzZXNzX2F1ZGlvIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfdWZzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGVjX21vbnRoX3VzZXIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF92aXBfYmFuZHdpZHRoIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX29sZF9yZW91cmNlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGNzX3JpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NlX2J1cnN0X3RvX2NjaSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZnaXZzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfb2JzX2R1YWxzdGFjayIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2VkY20iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Jlc3RvcmUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pdnNjcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX0lXQlB1YmxpY1Rlc3QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pcHY2X2R1YWxzdGFjayIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Zwbl92Z3ciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pcnRjIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NlX2JtczIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9wY2EiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF92Z3dzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NlX2FzbV9oayIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzYnNfcHJvZ3Jlc3NiYXIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pb3YtdHJpYWwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9yZHNfYXJtIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2M2eF92aXJ0aW9fbmV0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3Bvb2xfY2EiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kZHNfYXJtIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9DTi1TT1VUSC0zIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX29mZmxpbmVfZGlza180IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYnMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9nc3NfZnJlZV90cmlhbCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX21lZXRpbmdfY2xvdWRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXBzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY3Nic19yZXN0b3JlX2FsbCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2wyY2ciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9XZUxpbmtfZW5kcG9pbnRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcXVpY2tidXkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9mY3NfcGF5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaW90YW5hbHl0aWNzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfbWF4aHViX2VuZHBvaW50X2J1eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfYXAtc291dGhlYXN0LTFlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ubHBfa2ciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0xZiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2llZl9kZXZpY2VfZGlyZWN0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGNzX2RjczJfcHJveHkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfdmdwdV9nNSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzX2FybV9wb2MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfcmkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2NuLXNvdXRoLTFmIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX3J1LW5vcnRod2VzdC0yYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3VsYl9taWl0X3Rlc3QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pZWZfcGxhdGludW0iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9WaWRlb19DYW1wdXMiLCJpZCI6IjAifV0sInByb2plY3QiOnsiZG9tYWluIjp7Im5hbWUiOiJjeXV5dWFuMTUiLCJpZCI6IjA2M2I2ZDNjNDYwMDI1YmUwZjc0YzAxMjhkMjkxYTYwIn0sIm5hbWUiOiJjbi1ub3J0aC00IiwiaWQiOiIwNjNjOTI0Zjk2ODAwZmI3MmY3OGMwMTI0NzFhMDgxMyJ9LCJpc3N1ZWRfYXQiOiIyMDIwLTA0LTE1VDE0OjE5OjU0Ljk0MjAwMFoiLCJ1c2VyIjp7ImRvbWFpbiI6eyJuYW1lIjoiY3l1eXVhbjE1IiwiaWQiOiIwNjNiNmQzYzQ2MDAyNWJlMGY3NGMwMTI4ZDI5MWE2MCJ9LCJuYW1lIjoiY3l1eXVhbjE1IiwicGFzc3dvcmRfZXhwaXJlc19hdCI6IiIsImlkIjoiMDYzYjZkM2Q0MzAwMTBkZjFmNTRjMDEyNmY5NWNjNDUifX19MYIBwTCCAb0CAQEwgZcwgYkxCzAJBgNVBAYTAkNOMRIwEAYDVQQIDAlHdWFuZ0RvbmcxETAPBgNVBAcMCFNoZW5aaGVuMS4wLAYDVQQKDCVIdWF3ZWkgU29mdHdhcmUgVGVjaG5vbG9naWVzIENvLiwgTHRkMQ4wDAYDVQQLDAVDbG91ZDETMBEGA1UEAwwKY2EuaWFtLnBraQIJANyzK10QYWoQMAsGCWCGSAFlAwQCATANBgkqhkiG9w0BAQEFAASCAQCbnXlLHqrJmdF1dcD9p6H6qlXLnane8r6WQ7e8ebIeQHXQKAH02Y5j1bzjEbSif1rKFEMEWbP8sKPC1YUVngGsNhvCfco3owm8Iz+YjQ47-DDwwARv7nOTdnOmMbe14Jg9HMUDDjNObhlxp6wXeKUVoF0yVEJLF3byiMpvfjMO5T6C0Ns49G7NlDLxBH05rBrf5+E+QrPo4X1JGp7BY-fekBSKV8bITumij8q5pAnTr+kTB4td4dwz0SV9r5kweIowsmRiH3fbvPBvvWyGFeOkyq3WbhszriYlzKrcUGVcVmWPOAat49oQacj5UbI0JrYvAv8dzbp3K8Hkd2438UL6'
  //   var axios = require('axios')
  //   var url_shadow = 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/'+ product_id +'/devices/'+device_id+'/shadow'
  //   var url_token = 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens'
  //   //console.log((await this.userService.findAll()).length)
  //   axios(
  //     url_token, {
  //       method: 'POST',
  //       headers:{
  //         "Content-Type": "application/json",
  //       },
  //       Body:{
  //         "auth":{
  //           "identity":{
  //             "methods":["password"],
  //             "password":{
  //               "user":{
  //                 "name": sys_config.IAMUserName,
  //                 "password": sys_config.IAMPassword,
  //                 "domain":{
  //                   "name": sys_config.IAMDoaminId
  //                 }
  //               }
  //             }
  //           },
  //           "scope":{
  //             "project":{
  //               "name": sys_config.region
  //             }
  //           }
  //         }
  //       }
  //     }).then(data => {
  //       console.log("then ok")
  //       console.log(data)
  //     xauthtoken = data.response.headers.get("X-Subject-Token");
  //     console.log(xauthtoken)
  //   });
  //   console.log("token finish")
  //   axios(
  //     url_shadow, {
  //       method: 'GET',
  //       headers:{
  //         "Content-Type": "application/json",
  //         "X-Auth-Token": "\""+xauthtoken+"\""
  //       }
  //     }).then(data => {
  //       console.log("wu")
  //   });
  //   return (await this.userService.findAll());
  // }



  @Get('/all')
  async findAll(@Res() res): Promise<User[]> {
    console.log("[user/all]: got data~~~~~~");

    var request = require('request');

    var project_id = '063c924f96800fb72f78c012471a0813'
    var product_id = '5e909ca3c87cd606b9bd9e57'
    var device_id = '4a943d42-d698-43ce-a865-10a605ddddbb'
    var xauthtoken = 'MIIXjQYJKoZIhvcNAQcCoIIXfjCCF3oCAQExDTALBglghkgBZQMEAgEwghWfBgkqhkiG9w0BBwGgghWQBIIVjHsidG9rZW4iOnsiZXhwaXJlc19hdCI6IjIwMjAtMDQtMTZUMTQ6MTk6NTQuOTQyMDAwWiIsIm1ldGhvZHMiOlsicGFzc3dvcmQiXSwiY2F0YWxvZyI6W10sInJvbGVzIjpbeyJuYW1lIjoidGVfYWRtaW4iLCJpZCI6IjAifSx7Im5hbWUiOiJ0ZV9hZ2VuY3kiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9laXBfaXB2NiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3YyeCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19zcG90X2luc3RhbmNlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaXZhc192Y3JfdmNhIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaWVmX25vZGVncm91cCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NjaV9tb3VudG9ic3Bvc2l4IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2FzY2VuZF9rYWkxIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGJzX3JpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYm1zX2hwY19oMmxhcmdlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX2Vzc2QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pb2RwcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2JhdGNoX2Vjc19jbHVzdGVyIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2dwdV92MTAwIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JzX3FpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZHdzX3BvYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX21lZXRpbmdfZW5kcG9pbnRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfc2lzX3Nhc3JfZW4iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9WSVNfSW50bCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19ncHVfcDJzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3ZvbHVtZV9yZWN5Y2xlX2JpbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZjYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZjcCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2RwcCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29jc21hcnRjYW1wdXMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ia3MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9tZWV0aW5nX2hhcmRhY2NvdW50X2J1eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX211bHRpX2JpbmQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ubHBfbXQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9laXBfcG9vbCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2llZl9mdW5jdGlvbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfYXAtc291dGhlYXN0LTNkIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcHJvamVjdF9kZWwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9tNm10IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3JldHlwZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FhZF9mcmVlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWxiX2d1YXJhbnRlZWQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2NuLXNvdXRod2VzdC0yYiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Nmc3R1cmJvIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2JyX3R1cmJvIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaHZfdmVuZG9yIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9jbi1ub3J0aC00ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tbm9ydGgtNGQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9JRUMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF90YXMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zaXNfYXNzZXNzX211bHRpbW9kZWwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jY2VfbWNwX3RoYWkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ubHBfbGdfdGciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zZXJ2aWNlc3RhZ2VfbWdyX2R0bSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfY24tbm9ydGgtNGYiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jcGgiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9Nb2RlbEFydHNBc2NlbmQ5MTAiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9tZWV0aW5nX2hpc3RvcnlfY3VzdG9tX2J1eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3dzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2dwdV9nNXIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lbGJfbWlncmF0ZSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NjaV9rdW5wZW5nIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcmlfZHdzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaW90ZWRnZV9jYW1wdXMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF92Z3ZhcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZwY19mbG93X2xvZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX29wX2dhdGVkX2ljcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FhZF9iZXRhX2lkYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzYnNfcmVwX2FjY2VsZXJhdGlvbiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2llZl9lZGdlbWVzaCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Fpc19hcGlfaW1hZ2VfYW50aV9hZCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Rzc19tb250aCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzZyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2Vjc19jNngiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9zaXNfYXNzZXNzX2F1ZGlvIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfdWZzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGVjX21vbnRoX3VzZXIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF92aXBfYmFuZHdpZHRoIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX29sZF9yZW91cmNlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGNzX3JpIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NlX2J1cnN0X3RvX2NjaSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3ZnaXZzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfb2JzX2R1YWxzdGFjayIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2VkY20iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9jc2JzX3Jlc3RvcmUiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pdnNjcyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX0lXQlB1YmxpY1Rlc3QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pcHY2X2R1YWxzdGFjayIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3Zwbl92Z3ciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pcnRjIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NlX2JtczIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9wY2EiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF92Z3dzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY2NlX2FzbV9oayIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzYnNfcHJvZ3Jlc3NiYXIiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pb3YtdHJpYWwiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9yZHNfYXJtIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX2M2eF92aXJ0aW9fbmV0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXZzX3Bvb2xfY2EiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9kZHNfYXJtIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9DTi1TT1VUSC0zIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZWNzX29mZmxpbmVfZGlza180IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYnMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9nc3NfZnJlZV90cmlhbCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX21lZXRpbmdfY2xvdWRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZXBzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfY3Nic19yZXN0b3JlX2FsbCIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2wyY2ciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9XZUxpbmtfZW5kcG9pbnRfYnV5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfcXVpY2tidXkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9mY3NfcGF5IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfaW90YW5hbHl0aWNzIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfbWF4aHViX2VuZHBvaW50X2J1eSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2FfYXAtc291dGhlYXN0LTFlIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWQiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9ubHBfa2ciLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2FwLXNvdXRoZWFzdC0xZiIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2llZl9kZXZpY2VfZGlyZWN0IiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfZGNzX2RjczJfcHJveHkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfdmdwdV9nNSIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX2NzX2FybV9wb2MiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9lY3NfcmkiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX2NuLXNvdXRoLTFmIiwiaWQiOiIwIn0seyJuYW1lIjoib3BfZ2F0ZWRfYV9hcC1zb3V0aGVhc3QtMWMiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9hX3J1LW5vcnRod2VzdC0yYyIsImlkIjoiMCJ9LHsibmFtZSI6Im9wX2dhdGVkX3VsYl9taWl0X3Rlc3QiLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9pZWZfcGxhdGludW0iLCJpZCI6IjAifSx7Im5hbWUiOiJvcF9nYXRlZF9WaWRlb19DYW1wdXMiLCJpZCI6IjAifV0sInByb2plY3QiOnsiZG9tYWluIjp7Im5hbWUiOiJjeXV5dWFuMTUiLCJpZCI6IjA2M2I2ZDNjNDYwMDI1YmUwZjc0YzAxMjhkMjkxYTYwIn0sIm5hbWUiOiJjbi1ub3J0aC00IiwiaWQiOiIwNjNjOTI0Zjk2ODAwZmI3MmY3OGMwMTI0NzFhMDgxMyJ9LCJpc3N1ZWRfYXQiOiIyMDIwLTA0LTE1VDE0OjE5OjU0Ljk0MjAwMFoiLCJ1c2VyIjp7ImRvbWFpbiI6eyJuYW1lIjoiY3l1eXVhbjE1IiwiaWQiOiIwNjNiNmQzYzQ2MDAyNWJlMGY3NGMwMTI4ZDI5MWE2MCJ9LCJuYW1lIjoiY3l1eXVhbjE1IiwicGFzc3dvcmRfZXhwaXJlc19hdCI6IiIsImlkIjoiMDYzYjZkM2Q0MzAwMTBkZjFmNTRjMDEyNmY5NWNjNDUifX19MYIBwTCCAb0CAQEwgZcwgYkxCzAJBgNVBAYTAkNOMRIwEAYDVQQIDAlHdWFuZ0RvbmcxETAPBgNVBAcMCFNoZW5aaGVuMS4wLAYDVQQKDCVIdWF3ZWkgU29mdHdhcmUgVGVjaG5vbG9naWVzIENvLiwgTHRkMQ4wDAYDVQQLDAVDbG91ZDETMBEGA1UEAwwKY2EuaWFtLnBraQIJANyzK10QYWoQMAsGCWCGSAFlAwQCATANBgkqhkiG9w0BAQEFAASCAQCbnXlLHqrJmdF1dcD9p6H6qlXLnane8r6WQ7e8ebIeQHXQKAH02Y5j1bzjEbSif1rKFEMEWbP8sKPC1YUVngGsNhvCfco3owm8Iz+YjQ47-DDwwARv7nOTdnOmMbe14Jg9HMUDDjNObhlxp6wXeKUVoF0yVEJLF3byiMpvfjMO5T6C0Ns49G7NlDLxBH05rBrf5+E+QrPo4X1JGp7BY-fekBSKV8bITumij8q5pAnTr+kTB4td4dwz0SV9r5kweIowsmRiH3fbvPBvvWyGFeOkyq3WbhszriYlzKrcUGVcVmWPOAat49oQacj5UbI0JrYvAv8dzbp3K8Hkd2438UL6'
    var axios = require('axios')
    var url_shadow = 'https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/'+ product_id +'/devices/'+device_id+'/shadow'
    var url_token = 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens'
    //console.log((await this.userService.findAll()).length)
    var url_local = 'http://127.0.0.1:3000'
    var token_body = {
      auth: {
          identity: {
              methods: [
                  "password"
              ],
              password: {
                  user: {
                      name: "cyuyuan15",
                      password: "ccc1111.",
                      domain: {
                          name: "cyuyuan15"
                      }
                  }
              }
          },
          scope: {
              project: {
                  name: "cn-north-4"
              }
          }
      }
    }
    var nodeCmd = require('node-cmd');

    // 'python ../utils/ocapi/testapi.py'
    nodeCmd.get(

      'python ./src/utils/ocapi/testapi.py',
      function(err, data, stderr){
        console.log("aaa")
          console.log(data);
      }
  );
  nodeCmd.run('python ../utils/ocapi/testapi.py');

    console.log("before req")

    // const fs = require('fs');
    // const child_process = require('child_process');
    // var workerProcess = child_process.spawn('node', ['./src/utils/req.js',]);
    // workerProcess.stdout.on('data', function (data) {
    //    console.log('stdout: ' + data);
    // });
    // workerProcess.stderr.on('data', function (data) {
    //    console.log('stderr: ' + data);
    // });
    // workerProcess.on('close', function (code) {
    //    console.log('子进程已退出，退出码 '+code);
    // });
  

    return (await this.userService.findAll());
  }
  @Post('/login') 
  async login(@Res() res, @Body() loginUserDTO: LoginUserDTO, @Request() request) {

    //session
    request.session.username = loginUserDTO.name;

    const user = await this.userService.getUserByName(loginUserDTO.name);
    console.log("用户登录："+loginUserDTO.name)
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({msg:"login_success",tip:"登录成功"});
  }
  

  @Post('/register') 
  async register(@Res() res, @Body() registerUserDTO:RegisterUserDTO) {
    var req_code = registerUserDTO.mail_code;
    var code = await this.cacheService.get(registerUserDTO.mail)

    console.log("用户发送的验证码："+req_code+"正确的验证码："+code)
    if(await this.userService.getUserByName(registerUserDTO.name) != null) {
      return res.status(HttpStatus.OK).json({msg:"user_exists",tip:"用户已存在"});
    }

    if(req_code == code) {
      if((await this.userService.addUser(registerUserDTO.name, registerUserDTO.mail, registerUserDTO.pwd, registerUserDTO.phone)) !==null){
        return res.status(HttpStatus.OK).json({msg:"register_success",tip:"注册成功"});
      }
      else {
        return res.status(HttpStatus.OK).json({msg:"register_failed",tip:"数据库写入错误"});
      }
      
    }
    else {
      return res.status(HttpStatus.OK).json({msg:"wrong_mail_code",tip:"验证码错误"});
    }
    
  }


  @Get('/getmailcode/:mail') 
  async getMailCode(@Res() res, @Param() param) {
    let code :number = parseInt(String(Math.random() * 10000));
    code = code < 1000 ? code + 1000 : code;
    //保存mail:code，到Redis缓存
    await this.cacheService.set(param.mail,code);
    //await this.cacheService.get(param.mail)
    //console.log(await this.cacheService.get(param.mail))
    console.log("邮箱：" + param.mail+ " 验证码：" + code)
    console.log(param.mail)
    //启动发邮件线程
    const fs = require('fs');
    const child_process = require('child_process');

    var sendcontent = "验证码是" + code;
    var workerProcess = child_process.spawn('node', ['./src/utils/mail.ts', param.mail, sendcontent]);
    workerProcess.stdout.on('data', function (data) {
       console.log('stdout: ' + data);
    });
    workerProcess.stderr.on('data', function (data) {
       console.log('stderr: ' + data);
       return res.status(HttpStatus.EXPECTATION_FAILED).json({msg:"mail_sended_failed",tip:"发送失败", mail_code:code});
    });
    workerProcess.on('close', function (code) {
       console.log('子进程已退出，退出码 '+code);
    });
    return res.status(HttpStatus.OK).json({msg:"mail_send_success",tip:"发送成功"});
  }

  @Get('/ifusernameexists/:name') 
  async ifUserNameExists(@Res() res, @Param() param) {
    var name = param.name;
    


    if(await this.userService.getUserByName(name) == null) {
      return res.status(HttpStatus.OK).json({msg:"no_exists",tip:"用户名不存在"});
    }
    else {
      return res.status(HttpStatus.OK).json({msg:"exists",tip:"用户名存在"});
    }
    
  }
  @Get('/changepwd/:mail/:code/:pwd') 
  async changePwd(@Res() res, @Param() param) {
    var mail = param.mail;
    var req_code = param.code;
    var pwd = param.pwd;

    var code = await this.cacheService.get(mail)


    if(req_code === code) {
      if (await this.userService.updatePwd(mail, pwd)!==null) {
        return res.status(HttpStatus.OK).json({msg:"change_pwd_susscess", tip:"密码修改成功"});
      }
      else {
        return res.status(HttpStatus.OK).json({msg:"change_pwd_failed", tip:"修改失败"});
      }

      
    }
    else {
      return res.status(HttpStatus.OK).json({msg:"wrong_mail_code", tip:"验证码错误"});
    }
    
  }



}