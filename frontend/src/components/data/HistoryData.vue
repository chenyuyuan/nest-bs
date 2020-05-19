<template>
<div>
  <el-container>
    <Header></Header>
  </el-container>

<div>
  <div style="height:1px"></div>
  <el-row class="tac">
    <el-col :span="2">
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
      </el-menu>
    </el-col>
    <el-col :span="1" style="border:1px solid transparent">
		<div style="display:none" class="grid-content bg-purple">1</div>
    </el-col>
    <el-col :span="20">
		<el-button plain v-on:click="clickGeneratePicture">下载图片</el-button>
		<div id="my-chart-30days" style="width: 100%;height: 500px;" ref="imageDom"></div>
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
import echarts from 'echarts';
import html2canvas from "html2canvas";



export default {
	name: "HistoryData",
	components: {
		Header
	},
	data() {
		return {
			charts: '',
			data_days: [],
		}
	},
	methods: {
		renderItem(params, api) {
			var xValue = api.value(0),highPoint = api.coord([xValue, api.value(1)]),lowPoint = api.coord([xValue, api.value(2)]),halfWidth = api.size([1, 0])[0] * 0.1;
			var style = api.style({stroke: api.visual('color'), fill: null});
			return { type: 'group',
				children: [{type: 'line',shape: {x1: highPoint[0] - halfWidth, y1: highPoint[1],x2: highPoint[0] + halfWidth, y2: highPoint[1]},style: style}, 
					{type: 'line',shape: {x1: highPoint[0], y1: highPoint[1],x2: lowPoint[0], y2: lowPoint[1]},style: style}, 
					{type: 'line',shape: {x1: lowPoint[0] - halfWidth, y1: lowPoint[1],x2: lowPoint[0] + halfWidth, y2: lowPoint[1]},style: style}]};
		},
		clickGeneratePicture() {
			html2canvas(this.$refs.imageDom).then(canvas => {
				// 转成图片，生成图片地址
				console.log(this.imgUrl)
				this.imgUrl = canvas.toDataURL("image/png");
				var eleLink = document.createElement("a");
				eleLink.href = this.imgUrl; // 转换后的图片地址
				var now=new Date();
				var minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
				var second = now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds();
				var nowStr=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+'-'+now.getHours()+'-'+minute+'-'+second;
				eleLink.download = "30days曲线图"+nowStr;
				document.body.appendChild(eleLink);
				// 触发点击
				eleLink.click();
				// 然后移除
				document.body.removeChild(eleLink);
				
				
			});
		},
	},
	mounted() {
		const _this = this
		var categoryData = [],errorData = [],barData = [];
		var dateCount = 30;
		var timestamptoday = Date.parse(new Date(new Date(new Date().toLocaleDateString()).getTime()))
		axios.get(`${server.baseURL}/data/datas`, ).then(resdata => {
			var data_days = resdata.data.sensordata;
			var data_daysLen = data_days.length
			for (var i = 0; i < dateCount; i++) {
				var max=0, min=99,avg=0,sum=0,count=0;
				var thisDate=new Date(timestamptoday-i*24*60*60*1000);
				for(var j = 0;j < data_daysLen;++j) {
					var thisTimestamp = Date.parse(new Date(data_days[j]['time']))
					if(thisTimestamp>(timestamptoday-i*24*60*60*1000) && thisTimestamp<(timestamptoday-(i-1)*24*60*60*1000)) {
						var value = echarts.number.round(data_days[j]['value']/1000, 2)
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