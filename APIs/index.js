const rootUrl = "http://192.168.0.109:8182/v1" //测试环境
// const rootUrl = "http://47.106.131.165:8182/v1" //上线环境
module.exports={
	index(){
		return uni.request({
			url:rootUrl+'/index',
		})
	},
	login(params){
		return uni.request({
			url:rootUrl+'/login',
			data:params,
			method:"POST",
			header:{
				"Content-Type":"application/x-www-form-urlencoded"
			}
		})
	},
	cart(){
		return uni.request({
			url:rootUrl+'/cart/list',
			header:{
				token:uni.getStorageSync('token')
				
			}
		})
	},
	category(){
		return uni.request({
			url:rootUrl+'/category'
		})
	},
	userList(){
		return uni.request({
			url:rootUrl+"/userList",
			header:{
				token:uni.getStorageSync('token')
			}
		})
	},
	detail(id){
		return uni.request({
			url:rootUrl+"/detail",
			data:{
				id
			},
			header:{
				token:uni.getStorageSync('token')
			}
		})
	},
	user(){
		return new Promise((resolve, reject)=>{
			uni.request({
				url:rootUrl+"/user",
				header:{
					token:uni.getStorageSync('token')
				}
			}).then(res=>{
				let [err,{data}] =res
				if(data.code==1){
					uni.setStorageSync("token",data.data.token)
				}
				resolve(data)
			})
		})
	},
	collect(type,sid){
		return uni.request({
			url:rootUrl+"/collect/"+type,
			method:"POST",
			header:{
				token:uni.getStorageSync('token'),
				sid
			}
		})
	}
}