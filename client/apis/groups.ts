import request from 'superagent'
import { Groups } from '../../models/groups'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getAllGroups() {
  const result = await request.get(`${rootURL}/groups`)
  // console.log(result)
  return result.body as Groups[]
}
