const codeMsg={
	1001:"功能已关闭",
	1002:"已到达今日限额总量",
	1003:"号码获取验证码次数已达上限",
	1004:"IP获取验证码次数已达上限",
	1005:"设备获取验证码次数已达上限",
	1006:"获取太频繁了",
	1007:"验证码错误",
	1008:"请输入电话号码",
	1009:"获取验证码失败",
	1010:"传入type参数有误",
	1011:"请填写正确的手机号码"
}
module.exports = {
	success() {
		return JSON.stringify({"ret":0,"msg":"success","time":new Date().getTime()});
	},
	error(code,moremsg){
		var res = {
			"ret":code,
			"msg":codeMsg[code],
			"moremsg":moremsg,
			"time":new Date().getTime()
		}
		return JSON.stringify(res);
	}
}
