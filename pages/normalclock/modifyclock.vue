<template>
	<!-- 普通闹钟设置页面 -->
	<view class="normal_clock">

		<!-- 页面顶部导航条 -->
		<view class="head_box">
			<uni-nav-bar :status-bar="true" @clickLeft="back_to_home" leftIcon="back" backgroundColor="#c4c4e9" :fixed="true"
			 color="white" rightIcon="trash-filled" @clickRight="delete_clock">
				<text class="head_box_text">设置闹钟</text>
			</uni-nav-bar>
		</view>

		<uni-popup ref="popup" type="dialog">
			<uniPopupGame mode="input" title="选择闹钟游戏" @confirm="dialogInputConfirm"> </uniPopupGame>
		</uni-popup>


		<!-- 闹钟设置内容 -->
		<view class="normal_clock_content">

			<!-- 选择闹钟游戏跳转 -->
			<view class="jump_to_game_choose">
				<view class="jump_to_game_choose_block" @click="choose_game">
					<gg-cell :label="gametext" url="/pages/game/game.vue">
					</gg-cell>
				</view>
			</view>

			<!-- 闹钟时间编辑 -->
			<view class="time_setting">
				<text class="time_setting_text">时间</text>
				<picker-view class="time_setting_picker" v-if="visible" indicator-class="time_setting_picker_indicator" :value="value"
				 @change="bindChange">
					<picker-view-column>
						<view class="time_setting_picker_item" v-for="(item,index) in AMPMs" :key="index">{{item}}</view>
						<!-- <view class="item">上午</view> -->
						<!-- <view class="item">下午</view> -->
					</picker-view-column>
					<picker-view-column>
						<view class="time_setting_picker_item" v-for="(item,index) in hours" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="time_setting_picker_item" v-for="(item,index) in minutes" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>

			<!-- 闹钟重复模式编辑 -->
			<view class="date_setting">
				<gg-checkbox-tag  :key="k"  label="闹钟重复" v-model="formData.checkboxTag" :dataLists="checkLists" :maxNumber="7" />
			</view>

			<!-- 闹钟其他设定编辑 -->
			<view class="other_setting">
				<gg-nav-group>
					<uni-list class="other_setting_list">
						<!-- 音量设置 -->
						<!-- <uni-list-item title="音量">
							<bing-progress slot="footer" class="bp" :showInfo="false"
								strokeWidth="4px" handleHeight="20px" 
								handleWidth="20px" handleBorderRadius="10px"
								:max="100" :min="0" :value="volume_value" 
								:step="20" :continuous="false"
								handleColor="#a1a1bf" activeColor="#bbbbdd" noActiveColor="#f0f0f0"></bing-progress>
						</uni-list-item> -->
					</uni-list>

<!-- radio无法设置默认选项 -->
<view :key="k">
			<gg-radio   label="铃声" v-model="ringData.radio" :dataLists="radioLists" />
</view>





					<!-- 备注设置 -->
					<gg-input-text label="备注" v-model="tag"></gg-input-text>

				<!-- 	不玩儿游戏设置 -->
			 <!-- 	<gg-switch labelWidth="140" style="color:#c4c4e9 ;" label="不玩游戏直接关闭闹钟" tip="在闹钟画面有关闭闹钟功能,不完成小游戏,也可以快速关闭闹钟"></gg-switch> -->
 
				</gg-nav-group>
			</view>

			<view class="save_setting">
				<button class="save_button" @click="saveClock">
					<text class="save">储存</text>
				</button>

			</view>
		</view>
	</view>
</template>

