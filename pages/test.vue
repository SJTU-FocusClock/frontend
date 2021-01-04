<template>
	<button @click="onclick">跳转</button>
	
	 
</template>

<script> 
	export default{
		methods:{
			/* onclick(){
				var packageName="com.tencent.mm" 
		       var Uri = plus.android.importClass("android.net.Uri");  
		       var Settings = plus.android.importClass("android.provider.Settings");  
		       var context = plus.android.runtimeMainActivity();  
		   
		       var packageURI = Uri.parse("package:" + packageName);  
		       var intent = plus.android.newObject("android.content.Intent", Settings.ACTION_APPLICATION_DETAILS_SETTINGS, packageURI);  
		       context.startActivity(intent);  
		}, */
		onclick(){
			/* //验证该应用是否存在
			if(plus.runtime.isApplicationExist({pname:'com.baidu.BaiduMap',action:'baidumap://'}))
			{
				console.log(true)
			}
			else console.log(false)
		} */
		/* plus.runtime.launchApplication( {pname:'com.baidu.BaiduMap',action:'baidumap://'}, 
		err=>{
			console.log(err)
		} ); */
		// plus.runtime.launchApplication( {pname:'com.taobao.taobao',action:'taobao://'},
		// err=>{
		// 	console.log(err)  
		// } );
	/* 	 plus.runtime.launchApplication( {pname:'com.lofter.android',action:'lofter://'},
		 err=>{
		 	console.log(err)  
		 } ); */ 
		 /* plus.runtime.launchApplication( {pname:'com.tencent.mm',action:'mm://'},
		 	 err=>{
		 	 	console.log(err)  
		 	 } ); */
			 plus.runtime.launchApplication( {pname:'com.tencent.qqmusic',action:'qqmusic://'},
			 	 err=>{
			 	 	console.log(err)  
			 	 } ); 
			 
		} 
		}}
	
</script>

<style>
</style>
