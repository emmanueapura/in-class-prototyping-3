const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');

const userRoute= require('./routes/user.js')
const postRoute= require('./routes/post.js')

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const PORT=4000;
const app = express();

let db =mongoose.connection;

db.on('error', ()=> console.log("Connection failed"))
db.once("success", ()=> console.log("Connected successfully"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOptions = {
	origin: ['http://localhost:5173'],
	methods: ['GET', 'POST', 'DELETE', 'PATCH'],
	allowHeaders : ['Content-Type', 'Authorization'],
	credentials: true,
	optionsSuccessStatus : 200
};

app.use(cors(corsOptions));

app.use('/users', userRoute)
app.use('/posts', postRoute)


app.listen(PORT, ()=>{
	console.log(`API is listenning in port ${PORT}`)
})

module.exports = {app,mongoose}