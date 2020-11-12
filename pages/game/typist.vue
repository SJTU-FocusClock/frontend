<template>
	<view class="page">
		<view class="show">
			{{result}}
		</view>
		<view class="inp">
			<input type="text" v-model="myResult"/>
		</view>
		
		<button @click="submit">确定</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				str:"ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
				result:"",
				myResult:"",
				l:5
			}
		},
		methods:{
			randomString(){
				var len=this.str.length;
				this.result=""
				for(var i=0;i<this.l;i++)
				{
					var tmp=Math.floor(Math.random() * (len + 1))
					this.result+=this.str.charAt(tmp)
				}
			},
			submit(){
				if(this.result==this.myResult)
				{
					uni.showToast({
						title:"right!"
					})
				}
				else{
					uni.showToast({
						title:"wrong!"
					})
					this.randomString()
				}
			}
		},
		onShow(){
			this.result=""
			var len=this.str.length;
				for(var i=0;i<this.l;i++)
				{
					var tmp=Math.floor(Math.random() * (len + 1))
					this.result+=this.str.charAt(tmp)
				}
			}
		
	}
</script>

<style>
	.page{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.show{
		font-size: xx-large;
		font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		margin-top: 130px;
	}
	input{
		font-size: xx-large;
/* border: 1px solid rgba(0,255,255,.8); */
margin-top: 30px;
width:150px;

		text-align: center;
		border-bottom: #0056B3 1px solid;
		
	}
	button{
margin-top: 50px;
	}

</style>
