import express from 'express'
import * as db from '../db/functions/groups'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const groups = await db.getAllGroups()
    res.json(groups).status(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
