<template>
	<h1 class="text-center">Comment</h1>
	<div class="row bg-secondary">
		<div class="card">
			<h2><strong>Title: </strong>{{post.title}}</h2>
			<h3><strong>Author: </strong>{{post.author}}</h3>
			<div class="container">
				<div class="card gap-3 my-5">
					<label class="ms-3">Comment</label>
					<textarea class="p-5 m-5" v-model="comment"></textarea>
					<div class="container-fluid mb-3">
						<button class="btn btn-primary" @click="handleSubmit">Submit</button>
					</div>
					
				</div>


			</div>
		</div>
	</div>
</template>

<script setup>
	import {onBeforeMount,ref} from 'vue'
	import api from '../api'
	import {useGlobalStore} from '../stores/global'
	import { useRouter,useRoute } from 'vue-router'
	import {Notyf} from 'notyf'


	const notyf = new Notyf()

	const router = useRouter()
	const route= useRoute()
	const {user} = useGlobalStore();

	const post = ref([])
	const comment = ref("")

	async function getPost(){
		try{
			let response=await api.get(`/posts/${route.params.id}`)

			post.value=response.data;
			notyf.success("Post information caught")
		}
		catch(e){
			notyf.error("Failed to get post")
		}
	}

	async function handleSubmit(){
		try{
			await api.post(`/posts/addComment/${route.params.id}`,{
				author: user.username,
				comment:comment.value
			})
			notyf.success("Comment added")
		}catch(e){
			notyf.error("Failed to add comment ")
		}
	}

	onBeforeMount(()=>{
		if(!user.email){
			router.push('/')
		}
		getPost();
	})
</script>