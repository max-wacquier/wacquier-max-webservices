import express from 'express'
import connect from './db/connect.js'
import routes from '#src/routes/index'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.SERVER_PORT || 3000

const app = express()
connect()

app.use(routes)

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`)
})