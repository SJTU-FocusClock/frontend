<template>
	<view class="">
		<uni-nav-bar left-icon="back" left-text="返回" :backgroundColor="color" :status-bar="true" color="white" title="拼图游戏" @clickLeft="back" />
		<view class="PingTu">
			<view class="item" :class="item.class" :style="[itemStyle,{'background-image': 'url('+url+')'}]" v-for="(item,index) in levelArray"
			 :data-index="index" :key="index" @tap="change"></view>
		</view>
		<view class="btn-group">
			<view class="cu-btn bg-green shadow" @tap="start">{{startText}}</view>
			<view class="cu-btn bg-green shadow" @tap="back">返回</view>
		</view>
	</view>
</template>

<script>
	let that;
	let level = 3;
	 import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components:{
				  uniNavBar
		},
		props: {
			url: {
				default: 'http://cdn.test.lfwellness.cn/pintu/xinpin.jpg'
			},
			timeOut: {
				default: -1
			}
		},
		data() {
			return {
				levelArray: [],
				// url: 'http://cdn.test.lfwellness.cn/pintu/xinpin.jpg',
				startText: '开始游戏',
				gameStart: false,
				timeCounter: null,
				color:''
			};
		},
		created() {
			that = this;
			let array = {};
			for (var i = 1; i <= level * level; i++) {
				array[i] = {
					value: i,
					class: 'pt_item_' + i
				};
			}
			that.levelArray = array;
			this.color=getApp().globalData.color
		},
		computed: {
			itemStyle() {
				let res = uni.getSystemInfoSync();
				let width = parseInt(res.windowWidth * 0.33);
				return {
					width: width + 'px',
					height: width + 'px',
				}
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: -1
				})
			},
			start() {
				let array = {};
				for (var i = 1; i <= level * level; i++) {
					array[i] = {
						value: i,
						class: 'pt_item_' + i
					};
				}
				array = that.rand(array);
				that.levelArray = array;
				that.gameStart = true;
				that.startText = '重新开始';
				clearInterval(that.timeCounter);
				if (that.timeOut != -1) {
					that.timeCounter = setTimeout(function() {
						uni.showToast({
							icon: 'none',
							title: '很遗憾！拼图失败了'
						})
						let array = {};
						for (var i = 1; i <= level * level; i++) {
							array[i] = {
								value: i,
								class: 'pt_item_' + i
							};
						}
						that.levelArray = array;
						that.$emit('result', 'failed');
					}, that.timeOut)
				}
			},
			//随机排序
			rand(arr) {
				let old_arr = {};
				old_arr = arr;
				let len = level * level;
				for (let i in arr) {
					if (len != i) {
						let idx = Math.ceil(Math.random() * (len - 1));
						let temp = arr[idx];
						arr[idx] = arr[i];
						arr[i] = temp;
					}
				}
				//逆序数验证
				let last = 0;
				let num = 0;
				for (let i in arr) {
					for (let j in arr) {
						if (j > i && arr[i].value > arr[j].value) {
							num++;
						}
					}
				}
				// console.log(num);
				if (num % 2 != 0) {
					arr = that.rand(old_arr)
				}
				return arr;
			},
			change(e) {
				let ele = e.currentTarget.dataset.index;
				let emptyNum = parseInt(level * level);
				if (that.gameStart && emptyNum != that.levelArray[ele].value) {
					let topNum = that.levelArray[ele - level] ? that.levelArray[ele - level].value : -1;
					let leftNum = that.levelArray[ele - 1] ? that.levelArray[ele - 1].value : -1;
					let rightNum = that.levelArray[parseInt(ele) + 1] ? that.levelArray[parseInt(ele) + 1].value : -1;
					let bottomNum = that.levelArray[parseInt(ele) + parseInt(level)] ? that.levelArray[parseInt(ele) + parseInt(level)]
						.value : -1;
					let temp = {};
					// console.log(topNum, leftNum, rightNum, bottomNum);
					switch (emptyNum) {
						case topNum:
							{
								temp = that.levelArray[ele];
								that.levelArray[ele] = that.levelArray[ele - level];
								that.levelArray[ele - level] = temp;
								break;
							}
						case leftNum:
							{
								if ((ele - 1) % 3 != 0) {
									temp = that.levelArray[ele];
									that.levelArray[ele] = that.levelArray[ele - 1];
									that.levelArray[ele - 1] = temp;
								}
								break;
							}
						case rightNum:
							{
								if (ele % 3 != 0) {
									temp = that.levelArray[ele];
									that.levelArray[ele] = that.levelArray[parseInt(ele) + 1];
									that.levelArray[parseInt(ele) + 1] = temp;
								}
								break;
							}
						case bottomNum:
							{
								temp = that.levelArray[ele];
								that.levelArray[ele] = that.levelArray[parseInt(ele) + parseInt(level)];
								that.levelArray[parseInt(ele) + parseInt(level)] = temp;
								break;
							}
					}

					//检查是否成功了
					if (that.isSuccess(that.levelArray)) {
						uni.showToast({
							icon: 'none',
							title: '恭喜！完成拼图'
						})
						that.gameStart = false;
						that.startText = '再玩一次';
						that.$emit('result', 'success');
					}
				}
			},
			isSuccess(arr) {
				console.log(arr);
				let temp = -1;
				for (let s in arr) {
					if (arr[s].value > temp) {
						temp = arr[s].value;
					} else {
						return false;
					}
				}
				return true;
			}
		}
	}
</script>

<style>
	.PingTu {
		width: 100%;
		margin-top: 10upx;
		margin: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.PingTu .item {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-size: calc(300%) calc(300%);
		background-repeat: no-repeat;
		background-color: #C0C0C0;
		box-shadow: 0 10upx 10upx rgba(0, 0, 0, 0.1);
	}

	.pt_item_1 {
		background-position: left top;
	}

	.pt_item_2 {
		background-position: center top;
	}

	.pt_item_3 {
		background-position: right top;
	}

	.pt_item_4 {
		background-position: left center;
	}

	.pt_item_5 {
		background-position: center center;
	}

	.pt_item_6 {
		background-position: right center;
	}

	.pt_item_7 {
		background-position: left bottom;
	}

	.pt_item_8 {
		background-position: center bottom;
	}

	.pt_item_9 {
		background-position: right bottom;
		background-image: none !important;
	}

	.btn-group {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 30upx;
	}
</style>
