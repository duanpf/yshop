// const rootUrl = "http://192.168.0.109:82/v1" //测试环境
const rootUrl = "http://yshop.bolefx.xyz/v1" //上线环境
module.exports={
	// 获取首页数据
	index(){
		return uni.request({
			url:rootUrl+'/index',
		})
	},
	// 登录
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
	// 获取购物车列表
	cart(){
		return uni.request({
			url:rootUrl+'/cart/list',
			header:{
				token:uni.getStorageSync('token')
			}
		})
	},
	// 添加商品到购物车
	cartAdd(params){
		return uni.request({
			url:rootUrl+'/cart/add',
			data:params,
			header:{
				token:uni.getStorageSync('token')
			}
		})
	},
	// 获取分类列表
	category(){
		return uni.request({
			url:rootUrl+'/category'
		})
	},
	// 获取用户页内容
	userList(){
		return uni.request({
			url:rootUrl+"/userList",
			header:{
				token:uni.getStorageSync('token')
			}
		})
	},
	// 获取商品详情
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
	// 检测用户登录状态
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
	// 收藏或取消收藏
	collect(type,sid){
		return uni.request({
			url:rootUrl+"/collect/"+type,
			method:"POST",
			header:{
				token:uni.getStorageSync('token'),
				sid
			}
		})
	},
	// 修改购物车商品数量
	setCartNum(type,cid){
		return uni.request({
			url:rootUrl+"/cart/num/"+type,
			method:"POST",
			data:{cid},
			header:{
				token:uni.getStorageSync('token'),
			}
		})
	}
}