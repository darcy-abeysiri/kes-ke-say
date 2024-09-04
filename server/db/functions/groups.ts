import connection from '../connection'
import { Groups } from '../../../models/groups'

const db = connection

export function getAllGroups(): Promise<Groups[]> {
  return db('groups').select('id', 'name', 'image')
}
