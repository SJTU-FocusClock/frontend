# frontend
# 颜色:aaaaff
 	uni.request({
					url:'http://106.54.76.21:8080/users/Ulogin',
					data:{
						username:that.usernameData,
						password:that.passData
					},
					method:'POST',
					header: {
					'content-type': 'application/x-www-form-urlencoded'
							},
					complete: e=>{
						
					},
					success: function(e){
						if(e.data.status==1)
						{
							console.log('登陆成功')
							uni.switchTab({
							url: "/pages/clocklist/clocklist"
						})
						}
						if(e.data.status==0)
						{
							
							that.result = e.data.result
							
						}
				
					}
				})