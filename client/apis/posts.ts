import request from 'superagent'
import { Post } from '../../models/post'

const rootUrl = '/api/v1'

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await request.get(`${rootUrl}/posts`)
    return response.body.posts
  } catch (error) {
    console.error(error)
    throw error
  }
}
