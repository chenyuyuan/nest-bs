<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>
<!-- <div id="my-chart-data" style="width: 100%;height: 500px;"></div>
<div id="my-chart-his" style="width: 100%;height: 500px;"></div> -->
<div>
	<div style="height:1px"></div>
	<el-tabs :tab-position="tabPosition" style="height: 800px;width:100%">
		<el-tab-pane label="实时数据">
			<el-page-header @back="goBack" content="返回选择设备"></el-page-header>
			<div id="my-chart-data" style="width: 1400px;height: 500px;"></div>
		</el-tab-pane>
		<el-tab-pane label="历史数据">
			<el-page-header @back="goBack" content="返回选择设备"></el-page-header>
			<div id="my-chart-his" style="width: 1400px;height: 500px;"></div>
		</el-tab-pane>
		<el-tab-pane label="其他报表">
			<div id="my-chart-30days" style="width: 100%;height: 500px;"></div>
		</el-tab-pane>
		<el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
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
			data: [],
			chart_his: '',
			data_his: [],
			tabPosition: 'left',
		}
	},
	methods: {
		goBack() {
			this.$router.push({path:'/managedevice'})
		},
		setHistoryData() {
			var data_his = [];
			var now = +new Date();
			var value = 0;
			const _this = this
			axios.get(`${server.baseURL}/data/datas`, ).then(resdata => {
				var len=resdata.data.sensordata.length;
				var temp = resdata.data.sensordata
				for(var i=0;i<len;++i) {
					var now = new Date((temp[i].time).toString())
					var thevalue = temp[i].value
					var timestr = now.getFullYear() + '/' + (now.getMonth()+1) +'/'+ now.getDate()+' ' +now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()
					//_this.data.shift();
					this.data_his.push({name: now.toString(),value: [timestr,thevalue/1000]});
				}
				data_his = this.data_his
				var dataLen = data_his.length
				var option = {
					title: {
						text: '数据 + 时间坐标轴'
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
						type: 'category',
						boundaryGap: false,
						
					}, 
					yAxis: {
						type: 'value',
						boundaryGap: [0, '100%'],
						splitLine: {
							show: true
						}
					},dataZoom: [{
						type: 'slider',
						start: dataLen-20,
						end: dataLen
					}, {
						start: 0,
						end: 10,
						handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
						handleSize: '80%',
						handleStyle: {
							color: '#fff',
							shadowBlur: 3,
							shadowColor: 'rgba(0, 0, 0, 0.6)',
							shadowOffsetX: 2,
							shadowOffsetY: 2
						}
					}],
					series: [{
						name: '模拟数据',
						type: 'line',
						//smooth: true,
						showSymbol: false,
						hoverAnimation: false,
						data: data_his,
						markPoint: {
							data: [
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							]
						},
						markLine: {
							data: [
								{type: 'average', name: '平均值'},
								{type: 'max', name: '最大值'},
								{type: 'min', name: '最小值'}
							],
						}
					}]
				};
				var dom = document.getElementById("my-chart-his");
				var myChart = echarts.init(dom);
				if (option && typeof option === "object") {
					myChart.setOption(option, true);
				} 
			});
		}
	},
	mounted() {
		this.setHistoryData();
			
		var data = [];
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
			data.push({name: now.toString(),value: [timeformat,]});
		}
		this.data = data
		var option = {
			title: {text: '动态数据 + 时间坐标轴'},
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
		var dom = document.getElementById("my-chart-data");
		var myChart = echarts.init(dom);
		const _this=this;
		setInterval(function () {
			axios.get(`${server.baseURL}/data/getdata`, ).then(resdata => {
				var datas = resdata.data.datas;
				for(var i = 0;i < datas.length; ++i) {
					var temp = parseFloat(datas[i]['value'])
					var t0 = datas[i]['time']
					var timestr=t0.substring(0,4)+'/'+t0.substring(4,6)+'/'+t0.substring(6,8)+' '+t0.substring(8,10)+':'+t0.substring(10,12)+':'+t0.substring(12,14)
					_this.data.shift();
					_this.data.push({name: timestr,value: [timestr,temp/1000]});
					myChart.setOption({series: [{data: _this.data}]});
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