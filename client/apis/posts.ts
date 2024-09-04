import request from 'superagent'
import { Post } from '../../models/post'

const rootUrl = new URL(`/api/v1`, document.baseURI).toString()

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await request.get(`${rootUrl}/posts`)
    return response.body
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getPostById(id: number): Promise<Post> {
  try {
    const response = await request.get(`${rootUrl}/posts/${id}`)
    return response.body
  } catch (error) {
    console.error(error)
    throw error
  }
}
