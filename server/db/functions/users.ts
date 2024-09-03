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

// Getting each user id
export function getUserById(id: number): Promise<User> {
  return db('users')
    .where({ id })
    .first()
    .select(
      'id',
      'auth0_id as auth0Id',
      'username',
      'full_name as fullName',
      'location',
      'image',
    )
}

// Updating user info
export function updateUser(
  id: number,
  updates: {
    auth0_id?: string
    username?: string
    full_name?: string
    location?: string
    image?: string
  },
) {
  return db('users').where({ id }).update(updates)
}
