<template>
	<view>
		<!-- 标题卡片模式 -->
		<uni-card
		 v-for="item in requestlist"
		    :title="item.sendUser.nickname" 
		    mode="title"   
		    thumbnail="/static/avatar.png" 
		    :extra="item.sendUser.phone" 
		>
		<!-- note="TIPS" -->
		 <uni-list class="clockList">
		 	<uni-list-item class="clockListItem" 
		 		:clickable="true"  direction="row"
				 :title="item.tag" @click="handle(item)"
		 		>
		 		<template v-slot:header>
		 			<!-- <text v-if="item.time.substr(0,2) < 12">上午</text>
		 			<text v-else font-size="large">下午</text> -->
					<text> {{item.time.substr(0,5)}} </text>
		 		</template>
			<template v-slot:footer> 
			<text :key="value"> 星期 {{week}} </text>
			</template>
			
		 	</uni-list-item>
		 </uni-list>
		</uni-card>
		
		
		
	</view>
</template>

<script>
	export default {
	  data() {
	    return {
	      requestlist:[],
		  week:'',
		  value:0
	    };
	  },
	  methods:{
		  handle_week(){
			  //handle week
			  this.week='';
			  for(var j=0;j<this.requestlist.length;j++)
			  {
				  var w=this.requestlist[j].week;
				var k=false;
				for(var i=0;i<=6;i++){
					if((w>>i)&1)
					{   
						if(k)
						{
							this.week+=',';		
						}
						this.week+=i.toString();
						k=true;
					} 
				}
			  }		
		  },
		  handle(item){
			 let that=this;
			 uni.showModal({
			 	title:'是否接受？',
				success:(res)=>{
					console.log(res)
					var type;
					if(res.confirm) {type=1;}
					else{type=2;}
					uni.request({
						url:'http://106.54.76.21:8080/clocks/handle',
						method:'POST',
						header: {
						'content-type': 'application/x-www-form-urlencoded'
						},
						data:{
							requestId:item.id,
							type:type
						},
						success:(e)=> {
							if(e.data){
								//成功接受或拒绝
								uni.navigateBack({
									
								})
							}
						}
						
					})
				}
			 })
		  }
	  },
	  onShow(){
		  let that=this;
		  uni.request({
		  	url:'http://106.54.76.21:8080/clocks/requestList',
			method:'GET',
			success:e=>{
				console.log(e);
				that.requestlist=e.data;
				that.handle_week();
			}
		  })
	  }
	}
</script>

<style>
	text{
		font-size: large;
		text-align: left;
	}
</style> 
