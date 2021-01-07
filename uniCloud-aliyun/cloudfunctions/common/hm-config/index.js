"use strict";
// config start 请修改填入参数，不要删除参数项

new Error("请在公用模块hm-config的index.js内添加配置项config"); //配置下方参数之后删除这一行，这行存在只是为了提醒你要配置下面的参数，因为有些人会直接下载示例啥都不配置就直接运行。

var config = {
	"Switch":true,	//bool 总开关 true开 false关
	"Limit_Today": 100,	//int 当日总限流 就是接口一天最多发多少条验证码 0为不限制
	"Limit_PhoneNumber": 3,	//int 当日单个电话号码发送限流 0为不限制
	"Limit_IP": 10,	//int 当日单个IP发送限流  0为不限制 慎用或别设置过小的值，IP为客户端公网IP，现实中一个社区可能只有几个公网IP，限制了IP可能就让这个个社区内的用户都要用不了
	"Limit_UUID": 3,	//int 前端为APP且传入UUID时候有效 当日单个UUID发送限流 0为不限制
	"Code_Length":6,	//int 验证码位数
	"Send_Interval":60,	//int 单位:秒 限制单个电话号码每次发送验证码间隔时间 0为不限制
	"Valid_Time":300,	//int 单位:秒 验证码有效时间 !!!注意!!! 验证码有效范围是针对短信模板的，比如发送验证码时候选择了A短信模板，则验证码就只针对A短信模板有效 
	"Retention_Time":2, //int 单位:天 数据库中的验证码记录保留天数，0为一直保留不自动清理，填1则程序自动清理今天0点以前且已失效的验证码记录 ,由hm_sendcode函数驱动
	"SMS_Provider":"aliyun",	//string 服务提供商 可选值: "aliyun" "tencent" "upyun" 根据自己选择的服务提供商，填写下方对应的配置参数
	"aliyun":{
		//阿里大于短信参数，在阿里云控制机台申请
		"accessKeyId":"LTAI4G3LLEAmGEbxi7ZAZS5n",
		"accessKeySecret":"lECaDmHQqvsObkWLa9wjJZeCDMv1nr",
		"SignName":"xxx",		//短信申请 注意是签名内容非签名ID
		"TemplateID":{//短信模板列表
			//用途:短信模板ID 自定义项名 例如 "register":"123456" 或 "resetpwd":"123456"
			/* !!!注意!!! 验证码有效范围是针对短信模板的，比如发送验证码时候选择了A短信模板，则验证码就只针对A短信模板有效 */
			"register":"xxx",
			"resetpwd":"xxx"
		}
		
		,		
		"TemplateParamKey": "code"	//短信内需要插入参数的变量名 阿里云默认应该是code，请根据实际配置
	},
	"tencent":{
		//腾讯短信参数
		"appid":"xxx",
		"appkey":"xxx",
		"Sign":"xxx",		//短信申请 注意是签名内容非签名ID
		"TemplateID":{//短信模板列表
			//用途:短信模板ID 自定义项名 例如 "register":"123456" 或 "resetpwd":"123456"
			"register":"xxx",
			"resetpwd":"xxx"
		}	//短信模板ID
	},
	"upyun":{
		//又拍云短信参数
		"token":"xxx",	//鉴权token
		//又拍云签名是在申请模板时候一起设置的，这里不用设置
		"TemplateID":{// 
			//用途:短信模板ID 自定义项名 例如 "register":"123456" 或 "resetpwd":"123456"
			"register":"xxx",
			"resetpwd":"xxx"
		}	//短信模板	
	}
}
// config end 请修改填入参数，不要删除参数项


//检查config参数配置，防止配置错误出问题，这段写得有点长有点啰嗦(O..O)，如果你保证了你填写没错，可以删掉这块try catch  

try {
	["Switch", "Limit_Today", "Limit_PhoneNumber", "Limit_IP", "Limit_UUID", "Code_Length", "Send_Interval", "Valid_Time","Retention_Time",
		"SMS_Provider"
	].forEach(key => {
		if (!config || !config.hasOwnProperty(key)) {
			throw new Error("请在公用模块hm-config的index.js内添加配置项config.：" + key);
		}
		let keyType = typeof config[key];
		let errorMsg = false;
		switch (key){
			case "Switch":
				if(keyType!="boolean"){
					errorMsg = "config."+key+" 只能设置boolean类型"
				}
				break;
			case "SMS_Provider":
				if(keyType!="string"){
					errorMsg = "config."+key+" 只能设置string类型"
				}
				break;
			case "Code_Length":
				if(keyType!="number"||config[key]<1||config[key]%1 != 0){
					errorMsg = "config."+key+" 只能设置大于0的int类型"
				}
				break;
			default:
				if(keyType!="number"||config[key]<0||config[key]%1 != 0){
					errorMsg = "config."+key+" 只能设置大于等于0的int类型"
				}
				break;
		}
		if(errorMsg){
			throw new Error(errorMsg);
		}
	})
	let keys = [];
	let tmpConfig = {};
	switch (config["SMS_Provider"]) {
		case "aliyun":
			keys = ["accessKeyId", "accessKeySecret", "SignName", "TemplateID", "TemplateParamKey"];
			break;
		case "tencent":
			keys = ["appid", "appkey", "Sign", "TemplateID"];
			break;
		case "upyun":
			keys = ["token", "TemplateID"];
			break;
		default:
			break;
	}

	keys.forEach(key => {
		if (!config[config["SMS_Provider"]] || !config[config["SMS_Provider"]][key]) {
			throw new Error("请在公用模块hm-config的index.js内添加配置项：" + config["SMS_Provider"] + "." + key);
		}
		if(Object.getOwnPropertyNames(config[config["SMS_Provider"]].TemplateID).length<1){
			throw new Error("请在公用模块hm-config的index.js内添加配置项：" + config["SMS_Provider"] + ".TemplateID 并填入短信模板ID");
		}
		
	})

} catch (e) {
	throw new Error("请在公用模块hm-config内添加config.json配置必要参数");
}
module.exports = config;