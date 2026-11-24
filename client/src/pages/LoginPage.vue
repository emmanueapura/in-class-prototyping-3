<script setup>
	import {ref} from 'vue'
	import api from '../api'
	import {Notyf} from 'notyf'
	import {useGlobalStore} from '../stores/global.js'
	const notyf = new Notyf()

	const email= ref("")
	const password= ref("")

	const {getUserDetails} = useGlobalStore();

	async function handleSubmit(){
		if(!email.value.includes("@") || !email.value.includes(".com")){
			notyf.error("Invalid email")
			return 
		}
		try{
			let response = await api.post("/users/login",{
				email: email.value,
				password: password.value
			})
			localStorage.setItem('token', response.data.message)
			getUserDetails(response.data.message)
			notyf.success("Login successfull")

		}
		catch(e){
			notyf.error("Log in failed")

		}
		
	}
</script>
<template>
	<div class="row bg-danger p-5 mt-5">
		<form @submit.prevent="handleSubmit" class=" mx-auto my-5 bg-white">
			<div class="my-3 d-flex flex-column">
				<label>Email</label>
				<input type="text" class="form-control" v-model="email" required>
			</div>

			<div class="mb-3 gap-2 d-flex flex-column">
				<label>Password</label>
				<input type="password" class="form-control" v-model="password" required>
			</div>
			<div class="mb-3">
				<button type="submit" class="btn btn-primary " >Submit</button>
			</div>
		</form>
	</div>
</template>