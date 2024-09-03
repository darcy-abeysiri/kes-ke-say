export interface PostSnakeCase {
  id?: number
  user_id: number
  username: string
  body: string
  image: string
  user_image: string
  created_at: string
}

export interface Post {
  id: number
  userId: number
  username: string
  body: string
  image: string
  userImage: string
  createdAt: string
}
