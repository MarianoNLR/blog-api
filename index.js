import 'dotenv/config'
import express from 'express'
import './mongo.js'
import bodyParser from 'body-parser'
import { createUserRouter } from './routes/user.js'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT ?? 3000

app.use('/users', createUserRouter())

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
