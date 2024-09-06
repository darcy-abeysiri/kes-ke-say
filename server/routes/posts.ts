import express from 'express'
import { getAllPosts, getPostById } from '../db/functions/posts'

const router = express.Router()

// GET /api/v1/posts
router.get('/', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    // console.error(error)
    res.status(500).json({ message: 'Failed to fetch all posts' })
  }
})

// GET /api/v1/posts/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const post = await getPostById(parseInt(id)) // parseInt converts string to number

    if (!post) {
      res.sendStatus(404)
    }

    res.json(post)
  } catch (error) {
    // console.error(error)
    res.status(500).json({ message: `Failed to fetch post with ID: ${id}` })
  }
})

export default router
