import { useQuery } from '@tanstack/react-query'
import { User } from '../../models/user'

export function useUserProfile(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  })
}
const getUserById = async (id: number): Promise<User> => {
  const response = await fetch(`/api/v1/users/${id}`)
  return response.json()
}
