<template>
	<view class="box">
		<view class="result flex_col flex_col_2">
			<view class="align_l">时间：{{time}}</view>
			<view class="align_r">得分：{{countResult}}</view>
		</view>
		<view class="flex_col flex_col_3 flex_wrap">
			<view class="item" v-for="(item,index) in list" :key="index" @tap="whack(index)">
				<image src="../../static/hole.png" mode="aspectFit" class="hole"></image>
				<image src="../../static/mouse.png" mode="aspectFit" class="mouse" v-show="item == 1"></image>
				<image src="../../static/boom.png" mode="aspectFit" class="boom" v-show="item == 2"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[0,0,0,0,0,0,0,0,0],	//数值说明 0:无状态,1:老鼠显示,2:砸中状态
				result:0,
				time:30,
				flag:true
			}
		},
		mounted() {
			this.showMouse();
			this.downTime();
		},
		computed:{
			// 计算结果，使用计算函数，可方便管理得分基数
			countResult(){
				return this.result * 10;
			}
		},
		onUnload(){
			// 页面关闭移除计时器，否则app平台有BUG
			clearTimeout(this.aTime);
			clearInterval(this.bTime);
			clearInterval(this.cTime);
		},
		methods: {
			// 锤打
			whack(i){
				// 非老鼠显示状态则结束事件
				if(this.list[i] != 1){
					return;
				}
				
				if(!this.flag){
					uni.showToast({
						title:'时间已结束',
						icon:'none'
					})
					return;
				}
								
				this.$set(this.list,i,2);
				this.result ++ ;
				
				// 创建匿名函数，使当前序号拥有独立作用域（减少BUG产生）
				((j)=>{
					this.aTime = setTimeout(()=>{
						this.$set(this.list,j,0);
					},800);
				})(i)
			},
			// 显示老鼠
			showMouse(){
				// 获取有效的洞穴,避免重复渲染
				let effective = ()=>{
					let arr = [];
					this.list.forEach((v,i)=>{
						// 将无状态的洞穴添加到可用数组中
						if(v == 0){
							arr.push(i);
						}
					})
					
					return arr;
				}
				
				this.bTime = setInterval(()=>{
					if(!this.flag){
						return;
					}
					let effectiveArr = effective();
					
					// 当可用洞穴数小于3个时不再显示更多的老鼠
					if(effectiveArr.length<3){
						return;
					}
					
					// 随机获得一个可用的洞穴序号
					let r = Math.floor(Math.random()*effectiveArr.length);
					
					// 将可用的洞穴显示老鼠
					this.$set(this.list,effectiveArr[r],1);
				},500);
			},
			// 重新开始
			restart(){
				this.list=[0,0,0,0,0,0,0,0,0];
				this.result=0;
				this.time = 30;
				this.flag = true;
			},
			// 倒计时
			downTime(){
				this.cTime = setInterval(()=>{
					if(this.time>0){
						this.time -- ;
					}else{
						if(this.flag){
							this.flag = false;
							showPop();
						}
					}
				},1000);
				
				let showPop = ()=>{
					uni.showModal({
						title:"游戏结束",
						content:`得分：${this.countResult}`,
						cancelText:"不玩了",
						confirmText:"重新挑战",
						success:(e)=>{
							if(e.confirm){
								this.restart();
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	
	page{
		background-color: #45454d;
	}
	.box{
		.result{
			line-height: 100rpx;
			padding: 50rpx 30rpx;
			font-size: 40rpx;
			color: #fff;
		}
		
		.item{
			height: 250rpx;
			position: relative;
			
			>image{
				position: absolute;
				
				&.hole{
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: 1;
				}
				
				
				&.mouse{
					width: 66%;
					height: 66%;
					top: 17%;
					left: 17%;
					z-index: 2;
				}
				
				&.boom{
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: 3;
				}
			}
		}
	}
	/* 根元素样式 设置页面背景、字体大小、字体颜色，字符间距、长单词换行 */
	page {
	  background-color: #f3f3f3;
	  font-size: 28rpx;
	  box-sizing: border-box;
	  color: #333;
	  letter-spacing: 0;
	  word-wrap: break-word;
	}
	
	/* 设置常用元素尺寸规则 */
	view,textarea,input,label,form,button,image{box-sizing: border-box;}
	/* 按钮样式处理 */
	button{font-size: 28rpx;}
	/* 取消按钮默认的边框线效果 */
	button:after{border:none;}
	/* 设置图片默认样式，取消默认尺寸 */
	image{display: block;height: auto;width: auto;}
	/* 输入框默认字体大小 */
	textarea,input{font-size: 28rpx;};
	
	/* 列式弹性盒子 */
	.flex_col {
	  display: flex;
	  flex-direction: row;
	  flex-wrap: nowrap;
	  justify-content: flex-start;
	  align-items: center;
	  align-content: center;
	}
	/* 行式弹性盒子 */
	.flex_row {
	  display: flex;
	  flex-direction: column;
	  flex-wrap: nowrap;
	  justify-content: flex-start;
	  align-items: flex-start;
	  align-content: flex-start;
	}
	 
	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow{width:0;flex-grow: 1;}
	.flex_row .flex_grow{flex-grow: 1;}
	 
	/* 弹性盒子允许换行 */
	.flex_col.flex_wrap{flex-wrap: wrap;}
	 
	/* 弹性盒子居中对齐 */
	.flex_col.flex_center,.flex_row.flex_center{justify-content: center;}
	 
	/* 列式弹性盒子两端对齐 */
	.flex_col.flex_space{justify-content: space-between;}
	
	/* 弹性盒子快速分栏 ,这里非常郁闷 uniapp 居然不支持 * 选择器 */
	.flex_col.flex_col_2>view{width: 50%;}
	.flex_col.flex_col_3>view{width: 33.33333%;}
	.flex_col.flex_col_4>view{width: 25%;}
	.flex_col.flex_col_5>view{width: 20%;}
	.flex_col.flex_col_6>view{width: 16.66666%;}
	
	/* 字体颜色 */
	.color_333 {color: #333;}
	.color_666 {color: #666;}
	.color_999 {color: #999;}
	.color_ccc {color: #ccc;}
	.color_fff {color: #fff;}
	.color_6dc{color: #6dca6d;}
	.color_d51{color: #d51917;}
	.color_09f{color: #0099ff;}
	 
	/* 背景色*/
	.bg_fff{background-color: #ffffff;}
	 
	/* 字体大小 */
	.size_10 {font-size: 20rpx;}
	.size_12 {font-size: 24rpx;}
	.size_14 {font-size: 28rpx;}
	.size_16 {font-size: 32rpx;}
	.size_18 {font-size: 36rpx;}
	.size_20 {font-size: 40rpx;}
	 
	/* 字体加粗 */
	.font_b{font-weight: bold;}
	 
	/* 对齐方式 */
	.align_c{text-align: center;}
	.align_l{text-align: left;}
	.align_r{text-align: right;}
	 
	/* 遮罩 */
	.shade{
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  background-color: rgba(0,0,0,0.8);
	  z-index: 100;
	}
	 
	/* 弹窗 */
	.shade_box{
	  position: fixed;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  margin: auto;
	  z-index: 101;
	  min-width: 200rpx;
	  min-height: 200rpx;
	}
</style>