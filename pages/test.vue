<template>
	<button @click="onclick">跳转</button>
	
	 
</template>

<script> 
	export default{
		methods:{
			onclick(){
				var packageName="com.tencent.mm" 
		       var Uri = plus.android.importClass("android.net.Uri");  
		       var Settings = plus.android.importClass("android.provider.Settings");  
		       var context = plus.android.runtimeMainActivity();  
		   
		       var packageURI = Uri.parse("package:" + packageName);  
		       var intent = plus.android.newObject("android.content.Intent", Settings.ACTION_APPLICATION_DETAILS_SETTINGS, packageURI);  
		       context.startActivity(intent);  
		},
		}}
	
</script>

<style>
</style>
