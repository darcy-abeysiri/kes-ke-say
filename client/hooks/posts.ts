import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../apis/posts'

// This hook gets all our posts data from the server and sends it to our frontend components.
export function usePosts() {
  return useQuery(['posts'], getAllPosts, {
    onError: (error) => console.error('Failed to fetch posts:', error),
  })
}
