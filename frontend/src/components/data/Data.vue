<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>
<div>
	<div style="height:1px"></div>
	<el-tabs :tab-position="tabPosition" type="card" style="width:100%">
		<el-tab-pane label="历史数据">
			<el-page-header @back="goBack" content="返回选择设备"></el-page-header>
			<el-button plain v-on:click="clickGeneratePicturehis">下载图片</el-button>
			<div id="my-chart-his" style="width: 1400px;height: 500px;" ref="imageDomhis"></div>
		</el-tab-pane>
		<el-tab-pane label="实时数据">
			<el-page-header @back="goBack" content="返回选择设备"></el-page-header>
			<el-button plain v-on:click="clickGeneratePictureOntime">下载图片</el-button>
			<div id="my-chart-data" style="width: 1400px;height: 500px;" ref="imageDomOntime"></div>
			<div id="my-chart-data2" style="width: 1400px;height: 500px;"></div>
		</el-tab-pane>
		<el-tab-pane label="其他报表">
			<el-page-header @back="goBack" content="返回选择设备"></el-page-header>
			<el-button plain v-on:click="clickGeneratePicture30days">下载图片</el-button>
			<div id="my-chart-30days" style="width: 1400px;height: 500px;" ref="imageDom30days"></div>
		</el-tab-pane>
		<!-- <el-tab-pane label="列表显示">定时任务补偿</el-tab-pane> -->
  </el-tabs>
</div>

</div>
</template>
<script>
import axios from "axios";
import Header from "../Header";
import router from "../../router";
import { server } from "../../utils/helper";
import echarts from 'echarts';
import html2canvas from "html2canvas";