<script>
	import bingProgress from '../../components/bing-progress/bing-progress.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupGame from '@/components/uni-popup/uni-popup-game.vue';

	export default {
		components: {
			bingProgress,
			uniPopup,
			uniPopupGame,
		},
		data() {
			//时间编辑版块
			const date = new Date()
			const AMPMs = ['上午', '下午']
			const hour = date.getHours() % 12 - 1
			const minute = date.getMinutes()
			const AMPM = date.getHours() / 12
			const hours = []
			const minutes = []
			for (let i = 1; i <= 12; i++) {
				if (i < 10) {
					hours.push('0' + i)
				} else {
					hours.push(i);
				}
			}
			for (let i = 0; i < 60; i++) {
				if (i < 10) {
					minutes.push('0' + i)
				} else {
					minutes.push(i)
				}
			}
			return {
				//时间编辑版块
				hours,
				hour,
				AMPMs,
				AMPM,
				minutes,
				minute,
				value: [AMPM, hour, minute],
				visible: true,

				//音量设置版块
				volume_value: 0,

				// 重复模式版块
				formData: {
					checkbox: ['2', '4'],
					checkboxTag: '',
				},
				maxNumber: 7,
				checkLists: [{
						value: '1',
						text: '一'
					},
					{
						value: '2',
						text: '二'
					},
					{
						value: '3',
						text: '三'
					},
					{
						value: '4',
						text: '四'
					},
					{
						value: '5',
						text: '五'
					},
					{
						value: '6',
						text: '六'
					},
					{
						value: '7',
						text: '七'
					},
				],
				gametext: '选择闹钟游戏',
				gameid: 0,
				gameitems:['随机游戏','2048','打字游戏','算术游戏'],
				time: '',
				tag: '',
				ringData: {
					radio: 0,
				},
				radioLists: [{
						value: 0,
						text: 'Breeze'
					},
					{
						value: 1,
						text: 'cute'
					},
					{
						value: 2,
						text: 'heartbeats'
					},
					{
						value: 3,
						text: 'morning'
					},
					{
						value: 4,
						text: 'Oops'
					},
					{
						value: 5,
						text: 'Solstice'
					}
				],
				id:0,
				k:0
			}

		},
		methods: {
			//页面顶部导航条版块
			back_to_home: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			delete_clock: function() {
				let that=this
				uni.request({
					url:'http://106.54.76.21:8080/clocks/delete/'+that.id.toString(),
					method:'DELETE',
					complete:(e)=> {
						console.log(e)
					},
					success:function(e)
					{
						console.log(e);
						uni.navigateBack({					
						})
					}
				})
			},

			//时间编辑版块，滑动获取选择的闹钟时间
			bindChange(e) {
				const val = e.detail.value
				this.AMPM = this.AMPMs[val[0]]
				this.hour = this.hours[val[1]]
				this.minute = this.minutes[val[2]]
				/* this.time=this.AMPM+this.hour+this.minute
				console.log(this.time) */
			},

			//底部储存按钮版块
			//修改闹钟
			saveClock: function() {
				let that = this
				var type = that.gameid === 0 ? 0 : 1;
				var time = that.AMPM === '上午' ? that.hour : (parseInt(that.hour) + 12).toString();
				time += ':';
				time += that.minute;
				time += ':00'
				var week = that.formData.checkboxTag.split(",")
				week = week.map(Number)
				console.log('week',week)
				uni.request({
					url: 'http://106.54.76.21:8080/clocks/modify/'+that.id.toString(),
					data: {
						gameType: type,
						gameId: that.gameid,
						time: time,
						week: week,
						ring: that.ringData.radio,
						tag: that.tag
					},
					method: 'PUT',
					success: function(e) {
						console.log(e)
						uni.navigateBack({})
					}
				})
			},
			choose_game() {
				this.$refs.popup.open()
			},
			dialogInputConfirm(done, val) {
				console.log(val);
				this.gametext = val.name;
				this.gameid = val.id;
				done();
			},
			handleData(e){
				this.gametext=this.gameitems[e.data.gameid];
				console.log(e);
				var t=e.data.time;
				this.value[0]=parseInt(parseInt(t.substr(0,2))/12);
				var tmp=parseInt(t.substr(0,2));
				this.value[1]=tmp>12?tmp-13:tmp-1;
				this.value[2]=parseInt(t.substr(3,2));
				
				this.tag=e.data.tag;
				this.ringData.radio=e.data.ring;
				/* 设置重复星期 */
				var w=e.data.week;
				console.log(e.data.week)
				if(w&1){
					this.formData.checkboxTag='1';
				}
				for(var i=1;i<=6;i++){
					if((w>>i)&1){
						this.formData.checkboxTag+=','+(i+1).toString()
					}
				}
				this.k++;//即时渲染
				
			},
		onLoad(v) {
			let that=this;
			console.log("onload")
			console.log(v)
			this.id=parseInt(v.id);		
			//获取单个闹钟
			uni.request({
				url:'http://106.54.76.21:8080/clocks/clock/'+v.id,
				method:'GET',
				header: {
				'content-type': 'application/x-www-form-urlencoded'
						},
				success: function(e){
					//成功拿到了e.data,但是还没有渲染
					that.handleData(e);
			}
			})
			
			
		}
	},
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.normal_clock_content {
		padding-left: 2%;
		padding-right: 2%;
		background-color: #f4f4f4;
	}

	.jump_to_game_choose {
		height: 130rpx;
		// padding-left: 2%;
		// padding-right: 2%;
		padding-top: 1rpx;

		.jump_to_game_choose_block {
			margin-top: 20rpx;
			height: 100rpx;
			background-color: #ffffff;
		}
	}

	.time_setting {
		padding-left: 2%;
		padding-right: 2%;
		height: 480rpx;
		background-color: #FFFffF;

		.time_setting_text {
			font-size: 11pt;
			padding-left: 2%;
		}

		.time_setting_picker {
			// background-color: #fff;
			width: 92%;
			height: 400rpx;
			position: absolute;
			border-top: 1px solid rgb(222, 222, 222);

			.time_setting_picker_item {
				font-size: 30rpx;
				color: #7b7b7b;
				text-align: center;
				line-height: 68rpx;
			}
		}

		.time_setting_picker_indicator {
			height: 68rpx;
			border-top: 1px solid rgb(196, 196, 233);
			border-bottom: 1px solid rgb(196, 196, 233);
			border-radius: 4rpx;
		}
	}

	.date_setting {
		padding-top: 2%;


	}

	.other_setting {


		.other_setting_list {

			.bp {
				//margin: 5px;
				margin-left: 20rpx;
			}

			.comment {
				.conmment_text {
					font-size: 11pt;
				}

				.comment_input {
					margin: 10rpx;
				}
			}


		}
	}

	.save_setting {
		.save_button {
			width: 100%;
			height: 100rpx;
			background: rgb(203, 203, 240);
			border: 1rpx solid rgba(238, 238, 238, 1);
			color: rgba(#fff, 0.9);
		}
	}
</style>
