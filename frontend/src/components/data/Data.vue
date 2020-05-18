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
        <el-menu-item index="1" @click="toData">
          <i class="el-icon-menu"></i>
          <span slot="title">实时数据</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toHistoryData">
          <i class="el-icon-setting"></i>
          <span slot="title">历史数据</span>
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
        data: []


    }
  },
  methods: {
    toData(){
      this.$router.push({path:'/data'})
    },
    toHistoryData(){
      this.$router.push({path:'/historydata'})
    },


  },
  mounted() {
    // this.$nextTick(function() {
    //   this.drawPie('main')
    // })
        
    var data = [];
    //var now = +new Date(2020,4,19,19,52,0);
    // var now = +new Date("2020-04-19T05:34:10.000Z");
    var timestamp = Date.parse(new Date());
    console.log("timestamp is "+timestamp)
    
    var now = new Date(timestamp);
    console.log("now"+now.toString())
    var value = 0;
    var dataCount = 100
    for (var i = 0; i < dataCount; i++) {
      var time0 = timestamp - (dataCount-i+10)*1000;
      now = new Date(time0);
      var minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
      var second = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
      var timeformat = now.getFullYear() + '/' + (now.getMonth() + 1) +'/'+ now.getDate()+' ' +now.getHours()+':'+minute+':'+second;
      //console.log(now.getFullYear() + '/' + (now.getMonth() + 1) +'/'+ now.getDate()+' ' +now.getHours()+':'+now.getMinutes()+':'+now.getSeconds())
      data.push({
      name: now.toString(),
          value: [
              timeformat,
              //Math.round(value)
          ]
      });
    }
    // console.log(dom)
    // console.log(myChart)

    this.data = data
    var option = {
        title: {
            text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' '+date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
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
            boundaryGap: [ 0, '100%'],
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

    console.log(data)
    //console.log(this.data)\
    const _this=this;
    var lo=0;
    var hi=0;

    setInterval(function () {
        //console.log(this.now)
        //console.log(setdata)
        //console.log(_this.data)
        axios.get(`${server.baseURL}/data/getdata`, ).then(resdata => {

			var datas = resdata.data.datas;
			for(var i = 0;i < datas.length; ++i) {
				var temp = parseFloat(datas[i]['value'])
				var t0 = datas[i]['time']
				//var datatime = new Date((datas[i]['time']).toString());
				var timestr=t0.substring(0,4)+'/'+t0.substring(4,6)+'/'+t0.substring(6,8)+' '+t0.substring(9,11)+':'+t0.substring(11,13)+':'+t0.substring(13,15)
				console.log(timestr)
				console.log(temp/1000)
				//console.log(_this.data)
				//_this.data.shift();
				_this.data.push({
				name: timestr,
					value: [
						timestr,
						temp/1000
					]
				});

				myChart.setOption({
				series: [{
					data: _this.data
					}]
				});

			}
            
        
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