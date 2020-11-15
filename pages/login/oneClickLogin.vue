<template>
</template>

<script>
	const jv = uni.requireNativePlugin('JG-JVerification');
	jv.setDebugMode(true);
	jv.init({
	        timeout:7000,
	        isProduction:false,
	    },result=>{
	        let code = result.code
	        let desc = result.content
	    });
		jv.isInitSuccess(result=>{
		        let isSucc = result.enable;
		    })
			
			
	jv.setCustomUIWithConfigAndroid({
	    setNavColor:0xff000000,
	    setLogBtnText:" 极光认证测试 ",
	    setPrivacyState:false,
	    setAppPrivacyColor:[0xff00f000,0xff000000]
	})
</script>

<style>
</style>
