import request from 'superagent'
import { User } from '../../models/user'

export async function getUsers() {
  const result = await request.get(`/api/v1/users`)
  return result.body as User[]
}

export async function getUserById(id: number) {
  const result = await request.get(`/api/v1/users/${id}`)
  return result.body as User
}
