<script setup>
	import {ref,onBeforeMount} from 'vue'
	import {useRoute,useRouter} from 'vue-router'
	import {useGlobalStore} from '../stores/global'
	import api from '../api'
	import {Notyf} from 'notyf'

	const notyf = new Notyf();

	const {user} = useGlobalStore();

	const router= useRouter();
	const route= useRoute()

	const title=ref("")
	const content=ref("")

	async function handleSubmit(){
		try{
			await api.patch(`/posts/updatePost/${route.params.id}`,{
				title: title.value,
				content:content.value
			})
			notyf.success("Updated successfully")
		}
		catch(e){
			notyf.error("Update failedd")
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
				<textarea class="form-control" v-model="content" required></textarea>
			</div>
			<div class="mb-3">
				<button type="submit" class="btn btn-primary " >Submit</button>
			</div>
		</form>
	</div>
</template>