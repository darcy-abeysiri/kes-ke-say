import request from 'superagent'
import { User } from '../../models/user'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getUsers() {
  const result = await request.get(`${rootURL}/users`)
  return result.body as User[]
}

export async function getUserById(id: number) {
  const result = await request.get(`/api/v1/users/${id}`)
  return result.body as User
}
