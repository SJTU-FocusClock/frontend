<template>
	<view >
		 <view class="wyb-tabs" >
		     <wyb-tabs :tabs="tabs" @change="onChange" />
		 </view>
		 <view v-if="this.index==0">
	<uni-calendar 
	    :insert="true"
	    :lunar="false" 
	    :start-date="'2019-1-1'"
	    :end-date="'2020-10-3'"
		:showMonth="false"
	    @change="change"
	     />
		<YSteps   lineNum='0' color='#fff' backgroundColor='rgb(194,197,228)' :infoList='list'></YSteps>
		</view>
		<view v-if="this.index==1">
			<text>本周每天专注时长</text>
		<histogram-chart
		            :dataAs="histogramData1"
		            canvasId="ht1"
		            labelKey="label"
		            valueKey="value"
		            :yAxisAs="{
		                formatter: {
		                    type: 'number' //type:number percent String,额外参数:fixed:NUmber,name:String
		                }
		            }"
		        />
				<text>本年度每月专注时长</text>
				<histogram-chart
				            :dataAs="histogramData2"
				            canvasId="ht2"
				            labelKey="label"
				            valueKey="value"
				            :yAxisAs="{
				                formatter: {
				                    type: 'number' //type:number percent String,额外参数:fixed:NUmber,name:String
				                }
				            }"
				        />
						<text>本周每天起床时间</text>
						<line-chart ref="lineData" canvasId="lt1" :dataAs="lineData" :yAxisAs="{
					formatter: {
						type: 'String', //type:number percent String,额外参数:fixed:NUmber,name:String
					}
				}"/>

									</view>


</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
import YSteps from '../../components/Y-Steps/Y-Steps.vue'
import wybTabs from '@/components/wyb-tabs/wyb-tabs.vue'
import HistogramChart from '@/components/stan-ucharts/HistogramChart.vue';
import LineChart from '@/components/stan-ucharts/LineChart.vue';
	export default {
		components:{
			uniCalendar,
			YSteps,
			wybTabs,
			HistogramChart,
			LineChart
		},
		data() {
			return {
				index:0,
				histogramData1: {
				                //柱状图Compent  //label应为series value 应为
				                label: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				                value: [
				                    {
				                        name: '本周专注时间统计/min',
				                        data: [163, 72, 389, 67, 302, 296, 23]
				                    }
				                ]
				            },
							histogramData2: {
							                //柱状图Compent  //label应为series value 应为
							                label: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
							                value: [
							                    {
							                        name: '本周专注时间统计/min',
							                        data: [163, 72, 389, 67, 302, 296, 23,89,60,176,480,86]
							                    }
							                ]
							            },
										lineData: {
														//带百分比的图--折线图数据
														categories: ['周一', '周二', '周三', '周四', '周五', '周六','周日'],
														series: [{ name: '本周每日起床时间', data: [434, 482, 402, 497, 503, 419,475],format:val=>{return Math.floor(val/60)+':'+(val%60)}}]
													},
				tabs: [{
				              label: '时间历程',
				          }, {
				              label: '统计数据',
				          }],
				list: [
					{
					    date: '13:45 - 15:39',
					    info: '机器学习',
						dur:'共114分钟'
					},
					
					{
					    date: '11:13 - 11:59',
					    info: '软件工程原理与实践',
						dur:'共46分钟'
					},
					{
					    date: '9:02 - 10:45',
					    info: 'CSE',
						dur:'共103分钟'
					},         
					{
					    date: '7:30',
					    info: '闹钟',
						dur:'持续2分钟'
					},   
				                    ]
			}
		},
		methods: {
			 change(e) {
			    console.log(e);
			 },
			 onChange(e) {
				let label = e.label // 选项卡名
				let index = e.index
				this.index=index
				console.log(index)
			    
			 },
			 moveHandle(){
			             return;
			             }
		}
	}
</script>

<style>
	.mycolor{
		color: rgb(214,211,238);
	}

</style>
