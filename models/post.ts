export interface PostSnakeCase {
  id?: number
  user_id: number
  body: string
  image: string
  created_at?: string
}

export interface Post {
  id: number
  userId: number
  body: string
  image: string
  createdAt?: string
}
