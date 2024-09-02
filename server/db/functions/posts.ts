import connection from '../connection'

// Get all posts
export function getAllPosts(db = connection) {
  return db('posts').select()
}

