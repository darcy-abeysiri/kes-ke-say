import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../apis/posts'

export function usePosts() {
  return useQuery(['posts'], getAllPosts, {
    onError: (error) => console.error('Failed to fetch posts:', error),
  })
}
