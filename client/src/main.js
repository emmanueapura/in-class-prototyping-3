import 'bootstrap/dist/css/bootstrap.min.css'
import 'notyf/notyf.min.css'

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import {createPinia} from 'pinia'
import {createRouter, createWebHistory} from 'vue-router'

import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import AdminManagePage from './pages/AdminManagePage.vue'
import UpdatePostComponent from './components/UpdatePostComponent.vue'
import CreatePostComponent from './components/CreatePostComponent.vue'
import CommentComponent from './components/CommentComponent.vue'

const router = createRouter({
	history:createWebHistory(),
	routes:[{
			path:'/',
			name:'Home',
			component: HomePage
		},
		{
			path:'/Login',
			name:'Login',
			component: LoginPage
		},
		{
			path:'/Register',
			name:'Register',
			component: RegisterPage
		},
		{
			path:'/Profile',
			name:'Profile',
			component: ProfilePage
		},
		{
			path:'/UpdatePost/:id',
			name:'UpdatePost',
			component: UpdatePostComponent
		},
		{
			path:'/Comment/:id',
			name:'Comment',
			component: CommentComponent
		},
		{
			path:'/CreatePost',
			name:'CreatePost',
			component: CreatePostComponent
		},
		{
			path:'/AdminManage',
			name:'AdminManage',
			component: AdminManagePage
		}
	]
})
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
