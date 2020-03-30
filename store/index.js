import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: ""
	},
	mutations: {
		login(state, token) {
			state.token = token;
		}
	},
	getters:{
			token(state){
				return state.token
			}
	},
	
})

export default store