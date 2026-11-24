import {reactive} from 'vue'
import {defineStore} from 'pinia'
import api from '../api'

export const useGlobalStore = defineStore('global', () =>{
	let user =reactive({
		token : localStorage.getItem('token'),
		email:null,
		username:null,
		isAdmin:null
	})

	async function getUserDetails(token){
		if(!token){
			user.email=null;
			user.usename=null,
			user.isAdmin=null;
			return
		}
		else{
			try{
				localStorage.setItem('token',token)
				let response = await api.get('/users/details');
				user.token= token;
				user.email=response.data.email;
				user.username=response.data.username;
				user.isAdmin=response.data.isAdmin;
			}
			catch(e){
				console.log(e);
				localStorage.removeItem('token');
				user.isAdmin=null;
				user.email=null;
			}
		}
	}

	return {user,getUserDetails}
})