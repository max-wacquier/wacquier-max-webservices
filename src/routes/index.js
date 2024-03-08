import express from 'express'
import users from './users.js'
import skills from './skills.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the co-working API !👋',
  })
})

router.use('/users', users)

router.use('/skills', skills)

export default router
