<template>
	<nav class="navbar container-fluid bg-danger">
		<div class="d-flex w-100">
			<div class="ms-3">
				<router-link :to="{name:'Home'}" class="ms-3 link-dark">Home</router-link>
			</div>
			
			<div class=" ms-auto me-3">
				<ul class="d-flex  gap-3 ">
					<router-link :to="{name:'Profile'}" v-if="user.email && !user.isAdmin">Posts</router-link>
					<router-link :to="{name:'AdminManage'}" v-if="user.email && user.isAdmin">Manage</router-link>
					<router-link :to="{name:'Register'}" v-if="!user.email">Register</router-link>
					<router-link :to="{name:'Login'}">Log in</router-link>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script setup>
	import {useGlobalStore} from '../stores/global'
	const {user} = useGlobalStore();
</script>