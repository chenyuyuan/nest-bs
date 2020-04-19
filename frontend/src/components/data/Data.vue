<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu
        default-active=""
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">添加设备</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toManageDevice">
          <i class="el-icon-setting"></i>
          <span slot="title">管理设备</span>
        </el-menu-item>
        <!-- <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">删除设备</span>
        </el-menu-item> -->
      </el-menu>
    </el-col>
    <el-col :span="1" style="border:1px solid transparent">
      <div style="display:none" class="grid-content bg-purple">1</div>
    </el-col>
    <el-col :span="20">
      <div id="my-chart" style="width: 100%;height: 500px;"></div>
    </el-col>
  </el-row>
</div>

</div>
</template>
<script>
import axios from "axios";

import Header from "../Header"
import router from "../../router";
import { server } from "../../utils/helper";

import echarts from 'echarts'



export default {
  name: "Device",
  components: {
    Header
  },
  data() {
    
    return {
        charts: '',
        //opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
        // opinionData:[
        // {value:335, name:'直接访问'},
        // {value:310, name:'邮件营销'},
        // {value:234, name:'联盟广告'},
        // {value:135, name:'视频广告'},
        // {value:1548, name:'搜索引擎'}
        // ],
        // data:[2,1],
        // now : +new Date(1997,9,3),
        // oneDay : 24*3600*1000,
        // value : Math.random()*1000,
        option : {
            title: {
                text: '动态数据 + 时间坐标轴'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: this.data
            }]
        },

    }
  },
  methods: {
    toManageDevice(){
      this.$router.push({path:'/managedevice'})
    },
    toDataTime(){
      this.$router.push({path:'/managedevice'})
    },


  },
  mounted() {
    // this.$nextTick(function() {
    //   this.drawPie('main')
    // })
        
    var data = [];
    //var now = +new Date(2020,4,19,19,52,0);
    var now = +new Date("2020-04-19T05:34:10.000Z");
    var oneDay = 24 * 3600 * 1000;
    var oneSecond = 10000;
    var value = 0;
    for (var i = 0; i < 1000; i++) {
        now = new Date(+now + oneSecond);
        value = value + Math.random() * 21 - 10;
        data.push({
        name: now.toString(),
            value: [
                now.getFullYear() + '/' + now.getMonth() +'/'+ now.getDate()+' ' +now.getHours()+':'+now.getMinutes()+':'+now.getSeconds(),
                Math.round(value)
            ]
        });
    }
    //console.log(dom)
    //console.log(myChart)
    
    var option = {
        title: {
            text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };

    var dom = document.getElementById("my-chart");
    var myChart = echarts.init(dom);


    setInterval(function () {
        //console.log(this.now)
        //console.log(setdata)
        axios.get(`${server.baseURL}/data/a`, ).then(data => {

            value = data.data.sensordata.value
            console.log(data.data.sensordata.time)
            now = +new Date(data.data.sensordata.time)

            data.shift();
            data.push({
            name: now.toString(),
                value: [
                    now.getFullYear() + '/' + now.getMonth() +'/'+ now.getDate()+' ' +now.getHours()+':'+now.getMinutes()+':'+now.getSeconds(),
                    value
                ]
            });

            myChart.setOption({
            series: [{
                data: data
                }]
        });
        
      });

        
     }, 5000);
    if (option && typeof option === "object") {
       myChart.setOption(option, true);
    } 
    
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