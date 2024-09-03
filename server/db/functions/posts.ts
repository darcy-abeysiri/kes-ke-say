import connection from '../connection'

// Get all posts
export function getAllPosts(db = connection) {
  try {
    return db('posts')
      .join('users', 'posts.user_id', 'users.id')
      .select(
        'posts.id',
        'posts.user_id as userId',
        'posts.body',
        'posts.image',
        'posts.created_at as createdAt',
        'users.username',
        'users.image as userImage',
      )
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}
