import express from 'express'
import { getAllPosts } from '../db/functions/posts'

const router = express.Router()

// GET /api/v1/posts
router.get('/', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch all posts' })
  }
})

export default router
