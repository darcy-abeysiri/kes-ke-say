import request from 'superagent'
import { User } from '../../models/user'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getUsers() {
  const result = await request.get(`${rootURL}/users`)
  return result.body as User[]
}

export async function getUserByName(username: string) {
  const result = await request.get(`${rootURL}/users/${username}`)
  return result.body as User
}
