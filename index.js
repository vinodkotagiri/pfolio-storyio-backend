const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const categoryRouter = require('./routes/category')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/users', userRoutes)
app.use('/categories', categoryRouter)

//Handle middleware error for authentications
app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ error: 'Unauthorized!' })
	}
})
const server = http.createServer(app)

const connectDB = () => {
	mongoose.connect(process.env.DB_URL, () => {
		console.log('Database connection established')
	})
}

const port = process.env.PORT || 5002

server.listen(port, () => {
	try {
		connectDB()
	} catch (e) {
		console.log(e.message)
	}
	console.log('Server listening on port ' + port)
})
