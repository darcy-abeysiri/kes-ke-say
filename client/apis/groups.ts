import request from 'superagent'
import { Groups } from '../../models/groups'

export async function getAllGroups() {
  const result = await request.get(`/api/v1/groups`)
  console.log(result)
  return result.body as Groups[]
}
