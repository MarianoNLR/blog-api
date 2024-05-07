import 'dotenv/config'
import express from 'express'
import './mongo.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { createUserRouter } from './routes/user.js'
import { createPostRouter } from './routes/post.js'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const PORT = process.env.PORT ?? 3000

app.use('/users', createUserRouter())
app.use('/posts', createPostRouter())

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
