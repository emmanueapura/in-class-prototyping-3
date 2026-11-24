<script setup>
	import {ref,onBeforeMount} from 'vue'
	import {useRouter} from 'vue-router'
	import api from '../api'
	import {Notyf} from 'notyf'
	import {useGlobalStore} from '../stores/global'

	const {user}= useGlobalStore();
	const router = useRouter();

	const title=ref("");
	const content=ref("");

	const notyf= new Notyf();

	async function handleSubmit(){
		try{
			await api.post('/posts/addPost',{
				title: title.value,
				content: content.value,
				author: user.username
			})
			notyf.success("Post created")
			title.value= null;
			content.value= null;
		}
		catch(e){
			notyf.error("Error post not created")
		}
	}

	onBeforeMount(()=>{
		if(!user.token){
			router.push('/Login')
		}
	})
</script>
<template>
	<div class="row d-flex justify-content-center mx-auto mt-5 px-5 bg-secondary">
		<form @submit.prevent="handleSubmit" class=" mx-auto my-5 bg-white ">
			<div class="my-3 d-flex flex-column">
				<label>Title</label>
				<input type="text" class="form-control" v-model="title" required>
			</div>


			<div class="my-3 d-flex flex-column">
				<label>Content</label>
				<input type="text" class="form-control" v-model="content" required>
			</div>
			<div class="mb-3">
				<button type="submit" class="btn btn-primary " >Submit</button>
			</div>
		</form>
	</div>
</template>
