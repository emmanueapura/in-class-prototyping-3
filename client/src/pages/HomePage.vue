<template>
	<div class="text-success text-center my-5">
		<h1>Welcome</h1>
	</div>
	<div class="container  d-flex">
		<div class="row  gap-5 w-100" >
			<div class="col-3 card bg-primary" v-for="post in posts" :key-data="post._id">
				<div class="card-body gap-3 bg-white" >
					<h4>{{post.title}}</h4>
					<h5>{{post.author}}</h5>
					<p>{{post.content}}</p>
					<div v-for="comment in post.comments" :key='comment._id'>
						<h6 class="bg-primary"><strong>Comments</strong></h6>
						<p>By {{comment.author}}</p>
						<p><small>{{comment.comment}}</small></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {onMounted,ref} from 'vue'
	import api from '../api'

	let posts = ref([]);
	async function getPosts(){
		let response= await api.get("/posts/allPosts");
		posts.value = response.data;
	}

	onMounted(()=>{
		getPosts();
	})
</script>