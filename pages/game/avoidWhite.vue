<template>
	<view class="drawMain">
		 <canvas canvas-id="drawCanvas"
		 class="canvas"
		 style="width: 100%; height: 100%;" 
		 @touchend="handleMouseMove"
		 ></canvas>
	</view>
</template>

<script>
	export default {
		props:{
			width:{//分割宽 个数
				type:Number | String,
				default:15,
			},
			height:{//分割高 个数
				type:Number | String,
				default:7,
			},
		},
		data() {
			return {
				cw:'',//画布宽
				ch:'',//画布高
				g1:require('../img/logo.png'),
				g2:require('../img/logo.png'),
				g3:require('../img/logo.png'),
				linArr:[],//存放带入参数
				isCanvasTap:true,//取消多点触碰
				canvasTapTime:300,//间隔
			}
		},
		created() {
			
		},
		watch:{
			
		},
		mounted() {
			
		},
		methods: {
			/*绘画开始*/
			drawBegin(arr){
				let that = this;
				that.linArr = [];
				this.$nextTick(() => {
						that.linArr = arr;
				    uni.createSelectorQuery().select(".canvas").boundingClientRect(data => {
				        this.cw = data.width;
								this.ch = data.height;
								let cw = data.width,//画布宽度
								ch = data.height,//画布高度
								w = that.width, //宽度 等分
								h = that.height, //高度 等分
								wj = ~~(cw/w), //等分宽
								hj = ~~(ch/h),//等分高
								wj2 = ~~wj/2,//等分宽 中心
								hj2 = ~~hj/2,//等分高 中心
								ctx = uni.createCanvasContext('drawCanvas',this);
								ctx.clearRect(0,0,cw,ch);/*清空画布*/
								arr.forEach((item,index)=>{
									let x = (item.x-1)*wj,//x坐标
											y = (item.y-1)*hj;//y坐标
									if(index > 0){
										ctx.lineTo(x+wj2,y+hj2);//线条终点
									}
									ctx.setStrokeStyle("#FFFFFF");//线条颜色
									ctx.setLineWidth(0.3);//线条宽度
									ctx.drawImage(that['g'+item.s],x,y,wj,hj);//绘制图片
									if(index < arr.length-1){
										ctx.moveTo(x+wj2,y+hj2);//线条起点
									}
								})
								ctx.stroke();
								ctx.draw();
								this.$nextTick(()=>{
									this.$forceUpdate();
								})
				    }).exec()
				})
			},
			canvasIdErrorCallback(e) {
					console.error(e.detail.errMsg)
			},
			/*触摸结束事件  只执行第一次 300毫秒间隔 */
			handleMouseMove(e) {
				let that = this;
				if(!that.isCanvasTap){
					return;
				}
				this.isCanvasTap = false;
				setTimeout(function() {
					that.isCanvasTap = true;
					that.$nextTick(function(){
						that.$forceUpdate();
					})
				}, that.canvasTapTime);
				let w = that.width,
				h = that.height,
				wj = ~~(that.cw/w),
				hj = ~~(that.ch/h);
				let x = Math.ceil(e.changedTouches[0].x/wj),
						y = Math.ceil(e.changedTouches[0].y/wj),
						arr = that.linArr;
					that.$emit('tapcanvas',{x:x,y:y,i:arr.findIndex(item=> item.x==x&&item.y==y)});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drawMain{
		width: 100%;
		height: 100%;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		overflow: hidden;
		.drawMain-view{
			flex: 1;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.drawMain-item{
				flex: 1;
				color: #FFFFFF;
				font-size: 12rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		
	}
	.bw-pl80{padding-left: 80rpx;}
	.bw-ml80{margin-left: 80rpx;}
	.bw-mr80{margin-right: 80rpx;}
	.bw-mt42{margin-top: 42rpx;}
	.bw-mt35{margin-top: 35rpx;}
	.bw-mt72{margin-top: 72rpx;}
	.bw-mlr80{margin:0 80rpx;}
	.bw-ml34{margin-left:34rpx;}
	.op2{opacity: 0.2;}
	.op3{opacity: 0.3;}
	.op4{opacity: 0.4;}
	.op5{opacity: 0.5;}
	.m20{margin: 20rpx;}
	.p20{padding: 20rpx;}
	.pl80{padding-left: 80rpx;}
	
	.w100{width: 100%;}
	.flex-cc{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
</style>
