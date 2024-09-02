import connection from '../connection.ts'
import { User } from '../../../models/user.ts'

const db = connection

// Getting all users
export function getAllUsers(): Promise<User[]> {
  return db('users').select(
    'id',
    'auth0_id as auth0Id',
    'username',
    'full_name as fullName',
    'location',
    'image',
  )
}
