<template>
	<div class="container-fluid d-flex justify-content-center my-5 p-5">
		<router-link :to="{name:'CreatePost'}" class="btn btn-primary">Create Post</router-link>
	</div>
	
	<div class="row p-5 my-3 gap-5" v-for="post in posts" :key="post.id">
		
		<div class="card gap-3 bg-secondary p-3">
			<div class="card-body gap-3 bg-white" >
				<h4><strong>Title: </strong>{{post.title}}</h4>
				<h5><small>Author: </small>{{post.author}}</h5>
				<p>Content: </p>
				
				<p>{{post.content}}</p>
				<div class="container ">
					<div v-for="comment in post.comments" :key='comment._id'>
						<h6 class="bg-primary"><strong>Comments:</strong></h6>
						<p>By {{comment.author}}</p>
						<div class="container">
							<p><small>{{comment.comment}}</small></p>
						</div>			
					</div>
				</div>
				<p>{{new Date(post.createdDate)}}</p>
				<div class="d-flex"> 
					<div class="me-auto">
						<router-link :to="{name:'Comment', params:{id:post._id}}" class="btn btn-primary" >Comment</router-link >
					</div>

					<div class="ms-auto mx-3">
						<router-link :to="{name:'UpdatePost', params:{id:post._id}}" class="btn btn-primary mx-3" v-if="user.username === post.author">Update</router-link>
						<button type="submit" class="btn btn-primary" @click="submitDelete(post._id)" v-if="user.username === post.author">Delete</button>
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
	import { useRouter } from 'vue-router'
	import {Notyf} from 'notyf'


	const notyf = new Notyf()

	const router = useRouter()
	const {user} = useGlobalStore();

	let posts = ref([]);
	async function getPosts(){
		let response= await api.get("/posts/allPosts");
		posts.value = response.data;
	}

	async function submitDelete(id){
		try{
			await api.delete(`posts/deletePost/${id}`)

			notyf.success("Deleted successfully")
			await getPosts();
		}catch(e){
			notyf.error("DError during deletion")
		}
		
	}

	async function submitCreatePost(){
		router.push('/CreatePostComponent');
	}

	onBeforeMount(()=>{
		if(!user.email || user.isAdmin){
			router.push('/')
		}
		getPosts();
	})
</script>