export default {
	name: "Device",
	components: {
		Header
	},
	data() {
		return {
			charts: '',
			data: [],
			data2: [],
			chart_his: '',
			data_his: [],
			tabPosition: 'left',
		}
	},
	methods: {
		goBack() {
			this.$router.push({path:'/managedevice'})
		},
		renderItem(params, api) {
			var xValue = api.value(0),highPoint = api.coord([xValue, api.value(1)]),lowPoint = api.coord([xValue, api.value(2)]),halfWidth = api.size([1, 0])[0] * 0.1;
			var style = api.style({stroke: api.visual('color'), fill: null});
			return { type: 'group',
				children: [{type: 'line',shape: {x1: highPoint[0] - halfWidth, y1: highPoint[1],x2: highPoint[0] + halfWidth, y2: highPoint[1]},style: style}, 
					{type: 'line',shape: {x1: highPoint[0], y1: highPoint[1],x2: lowPoint[0], y2: lowPoint[1]},style: style}, 
					{type: 'line',shape: {x1: lowPoint[0] - halfWidth, y1: lowPoint[1],x2: lowPoint[0] + halfWidth, y2: lowPoint[1]},style: style}]};
		},
		clickGeneratePicture30days() {
			html2canvas(this.$refs.imageDom30days).then(canvas => {
				// 转成图片，生成图片地址
				this.imgUrl = canvas.toDataURL("image/png");
				var eleLink = document.createElement("a");
				eleLink.href = this.imgUrl; // 转换后的图片地址
				var now=new Date();
				var minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
				var second = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
				var nowStr=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+'-'+now.getHours()+'-'+minute+'-'+second;
				eleLink.download = "30days曲线图"+nowStr;
				document.body.appendChild(eleLink);
				// 触发点击, 然后移除
				eleLink.click();
				document.body.removeChild(eleLink);
			});
		},
		clickGeneratePicturehis() {
			html2canvas(this.$refs.imageDomhis).then(canvas => {
				// 转成图片，生成图片地址
				this.imgUrl = canvas.toDataURL("image/png");
				var eleLink = document.createElement("a");
				eleLink.href = this.imgUrl; // 转换后的图片地址
				var now=new Date();
				var minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
				var second = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
				var nowStr=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+'-'+now.getHours()+'-'+minute+'-'+second;
				eleLink.download = "历史数据曲线图"+nowStr;
				document.body.appendChild(eleLink);
				// 触发点击, 然后移除
				eleLink.click();
				document.body.removeChild(eleLink);
			});
		},
		clickGeneratePictureOntime() {
			html2canvas(this.$refs.imageDomOntime).then(canvas => {
				// 转成图片，生成图片地址
				this.imgUrl = canvas.toDataURL("image/png");
				var eleLink = document.createElement("a");
				eleLink.href = this.imgUrl; // 转换后的图片地址
				var now=new Date();
				var minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
				var second = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
				var nowStr=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+'-'+now.getHours()+'-'+minute+'-'+second;
				eleLink.download = "实时曲线图"+nowStr;
				document.body.appendChild(eleLink);
				// 触发点击, 然后移除
				eleLink.click();
				document.body.removeChild(eleLink);
			});
		},
		set30daysChart(device_id) {
			const _this = this
			var categoryData = [],errorData = [],barData = [];
			var dateCount = 30;
			var timestamptoday = Date.parse(new Date(new Date(new Date().toLocaleDateString()).getTime()))
			axios.get(`${server.baseURL}/data/getdataall/`+device_id, ).then(resdata => {
				var data_days = resdata.data.sensordata;
				var data_daysLen = data_days.length
				for (var i = 0; i < dateCount; i++) {
					var max=0, min=99,avg=0,sum=0,count=0;
					var thisDate=new Date(timestamptoday-i*24*60*60*1000);
					for(var j = 0;j < data_daysLen;++j) {
						var thisTimestamp = Date.parse(new Date(data_days[j]['time']))
						if(thisTimestamp>(timestamptoday-i*24*60*60*1000) && thisTimestamp<(timestamptoday-(i-1)*24*60*60*1000)) {
							var temp = data_days[j]['value']
							temp = (device_id==1||device_id==4)?temp/1000:temp;//////////////
							var value = echarts.number.round(temp, 2)
							sum+=value;
							if(value<min){ min = value; }
							if(value>max){ max = value; }
							count++;
						}
					}
					if(count>0){avg=sum/count;}
					console.log(max + " " + min + " "+ avg + " " + count)
					if(count==0) {max=0;min=0;avg=0;}
					var thisDateStr=thisDate.getFullYear() + '/' + (thisDate.getMonth()+1) +'/'+ thisDate.getDate()
					categoryData.push(thisDateStr);
					errorData.push([i, max, min]);
					barData.push(echarts.number.round(avg, 2));
				}
				var option = {
					tooltip: {
						trigger: 'axis',
						formatter: function (params) {
							var barsdata = params[0], linesdata = params[1];
							var date = new Date(barsdata.name);
							return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+',平均值:'+barsdata.data+',最大值:'+linesdata.data[1]+',最小值:'+linesdata.data[2];
						},
						axisPointer: {type: 'shadow'}
					},
					title: {text: '近三十日每日平均值 最大值和最小值'},
					legend: {data: ['bar', 'error']},
					dataZoom: [{
						type: 'slider',
						start: 0,
						end:21
					}, {
						type: 'inside',
						start: 50,
						end: 70
					}],
					xAxis: {data: categoryData},
					yAxis: {},
					series: [{
						type: 'bar',
						name: '当日平均值',
						data: barData,
						itemStyle: {
							color: '#77bef7'
						}
					}, {
						type: 'custom',
						name: '最大和最小值',
						itemStyle: {
							normal: {
								borderWidth: 1.5
							}
						},
						renderItem: this.renderItem,
						encode: {
							x: 0,
							y: [1, 2]
						},
						data: errorData,
						z: 100
					}]
				};
				var dom = document.getElementById("my-chart-30days");
				var myChart = echarts.init(dom);
				if (option && typeof option === "object") {
					myChart.setOption(option, true);
				} 
			});
		},
		setHistoryData(device_id) {
			var data_his = [];
			var now = +new Date();
			var value = 0;
			const _this = this
			axios.get(`${server.baseURL}/data/getdataall/`+device_id, ).then(resdata => {
				var len=resdata.data.sensordata.length;
				var temp = resdata.data.sensordata;
				var temp0 = resdata.data.datalist;
				var data_his_2 = [];
				for(var i=0;i<temp0[0].length;++i) {
					var now = new Date((temp0[0][i].time).toString())
					var value = temp0[0][i].value;
					value = (device_id==1||device_id==4)?value/1000:value;
					var timestr = now.getFullYear() + '/' + (now.getMonth()+1) +'/'+ now.getDate()+' ' +now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
					this.data_his.push({name: now.toString(),value: [timestr, value]});
					if(device_id == 3) {
						data_his_2.push({name: now.toString(),value: [timestr, temp0[1][i].value]});
					}
					
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
							var params0 = params[0];
							var params1 = params[1]
							var date = new Date(params0.name);
							// if(params1.value[1]!=null) {
							// 	return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' : '+params0.value[1]+','+params1.value[1];	
							// }
							return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' : '+params0.value[1];
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
						start: 0,
						end:21
					}, {
						type: 'inside',
						start: 50,
						end: 70
					}],
					series: [{
						name: '模拟数据',
						type: 'line',
						smooth: true,
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
					},
					{
						name: '模拟数据',
						type: 'line',
						//smooth: true,
						showSymbol: false,
						hoverAnimation: false,
						data: data_his_2,
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
					}
					]
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
		var device_id = this.$route.query.id;
		this.setHistoryData(device_id);
		this.set30daysChart(device_id);

		var data = [];
		var data0 = []
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
			data0.push({name: now.toString(),value: [timeformat,]});
		}
		
		this.data = data
		this.data2 = data0
		var option = {
			title: {text: '动态数据 + 时间坐标轴'},
			tooltip: {
				trigger: 'axis',
				formatter: function (params) {
					var params0 = params[0];
					var params1 = params[1]
					var date = new Date(params0.name);
					// if(params1.value[1]!=null) {
					// 	return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' : '+params0.value[1]+','+params1.value[1];	
					// }
					return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+' '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' : '+params0.value[1];
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
			},
			{
				name: '模拟数据',
				type: 'line',
				showSymbol: false,
				hoverAnimation: false,
				data: data0
			}
			]
		};
		var dom = document.getElementById("my-chart-data");
		var myChart = echarts.init(dom);
	
		const _this=this;
		setInterval(function () {
			var data1 = data
			var data2 = data0
			axios.get(`${server.baseURL}/data/getdata/`+device_id, ).then(resdata => {
				var datas = resdata.data.datas;
				
				for(var i = 0;i < datas[0].length; ++i) {
					var temp = parseFloat(datas[0][i]['value']);
					console.log(datas[0])
					var t0 = datas[0][i]['time'];
					temp = (device_id==1||device_id==4)?temp/1000:temp;
					
					console.log('temp0 '+temp)
					var timestr=t0.substring(0,4)+'/'+t0.substring(4,6)+'/'+t0.substring(6,8)+' '+t0.substring(8,10)+':'+t0.substring(10,12)+':'+t0.substring(12,14);
					console.log("time0 "+timestr)
					data1.shift();
					data1.push({name: timestr,value: [timestr,temp]});
					//myChart.setOption({series: [{data: data1}]});
				}
				
				if(device_id == 3) {
					for(i = 0;i < datas[1].length; ++i) {
						temp = parseFloat(datas[1][i]['value']);
						t0 = datas[1][i]['time'];
						console.log('temp1 '+temp)
						timestr=t0.substring(0,4)+'/'+t0.substring(4,6)+'/'+t0.substring(6,8)+' '+t0.substring(8,10)+':'+t0.substring(10,12)+':'+t0.substring(12,14);
						console.log("time1 "+timestr)
						data2.shift();
						data2.push({name: timestr,value: [timestr,temp]});
					}
					
				}
				myChart.setOption({series: [{data: data1}, {data: data2}]});
				
			});
		}, 4000);
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