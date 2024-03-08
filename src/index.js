import express from 'express';
import connect from './db/connect.js';
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.SERVER_PORT || 3000;

console.log('process.env.SERVER_PORT : ', process.env.SERVER_PORT);

const app = express()
connect()

app.get('/', (req, res) => {
  res.json({ message: 'Hello !'})
});

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`)
})