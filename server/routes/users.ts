import express from 'express'
import * as db from '../db/functions/users'

const router = express.Router()

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get('/error', async (req, res) => {
  res.sendStatus(500)
})

export default router
