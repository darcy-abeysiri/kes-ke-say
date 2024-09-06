import request from 'superagent'
import { Post } from '../../models/post'

const rootUrl = new URL(`/api/v1`, document.baseURI).toString()

export async function getAllPosts(): Promise<Post[]> {
  const response = await request.get(`${rootUrl}/posts`)
  return response.body
}

export async function getPostById(id: number): Promise<Post> {
  const response = await request.get(`${rootUrl}/posts/${id}`)
  return response.body
}
