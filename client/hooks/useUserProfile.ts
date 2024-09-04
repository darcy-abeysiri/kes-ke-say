import { useQuery } from '@tanstack/react-query'
import { User } from '../../models/user'

export function useUserProfile(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserByName(username),
  })
}
const getUserByName = async (username: string): Promise<User> => {
  const response = await fetch(`/api/v1/users/${username}`)
  return response.json()
}
