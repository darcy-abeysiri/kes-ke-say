import connection from '../connection'

// Get all posts
export function getAllPosts(db = connection) {
  return db('posts')
    .join('users', 'posts.user_id', 'users.id')
    .select(
      'posts.id',
      'posts.user_id',
      'posts.body',
      'posts.image',
      'posts.created_at',
      'users.username',
      'users.image as user_image',
    )
}
