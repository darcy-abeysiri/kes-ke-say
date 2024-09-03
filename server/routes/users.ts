import express from 'express'
import * as db from '../db/functions/users'

const router = express.Router()

// GET /api/v1/posts
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (error) {
    res.sendStatus(404)
  }
})

export default router
