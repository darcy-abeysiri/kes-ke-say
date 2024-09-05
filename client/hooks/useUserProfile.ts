import { useQuery } from '@tanstack/react-query'
import { getUserByName } from '../apis/userApi'

export function useUserProfile(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserByName(username),
  })
}
