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

// GET 'api/v1/users/:id'
router.get('/:username', async (req, res) => {
  const username = String(req.params.username)
  try {
    const user = await db.getUserByName(username)
    res.json(user)
  } catch (error) {
    // console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

export default router
