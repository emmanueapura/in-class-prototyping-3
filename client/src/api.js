import axios from 'axios'

const api = axios.create({
	baseURL: 'https://in-class-prototyping-3.onrender.com/'
})

api.interceptors.request.use((config)=>{
	const token = localStorage.getItem('token');
	if(token){
		config.headers.authorization = `Bearer ${token}`;
	}

	return config
})

export default api