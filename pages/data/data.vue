<template>
	<view >
		<uni-nav-bar left-icon="back" left-text="返回" :backgroundColor="color" :status-bar="true" color="white" title="统计数据"  />
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
	    @change="change0"
	     />
		<YSteps   color='#fff' backgroundColor='rgb(194,197,228)' :infoList='list1' :type='1'></YSteps>
		</view>
		<view v-if="this.index==1">
		<uni-calendar 
		    :insert="true"
		    :lunar="false" 
		    :start-date="'2019-1-1'"
		    :end-date="'2020-10-3'"
			:showMonth="false"
		    @change="change1"
		     />
			<YSteps color='#fff' backgroundColor='rgb(194,197,228)' :infoList='list2' :type='2'></YSteps>
			</view>
		<view v-if="this.index==2">
			<uni-section title="本周每天专注时长" type="line"></uni-section>
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
				<uni-section title="本年度每月专注时长" type="line"></uni-section>
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

									</view>


</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
import YSteps from '../../components/Y-Steps/Y-Steps.vue'
import wybTabs from '@/components/wyb-tabs/wyb-tabs.vue'
import HistogramChart from '@/components/stan-ucharts/HistogramChart.vue';
import LineChart from '@/components/stan-ucharts/LineChart.vue';
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{
			uniCalendar,
			YSteps,
			wybTabs,
			HistogramChart,
			LineChart,
			uniNavBar
		},
		onLoad(){
			 this.color=getApp().globalData.color
			var d=new Date().toISOString().slice(0, 10)
			console.log(d)
			let that=this
			uni.request({
				url:'http://106.54.76.21:8080/focus/oneDay',
				data:{
					date:d,
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method:'GET',
				success:function(res){
					console.log(res)
					that.list1=res.data
				}
			});
			uni.request({
				url:'http://106.54.76.21:8080/clocks/getRecord',
				data:{
					date:d,
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method:'GET',
				success:function(res){
					console.log(res)
					that.list2=res.data
				}
			});
			uni.request({
				url:'http://106.54.76.21:8080/focus/recent7Days',
				data:{
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method:'GET',
				success:function(res){
					console.log(res)
					that.histogramData1={
					                //柱状图Compent  //label应为series value 应为
					                label: ['昨天', '前天','大前天','四天前','五天前','六天前', '七天前'],
					                value: [
					                    {
					                        name: '当天专注时间统计/min',
					                        data: res.data,
					                    }
					                ]
					            }
				}
			});
			uni.request({
				url:'http://106.54.76.21:8080/focus/recent6Months',
				data:{
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				method:'GET',
				success:function(res){
					console.log(res)
					that.histogramData2={
					                //柱状图Compent  //label应为series value 应为
					                label: [ '上个月','两个月前','三个月前','四个月前','五个月前','六个月前'],
					                value: [
					                    {
					                        name: '本月专注时间统计/min',
					                        data: res.data
					                    }
					                ]
					            }
				}
			});
		},
		data() {
			return {
				index:0,
				data1:[],
				data2:[],
				histogramData1: {},
							histogramData2: {},
				tabs: [{
				              label: '时间历程',
				          }, {
							  label:'闹钟记录',
						  },{
				              label: '统计数据',
				          }],
				list1: [ ],
				list2: [ ],
				color:""
			}
		},
		methods: {
			 change0(e) {
			    console.log(e);
				console.log(e.fulldate)
				let that=this
				uni.request({
					url:'http://106.54.76.21:8080/focus/oneDay',
					data:{
						date:e.fulldate,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method:'GET',
					success:function(res){
						console.log(res)
						that.list1=res.data
					}
				});
			 },
			 change1(e) {
			    console.log(e);
			 				console.log(e.fulldate)
			 				let that=this
			 				uni.request({
			 					url:'http://106.54.76.21:8080/clocks/getRecord',
			 					data:{
			 						date:e.fulldate,
			 					},
			 					header: {
			 						'content-type': 'application/x-www-form-urlencoded'
			 					},
			 					method:'GET',
			 					success:function(res){
			 						console.log(res)
			 						that.list2=res.data
			 					}
			 				});
							
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
