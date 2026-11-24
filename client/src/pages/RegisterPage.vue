<script setup>
	import {ref} from 'vue'
	import api from '../api'
	import {Notyf} from 'notyf'
	const notyf = new Notyf()

	const email= ref("")
	const password= ref("")
	const confirmPassword = ref("")
	const username=ref("")

	async function handleSubmit(){
		if(!email.value.includes("@") || !email.value.includes(".com") || (password.value!==confirmPassword.value)){
			notyf.error("Invalid email")
			return 
		}
		try{
			let response = await api.post("/users/register",{
				email: email.value,
				username:username.value,
				password: password.value
			})

			notyf.success("Register successfull")

			email.value=null;
			password.value=null;
			confirmPassword.value=null;
			username.value=null;
		}
		catch(e){
			notyf.error("Registration failed")

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


			<div class="my-3 d-flex flex-column">
				<label>Username</label>
				<input type="text" class="form-control" v-model="username" required>
			</div>

			<div class="mb-3 gap-2 d-flex flex-column">
				<label>Password</label>
				<input type="password" class="form-control" v-model="password" required>
			</div>
			<div class="mb-3 gap-2 d-flex flex-column">
				<label>Confirm Password</label>
				<input type="password" class="form-control" v-model="confirmPassword" required>
			</div>
			<div class="mb-3">
				<button type="submit" class="btn btn-primary " >Submit</button>
			</div>
		</form>
	</div>
</template>